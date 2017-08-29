import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableWithoutFeedback } from "react-native";
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
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Border from "~/ui/elements/Border";
import Icon from "~/ui/elements/Icon";
import { formatNumber, formatPhoneNumber, chainParse, getToastMessage } from "~/ui/shared/utils";
import { BASE_COUNTDOWN_ORDER_MINUTE } from "~/ui/shared/constants";
import CircleCountdown from "~/ui/components/CircleCountdown";
import CircleCountUp from "~/ui/components/CircleCountUp";
import CallModal from "~/ui/components/CallModal";
import moment from "moment";
import { getNews } from "~/store/selectors/place";
import DeliveryFeedbackDialog from "~/ui/containers/DeliveryList/DeliveryFeedbackDialog";
import I18n from '~/ui/I18n'
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
import {_isDiff} from '~/ui/shared/utils'

@connect(null, commonActions)

// @reduxForm({ form: 'TestForm' })
export default class extends Component {

    constructor(props) {
        super(props)
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.props.counting != nextProps.counting) return true
        if (!this.props.data.orderInfo && !nextProps.data.orderInfo) return false
        if (!this.props.data.orderInfo || !nextProps.data.orderInfo) return true
        return _isDiff(this.props.data.orderInfo, nextProps.data.orderInfo,
            [
                'tranId', 'status', 'moneyAmount', 'fullAddress'
            ]
        )
    }

    render() {
        console.log('Render OrderItem')
        const { forwardTo } = this.props
        const {orderInfo, orderRowList} = this.props.data
        var statusBlock = null, buttonActionBlock = null
        const status = this.selectedStatus
        let totalItem = 0
        if (orderRowList) {
            totalItem = orderRowList.map(x => x.quantity).reduce((a, b) => (a + b), 0)
        }
        let phoneNumberBlock = (
          <TouchableWithoutFeedback onPress={()=>this.props.onPressPhoneNumber(chainParse(orderInfo, ['userInfo', 'phoneNumber']))}>
            <View style={styles.row}>
                <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon }} />
                <Text medium
                    style={styles.phoneNumber}>{formatPhoneNumber(chainParse(orderInfo, ['userInfo', 'phoneNumber']))}</Text>
            </View>
          </TouchableWithoutFeedback>
        )

        switch (orderInfo.status) {
            case 'WAIT_CONFIRM':
            default:
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.deliveryCodeWaitingConfirm }} />
                        <Text medium style={styles.deliveryCodeWaitingConfirm}>{orderInfo.tranId}</Text>
                    </View>
                )
                break
            case 'CONFIRMED':
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.deliveryCodeWaitingDelivery }} />
                        <Text medium style={styles.deliveryCodeWaitingDelivery}>{orderInfo.tranId}</Text>
                    </View>
                )
                buttonActionBlock = (
                    <View style={styles.block}>
                        <Border/>
                        <View style={styles.row}>
                            <Button transparent onPress={() => this.props.onShowReasonPopup(orderInfo.clingmeId)}>
                                <Text medium bold gray>{I18n.t('cancel_delivery')}</Text></Button>
                            <Button transparent onPress={() => this.props.onConfirmOrder(orderInfo.clingmeId)}>
                                <Text medium bold primary>{I18n.t('delivery_success')}</Text></Button>
                        </View>
                    </View>
                )
                break
            case 'COMPLETED':
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                        <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.deliveryCodeSuccess }} />
                        <Text medium style={styles.deliveryCodeSuccess}>{orderInfo.tranId}</Text>
                    </View>
                )
                break
            case 'FAILED':
            case 'CANCELLED':
                statusBlock = (
                    <View style={styles.deliveryCodeBlock}>
                        {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                        <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.grey }} />
                        <Text medium style={styles.grey}>{orderInfo.tranId}</Text>
                    </View>
                )
                phoneNumberBlock = (
                  <TouchableWithoutFeedback onPress={()=>this.props.onPressPhoneNumber(chainParse(orderInfo, ['userInfo', 'phoneNumber']))}>
                    <View style={styles.row}>
                        <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon, ...styles.grey }} />
                        <Text medium
                            style={{ ...styles.phoneNumber, ...styles.grey }}>{formatPhoneNumber(chainParse(orderInfo, ['userInfo', 'phoneNumber']))}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
                break
        }
        const countTo = orderInfo.clingmeCreatedTime + orderInfo.fastDeliveryTime
        let listItemStyle = (orderInfo.status != 'CANCELLED' && orderInfo.status != 'FAILED') ? styles.deliveryBlock : styles.deliveryBlockCacel
        return (
            <ListItem noBorder style={listItemStyle} key={orderInfo.clingmeId}
                onPress={() => {
                    forwardTo('deliveryDetail', {id: orderInfo.clingmeId})
                }
                }>
                <View style={styles.block}>
                    <View style={{ ...styles.row, width: '100%', paddingLeft: 5, paddingRight: 5 }}>
                        {statusBlock}
                        <View style={styles.row}>
                            <Text medium style={styles.time}
                                grayDark>{moment(orderInfo.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                            {/*{(orderInfo.status == 'CANCELLED') && (*/}
                                {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                            {/*)}*/}
                            {(orderInfo.enableFastDelivery == FAST_DELIVERY.YES)
                                && (orderInfo.status == 'WAIT_CONFIRM' || orderInfo.status == 'CONFIRMED')
                                && <CircleCountUp
                                    baseMinute={parseInt(orderInfo.fastDeliveryTime/60)}
                                    countFrom={orderInfo.clingmeCreatedTime}
                                />}
                        </View>
                    </View>
                </View>
                <Border/>
                <View style={styles.block}>
                    <View style={{ width: '100%' }}>
                        <View style={styles.row}>
                            <Text medium bold grayDark>{I18n.t('number_order_item')}</Text>
                            <Text medium grayDark>SL: <Text mediumbold grayDark>{totalItem}</Text></Text>
                        </View>
                    </View>
                </View>
                <Border/>
                {(typeof orderInfo.note != 'undefined' && orderInfo.note != '') &&
                    <View style={styles.block}>
                        <View>
                            <View style={styles.rowLeft}><Text medium bold grayDark style={styles.textLeft}>{I18n.t('note')}: </Text></View>
                            <View style={styles.rowLeft}>
                                <Text medium grayDark style={styles.textLeft}>{orderInfo.note}</Text>
                            </View>
                        </View>
                        <Border/>
                    </View>
                }
                <View style={styles.block}>
                    <View style={{ ...styles.row, marginBottom: 10, marginTop: 5 }}>
                        <View style={styles.row}>
                            <Icon name='account' style={styles.icon} />
                            <Text medium grayDark>{chainParse(orderInfo, ['userInfo', 'memberName'])}</Text>
                        </View>
                        {phoneNumberBlock}
                    </View>

                    <View style={{ ...styles.row, marginBottom: 5 }}>
                        <Text medium grayDark>{I18n.t('address')}: {orderInfo.fullAddress}
                            {(parseFloat(orderInfo.deliveryDistance) > 0) &&
                                <Text> - <Text bold>{parseFloat(orderInfo.deliveryDistance).toFixed(2)} km</Text></Text>
                            }
                        </Text>
                    </View>

                    <View style={styles.row}>
                        {(orderInfo.status != 'CANCELLED' ? <Text medium success>{I18n.t('paid')}</Text> : <View/>)}
                        <Text medium bold grayDark>{formatNumber(Math.round(orderInfo.moneyAmount))}đ</Text>
                    </View>
                </View>
                {buttonActionBlock}
            </ListItem>
        )
    }
}
