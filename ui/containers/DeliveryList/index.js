import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Thumbnail, Button, Spinner } from 'native-base'
import { View, Modal, InteractionManager } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import DateFilter from '~/ui/components/DateFilter'
import * as orderActions from '~/store/actions/order'
import * as commonActions from '~/store/actions/common'
import * as placeActions from '~/store/actions/place'
import * as orderSelectors from '~/store/selectors/order'
import * as authSelectors from '~/store/selectors/auth'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import Content from '~/ui/components/Content'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'
import options from './options'
import { formatNumber } from '~/ui/shared/utils'
import { BASE_COUNTDOWN_ORDER_MINUTE } from '~/ui/shared/constants'
import CircleCountdown from '~/ui/components/CircleCountdown'
import CallModal from '~/ui/components/CallModal'
import moment from 'moment'
import { formatPhoneNumber } from '~/ui/shared/utils'
import { getNews } from '~/store/selectors/place'

import {
    ORDER_WAITING_CONFIRM, ORDER_WAITING_DELIVERY, ORDER_SUCCESS,
    ORDER_CANCEL, DEFAULT_TIME_FORMAT, FAST_DELIVERY
}
    from '~/store/constants/app'
@connect(state => ({
    order: orderSelectors.getOrder(state),
    session: authSelectors.getSession(state),
    news: getNews(state)
}), { ...orderActions, ...commonActions, ...placeActions })
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
    }
    _load() {
        InteractionManager.runAfterInteractions(() => {
            const { order } = this.props
            let dateFilter = this.refs.dateFilter.getData(); //currentSelectValue
            if (!this.state.selectedPlace) {
                this.isLoadingPlace = true
            }
            this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
        })
    }
    componentWillFocus() {
        // this.counting = true
        InteractionManager.runAfterInteractions(() => {
            const { app, news } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
            if (news && news.orderWaitConfirm) {
                this.refs.tabs.updateNumber(ORDER_WAITING_CONFIRM, news.orderWaitConfirm)
            }
            if (news && news.orderWaitDelivery) {
                this.refs.tabs.updateNumber(ORDER_WAITING_DELIVERY, news.orderWaitDelivery)
            }
            this.setState({ counting: true })
        })
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { app, news } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
            this._load()
            if (news && news.orderWaitConfirm) {
                this.refs.tabs.updateNumber(ORDER_WAITING_CONFIRM, news.orderWaitConfirm)
            }
            if (news && news.orderWaitDelivery) {
                this.refs.tabs.updateNumber(ORDER_WAITING_DELIVERY, news.orderWaitDelivery)
            }
        })

    }

    componentWillBlur() {
        // this.counting = false
        InteractionManager.runAfterInteractions(() => {
            this.setState({ counting: false })
        })

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
        const { session, getOrderList, clearOrderList } = this.props
        const { selectedPlace } = this.state
        if (!selectedPlace) return
        if (isLoadMore) {
            this.setState({ loadingMore: true })
        } else {
            clearOrderList()
            this.setState({ loading: true })
        }
        getOrderList(session, selectedPlace, this.selectedStatus, page,
            from_time, to_time,
            (err, data) => {
                this.setState({
                    loading: false,
                    loadingMore: false,
                })
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
        const { setSelectedOption, getMerchantNews, session } = this.props
        // setSelectedOption(item)
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value //currentSelectValue      
        this.setState({
            selectedPlace: item.id,
        }, () => this.loadPage(1, dateFilter.from, dateFilter.to))
        getMerchantNews(session, item.id,
            (err, data) => {
                if (data && data.updated && data.updated.data) {
                    let newsUpdate = data.updated.data
                    if (newsUpdate && newsUpdate.orderWaitConfirm) {
                        this.refs.tabs.updateNumber(ORDER_WAITING_CONFIRM, newsUpdate.orderWaitConfirm)
                    }
                    if (newsUpdate && newsUpdate.orderWaitDelivery) {
                        this.refs.tabs.updateNumber(ORDER_WAITING_DELIVERY, newsUpdate.orderWaitDelivery)
                    }
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
        this.loadPage(1, item.currentSelectValue.value.from, item.currentSelectValue.value.to)
    }
    _renderRow({ orderInfo, orderRowList }) {
        const { forwardTo } = this.props
        var statusBlock = null;
        const status = this.selectedStatus
        let totalItem = 0
        if (orderRowList) {
            totalItem = orderRowList.map(x => x.quantity).reduce((a, b) => (a + b), 0)
        }
        let phoneNumberBlock = (
            <View style={styles.row}>
                <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon }} />
                <Text
                    onPress={this.onModalOpen.bind(this, orderInfo.userInfo.phoneNumber)}
                    style={styles.phoneNumber}>{formatPhoneNumber(orderInfo.userInfo.phoneNumber)}</Text>
            </View>
        )
        if (status === ORDER_WAITING_CONFIRM) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.deliveryCodeWaitingConfirm }} />
                    <Text style={styles.deliveryCodeWaitingConfirm}>{orderInfo.tranId}</Text>
                </View>
            )
        } else if (status === ORDER_WAITING_DELIVERY) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.deliveryCodeWaitingDelivery }} />
                    <Text style={styles.deliveryCodeWaitingDelivery}>{orderInfo.tranId}</Text>
                </View>
            )
        } else if (status == ORDER_SUCCESS) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                    <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.deliveryCodeSuccess }} />
                    <Text style={styles.deliveryCodeSuccess}>{orderInfo.tranId}</Text>
                </View>
            )
        } else {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                    <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.grey }} />
                    <Text style={styles.grey}>{orderInfo.tranId}</Text>
                </View>
            )
            phoneNumberBlock = (
                <View style={styles.row}>
                    <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon, ...styles.grey }} />
                    <Text
                        onPress={this.onModalOpen.bind(this, orderInfo.userInfo.phoneNumber)}
                        style={{ ...styles.phoneNumber, ...styles.grey }}>{formatPhoneNumber(orderInfo.userInfo.phoneNumber)}</Text>
                </View>
            )
        }
        const countTo = orderInfo.clingmeCreatedTime + BASE_COUNTDOWN_ORDER_MINUTE * 60
        let listItemStyle = (status != ORDER_CANCEL) ? styles.deliveryBlock : styles.deliveryBlockCacel
        return (
            <ListItem style={listItemStyle} key={orderInfo.clingmeId}
                onPress={() => {
                    forwardTo('deliveryDetail/' + orderInfo.orderCode)
                }
                }>
                <View style={styles.block}>
                    <View style={{ ...styles.row, width: '100%', paddingLeft: 5, paddingRight: 5 }}>
                        {statusBlock}
                        <View style={styles.row}>
                            <Text style={styles.time} grayDark>{moment(orderInfo.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                            {(status == ORDER_SUCCESS) && (
                                <Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />
                            )}
                            {(orderInfo.enableFastDelivery == FAST_DELIVERY.YES) &&
                                <CircleCountdown baseMinute={BASE_COUNTDOWN_ORDER_MINUTE}
                                    counting={this.state.counting}
                                    countTo={countTo}
                                />}
                        </View>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.block}>
                    <View style={{ width: '100%' }}>
                        <View style={styles.row}>
                            <Text bold grayDark>Số món đặt giao hàng</Text>
                            <Text grayDark>SL: <Text bold grayDark>{totalItem}</Text></Text>
                        </View>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                {(typeof orderInfo.note != 'undefined' && orderInfo.note != '') &&
                    <View style={styles.block}>
                        <View>
                            <View style={styles.rowLeft}><Text bold grayDark style={styles.textLeft}>Ghi chú: </Text></View>
                            <View style={styles.rowLeft}><Text grayDark style={styles.textLeft}>{orderInfo.note}</Text></View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </View>
                }
                <View style={styles.block}>
                    {orderInfo.userInfo &&
                        (<View style={{ ...styles.row, marginBottom: 10, marginTop: 5 }}>
                            <View style={styles.row}>
                                <Icon name='account' style={styles.icon} />
                                <Text grayDark>{orderInfo.userInfo.memberName}</Text>
                            </View>
                            {phoneNumberBlock}
                        </View>)}

                    <View style={{ ...styles.row, marginBottom: 5 }}>
                        <Text grayDark>Địa chỉ: {orderInfo.placeInfo.address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text success>Đã thanh toán</Text>
                        <Text bold grayDark>{formatNumber(Math.round(orderInfo.moneyAmount))}đ</Text>
                    </View>
                </View>

            </ListItem>
        )
    }

    render() {
        const { handleSubmit, submitting, place } = this.props


        // let dropdownValues = place.listPlace.map(item => ({
        //     id: item.placeId,
        //     name: item.address
        // }))

        const { orderList } = this.props.order

        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData}
                    activeTab={0} onPressTab={this._handlePressTab} ref='tabs' />
                <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter' />
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />
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