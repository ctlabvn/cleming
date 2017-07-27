import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { Image, InteractionManager, View, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import * as orderActions from "~/store/actions/order";
import * as commonActions from "~/store/actions/common";
import * as orderSelectors from "~/store/selectors/order";
import * as notificationActions from "~/store/actions/notification";
import * as authSelectors from "~/store/selectors/auth";
import { InputField } from "~/ui/elements/Form";
import Content from "~/ui/components/Content";
import { formatNumber, formatPhoneNumber, chainParse, getToastMessage } from "~/ui/shared/utils";
import moment from "moment";
import CircleCountdown from "~/ui/components/CircleCountdown";
import { BASE_COUNTDOWN_ORDER_MINUTE } from "~/ui/shared/constants";
import { DEFAULT_TIME_FORMAT, DELIVERY_FEEDBACK, FAST_DELIVERY, GENERAL_ERROR_MESSAGE } from "~/store/constants/app";
import material from "~/theme/variables/material.js";
import DeliveryFeedbackDialog from "~/ui/containers/DeliveryList/DeliveryFeedbackDialog";
import Icon from "~/ui/elements/Icon"
import CallModal from "~/ui/components/CallModal"
import I18n from '~/ui/I18n'
@connect(state => ({
    xsession: authSelectors.getSession(state),
    order: orderSelectors.getOrder(state),
}), { ...orderActions, ...commonActions, ...notificationActions })

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDetail: {},
            counting: false,
            loading: false,
            modalOpen: false,
            phoneNumber: ''
        }
        this.clickCount = 0
    }

    _load() {
        const { route, getOrderDetail, xsession, setToast, forwardTo, updateRead, order, getOrderDenyReason } = this.props
        let deliveryId = route.params.id
        this.setState({ loading: true })
        getOrderDetail(xsession, deliveryId,
            (err, data) => {
                this.clickCount = 0
                console.log('Order Err', err)
                console.log('Order Data', data)
                if (err) {
                    if (err.code == 1522) {
                        setToast(getToastMessage(I18n.t('err_order_not_exists')), 'info', null, null, 3000, 'top')
                        forwardTo('merchantOverview', true)
                        return
                    }
                    setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                    forwardTo('merchantOverview', true)
                    return
                }
                if (data && data.updated) {
                    this.setState({ orderDetail: data.updated, loading: false })
                    if (data.updated.orderInfo && !data.updated.orderInfo.isReadCorrespond
                        && data.updated.orderInfo.notifyIdCorrespond) {
                        updateRead(xsession, data.updated.orderInfo.notifyIdCorrespond)
                    }
                }

            }
        )
        if (!order.denyReason || order.denyReason.length == 0) {
            getOrderDenyReason(xsession)
        }
    }

    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
        const { app } = this.props
        this._load()        
        // })
    }

    componentWillFocus() {
        // InteractionManager.runAfterInteractions(() => {
        console.log('Will focus DeliveryDetail')
        this.clickCount = 0
        const { app } = this.props
        // console.log('Content', this.content)
        // this.content && this.content.scrollToTop()
        // this.refs.content._root.scrollToPosition({ x: 0, y: 0, animated: false })
        this.setState({ counting: true })
        this._load()
        // })
    }

    componentWillBlur() {
        // InteractionManager.runAfterInteractions(() => {
        this.setState({ counting: false,  orderDetail:{}})
        // })
    }

    _handleFeedbackOrder = (posOrderId, reasonId, note) => {
        const { updateOrderStatus, setToast, xsession, markWillReload, forwardTo } = this.props
        updateOrderStatus(xsession, posOrderId, DELIVERY_FEEDBACK.CANCEL, reasonId, note,
            (err, data) => {
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    markWillReload(true)
                    forwardTo('deliveryList')
                } else {
                    setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                }
            }
        )
    }
    _handleConfirmOrder = (posOrderId) => {
        const { updateOrderStatus, setToast, xsession, markWillReload, forwardTo } = this.props
        if (this.clickCount > 0) return
        updateOrderStatus(xsession, posOrderId, DELIVERY_FEEDBACK.OK,
            (err, data) => {
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    markWillReload(true)
                    forwardTo('deliveryList')
                } else {
                    setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                    this.clickCount = 0
                }
            }
        )
        this.clickCount++
    }
    showReasonPopup = (posOrderId) => {
        console.log('Show Reason Popup', posOrderId)
        this.refs.deliveryFeedbackDialog.show(posOrderId)
    }
    _onRefresh = () => {
        this._load()
    }

    _renderStatusText(status) {
        switch (status) {
            case 'WAIT_CONFIRM':
                return <Text warning large bold>{I18n.t('order_wait_confirm')}</Text>
            case 'CONFIRMED':
                return <Text primary large bold>{I18n.t('order_confirmed')}</Text>
            case 'COMPLETED':
                return <Text success large bold>{I18n.t('order_completed')}</Text>
            case 'FAILED':
            case 'CANCELLED':
                return <Text gray large bold>{I18n.t('order_cancelled')}</Text>
        }
    }

    onModalOpen = (phoneNumber) => {
        this.setState({
            modalOpen: true,
            phoneNumber: phoneNumber
        })
    }
    
    onModalClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        console.log('Render DeliveryDetail')
        const { route, order } = this.props
        if (!this.state || !this.state.orderDetail || Object.keys(this.state.orderDetail).length == 0) {
            return (
                <View style={{
                    backgroundColor: material.white500,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                    <Spinner />
                </View>
            )
        }
        const orderDetail = this.state.orderDetail
        let totalItem = 0
        if (orderDetail.orderRowList) {
            totalItem = orderDetail.orderRowList.map(x => x.quantity).reduce((a, b) => (a + b), 0)
        }
        console.log('Order detail instate', orderDetail)
        const countTo = orderDetail.orderInfo.clingmeCreatedTime + BASE_COUNTDOWN_ORDER_MINUTE * 60
        let moneyBlock = (
            <View>
                <View style={styles.rowPadding}>
                    <Text medium bold grayDark>{I18n.t('money')}:</Text>
                    <Text medium bold grayDark>{formatNumber(orderDetail.orderInfo.price)}đ</Text>
                </View>
                <View style={styles.rowPadding}>
                    <Text medium grayDark>{I18n.t('ship_fee')}:</Text>
                    <Text medium
                        grayDark>{(orderDetail && orderDetail.orderInfo && orderDetail.orderInfo.shipPriceReal > 0) ? formatNumber(orderDetail.orderInfo.shipPriceReal) : 0}đ</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.rowPadding}>
                    <Text largeLight bold grayDark>{I18n.t('total_pay')}: </Text>
                    <Text largeLight bold error>{formatNumber(orderDetail.orderInfo.moneyAmount)}đ</Text>
                </View>
            </View>
        )
        let containerStyle = (orderDetail.orderInfo.status == 'CONFIRMED') ? styles.container2 : styles.container
        let rejectReason = null
        if (orderDetail && orderDetail.orderInfo && orderDetail.orderInfo.orderRejectReason
            && (orderDetail.orderInfo.orderRejectReason.note || orderDetail.orderInfo.orderRejectReason.reason)) {
            rejectReason = (orderDetail.orderInfo.orderRejectReason.note || orderDetail.orderInfo.orderRejectReason.reason)
        }

        let otherRequire = chainParse(orderDetail, ['orderInfo', 'note']);
        let otherRequireBlock = (
            <View style={{ ...styles.block, ...styles.paddingTopMedium }}>
                <Text medium grayDark>{I18n.t('other_require')}</Text>
                <Text strong bold grayDark>{chainParse(orderDetail, ['orderInfo', 'note'])}</Text>
            </View>
        )

        console.log('Reject Reason', rejectReason)
        return (
            <Container style={containerStyle}>
                <DeliveryFeedbackDialog ref='deliveryFeedbackDialog'
                    listValue={order.denyReason}
                    onClickYes={this._handleFeedbackOrder}
                />
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />
                <View style={{
                    ...styles.rowPadding, ...styles.backgroundPrimary,
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <Text white center bold>{chainParse(orderDetail, ['orderInfo', 'placeInfo', 'address'])}</Text>
                </View>

                <Content padder refreshing={this.state.loading} onRefresh={this._onRefresh}
                    ref={(c) => { this.content = c }}
                >
                    <View style={styles.rowPadding}>
                        {this._renderStatusText(orderDetail.orderInfo.status)}
                        <View style={styles.row}>
                            <Text medium grayDark
                                style={{ marginRight: 5 }}>{moment(orderDetail.orderInfo.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                            {(orderDetail.orderInfo.enableFastDelivery == FAST_DELIVERY.YES) &&
                                (orderDetail.orderInfo.status == 'WAIT_CONFIRM' || orderDetail.orderInfo.status == 'CONFIRMED')
                                &&
                                <CircleCountdown
                                    baseMinute={BASE_COUNTDOWN_ORDER_MINUTE}
                                    counting={this.state.counting}
                                    countTo={countTo}
                                />}
                        </View>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text medium grayDark>{I18n.t('order_number_2')}</Text>
                        <Text medium primary bold>{orderDetail.orderInfo.tranId}</Text>
                    </View>
                    {(typeof orderDetail.orderInfo.feedback != "undefined" && orderDetail.orderInfo.feedback != null && orderDetail.orderInfo.feedback != "") &&
                        <View style={{ ...styles.block, ...styles.paddingTopMedium }}>
                            <Text medium grayDark>{I18n.t('customer_feedback')}</Text>
                            <Text medium bold grayDark>{orderDetail.orderInfo.feedback}</Text>
                        </View>
                    }
                    {(rejectReason) &&
                        <View style={{ ...styles.block, ...styles.paddingTopMedium }}>
                            <Text medium grayDark>{I18n.t('reject_order_reason')}</Text>
                            <Text medium bold grayDark>{rejectReason}</Text>
                        </View>
                    }
                    <View style={styles.line} />
                    <View style={{ ...styles.block, paddingBottom: 0 }}>
                        <Text medium  grayDark>{I18n.t('deliver_address')}</Text>
                        <Text strong bold grayDark>{orderDetail.orderInfo.fullAddress}
                            {(parseFloat(chainParse(orderDetail, ['orderInfo', 'deliveryDistance'])) > 0) &&
                                <Text strong bold grayDark> - {parseFloat(chainParse(orderDetail, ['orderInfo', 'deliveryDistance'])).toFixed(2)} km</Text>
                            }
                        </Text>
                    </View>


                    <View style={styles.rowPaddingTopLarge}>
                        <Text medium grayDark>{I18n.t('receive_user')}</Text>
                        <Text strong bold grayDark>{chainParse(orderDetail, ['orderInfo', 'userInfo', 'memberName'])}</Text>
                    </View>
                    <View style={styles.rowPaddingTopMedium}>
                        <Text medium grayDark>{I18n.t('phone_number')}</Text>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                console.log('Press foneNumber')
                                this.onModalOpen(chainParse(orderDetail, ['orderInfo', 'userInfo', 'phoneNumber']))
                            }}>
                            <View style={styles.row}>

                                <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon }} />
                                <Text strong bold
                                    primary>{formatPhoneNumber(chainParse(orderDetail, ['orderInfo', 'userInfo', 'phoneNumber']))}</Text>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {
                        (orderDetail.orderInfo.enableFastDelivery == FAST_DELIVERY.YES) &&
                        <View style={styles.rowPaddingTopMedium}>
                            <Text medium grayDark>{I18n.t('receive_within')}</Text>
                            <Text medium bold grayDark>{BASE_COUNTDOWN_ORDER_MINUTE}'</Text>
                        </View>
                    }

                    {otherRequire != null ? otherRequireBlock : null}

                    <View style={{...styles.line, marginTop: 5}} />
                    <View style={styles.rowPadding}>
                        <Text medium bold grayDark>{I18n.t('cart')}: {totalItem}</Text>
                    </View>
                    <List
                        style={{marginBottom: 20}}
                        dataArray={orderDetail.orderRowList}
                        renderRow={(item) => (
                            <ListItem style={styles.orderItem}>
                                <View style={styles.cartLeft}>
                                    <Image style={{ width: 60, height: 60 }} source={{ uri: item.itemImage }} />
                                    <View style={styles.cartContent}>
                                        <Text medium grayDark style={styles.textLeftFlex}>{item.itemName}</Text>
                                        <Text medium grayDark style={styles.textLeft}>{I18n.t('number_full')}: {item.quantity}</Text>
                                    </View>
                                </View>
                                <Text strong bold grayDark style={{ ...styles.itemCash }}>{item.price / 1000}k</Text>
                            </ListItem>
                        )
                        }>
                    </List>
                    {(orderDetail.orderInfo.status == 'CONFIRMED') && moneyBlock}
                </Content>
                {(orderDetail.orderInfo.status != 'CONFIRMED') && (
                    <View style={styles.fixBottom}>
                        {moneyBlock}
                    </View>
                )}
                {(orderDetail.orderInfo.status == 'CONFIRMED') && (
                    <View style={styles.fixButtonBlock}>
                        <Button style={{ ...styles.buttonFeedback, ...styles.backgroundLightGray }}
                            onPress={() => this.showReasonPopup(orderDetail.orderInfo.clingmeId)}
                        ><Text gray>{I18n.t('cancel_delivery')}</Text></Button>
                        <Button style={{ ...styles.buttonFeedback, ...styles.backgroundPrimary }}
                            onPress={() => this._handleConfirmOrder(orderDetail.orderInfo.clingmeId)}
                        ><Text white>{I18n.t('delivered')}</Text></Button>
                    </View>
                )}

            </Container>
        )
    }
}