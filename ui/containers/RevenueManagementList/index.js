import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Text, List, ListItem} from 'native-base'
import {View} from 'react-native'


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

import {
    TIME_FORMAT_WITHOUT_SECOND,
} from "~/store/constants/app";

const DELIVERY = 'DELIVERY';
const CLINGME_PAY = 'CLINGME_PAY';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            currentTab: 1,
            loading: false,
        })
    }

    _handlePressTab(data) {
        this.setState({
            currentTab: data.tabID,
        })
    }

    _handlePressFilter(data) {

    }

    _renderMoneyBand(money) {
        var moneyNumber;
        var textColor = material.orange500;
        switch (this.state.currentTab) {
            case REVENUE_PROCESSING:
                textColor = material.orange500;
                break;
            case REVENUE_DONE:
                textColor = material.green500;
                break;
        }

        return (
            <View style={styles.moneyBand}>
                <Text medium grayDark>Số tiền</Text>
                <Text large style={{color: textColor}}><Text large superBold style={{color: textColor}}>{formatNumber(money)}</Text> đ</Text>
            </View>
        )
    }

    _renderItem(item) {

        let {code, time, itemType, username, money} = item;

        let type = 'Giao hàng'; // default
        let iconName = 'shiping-bike2'; // default
        let iconColor = material.orange500; // default

        switch (itemType) {
            case DELIVERY:
                type = 'Giao hàng';
                iconName = 'shiping-bike2';
                break;
            case CLINGME_PAY:
                type = 'Clingme Pay';
                iconName = 'clingme-wallet';
                break;
        }

        switch (this.state.currentTab) {
            case REVENUE_PROCESSING:
                iconColor = material.orange500;
                break;
            case REVENUE_DONE:
                iconColor = material.green500;
                break;
        }

        return (
            <ListItem style={styles.listItem} onPress={() => alert('click')}>
                <View>
                    <View style={styles.row}>
                        <Icon name={iconName} style={{...styles.icon, color: iconColor}}/>
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
                {code: 'CL123456', time: 1500007022, itemType: DELIVERY, username: 'tienvm', money: 500000},
                {code: 'CL234567', time: 1500008103, itemType: CLINGME_PAY, username: 'frickimous', money: 650000},
                {code: 'CL345678', time: 1500006126, itemType: DELIVERY, username: 'panda', money: 800000},
                {code: 'CL445677', time: 1500007126, itemType: CLINGME_PAY, username: 'tienvm', money: 900000},
                {code: 'CL663456', time: 1500007022, itemType: DELIVERY, username: 'tienvm', money: 550000},
                {code: 'CL994567', time: 1500008103, itemType: CLINGME_PAY, username: 'frickimous', money: 450000},
                {code: 'CL999678', time: 1500006126, itemType: DELIVERY, username: 'panda', money: 850000},
                {code: 'CL999997', time: 1500007126, itemType: CLINGME_PAY, username: 'tienvm', money: 12000000},
            ]
        } else {
            return [
                {code: 'CL113456', time: 1500285550, itemType: CLINGME_PAY, username: 'chicken', money: 350000},
                {code: 'CL224567', time: 1500193500, itemType: CLINGME_PAY, username: 'dog', money: 950000},
                {code: 'CL333333', time: 1500192488, itemType: DELIVERY, username: 'monkey', money: 750000},
                {code: 'CL696969', time: 1500057777, itemType: CLINGME_PAY, username: 'horse', money: 850000},
                {code: 'CL777777', time: 1500077022, itemType: DELIVERY, username: 'zebra', money: 650000},
                {code: 'CL888888', time: 1500008111, itemType: DELIVERY, username: 'bird', money: 250000},
                {code: 'CL999888', time: 1500006222, itemType: DELIVERY, username: 'panda', money: 150000},
                {code: 'CL999999', time: 1500007111, itemType: CLINGME_PAY, username: 'pig', money: 22000000},
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