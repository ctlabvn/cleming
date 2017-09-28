import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, List, ListItem, Spinner, Text} from "native-base";
import {InteractionManager, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import {getCashoutOverview} from "~/store/actions/wallet";
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
    cashoutOverview: state.cashoutOverview
}), {...commonAction, getCashoutOverview})
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
        const {getCashoutOverview, xsession} = this.props
        getCashoutOverview(xsession)
    }

    render() {
        const {forwardTo, cashoutOverview} = this.props

        const { balanceMoney } = cashoutOverview

        return (
            <Container style={styles.container}>
                <View style={styles.rowNormal}>
                    <Icon name='account' style={{fontSize: 65, margin: 30, color: material.gray400}}/>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Text medium grayDark bold style={{marginBottom: 10}}>Số dư hiện tại</Text>
                        <Text largeLight orange bold>{formatNumber(balanceMoney)}đ</Text>
                    </View>
                </View>
                <Border/>
                <View style={{margin: 15}}>
                    <Text medium bold grayDark italic style={{marginBottom: 10}}>Chi tiết</Text>
                    <View style={{...styles.row, marginBottom: 10, marginLeft: 5}}>
                        <Text medium grayDark>Số dư kỳ trước</Text>
                        <Text medium grayDark bold>+ 500.000 đ</Text>
                    </View>
                    <View style={{...styles.row, marginBottom: 10, marginLeft: 5}}>
                        <Text medium grayDark>Thanh toán kỳ đối soát T8/17</Text>
                        <Text medium grayDark bold>- 1.500.000 đ</Text>
                    </View>
                    <Button style={styles.cashoutBtn} onPress={() => forwardTo('withDraw')}>
                        <View><Text white medium bold>Rút tiền</Text></View>
                    </Button>
                    <Button style={styles.payBtn} onPress={() => alert('Chi tiết thanh toán')}>
                        <View><Text white medium bold>Thanh toán</Text></View>
                    </Button>
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => forwardTo('cashoutHistory')}
                    style={{...styles.row, backgroundColor: material.gray200, padding: 13, margin: 7, marginBottom: 50, borderRadius: 5}}>
                    <Text medium grayDark bold italic>
                        Lịch sử giao dịch
                    </Text>
                    <Icon name='foward' style={{fontSize: 24, color: material.gray600}}/>
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
