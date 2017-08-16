import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, ListItem, Text } from "native-base";
import { InteractionManager, View } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as orderActions from "~/store/actions/order";
import * as commonActions from "~/store/actions/common";
import * as placeActions from "~/store/actions/place";
import * as orderSelectors from "~/store/selectors/order";
import * as authSelectors from "~/store/selectors/auth";
import * as metaActions from "~/store/actions/meta";
import { InputField } from "~/ui/elements/Form";
import Content from "~/ui/components/Content";
import Spinner from '~/ui/components/Spinner'
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Border from "~/ui/elements/Border";
import Icon from "~/ui/elements/Icon";
import options from "./options";
import { formatNumber, formatPhoneNumber, chainParse, getToastMessage } from "~/ui/shared/utils";
import CallModal from "~/ui/components/CallModal";
import moment from "moment";
import { getNews } from "~/store/selectors/place";
import DeliveryFeedbackDialog from "~/ui/containers/DeliveryList/DeliveryFeedbackDialog";
import I18n from '~/ui/I18n'
import OrderItem from './OrderItem'
// import { getRouter } from '~/store/selectors/common'
import LoadingModal from "~/ui/components/LoadingModal"
import {
    DEFAULT_TIME_FORMAT,
    DELIVERY_FEEDBACK,
    FAST_DELIVERY,
    GENERAL_ERROR_MESSAGE,
    ORDER_CANCEL,
    ORDER_SUCCESS,
    ORDER_WAITING_CONFIRM,
    ORDER_WAITING_DELIVERY,
    SCREEN
} from "~/store/constants/app";
import ListViewExtend from '~/ui/components/ListViewExtend'
@connect(state => ({
    order: orderSelectors.getOrder(state),
    session: authSelectors.getSession(state),
    news: getNews(state),
    meta: state.meta,
    // router: getRouter(state), // can get direct from app, state, but should not connect    
}), { ...orderActions, ...commonActions, ...placeActions, ...metaActions })
// @reduxForm({ form: 'TestForm' })
export default class extends Component {

    constructor(props) {
        super(props)
        const { app } = props
        let placeDropdownValue = app.topDropdown.getValue()
        let selectedPlace = null
        if (placeDropdownValue && Object.keys(placeDropdownValue).length > 0) {
            selectedPlace = placeDropdownValue.id
        }
        this.state = {
            selectedPlace: selectedPlace,
            modalOpen: false,
            // counting: true,
            phoneNumber: '',
            processing: false
        }
        this.counting = true
        this.selectedStatus = 0
        this.interval = 0
        this.isLoadingPlace = false
        this.clickCount = 0
    }
    componentWillReceiveProps(nextProps){
        const {meta} = nextProps
        const {clearMarkLoad} = this.props
        if (meta && meta[SCREEN.ORDER_LIST]){
            this._load()
            clearMarkLoad(SCREEN.ORDER_LIST)
        }
    }

    _load() {
        InteractionManager.runAfterInteractions(() => {
        const { order, getOrderDenyReason, session } = this.props
        let dateFilter = this.refs.dateFilter.getData(); //currentSelectValue
        if (!this.state.selectedPlace) {
            this.isLoadingPlace = true
        }
        // load list content
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
        if (!order.denyReason || order.denyReason.length == 0) {
            getOrderDenyReason(session)
        }
        })
    }

    componentWillFocus() {
        this.counting = true
        InteractionManager.runAfterInteractions(() => {
        this.clickCount = 0
        const { app, news, order, markWillReload, meta, clearMarkLoad } = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
        let now = new Date().getTime()
        //
        let placeDropdownValue = app.topDropdown.getValue()
        if (placeDropdownValue && Object.keys(placeDropdownValue).length > 0) {
            let selectedPlace = placeDropdownValue.id
            if (selectedPlace != this.state.selectedPlace){
                this.setState({selectedPlace: selectedPlace},
                    ()=>this._load()
                )
            }
        }
        
        //Effect within 1 munites from markTime
        if (order.willReload && order.markReloadTime && (now - order.markReloadTime < 60000)) {
            markWillReload(false)
            this.selectedStatus = ORDER_WAITING_DELIVERY
            this.refs.tabs.setActiveTab(ORDER_WAITING_DELIVERY)
            this._load()
        }else if (meta && meta[SCREEN.ORDER_LIST]){
            console.log('Markload order list')
            this._load()
            clearMarkLoad(SCREEN.ORDER_LIST)
        }

        news && this.refs.tabs.updateMultipleNumber([
            {
                tabID: ORDER_WAITING_CONFIRM,
                number: news.orderWaitConfirm
            },
            {
                tabID: ORDER_WAITING_DELIVERY,
                number: news.orderWaitDelivery
            }
        ])
        // this.setState({ counting: true })
        })

        this.listview && this.listview.swing()
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
        const { app, news } = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
        this._load()
        news && this.refs.tabs.updateMultipleNumber([
            {
                tabID: ORDER_WAITING_CONFIRM,
                number: news.orderWaitConfirm
            },
            {
                tabID: ORDER_WAITING_DELIVERY,
                number: news.orderWaitDelivery
            }
        ])
        })

    }

    componentWillBlur() {        
        this.counting = false
        // InteractionManager.runAfterInteractions(() => {
        // this.setState({ counting: false })
        // })

    }


    loadPage(page = 1, from_time, to_time, isLoadMore = false) {
        const { session, getOrderList, clearOrderList, getMerchantNews, forwardTo } = this.props
        const { selectedPlace } = this.state
        if (!selectedPlace) return
        if (isLoadMore) {
            this.spinner.show(true)
        } else {
            // clearOrderList()
            this.listview.showRefresh(true)
        }
        getOrderList(session, selectedPlace, this.selectedStatus, page,
            from_time, to_time,
            (err, data) => {                
                this.listview.showRefresh(false)
                this.spinner.show(false)
                this.clickCount = 0
            })
        //update noti Number
        getMerchantNews(session, selectedPlace,
            (err, data) => {
                if (data && data.updated && data.updated.data) {
                    let newsUpdate = data.updated.data
                    if (newsUpdate.orderNews < 0) {
                        forwardTo('merchantOverview', true)
                        return
                    }
                    newsUpdate && this.refs.tabs.updateNumber(ORDER_WAITING_CONFIRM, newsUpdate.orderWaitConfirm)
                    newsUpdate && this.refs.tabs.updateNumber(ORDER_WAITING_DELIVERY, newsUpdate.orderWaitDelivery)
                }
            }
        )
    }

    onModalOpen = (phoneNumber) => {
        this.setState({
            modalOpen: true,
            phoneNumber: phoneNumber
        })
    }

    onModalClose() {
        this.setState({
            modalOpen: false
        })
    }

    _handleChangePlace = (item) => {
        const { setSelectedOption, session } = this.props
        // setSelectedOption(item)
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value //currentSelectValue      
        this.setState({
            selectedPlace: item.id,
        }, () => this.loadPage(1, dateFilter.from, dateFilter.to))
    }

    _onRefresh = () => {
        let dateFilter = this.refs.dateFilter.getData()
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
    }

    _loadMore = () => {
        console.log('Call loadMore')
        if (this.listview.state.refreshing || this.spinner.state.shown)
            return
        const { order } = this.props
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value
        if (order.hasMore) {
            this.loadPage(order.page + 1, dateFilter.from, dateFilter.to, true)
        }
    }

    _handlePressTab = (item) => {
        this.selectedStatus = item.tabID
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value
        this.loadPage(1, dateFilter.from, dateFilter.to)
    }
    _handlePressFilter = (item) => {
        // update dateFilter for delivery list
        this.props.updateDateFilter(item.currentDateFilter)
        this.loadPage(1, item.currentSelectValue.value.from, item.currentSelectValue.value.to)
    }
    _handleFeedbackOrder = (posOrderId, reasonId, note) => {
        console.log('Feedback Order', posOrderId + '---' + reasonId + '---' + note)
        const { updateOrderStatus, setToast, session } = this.props
        this.setState({processing: true})
        updateOrderStatus(session, posOrderId, DELIVERY_FEEDBACK.CANCEL, reasonId, note,
            (err, data) => {
                this.setState({processing: false})
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    this._load()
                } else {
                    setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                }
            }
        )
    }
    _handleConfirmOrder = (posOrderId) => {
        console.log('Confirm Order', posOrderId)
        const { updateOrderStatus, setToast, session } = this.props
        console.log('Before Check Click', this.clickCount)
        if (this.clickCount > 0) return
        console.log('After Check Click', this.clickCount)
        this.setState({processing: true})
        updateOrderStatus(session, posOrderId, DELIVERY_FEEDBACK.OK,
            (err, data) => {
                console.log('Data update status', data)
                console.log('Error update order status', err)
                this.setState({processing: false})
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    this._load()
                } else {
                    setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                    this.clickCount = 0
                }
            }
        )
        this.clickCount++
        console.log('Increase Click', this.clickCount)
    }
    showReasonPopup = (posOrderId) => {
        console.log('Show Reason Popup', posOrderId)
        this.refs.deliveryFeedbackDialog.show(posOrderId)
    }

    render() {

        console.log('render delivery list')

        const { handleSubmit, submitting, place, order } = this.props
        const { orderList } = order
        return (
            <Container style={styles.container}>
                <LoadingModal loading = {this.state.processing} text={I18n.t('processing')}/>
                <TabsWithNoti tabData={options.tabData}
                    activeTab={0} onPressTab={this._handlePressTab} ref='tabs' />
                <DateFilter defaultFilter={order.currentDateFilter} onPressFilter={this._handlePressFilter} ref='dateFilter' />
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />
                <DeliveryFeedbackDialog ref='deliveryFeedbackDialog'
                    listValue={order.denyReason}
                    onClickYes={this._handleFeedbackOrder}
                />
                <ListViewExtend
                    onItemRef={ref=>this.listview=ref}
                    onEndReached={this._loadMore} 
                    onRefresh={this._onRefresh}
                    dataArray={orderList}
                    keyExtractor={item=>item.orderInfo.clingmeId}
                    renderRow={(item) => (
                        <OrderItem data={item} 
                            key={chainParse(item, ['orderInfo', 'tranId'])}
                            onPressPhoneNumber = {this.onModalOpen}
                            onShowReasonPopup = {this.showReasonPopup}
                            onConfirmOrder = {this._handleConfirmOrder}
                            counting={this.counting}
                        />
                    )}
                />

                <Spinner onItemRef={ref=>this.spinner=ref} />

            </Container>
        )
    }
}