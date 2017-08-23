import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import ListViewExtend from '~/ui/components/ListViewExtend'
import {
    TIME_FORMAT_WITHOUT_SECOND
} from "~/store/constants/app"
@connect(state => ({
    xsession: getSession(state),
    cashoutHistory: state.cashoutHistory
}), { ...commonAction, ...walletAction })
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        const {xsession, getCashoutHistory, getCashoutDetail} = this.props
        getCashoutHistory(xsession)
    }
    _renderRow = (item) => {
        const {forwardTo} = this.props
        switch(item.cashoutStatus){
            case 0:
                return (
                  <TouchableWithoutFeedback onPress={()=>forwardTo('withdrawDetail', {id: item.casoutId})}>
                    <View style={styles.listItem}>
                        <Text medium gray>{moment(item.cashoutTime*1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                        <View style={styles.row}>
                            <Text warning>{formatNumber(item.cashoutMoney)}đ</Text>
                            <Icon name='foward' style={styles.forwardIconWarning}/>
                        </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
            case 1:
                return (
                    <TouchableWithoutFeedback onPress={()=>forwardTo('withdrawDetail', {id: item.casoutId})}>
                        <View style={styles.listItem}>
                            <Text medium gray>{moment(item.cashoutTime*1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                            <View style={styles.row}>
                                <Text success>{formatNumber(item.cashoutMoney)}đ</Text>
                                <Icon name='foward' style={styles.forwardIconSuccess}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
        }
    }

    render() {
        const { forwardTo, cashoutHistory } = this.props
        return (
            <Container style={styles.container}>
                <View style={{...styles.rowCenter, ...styles.borderBottom}}>
                    <Text large bold success>{formatNumber(cashoutHistory.moneyAmount)}đ</Text>
                </View>
                <View style={styles.rowLeft}>
                    <Text medium bold warning>{I18n.t('money_waiting_process')}</Text>
                </View>
                <Border/>
                <ListViewExtend
                    dataArray={cashoutHistory.cashoutWaiting.listCashout}
                    renderRow={(item) => this._renderRow(item)}
                    onEndReached={()=>console.log('On End Reach List1')}
                />
                <View style={{...styles.rowLeft, ...styles.borderTop}}>
                    <Text medium bold success>{I18n.t('money_received')}</Text>
                </View>
                <Border/>
                <ListViewExtend
                    dataArray={cashoutHistory.cashoutConfirm.listCashout}
                    renderRow={(item) => this._renderRow(item)}
                    onEndReached={()=>console.log('On End Reach List2')}
                />
            </Container>
        )
    }
}
