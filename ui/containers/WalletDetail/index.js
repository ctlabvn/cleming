import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as transactionAction from "~/store/actions/transaction";
import * as authActions from "~/store/actions/auth";
import * as placeActions from "~/store/actions/place";
import TransactionFilter from "~/ui/components/TransactionFilter";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import { getNews } from "~/store/selectors/place";
import { getListTransactionCLM, getListTransactionDirect } from "~/store/selectors/transaction";
// import { getSelectedPlace } from '~/store/selectors/place'
import options from "./options";
import material from "~/theme/variables/material.js";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT
} from "~/store/constants/app";
import I18n from '~/ui/I18n'


@connect(state => ({
    xsession: getSession(state),
    news: getNews(state),
    // place: state.place,
    // selectedPlace: getSelectedPlace(state),
    payDirect: getListTransactionDirect(state),
    payWithClingme: getListTransactionCLM(state)
}), { ...commonAction, ...transactionAction, ...authActions, ...placeActions })
export default class extends Component {
    constructor(props) {
        super(props)
        this.moneyCreditedData = [
            {
                type: 'order',
                time: 1499915671,
                user: 'User Name',
                money: 400000,
                transactionCode: '#CLM12345'

            },
            {
                type: 'clm_pay',
                time: 1499915671,
                user: 'User Name',
                money: 1400000,
                transactionCode: '#CLM12345'

            },
        ]
        this.debitData = [
            {
                type: 'cashback',
                time: 1499915671,
                user: 'User Name',
                money: 2500000,
                transactionCode: '#CLM12345'

            },
        ]
        this.moneyWithdrawnData = [
            {
                type: 'cashout',
                time: 1499915671,
                user: 'User Name',
                money: 370000,
                transactionCode: '#CLM12345'

            },
            {
                type: 'cashout_auto',
                time: 1499915671,
                user: 'User Name',
                money: 1260000,
                transactionCode: '#CLM12345'

            },
        ]
        this.state = {
            currentTab: options.tabData[0],
            payData: this.moneyCreditedData
        }
    }
    _handlePressTab = (item) => {
        console.log('Press Tab', item)

        switch (item.tabID) {
            case 1:
                this.setState({ payData: this.moneyCreditedData, currentTab: item })
                break
            case 2:
                this.setState({ payData: this.debitData, currentTab: item })
                break
            case 3:
                this.setState({ payData: this.moneyWithdrawnData, currentTab: item })
                break
        }
    }
    _renderMoney() {
        switch (this.state.currentTab.tabID) {
            case 1:
            default:
                return (
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>+{formatNumber(16100000)}</Text>đ
                    </Text>
                )
            case 2:
                return (
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>-{formatNumber(745000)}</Text>đ
                    </Text>
                )
            case 3:
                return (
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>-{formatNumber(850000)}</Text>đ
                    </Text>
                )

        }
    }

    _renderRow = (item) => {
        let iconBlock, typeText, moneyText

        switch (item.type) {
            case 'order': //chờ duyệt
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='shiping-bike2' style={{ ...styles.iconLarge, ...styles.primary }} />
                    </View>
                )
                typeText = <Text grayDark>Giao hàng</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>+{formatNumber(item.money)}đ</Text>
                break
            case 'clm_pay': // thành công
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='clingme-wallet' style={{ ...styles.iconLarge, ...styles.primary }} />
                    </View>
                )
                typeText = <Text grayDark>Clingme Pay</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>+{formatNumber(item.money)}đ</Text>
                break
            case 'cashback':
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='coin_mark' style={{ ...styles.iconLarge, ...styles.success }} />
                    </View>
                )
                typeText = <Text grayDark>Cashback</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>-{formatNumber(item.money)}đ</Text>
                break
            case 'cashout':
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='cash_out' style={{ ...styles.iconLarge, ...styles.success }} />
                    </View>
                )
                typeText = <Text grayDark>Vietcombank *4321</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>-{formatNumber(item.money)}đ</Text>
                break

            case 'cashout_auto': // bị từ chối
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='transaction' style={{ ...styles.iconLarge }} />
                    </View>
                )
                typeText = <Text grayDark>Vietcombank *4321</Text>
                moneyText = <Text bold grayDark style={styles.moneyNumber}>-{formatNumber(item.money)}đ</Text>
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
            >
                <View style={styles.block}>
                    <View style={{ ...styles.row, alignItems: 'flex-start' }}>
                        {iconBlock}
                        <View style={{ width: '100%', flex: 1 }}>
                            <View style={styles.row}>
                                <Text gray bold style={styles.transactionCode}>{item.transactionCode}</Text>
                                <Text grayDark>{moment(item.time * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                            </View>
                            <View style={styles.row}>
                                {typeText}
                            </View>
                            <View style={styles.row}>
                                <Text grayDark>{item.user}</Text>
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

    _handlePressDateFilter = (item) => {
        console.log('Press Date Filter', item)
    }

    render() {

        return (
            <Container style={styles.container}>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary }}>
                    <Text white>{this.state.currentTab.text}</Text>
                    {this._renderMoney()}
                </View>
                <TabsWithNoti tabData={options.tabData} onPressTab={this._handlePressTab} ref='tabs' />
                <DateFilter onPressFilter={this._handlePressDateFilter} ref='dateFilter' />


                <Content style={styles.content}>
                    <List dataArray={this.state.payData}
                        renderRow={(item) => this._renderRow(item)}
                        pageSize={10}
                    ></List>
                </Content>
            </Container>
        )
    }
}