import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Container, Text, List, ListItem, Spinner, Button} from 'native-base'

import * as commonAction from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import * as revenueActions from "~/store/actions/revenue";
import {getSession} from "~/store/selectors/auth";
import {getRevenueData} from "~/store/selectors/revenue";

import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'

import ListViewExtend from '~/ui/components/ListViewExtend'

import styles from './styles'
import options from './options'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import Content from "~/ui/components/Content";

import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";

import {MERCHANT_COLLECTED, CLINGME_COLLECTED} from '~/store/constants/app'

import I18n from '~/ui/I18n'

import {
    TIME_FORMAT_WITHOUT_SECOND,
} from "~/store/constants/app";

const TYPE_PLACE = 1
const TYPE_ITEM = 2
const TYPE_SEE_MORE = 3

@connect(null, null)

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: MERCHANT_COLLECTED,
            money: 21592000,
            loading: false,
        }

        this.data = [
            {'type': TYPE_PLACE, 'item': 1},
            {'type': TYPE_ITEM, 'item': 2},
            {'type': TYPE_ITEM, 'item': 3},
            {'type': TYPE_SEE_MORE, 'item': 4},
            {'type': TYPE_PLACE, 'item': 5},
            {'type': TYPE_ITEM, 'item': 6},
            {'type': TYPE_ITEM, 'item': 7},
            {'type': TYPE_SEE_MORE, 'item': 8},
            {'type': TYPE_PLACE, 'item': 9},
            {'type': TYPE_ITEM, 'item': 10},
            {'type': TYPE_PLACE, 'item': 11},
            {'type': TYPE_ITEM, 'item': 12},
            {'type': TYPE_ITEM, 'item': 13},
            {'type': TYPE_PLACE, 'item': 14},
            {'type': TYPE_ITEM, 'item': 15},
            {'type': TYPE_ITEM, 'item': 16},
            {'type': TYPE_SEE_MORE, 'item': 17},
            {'type': TYPE_PLACE, 'item': 18},
            {'type': TYPE_ITEM, 'item': 19},
            {'type': TYPE_ITEM, 'item': 20},
            {'type': TYPE_SEE_MORE, 'item': 21},
            {'type': TYPE_PLACE, 'item': 22},
            {'type': TYPE_ITEM, 'item': 23},
            {'type': TYPE_ITEM, 'item': 24},
            {'type': TYPE_SEE_MORE, 'item': 25},
            {'type': TYPE_PLACE, 'item': 26},
            {'type': TYPE_ITEM, 'item': 27},
            {'type': TYPE_ITEM, 'item': 28},
            {'type': TYPE_SEE_MORE, 'item': 29},
        ]
    }

    _handlePressFilter(data) {

    }

    _handlePressTab(data) {
        switch (data.tabID) {
            case MERCHANT_COLLECTED:
                this.setState({
                    currentTab: MERCHANT_COLLECTED,
                });
                break;
            case CLINGME_COLLECTED:
                this.setState({
                    currentTab: CLINGME_COLLECTED,
                });
                break;
        }
    }

    _loadMore() {

    }

    _onRefresh() {

    }

    _renderMoneyBand(money) {
        let moneyTitle;
        let totalMoney;
        let clingmeFee;
        if (this.state.currentTab == MERCHANT_COLLECTED) {
            moneyTitle = 'Tổng tiền Merchant đã thu'
            totalMoney = '16.320.000'
            clingmeFee = '3.320.000'
        } else {
            moneyTitle = 'Tổng tiền Clingme đã thu'
            totalMoney = '5.272.000'
            clingmeFee = '945.000'
        }

        return (
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                <View row style={styles.moneyBand}>
                    <Text medium grayDark>{moneyTitle}</Text>
                    <Text largeLight green bold>{totalMoney} đ</Text>
                </View>
                <View row style={styles.moneyBand}>
                    <Text medium grayDark>Phí Clingme</Text>
                    <Text largeLight bold grayDark>{clingmeFee} đ</Text>
                </View>
            </View>
        )
    }

    _loadMore() {
        alert('đang tải ...');
        return 1;
    }

    _onRefresh() {

    }

    _handleSeeMore(item) {
        alert('xem thêm')
    }

    _renderBookingItem(item) {
        switch (item.type) {
            case TYPE_PLACE:
                return (
                    <View>
                        <Border/>
                        <Text medium bold grayDark style={{paddingHorizontal: 20, paddingVertical: 5}}>
                            Tại 94, Hoàng Quốc Việt, Cầu giấy: 8.050.000 đ
                        </Text>
                    </View>
                )
            case TYPE_ITEM:
                return (
                    <View>
                        <View style={{marginHorizontal: 0}}>
                            <Border/>
                        </View>
                        <View row style={{paddingHorizontal: 20, paddingVertical: 5, alignItems: 'flex-start'}}>
                            <Icon name='coin_mark'
                                  style={{color: material.orange500, fontSize: 20, paddingRight: 10, paddingTop: 12}}/>
                            <View style={{paddingVertical: 5, flex: 1}}>
                                <View row style={styles.subRow}>
                                    <Text medium bold grayDark>#DTL12345</Text>
                                    <Text medium grayDark>17:30 17/08/2017</Text>
                                </View>

                                <View row style={styles.subRow}>
                                    <Text medium orange>Cashback Thành công</Text>
                                    <Text medium bold grayDark>3.246.000 đ</Text>
                                </View>

                                <View row style={styles.subRow}>
                                    <Text medium grayDark>Phí Clingme</Text>
                                    <Text medium bold grayDark>846.000 đ</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            case TYPE_SEE_MORE:
                return (
                    <View>
                        <Button transparent gray bordered small rounded style={styles.button}
                                onPress={() => this._handleSeeMore()}>
                            <Text small>
                                xem thêm
                            </Text>
                        </Button>
                    </View>
                )
            default:
                return (
                    <View>
                        <Text>...</Text>
                    </View>
                )
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={this.state.currentTab}
                              onPressTab={data => this._handlePressTab(data)}
                              ref='tabs'/>
                <DateFilter onPressFilter={data => this._handlePressFilter(data)} ref='dateFilter'/>
                {this._renderMoneyBand(this.state.money)}
                <ListViewExtend
                    style={{flex: 1}}
                    onItemRef={ref => this.listview = ref}
                    onEndReached={() => this._loadMore()}
                    keyExtractor={item => item.item}
                    onRefresh={() => this._onRefresh()}
                    dataArray={this.data}
                    renderRow={(item) => this._renderBookingItem(item)}
                />


            </Container>
        )
    }
}