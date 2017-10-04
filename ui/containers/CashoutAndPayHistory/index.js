import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Text, List, ListItem} from "native-base";
import {InteractionManager, View, TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import {formatNumber, chainParse} from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import {getSession} from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import options from './options'
import ListViewExtend from '~/ui/components/ListViewExtend'
import Spinner from '~/ui/components/Spinner'

import {
    DEFAULT_TIME_FORMAT
} from "~/store/constants/app"

const TRANSACTION_PROCESSING = 1;
const TRANSACTION_DONE = 2;

import { CASHOUT_AND_PAY_HISTORY_ALL, CASHOUT_AND_PAY_HISTORY_COME_IN, CASHOUT_AND_PAY_HISTORY_COME_OUT } from '~/store/constants/app'

@connect(state => ({
    xsession: getSession(state),
    cashoutHistory: state.cashoutHistory,
    cashoutOverview: state.cashoutOverview,
    balanceHistory: state.cashout.balanceHistory
}), {...commonAction, ...walletAction})
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)

        this.currentPageNumber = 1;
    }

    componentDidMount() {
        // const {xsession, getCashoutHistory} = this.props
        // this.listview && this.listview.showRefresh(true)
        // getCashoutHistory(xsession,
        //     (err, data) => this.listview && this.listview.showRefresh(false)
        // )

        // const {xsession, getBalanceHistory} = this.props
        // getBalanceHistory(xsession);
        this._load();
    }

    _load(fromTime, toTime, option, pageNumber = 1) {

        if (!fromTime || !toTime) {
            const { value } = this.refs.dateFilter.getCurrentSelectValue();
            fromTime = value.from
            toTime = value.to
        }

        if (!option) {
            option = this.refs.tabs.getActiveTab();
        }

        const {xsession, getBalanceHistory} = this.props

        // const fromTimeStamp = moment(fromTime * 1000).format(DEFAULT_TIME_FORMAT)
        // const toTimeStamp = moment(toTime * 1000).format(DEFAULT_TIME_FORMAT)
        // console.warn(fromTimeStamp + " " + toTimeStamp + " " + option + " " + pageNumber);

        getBalanceHistory(xsession, fromTime, toTime, option, pageNumber, (err, data) => {
            if (data && data.data && data.data.balanceConfirm && data.data.balanceConfirm.pageNumber) {
                this.currentPageNumber = data.data.balanceConfirm.pageNumber;
            }
        });
    }

    _onRefresh() {
        this._load();
    }

    _onEndReached() {
        const { totalPage, pageNumber } = this.props.balanceHistory.balanceConfirm
        if (this.currentPageNumber < totalPage) {
            this.currentPageNumber = pageNumber + 1;
            this._load(null, null, null, this.currentPageNumber);
        }
    }

    _handlePressFilter(data) {
        const { from, to } = data.currentSelectValue.value;
        this._load(from, to);
    }

    _handlePressTab(tab) {
        this._load(null, null, tab.tabId);
    }

    _handlePressItem(item) {
        const {forwardTo} = this.props;
        forwardTo('cashoutDetail');
    }

    _renderRow(...args) {
        const item = args[0];
        const index = args[2];
        const flagProcess = args[args.length - 1]
        let renderBorder = {};
        if (flagProcess == TRANSACTION_PROCESSING) renderBorder = index < this.waitToDoDataLength - 1 ?
            <Border/> : null;
        else if (flagProcess == TRANSACTION_DONE) renderBorder = index < this.transactionDoneLength - 1 ?
            <Border/> : null;

        const {balanceTime, balanceMoney, balanceName} = item;

        return (
            <ListItem
                noBorder
                onPress={e => this._handlePressItem(item)}
                style={styles.listItem}>
                <View style={{flex: 1}}>
                    <Text medium grayDark
                          style={{alignSelf: 'flex-start'}}>{moment(balanceTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7}}>
                        <Text medium grayDark>{balanceName}</Text>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Text medium bold green>{balanceMoney} đ</Text>
                            <Icon
                                name="foward"
                                style={{fontSize: 20, color: material.green500}}/>
                        </View>
                    </View>
                    {renderBorder}
                </View>
            </ListItem>
        )
    }


    render() {
        const {forwardTo, balanceHistory} = this.props

            const {balanceWait} = balanceHistory;
            const {balanceConfirm} = balanceHistory;
            const minHeight = balanceWait && balanceWait.listBalance.length > 0 ? 0 : 50;

        const maxHeight = 150;

        
        return (
            <Container style={styles.container}>
                <TabsWithNoti
                    tabData={options.tabData}
                    activeTab={CASHOUT_AND_PAY_HISTORY_ALL}
                    onPressTab={(data) => this._handlePressTab(data)}
                    ref='tabs'/>
                <DateFilter
                    defaultFilter='day'
                    onPressFilter={(data) => this._handlePressFilter(data)}
                    ref='dateFilter'/>
                <View>
                    <View style={{backgroundColor: material.gray300, padding: 15}}>
                        <Text strong bold grayDark>Chờ xử lý</Text>
                    </View>
                    { balanceHistory &&
                    <List
                        dataArray={balanceWait.listBalance}
                        style={{maxHeight, minHeight, margin: 0, padding: 0}}
                        renderRow={(...args) => this._renderRow(...args, TRANSACTION_PROCESSING)}/>}
                </View>
                <View style={{backgroundColor: material.gray300, padding: 15}}>
                    <Text strong bold grayDark>Đã xử lý</Text>
                </View>
                {balanceHistory && balanceHistory.balanceConfirm &&
                <ListViewExtend
                    dataArray={balanceConfirm.listBalance}
                    renderRow={(...args) => this._renderRow(...args, TRANSACTION_DONE)}
                    onEndReached={() => this._onEndReached()}
                    onRefresh={() => this._onRefresh()}
                />}
                <Spinner onItemRef={ref => this.spinner = ref}/>
            </Container>
        )
    }
}
