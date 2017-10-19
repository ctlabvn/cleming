import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, List, ListItem, Spinner, Text} from "native-base";
import {InteractionManager, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import {getBalance} from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import {getSession} from "~/store/selectors/auth";

import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'

@connect(state => ({
    xsession: getSession(state),
    balanceMoney: state.wallet.balanceMoney,
    compareCheckMoney: state.wallet.compareCheckMoney,
    preBalance: state.wallet.preBalance,
}), {...commonAction, getBalance})
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
        const {getBalance, xsession} = this.props
        getBalance(xsession);
    }


    render() {
        const {forwardTo, balanceMoney, preBalance, compareCheckMoney, compareCheckName } = this.props

        const color = balanceMoney >= 0 ? material.blue500 : material.green500;

        return (
            <Container style={styles.container}>
                <View style={styles.rowNormal}>
                    <Icon name='account' style={styles.iconAccount}/>
                    <View style={styles.balanceMoneyContainer}>
                        <Text medium grayDark bold style={styles.balanceMoneyLabel}>{I18n.t('balance_money')}</Text>
                        <Text largeLight bold style={{color: color}}>{balanceMoney > 0 && '+'}{formatNumber(balanceMoney)} đ</Text>
                    </View>
                </View>
                <Border/>
                <View style={styles.detailContainer}>
                    <Text medium bold grayDark italic style={styles.detailLabel}>{I18n.t('detail')}</Text>
                    <View style={{...styles.row, ...styles.detailContentContainer}}>
                        <Text medium grayDark>{I18n.t('pre_balance')}</Text>

                        <Text medium grayDark bold>{formatNumber(preBalance)} đ</Text>
                    </View>
                    <View style={{...styles.row, ...styles.detailContentContainer}}>
                        <Text medium grayDark>{I18n.t('pay_compare_check')} {compareCheckName}</Text>
                        <Text medium grayDark bold>{formatNumber(compareCheckMoney)} đ</Text>
                    </View>

                    {balanceMoney > 0 &&
                    <Button style={styles.cashoutBtn} onPress={() => forwardTo('withDraw')}>
                        <View><Text white medium bold>{I18n.t('cashout')}</Text></View>
                    </Button>}

                    {balanceMoney < 0 &&
                    <Button style={styles.payBtn} onPress={() => forwardTo('payDetail', {balanceMoney: balanceMoney})}>
                        <View><Text white medium bold>{I18n.t('pay')}</Text></View>
                    </Button>}
                </View>
                <View style={styles.paddingView}/>
                <TouchableOpacity
                    onPress={() => forwardTo('cashoutAndPayHistory')}
                    style={{...styles.row, ...styles.transactionHistoryBtn}}>
                    <Text medium grayDark bold italic>
                        {I18n.t('transaction_history')}
                    </Text>
                    <Icon name='foward' style={styles.iconFoward}/>
                </TouchableOpacity>
            </Container>
        )
    }
}
