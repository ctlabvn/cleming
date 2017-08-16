import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Container, Text, List, ListItem, Spinner} from 'native-base'

import * as commonAction from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import * as revenueActions from "~/store/actions/revenue";
import { getSession } from "~/store/selectors/auth";
import { getRevenueData } from "~/store/selectors/revenue";

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
import { MERCHANT_COLLECTED, CLINGME_COLLECTED } from '~/store/constants/app'

import I18n from '~/ui/I18n'

import {
    TIME_FORMAT_WITHOUT_SECOND,
} from "~/store/constants/app";

@connect(null, null)

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currenTab: MERCHANT_COLLECTED,
            money: 21592000,
            loading: false,
        }
    }

    _handlePressFilter(data) {
        alert(JSON.stringify(data));
    }

    _handlePressTab(data) {
        alert(JSON.stringify(data));
    }

    _loadMore() {

    }

    _onRefresh() {

    }

    _handlePressSumRevenue() {
        const { forwardTo } = this.props
        forwardTo('transactionHistory');
    }

    _renderMoneyBand(money) {
        var moneyNumber;
        return (
            <View style={styles.moneyBand}>
                <View>
                    <Text largeLight bold grayDark>Doanh thu</Text>
                    <Text green>(Chưa đối soát)</Text>
                </View>
                <Text large green>
                    <Text large superBold orange>{formatNumber(money)}</Text> đ
                </Text>
            </View>
        )
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={{backgroundColor: material.primaryColor, color: 'white'}}> Tất cả địa điểm </Text>
                <TabsWithNoti tabData={options.tabData} activeTab={MERCHANT_COLLECTED}
                              onPressTab={data => this._handlePressTab}
                              ref='tabs'/>
                <DateFilter onPressFilter={data => this._handlePressFilter} ref='dateFilter'/>
                {this._renderMoneyBand(this.state.money)}
                <Content>
                </Content>
            </Container>
        )
    }
}