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

        getBalanceHistory(xsession, fromTime, toTime, option, pageNumber, (err, data) => {
            if (data && data.data && data.data.balanceConfirm && data.data.balanceConfirm.pageNumber) {
                this.currentPageNumber = data.data.balanceConfirm.pageNumber;
            }
            this.listViewConfirm.showRefresh(false);
            this.spinner.show(false);
        });
    }

    _onRefresh() {
        this.listViewConfirm.showRefresh(true);
        this._load();
    }

    _onEndReached() {
        const { totalPage, pageNumber } = this.props.balanceHistory.balanceConfirm
        if (this.currentPageNumber < totalPage) {
            this.currentPageNumber = pageNumber + 1;
            this.spinner.show(true);
            this._load(null, null, null, this.currentPageNumber);
        }
    }

    _handlePressFilter(data) {
        const { from, to } = data.currentSelectValue.value;
        if (this.listViewConfirm) this.listViewConfirm.showRefresh(true);
        this._load(from, to);
    }

    _handlePressTab(tab) {
        if (this.listViewConfirm) this.listViewConfirm.showRefresh(true);
        this._load(null, null, tab.tabId);
    }

    _handlePressItem(item) {
        const {forwardTo} = this.props;
        forwardTo('cashoutDetail', item);
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

        const color = balanceMoney >= 0 ? material.blue500 : material.green500

        return (
            <ListItem
                noBorder
                onPress={e => this._handlePressItem(item)}
                style={styles.listItem}>
                <View style={{flex: 1}}>
                    <Text medium grayDark
                          style={styles.listItemContentTime}>{moment(balanceTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    <View style={styles.listItemContentContainer}>
                        <Text medium grayDark style={styles.listItemContentBalanceName}>{balanceName}</Text>
                        <View style={styles.listItemContentMoney}>
                            <Text medium bold style={{color: color}}>{balanceMoney > 0 && '+'}{balanceMoney} đ</Text>
                            <Icon
                                name="foward"
                                style={{fontSize: 20, color: color}}/>
                        </View>
                    </View>
                    {renderBorder}
                </View>
            </ListItem>
        )
    }


    render() {
        const {forwardTo, balanceHistory} = this.props
        let minHeight = 0;
        if (balanceHistory) {
            const { balanceWait } = balanceHistory;
            if (balanceWait) {
                minHeight = balanceWait && balanceWait.listBalance.length > 0 ? 0 : 50;
            }
        }

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
                    <View style={styles.title}>
                        <Text strong bold grayDark>{I18n.t('cashout_waiting_for_progressing')}</Text>
                    </View>
                    { balanceHistory && balanceHistory.balanceWait &&
                    <List
                        dataArray={balanceHistory.balanceWait.listBalance}
                        style={{maxHeight, minHeight, margin: 0, padding: 0}}
                        renderRow={(...args) => this._renderRow(...args, TRANSACTION_PROCESSING)}/>}
                </View>
                <View style={styles.title}>
                    <Text strong bold grayDark>{I18n.t('cashout_done')}</Text>
                </View>
                {balanceHistory && balanceHistory.balanceConfirm &&
                <ListViewExtend
                    ref={(ref) => this.listViewConfirm = ref}
                    dataArray={balanceHistory.balanceConfirm.listBalance}
                    renderRow={(...args) => this._renderRow(...args, TRANSACTION_DONE)}
                    onEndReached={() => this._onEndReached()}
                    onRefresh={() => this._onRefresh()}
                />}
                <Spinner onItemRef={ref => this.spinner = ref}/>
            </Container>
        )
    }
}
