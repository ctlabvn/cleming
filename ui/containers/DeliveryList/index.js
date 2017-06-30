import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, ListItem, Spinner, Text} from "native-base";
import {InteractionManager, View} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as orderActions from "~/store/actions/order";
import * as commonActions from "~/store/actions/common";
import * as placeActions from "~/store/actions/place";
import * as orderSelectors from "~/store/selectors/order";
import * as authSelectors from "~/store/selectors/auth";
import {InputField} from "~/ui/elements/Form";
import Content from "~/ui/components/Content";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Border from "~/ui/elements/Border";
import Icon from "~/ui/elements/Icon";
import options from "./options";
import {formatNumber, formatPhoneNumber} from "~/ui/shared/utils";
import {BASE_COUNTDOWN_ORDER_MINUTE} from "~/ui/shared/constants";
import CircleCountdown from "~/ui/components/CircleCountdown";
import CallModal from "~/ui/components/CallModal";
import moment from "moment";
import {getNews} from "~/store/selectors/place";
import DeliveryFeedbackDialog from "~/ui/containers/DeliveryList/DeliveryFeedbackDialog";
import {
    DEFAULT_TIME_FORMAT,
    DELIVERY_FEEDBACK,
    FAST_DELIVERY,
    GENERAL_ERROR_MESSAGE,
    ORDER_CANCEL,
    ORDER_SUCCESS,
    ORDER_WAITING_CONFIRM,
    ORDER_WAITING_DELIVERY
} from "~/store/constants/app";
@connect(state => ({
    order: orderSelectors.getOrder(state),
    session: authSelectors.getSession(state),
    news: getNews(state)
}), {...orderActions, ...commonActions, ...placeActions})
// @reduxForm({ form: 'TestForm' })
export default class extends Component {

    constructor(props) {
        super(props)
        const {app} = props
        let placeDropdownValue = app.topDropdown.getValue()
        let selectedPlace = null
        if (placeDropdownValue && Object.keys(placeDropdownValue).length > 0) {
            selectedPlace = placeDropdownValue.id
        }
        this.state = {
            selectedPlace: selectedPlace,
            loading: false,
            loadingMore: false,
            modalOpen: false,
            counting: true,
            phoneNumber: ''
        }
        // this.counting = true
        this.selectedStatus = 0
        this.interval = 0
        this.isLoadingPlace = false
        this.clickCount = 0
    }

    _load() {
        // InteractionManager.runAfterInteractions(() => {
        const {order, getOrderDenyReason, session, getMerchantNews} = this.props
        let dateFilter = this.refs.dateFilter.getData(); //currentSelectValue
        if (!this.state.selectedPlace) {
            this.isLoadingPlace = true
        }
        // load list content
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
        if (!order.denyReason || order.denyReason.length == 0) {
            getOrderDenyReason(session)
        }

        //update noti Number
        getMerchantNews(session, this.state.selectedPlace,
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
        // })
    }

    componentWillFocus() {
        // this.counting = true
        // InteractionManager.runAfterInteractions(() => {
        this.clickCount = 0
        const {app, news, order, markWillReload} = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
        let now = new Date().getTime()
        //Effect within 1 munites from markTime
        if (order.willReload && order.markReloadTime && (now - order.markReloadTime < 60000)) {
            markWillReload(false)
            this.selectedStatus = ORDER_WAITING_DELIVERY
            this.refs.tabs.setActiveTab(ORDER_WAITING_DELIVERY)
            this._load()
        }

        news && this.refs.tabs.updateNumber(ORDER_WAITING_CONFIRM, news.orderWaitConfirm)
        news && this.refs.tabs.updateNumber(ORDER_WAITING_DELIVERY, news.orderWaitDelivery)

        this.setState({counting: true})
        // })
    }

    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
        const {app, news} = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
        this._load()
        news && this.refs.tabs.updateNumber(ORDER_WAITING_CONFIRM, news.orderWaitConfirm)
        news && this.refs.tabs.updateNumber(ORDER_WAITING_DELIVERY, news.orderWaitDelivery)

        // })

    }

    componentWillBlur() {
        // this.counting = false
        // InteractionManager.runAfterInteractions(() => {
        this.setState({counting: false})
        // })

    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.isLoadingPlace && nextProps.place && nextProps.place.listPlace) {
    //         this.isLoadingPlace = false
    //         let selectedPlace = nextProps.place.listPlace[0].placeId
    //         this.setState({ selectedPlace: selectedPlace },
    //             () => {
    //                 let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value; //currentSelectValue
    //                 this.loadPage(1, dateFilterData.from, dateFilterData.to)
    //             }
    //         )

    //     }
    // }

    loadPage(page = 1, from_time, to_time, isLoadMore = false) {
        const {session, getOrderList, clearOrderList} = this.props
        const {selectedPlace} = this.state
        if (!selectedPlace) return
        if (isLoadMore) {
            this.setState({loadingMore: true})
        } else {
            // clearOrderList()
            this.setState({loading: true})
        }
        getOrderList(session, selectedPlace, this.selectedStatus, page,
            from_time, to_time,
            (err, data) => {
                this.setState({
                    loading: false,
                    loadingMore: false,
                })
                this.clickCount = 0
            })
    }

    onModalOpen(phoneNumber) {
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
        const {setSelectedOption, getMerchantNews, session} = this.props
        // setSelectedOption(item)
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value //currentSelectValue      
        this.setState({
            selectedPlace: item.id,
        }, () => this.loadPage(1, dateFilter.from, dateFilter.to))
        getMerchantNews(session, item.id,
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

    _onRefresh = () => {
        let dateFilter = this.refs.dateFilter.getData()
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
    }

    _loadMore = () => {
        if (this.state.loading || this.state.loadingMore)
            return
        const {order} = this.props
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
        this.loadPage(1, item.currentSelectValue.value.from, item.currentSelectValue.value.to)
    }
    _handleFeedbackOrder = (posOrderId, reasonId, note) => {
        console.log('Feedback Order', posOrderId + '---' + reasonId + '---' + note)
        const {updateOrderStatus, setToast, session} = this.props
        updateOrderStatus(session, posOrderId, DELIVERY_FEEDBACK.CANCEL, reasonId, note,
            (err, data) => {
                console.log('Data update status', data)
                console.log('Error update order status', err)
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    this._load()
                } else {
                    setToast(GENERAL_ERROR_MESSAGE, 'danger')
                }
            }
        )
    }
    _handleConfirmOrder = (posOrderId) => {
        console.log('Confirm Order', posOrderId)
        const {updateOrderStatus, setToast, session} = this.props
        console.log('Before Check Click', this.clickCount)
        if (this.clickCount >0) return
        console.log('After Check Click', this.clickCount)
        updateOrderStatus(session, posOrderId, DELIVERY_FEEDBACK.OK,
            (err, data) => {
                console.log('Data update status', data)
                console.log('Error update order status', err)
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    this._load()
                } else {
                    setToast(GENERAL_ERROR_MESSAGE, 'danger')
                    this.clickCount = 0
                }
            }
        )
        this.clickCount ++
        console.log('Increase Click', this.clickCount)
    }
    showReasonPopup = (posOrderId) => {
        console.log('Show Reason Popup', posOrderId)
        this.refs.deliveryFeedbackDialog.show(posOrderId)
    }

    _renderRow({orderInfo, orderRowList}) {
        const {forwardTo} = this.props
        var statusBlock = null, buttonActionBlock = null
        const status = this.selectedStatus
        let totalItem = 0
        if (orderRowList) {
            totalItem = orderRowList.map(x => x.quantity).reduce((a, b) => (a + b), 0)
        }
        let phoneNumberBlock = (
            <View style={styles.row}>
                <Icon name='phone' style={{...styles.icon, ...styles.phoneIcon}}/>
                <Text
                    onPress={this.onModalOpen.bind(this, orderInfo.userInfo.phoneNumber)}
                    style={styles.phoneNumber}>{formatPhoneNumber(orderInfo.userInfo.phoneNumber)}</Text>
            </View>
        )
        switch (orderInfo.status) {
            case 'WAIT_CONFIRM':
            default:
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        <Icon name='shiping-bike2' style={{...styles.icon, ...styles.deliveryCodeWaitingConfirm}}/>
                        <Text style={styles.deliveryCodeWaitingConfirm}>{orderInfo.tranId}</Text>
                    </View>
                )
                break
            case 'CONFIRMED':
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        <Icon name='shiping-bike2' style={{...styles.icon, ...styles.deliveryCodeWaitingDelivery}}/>
                        <Text style={styles.deliveryCodeWaitingDelivery}>{orderInfo.tranId}</Text>
                    </View>
                )
                buttonActionBlock = (
                    <View style={styles.block}>
                        <Border color='rgba(0,0,0,0.5)' size={1}/>
                        <View style={styles.row}>
                            <Button transparent onPress={() => this.showReasonPopup(orderInfo.clingmeId)}><Text bold
                                                                                                                gray>Hủy
                                giao hàng</Text></Button>
                            <Button transparent onPress={() => this._handleConfirmOrder(orderInfo.clingmeId)}><Text bold
                                                                                                                    primary>Đã
                                giao hàng</Text></Button>
                        </View>
                    </View>
                )
                break
            case 'COMPLETED':
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                        <Icon name='shiping-bike2' style={{...styles.icon, ...styles.deliveryCodeSuccess}}/>
                        <Text style={styles.deliveryCodeSuccess}>{orderInfo.tranId}</Text>
                    </View>
                )
                break
            case 'FAILED':
            case 'CANCELLED':
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                        <Icon name='shiping-bike2' style={{...styles.icon, ...styles.grey}}/>
                        <Text style={styles.grey}>{orderInfo.tranId}</Text>
                    </View>
                )
                phoneNumberBlock = (
                    <View style={styles.row}>
                        <Icon name='phone' style={{...styles.icon, ...styles.phoneIcon, ...styles.grey}}/>
                        <Text
                            onPress={this.onModalOpen.bind(this, orderInfo.userInfo.phoneNumber)}
                            style={{...styles.phoneNumber, ...styles.grey}}>{formatPhoneNumber(orderInfo.userInfo.phoneNumber)}</Text>
                    </View>
                )
                break
        }
        const countTo = orderInfo.clingmeCreatedTime + BASE_COUNTDOWN_ORDER_MINUTE * 60
        let listItemStyle = (orderInfo.status != 'CANCELLED' && orderInfo.status != 'FAILED') ? styles.deliveryBlock : styles.deliveryBlockCacel
        return (
            <ListItem noBorder style={listItemStyle} key={orderInfo.clingmeId}
                      onPress={() => {
                          forwardTo('deliveryDetail/' + orderInfo.clingmeId)
                      }
                      }>
                <View style={styles.block}>
                    <View style={{...styles.row, width: '100%', paddingLeft: 5, paddingRight: 5}}>
                        {statusBlock}
                        <View style={styles.row}>
                            <Text style={styles.time}
                                  grayDark>{moment(orderInfo.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                            {(orderInfo.status == 'CANCELLED' || orderInfo.status== 'FAILED') && (
                                <Icon name='done' style={{...styles.deliveryCodeSuccess, ...styles.icon}}/>
                            )}
                            {(orderInfo.enableFastDelivery == FAST_DELIVERY.YES) &&
                            <CircleCountdown baseMinute={BASE_COUNTDOWN_ORDER_MINUTE}
                                             counting={this.state.counting}
                                             countTo={countTo}
                            />}
                        </View>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                <View style={styles.block}>
                    <View style={{width: '100%'}}>
                        <View style={styles.row}>
                            <Text bold grayDark>Số món đặt giao hàng</Text>
                            <Text grayDark>SL: <Text bold grayDark>{totalItem}</Text></Text>
                        </View>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                {(typeof orderInfo.note != 'undefined' && orderInfo.note != '') &&
                <View style={styles.block}>
                    <View>
                        <View style={styles.rowLeft}><Text bold grayDark style={styles.textLeft}>Ghi chú: </Text></View>
                        <View style={styles.rowLeft}><Text grayDark
                                                           style={styles.textLeft}>{orderInfo.note}</Text></View>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1}/>
                </View>
                }
                <View style={styles.block}>
                    {orderInfo.userInfo &&
                    (<View style={{...styles.row, marginBottom: 10, marginTop: 5}}>
                        <View style={styles.row}>
                            <Icon name='account' style={styles.icon}/>
                            <Text grayDark>{orderInfo.userInfo.memberName}</Text>
                        </View>
                        {phoneNumberBlock}
                    </View>)}

                    <View style={{...styles.row, marginBottom: 5}}>
                        <Text grayDark>Địa chỉ: {orderInfo.fullAddress}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text success>Đã thanh toán</Text>
                        <Text bold grayDark>{formatNumber(Math.round(orderInfo.moneyAmount))}đ</Text>
                    </View>
                </View>
                {buttonActionBlock}
            </ListItem>
        )
    }

    render() {
        const {handleSubmit, submitting, place, order} = this.props
        const {orderList} = order
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData}
                              activeTab={0} onPressTab={this._handlePressTab} ref='tabs'/>
                <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter'/>
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen}/>
                <DeliveryFeedbackDialog ref='deliveryFeedbackDialog'
                                        listValue={order.denyReason}
                                        onClickYes={this._handleFeedbackOrder}
                />
                <Content
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReached={this._loadMore} onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                    style={styles.contentContainer}
                >
                    {orderList && orderList.map(item => (
                        this._renderRow(item)
                    ))}
                    {this.state.loadingMore &&
                    <Spinner />
                    }
                </Content>
            </Container>
        )
    }
}