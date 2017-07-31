import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Text, List, ListItem} from 'native-base'
import {View} from 'react-native'

import * as commonAction from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import * as revenueActions from "~/store/actions/revenue";
import { getSession } from "~/store/selectors/auth";

import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'

import styles from './styles'
import options from './options'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import Content from "~/ui/components/Content";

import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";

import {REVENUE_PROCESSING, REVENUE_DONE} from '~/store/constants/app'
import {REVENUE_DELIVERY, REVENUE_CLINGME_PAY} from '~/store/constants/app'

import {
    TIME_FORMAT_WITHOUT_SECOND,
} from "~/store/constants/app";

// const DELIVERY = 'DELIVERY';
// const CLINGME_PAY = 'CLINGME_PAY';

@connect(state => ({
    xsession: getSession(state),
    revenue: state.revenue,
}), { ...commonAction, ...authActions, ...revenueActions})

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            currentTab: REVENUE_PROCESSING,
            colorStyle: styles.revenueProcessing,
            loading: false,
        })
        const { xsession, getRevenueListProcessing } = this.props;
        getRevenueListProcessing(xsession, (err, data) => {
            // console.warn('data get list revenue processing ' + JSON.stringify(data));
        })
    }

    _handlePressTab(data) {

        let tab = data.tabID;
        let color = tab == REVENUE_PROCESSING ? styles.revenueProcessing :
            (tab == REVENUE_DONE ? styles.revenueDone : null);

        this.setState({
            currentTab: data.tabID,
            colorStyle: color,
        })
    }

    _handlePressFilter(data) {

    }

    _renderMoneyBand(money) {
        var moneyNumber;
        return (
            <View style={styles.moneyBand}>
                <Text medium grayDark>Số tiền</Text>
                <Text large style={{...this.state.colorStyle}}>
                    <Text large superBold style={{...this.state.colorStyle}}>{formatNumber(money)}</Text> đ
                </Text>
            </View>
        )
    }

    _forwardToDetail(data) {
        const { setToast, forwardTo } = this.props

        forwardTo('revenueManagementDetail/'+this.state.currentTab);
    }

    _renderItem(item) {

        let {code, time, itemType, username, money} = item;

        let type = 'Giao hàng'; // default
        let iconName = 'shiping-bike2'; // default
        let iconColor = material.orange500; // default

        switch (itemType) {
            case REVENUE_DELIVERY:
                type = 'Giao hàng';
                iconName = 'shiping-bike2';
                break;
            case REVENUE_CLINGME_PAY:
                type = 'Clingme Pay';
                iconName = 'clingme-wallet';
                break;
        }

        handlePress = () => {
            const { setSelectedRevenueItem } = this.props
            // checkRevenueAction();
            setSelectedRevenueItem(item);
            this._forwardToDetail();
        }

        return (
            <ListItem style={styles.listItem} onPress={handlePress}>
                <View>
                    <View style={styles.row}>
                        <Icon name={iconName} style={{...styles.icon, ...this.state.colorStyle}}/>
                        <View style={styles.itemContent}>
                            <View style={styles.subRow}>
                                <Text largeLight bold grayDark>#<Text largeLight grayDark>{code}</Text></Text>
                                <Text medium grayDark>{moment(time * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                            </View>

                            <View style={styles.subRow}>
                                <Text medium grayDark>{type}</Text>
                            </View>

                            <View style={styles.subRow}>
                                <Text medium grayDark>{username}</Text>
                                <Text largeLight grayDark><Text largeLight bold>+{formatNumber(money)}</Text> đ</Text>
                            </View>
                        </View>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1}/>
                </View>
            </ListItem>
        )
    }

    _getListItemFake() {
        if (this.state.currentTab == REVENUE_PROCESSING) {
            return [
                {code: 'CL123456', time: 1500007022, itemType: REVENUE_DELIVERY, username: 'tienvm', money: 500000},
                {code: 'CL234567', time: 1500008103, itemType: REVENUE_CLINGME_PAY, username: 'frickimous', money: 650000},
                {code: 'CL345678', time: 1500006126, itemType: REVENUE_DELIVERY, username: 'panda', money: 800000},
                {code: 'CL445677', time: 1500007126, itemType: REVENUE_CLINGME_PAY, username: 'tienvm', money: 900000},
                {code: 'CL663456', time: 1500007022, itemType: REVENUE_DELIVERY, username: 'tienvm', money: 550000},
                {code: 'CL994567', time: 1500008103, itemType: REVENUE_CLINGME_PAY, username: 'frickimous', money: 450000},
                {code: 'CL999678', time: 1500006126, itemType: REVENUE_DELIVERY, username: 'panda', money: 850000},
                {code: 'CL999997', time: 1500007126, itemType: REVENUE_CLINGME_PAY, username: 'tienvm', money: 12000000},
            ]
        } else {
            return [
                {code: 'CL113456', time: 1500285550, itemType: REVENUE_CLINGME_PAY, username: 'chicken', money: 350000},
                {code: 'CL224567', time: 1500193500, itemType: REVENUE_CLINGME_PAY, username: 'dog', money: 950000},
                {code: 'CL333333', time: 1500192488, itemType: REVENUE_DELIVERY, username: 'monkey', money: 750000},
                {code: 'CL696969', time: 1500057777, itemType: REVENUE_CLINGME_PAY, username: 'horse', money: 850000},
                {code: 'CL777777', time: 1500077022, itemType: REVENUE_DELIVERY, username: 'zebra', money: 650000},
                {code: 'CL888888', time: 1500008111, itemType: REVENUE_DELIVERY, username: 'bird', money: 250000},
                {code: 'CL999888', time: 1500006222, itemType: REVENUE_DELIVERY, username: 'panda', money: 150000},
                {code: 'CL999999', time: 1500007111, itemType: REVENUE_CLINGME_PAY, username: 'pig', money: 22000000},
            ]
        }

    }

    _getTotalMoney() {
        let totalMoney = 0;
        this._getListItemFake().map(data => {totalMoney += data.money})
        return totalMoney;
    }

    _renderList() {
        return (<List dataArray={this._getListItemFake()}
                      renderRow={(item) => {return this._renderItem(item)}}
                      pageSize={10}/>)
    }

    _loadMore() {

    }

    _onRefresh() {

    }

    render() {
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)}
                              ref='tabs'/>
                <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter'/>
                {this._renderMoneyBand(this._getTotalMoney())}
                <Content padder onEndReached={this._loadMore} onRefresh={this._onRefresh} refreshing={this.state.loading}>
                    {this._renderList()}
                </Content>
            </Container>
        )
    }
}