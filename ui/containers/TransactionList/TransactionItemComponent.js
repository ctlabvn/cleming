import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, List, ListItem, Text } from "native-base";
import { View } from "react-native";
import styles from "./styles";
import  {forwardTo} from "~/store/actions/common";
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
    TRANSACTION_DISPLAY,
    SCREEN
} from "~/store/constants/app";
import I18n from '~/ui/I18n'
import {_isDiff} from '~/ui/shared/utils'
@connect(null, {forwardTo})
export default class extends Component {
    constructor(props) {
        super(props)

    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return _isDiff(this.props.data, nextProps.data,
            ['transactionType', 'transactionStatus', 'dealTransactionId', 
                'dealTransactionIdDisplay',
                'originPrice', 'invoiceTime', 'moneyNumberClingme'
            ]
        )
    }
    _renderTransactionPayWithClingmeItem(item) {
        //  "transactionStatus": int,		// trạng thái transaction 1 là đã thanh toán, 2 là đã xác nhận
        switch (item.transactionStatus) {
            case 1:
            default:
                return (
                    <ListItem style={styles.listItem}
                        key={item.transactionId}
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.transactionId + '/' + item.transactionType)}
                    >
                        <View style={styles.block}>
                            <View style={styles.rowPadding}>
                                <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                                <Text medium bold grayDark>{item.userName}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text largeLight bold secondary style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text strong grayDark><Text big bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                            <View style={styles.row}>
                                <Text medium primary>{I18n.t('paid')}</Text>
                                <Button transparent style={styles.button} onPress={() => this.props.forwardTo('transactionDetail/' + item.transactionId + '/' + item.transactionType)} >
                                    <Text medium bold primary>{I18n.t('detail')}</Text>
                                    <Icon name='foward' style={styles.primary} />
                                </Button>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </ListItem>
                )
            case 2:
                return (
                    <ListItem style={styles.listItem}
                        key={item.transactionId}
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.transactionId + '/' + item.transactionType)}
                    >
                        <View style={styles.blockConfirmed}>
                            <View style={styles.rowPadding}>
                                <Text medium style={styles.timestamp} grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                                <Text medium bold grayDark style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>

                            </View>
                            <View style={styles.rowPadding}>
                                <Text medium grayDark>{I18n.t('customer')}: <Text small bold grayDark>{item.userName}</Text></Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Text medium success>{I18n.t('confirmed')}</Text>
                                <Text grayDark><Text strong bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </ListItem>
                )
        }
    }

    _renderTransactionItem(item) {
        let iconBlock, statusText, transactionCode, timeBlock
        let moneyText = <Text bold grayDark style={styles.moneyNumber}>{formatNumber(item.originPrice)}đ</Text>
        switch (item.transactionStatus) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK: //chờ duyệt
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.warning }} />
                    </View>
                )
                statusText = <Text medium warning>{I18n.t('wait_confirm')}</Text>
                transactionCode = <Text bold grayDark>{item.dealTransactionIdDisplay}</Text>
                timeBlock = <Text medium style={styles.timestamp} grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                break
            case TRANSACTION_DIRECT_STATUS.SUCCESS: // thành công
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='coin_mark' style={{ ...styles.icon, ...styles.success }} />
                    </View>
                )
                statusText = <Text medium grayDark>{I18n.t('cashback_success')}</Text>
                transactionCode = <Text bold grayDark>{item.dealTransactionIdDisplay}</Text>
                timeBlock = <Text medium style={styles.timestamp} grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                break
            case TRANSACTION_DIRECT_STATUS.REJECT: // bị từ chối
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='unlike_s' style={{ ...styles.icon, ...styles.reject }} />
                    </View>
                )
                statusText = <Text medium error>{I18n.t('reject')}</Text>
                transactionCode = <Text bold grayDark>{item.dealTransactionIdDisplay}</Text>
                moneyText = <Text bold gray style={styles.moneyNumber}></Text>
                timeBlock = <Text style={styles.timestamp} small grayDark>{moment(item.boughtTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                break
            default:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={styles.icon} />
                    </View>
                )
                statusText = <Text medium warning>{I18n.t('wait_confirm')}</Text>
                transactionCode = <Text bold>{item.dealTransactionIdDisplay}</Text>
                timeBlock = <Text medium style={styles.timestamp} grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
        }
        return (
            <ListItem
                key={item.dealTransactionId}
                onPress={() => this.props.forwardTo('transactionDetail/' + item.dealTransactionId + '/' + item.transactionType)}
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
                                {moneyText}
                            </View>
                        </View>
                    </View>
                </View>
                {
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                }
            </ListItem>
        )
    }

    _renderRow = (item) => {
        if (item.transactionType == TRANSACTION_TYPE_CLINGME) { // Over clingme
            return this._renderTransactionPayWithClingmeItem(item)
        } else { // Direct
            return this._renderTransactionItem(item)
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