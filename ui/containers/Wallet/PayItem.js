import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import { getSession } from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT
} from "~/store/constants/app";
import I18n from '~/ui/I18n'
import {_isDiff} from '~/ui/shared/utils'
import  options from './options'

@connect(null, { ...commonAction })
export default class extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return _isDiff(this.props.data, nextProps.data,
            ['tranCode', 'tranTime', 'moneyAmount', 'tranType']
        )
    }
    
    _handlePressListItem = (item) => {
        const {forwardTo} = this.props
        const {ITEM_TYPE} = options
        console.log('Press Item', item)
        switch (item.tranType) {
            case ITEM_TYPE.ORDER: //chờ duyệt
                forwardTo('revenueManagementDetail/'+ITEM_TYPE.ORDER+'/'+item.tranId)
                break
            case ITEM_TYPE.CLINGME_PAY: // thành công
                forwardTo('revenueManagementDetail/'+ITEM_TYPE.CLINGME_PAY+'/'+item.tranId)
                break
            case ITEM_TYPE.CASHBACK:
               
                break
            case 'cashout':
                
                break

            case 'cashout_auto': // bị từ chối
                
                break
            default:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={styles.iconLarge} />
                    </View>
                )

        }
    }

    render() {
        const { forwardTo } = this.props
        const item = this.props.data
        const {ITEM_TYPE} = options
        let iconBlock, typeText, moneyText

        switch (item.tranType) {
            case ITEM_TYPE.ORDER: //chờ duyệt
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='shiping-bike2' style={{ ...styles.iconLarge, ...styles.primary }} />
                    </View>
                )
                typeText = <Text grayDark>Giao hàng</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>+{formatNumber(item.moneyAmount)}đ</Text>
                break
            case ITEM_TYPE.CLINGME_PAY: // thành công
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='clingme-wallet' style={{ ...styles.iconLarge, ...styles.primary }} />
                    </View>
                )
                typeText = <Text grayDark>Clingme Pay</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>+{formatNumber(item.moneyAmount)}đ</Text>
                break
            case ITEM_TYPE.CASHBACK:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='coin_mark' style={{ ...styles.iconLarge, ...styles.success }} />
                    </View>
                )
                typeText = <Text grayDark>Cashback</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>{formatNumber(item.moneyAmount)}đ</Text>
                break
            case 'cashout':
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='cash_out' style={{ ...styles.iconLarge, ...styles.success }} />
                    </View>
                )
                typeText = <Text grayDark>Vietcombank *4321</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>-{formatNumber(item.moneyAmount)}đ</Text>
                break

            case 'cashout_auto': // bị từ chối
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='transaction' style={{ ...styles.iconLarge }} />
                    </View>
                )
                typeText = <Text grayDark>Vietcombank *4321</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>-{formatNumber(item.moneyAmount)}đ</Text>
                break
            default:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={styles.iconLarge} />
                    </View>
                )

        }
        return (
            <ListItem
                style={styles.listItem}
                onPress={()=>this._handlePressListItem(item)}
            >
                <View style={styles.block}>
                    <View style={{ ...styles.row, alignItems: 'flex-start' }}>
                        {iconBlock}
                        <View style={{ width: '100%', flex: 1 }}>
                            <View style={styles.row}>
                                <Text gray bold style={styles.transactionCode}>{item.tranCode}</Text>
                                <Text grayDark>{moment(item.tranTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                            </View>
                            <View style={styles.row}>
                                {typeText}
                            </View>
                            <View style={styles.row}>
                                <Text grayDark>{item.userName}</Text>
                                <Text grayDark>{moneyText}</Text>
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
}