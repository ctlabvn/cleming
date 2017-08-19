import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, List, ListItem, Text } from "native-base";
import { View } from "react-native";
import styles from "./styles";
import  {forwardTo} from "~/store/actions/common";
import {markAsReadOffline} from '~/store/actions/transaction'
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import material from "~/theme/variables/material.js";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT,
    TRANSACTION_TYPE_ORDER_SUCCESS,
    TRANSACTION_DISPLAY,
    SCREEN, DEFAULT_TIME_FORMAT
} from "~/store/constants/app";
import I18n from '~/ui/I18n'
import {_isDiff} from '~/ui/shared/utils'
@connect(null, {forwardTo, markAsReadOffline})
export default class extends Component {
    constructor(props) {
        super(props)

    }
    // shouldComponentUpdate = (nextProps, nextState) => {
    //     return _isDiff(this.props.data, nextProps.data,
    //         ['transactionType', 'transactionStatus', 'dealTransactionId', 
    //             'dealTransactionIdDisplay',
    //             'originPrice', 'invoiceTime', 'moneyNumberClingme'
    //         ]
    //     )
    // }
    _handlePressItem = (item) => {
        // this.props.markAsReadOffline(item.tranId)
        this.props.forwardTo('transactionDetail', {id: item.tranId, type: item.tranType})
    }

    _renderTransactionPayWithClingmeItem(item) {
        //  "transactionStatus": int,		// trạng thái transaction 1 là đã thanh toán, 2 là đã xác nhận
        // let isRead = this.props.readItems[item.tranId] == 1 ? true: false
        return (
                    <ListItem style={styles.listItem}
                        key={item.tranId}
                        onPress={() => this._handlePressItem(item)}
                    >
                        <View style={styles.block}>
                            <View style={styles.rowPadding}>
                                <Text medium bold grayDark>{item.userName}</Text>
                                <Text style={styles.timestamp} small grayDark>{moment(item.tranTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text largeLight bold secondary style={styles.transactionCodeClingme}>{item.tranCode}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text strong grayDark><Text big bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                            <View style={styles.row}>
                                <Text medium primary>{I18n.t('paid')}</Text>
                                <View style={styles.row}>
                                    <Text medium bold primary>{I18n.t('detail')}</Text>
                                    <Icon name='foward' style={styles.primary} />
                                </View>
                            </View>
                        </View>
                        <Border/>
                    </ListItem>
                )
                
        // switch (item.tranStatus) {
        //     case 1:
        //     default:
        //         return (
        //             <ListItem style={styles.listItem}
        //                 key={item.tranId}
        //                 onPress={() => this.props.forwardTo('transactionDetail', {id: item.tranId, type: item.tranType})}
        //             >
        //                 <View style={styles.block}>
        //                     <View style={styles.rowPadding}>
        //                         <Text style={styles.timestamp} small grayDark>{moment(item.tranTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
        //                         <Text medium bold grayDark>{item.userName}</Text>
        //                     </View>
        //                     <View style={styles.rowCenter}>
        //                         <Text largeLight bold secondary style={styles.transactionCodeClingme}>{item.tranCode}</Text>
        //                     </View>
        //                     <View style={styles.rowCenter}>
        //                         <Text strong grayDark><Text big bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
        //                     </View>
        //                     <View style={styles.row}>
        //                         <Text medium primary>{I18n.t('not_confirm_yet')}</Text>
        //                         <Button transparent style={styles.button} onPress={() => this.props.forwardTo('transactionDetail', {id: item.tranId, type: item.tranType})} >
        //                             <Text medium bold primary>{I18n.t('detail')}</Text>
        //                             <Icon name='foward' style={styles.primary} />
        //                         </Button>
        //                     </View>
        //                 </View>
        //                 <Border/>
        //             </ListItem>
        //         )
        //     case 2:
        //         return (
        //             <ListItem style={styles.listItem}
        //                 key={item.tranId}
        //                 onPress={() => this.props.forwardTo('transactionDetail', {id: item.tranId, type: item.tranType})}
        //             >
        //                 <View style={styles.block}>
        //                     <View style={styles.rowPadding}>
        //                         <Text medium style={styles.timestamp} grayDark>{moment(item.tranTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
        //                         <Text medium bold grayDark style={styles.transactionCodeClingme}>{item.tranCode}</Text>

        //                     </View>
        //                     <View style={styles.rowPadding}>
        //                         <Text medium grayDark>{I18n.t('customer')}: <Text small bold grayDark>{item.userName}</Text></Text>
        //                     </View>
        //                     <View style={styles.rowPadding}>
        //                         <Text medium success>{I18n.t('confirmed')}</Text>
        //                         <Text grayDark><Text strong bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
        //                     </View>
        //                 </View>
        //                 <Border/>
        //             </ListItem>
        //         )
        // }
    }

    _renderTransactionItem(item) {
        let iconBlock, statusText, transactionCode
        let moneyText = <Text bold grayDark style={styles.moneyNumber}>{formatNumber(item.moneyAmount)}đ</Text>
        let timeBlock = <Text medium style={styles.timestamp} grayDark>{moment(item.tranTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
        switch (item.tranStatus) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK: //chờ duyệt
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.warning }} />
                    </View>
                )
                statusText = <Text medium warning>{I18n.t('wait_confirm')}</Text>
                transactionCode = <Text bold grayDark>{item.tranCode}</Text>   
                break
            case TRANSACTION_DIRECT_STATUS.SUCCESS: // thành công
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='coin_mark' style={{ ...styles.icon, ...styles.success }} />
                    </View>
                )
                statusText = <Text medium grayDark>{I18n.t('cashback_success')}</Text>
                transactionCode = <Text bold grayDark>{item.tranCode}</Text>
                break
            case TRANSACTION_DIRECT_STATUS.REJECT: // bị từ chối
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='unlike_s' style={{ ...styles.icon, ...styles.reject }} />
                    </View>
                )
                statusText = <Text medium error>{I18n.t('reject')}</Text>
                transactionCode = <Text bold grayDark>{item.tranCode}</Text>
                moneyText = null
                break
            default:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={styles.icon} />
                    </View>
                )
                statusText = <Text medium warning>{I18n.t('wait_confirm')}</Text>
                transactionCode = <Text bold>{item.tranCode}</Text>
        }
        // let isRead = this.props.readItems[item.tranId] == 1 ? true: false
        return (
            <ListItem
                key={item.tranId}
                onPress={()=>this._handlePressItem(item)}
                style={styles.listItem}
            >
                <View style={styles.block}>
                    <View style={{ ...styles.row, alignItems: 'flex-start' }}>
                        {iconBlock}
                        <View style={{ width: '100%', flex: 1 }}>
                            <View style={styles.row}>
                                {transactionCode}
                                {timeBlock}
                            </View>
                            <View style={styles.row}>
                                {statusText}                                
                            </View>
                            {moneyText && <View style={styles.row}>
                                <Text>Số tiền:</Text>
                                {moneyText}
                            </View>}
                        </View>
                    </View>
                </View>
                <Border/>                
            </ListItem>
        )
    }

    _renderOrderSuccess = (item) => {
        // let isRead = this.props.readItems[item.tranId] == 1 ? true: false
        const { forwardTo } = this.props
        return (
            <ListItem noBorder key={item.tranId}
                style={styles.listItem}
                onPress={() => forwardTo('transactionDetail', {id: item.posOrderId, type: item.tranType})}>
                <View style={styles.block}>
                    <View style={{ ...styles.row, width: '100%', paddingLeft: 5, paddingRight: 5 }}>
                        <View style={{...styles.row}}>
                            <Icon name='shiping-bike2' style={{ ...styles.iconSuccess }} />
                            <Text medium success>{item.tranCode}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text medium style={styles.time}
                                grayDark>{moment(item.tranTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.block}>
                    <View style={{ width: '100%' }}>
                        <View style={styles.row}>
                            <Text medium bold grayDark>{I18n.t('number_order_item')}</Text>
                            <Text medium grayDark>SL: <Text mediumbold grayDark>{item.numberDishes}</Text></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.block}>
                    <View style={{ ...styles.row, marginBottom: 10, marginTop: 5 }}>
                        <View style={styles.row}>
                            <Icon name='account' style={styles.iconGray} />
                            <Text medium grayDark>{item.userName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='phone' style={{ ...styles.iconGray, ...styles.primary }} />
                            <Text medium primary>{item.phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.row, marginBottom: 5 }}>
                        <Text medium grayDark>{I18n.t('address')}: {item.placeAddress} 
                            {(parseFloat(item.deliveryDistance) > 0) &&
                                <Text> - <Text bold>{parseFloat(item.deliveryDistance).toFixed(2)} km</Text></Text>
                            }
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text medium success>{I18n.t('paid')}</Text>
                        <Text medium bold grayDark>{formatNumber(Math.round(item.moneyAmount))}đ</Text>
                    </View>
                </View>
                <Border/>
            </ListItem>
        )
    }

    _renderRow = (item) => {
        if (item.tranType == TRANSACTION_TYPE_CLINGME) { // Over clingme
            return this._renderTransactionPayWithClingmeItem(item)
        } else if (item.tranType == TRANSACTION_TYPE_DIRECT){ // Direct
            return this._renderTransactionItem(item)
        } else if (item.tranType == TRANSACTION_TYPE_ORDER_SUCCESS){
            return this._renderOrderSuccess(item)
        }
    }
    render() {
        console.log('Render TransactionItem')
        return (
            <View>
                {this._renderRow(this.props.data)}
            </View>
        )
    }
}