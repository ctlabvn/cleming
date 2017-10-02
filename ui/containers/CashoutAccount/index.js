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
    cashoutOverview: state.cashoutOverview,
    balanceMoney: state.wallet.balanceMoney
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
        getBalance(xsession)
    }

    render() {
        const {forwardTo, balanceMoney} = this.props

        return (
            <Container style={styles.container}>
                <View style={styles.rowNormal}>
                    <Icon name='account' style={styles.iconAccount}/>
                    <View style={styles.balanceMoneyContainer}>
                        <Text medium grayDark bold style={styles.balanceMoneyLabel}>{I18n.t('balance_money')}</Text>
                        <Text largeLight orange bold>{formatNumber(balanceMoney)}đ</Text>
                    </View>
                </View>
                <Border/>
                <View style={styles.detailContainer}>
                    <Text medium bold grayDark italic style={styles.detailLabel}>{I18n.t('detail')}</Text>
                    <View style={{...styles.row, ...styles.detailContentContainer}}>
                        <Text medium grayDark>Số dư kỳ trước</Text>
                        <Text medium grayDark bold>+ 500.000 đ</Text>
                    </View>
                    <View style={{...styles.row, ...styles.detailContentContainer}}>
                        <Text medium grayDark>Thanh toán kỳ đối soát T8/17</Text>
                        <Text medium grayDark bold>- 1.500.000 đ</Text>
                    </View>
                    <Button style={styles.cashoutBtn} onPress={() => forwardTo('withDraw')}>
                        <View><Text white medium bold>{I18n.t('cashout')}</Text></View>
                    </Button>
                    <Button style={styles.payBtn} onPress={() => forwardTo('payDetail')}>
                        <View><Text white medium bold>{I18n.t('pay')}</Text></View>
                    </Button>
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


        // return (
        //     <Container style={styles.container}>
        //         <View style={styles.content}>
        //             <View style={styles.moneyBlock}>
        //                 <View style={{...styles.row, ...styles.mt20}}>
        //                     <Text medium style={styles.textClear}>{I18n.t('balance_available')}</Text>
        //                     <Text bold style={styles.moneyNumber}>{formatNumber(cashoutOverview.balanceMoney)}đ</Text>
        //                 </View>
        //                 <View style={{...styles.rowRight, ...styles.mt20}}>
        //                     <Button style={styles.cashoutBtn} onPress={() => forwardTo('withDraw')}>
        //                         <Icon name='cash_out' style={styles.cashoutIcon}/>
        //                         <View><Text white medium>Cashout</Text></View>
        //                     </Button>
        //                 </View>
        //             </View>
        //             <Border/>
        //             <TouchableOpacity onPress={() => forwardTo('cashoutHistory')}>
        //                 <View>
        //                     <View style={{...styles.row, ...styles.pd10, paddingBottom: 30}}>
        //                         <Text gray bold medium>{I18n.t('cashout_history')}</Text>
        //                         <View style={styles.row}>
        //                             <Text medium bold success
        //                                   style={styles.moneyNumber2}>{formatNumber(cashoutOverview.cashoutMoney)}đ</Text>
        //                             <Icon name='foward' style={styles.forwardIcon}/>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </TouchableOpacity>
        //         </View>
        //         <Button style={styles.bottomButton} onPress={() => forwardTo('checkingHistory')}>
        //             <View>
        //                 <Text medium bold gray>{I18n.t('checking_history')}</Text>
        //             </View>
        //             <View style={styles.row}>
        //                 <Text medium gray>{I18n.t('detail')}</Text>
        //                 <Icon name='foward' style={{...styles.forwardIcon, color: 'black'}}/>
        //             </View>
        //         </Button>
        //     </Container>
        // )
    }
}
