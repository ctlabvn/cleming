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

import {REVENUE_PROCESSING, REVENUE_DONE} from '~/store/constants/app'
import {REVENUE_DELIVERY, REVENUE_CLINGME_PAY} from '~/store/constants/app'
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
        const {forwardTo} = this.props
        forwardTo('transactionHistory');
    }

    _renderMoneyBand(money) {
        var moneyNumber;
        return (
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                <View row style={styles.moneyBand}>
                    <Text medium grayDark>Tổng tiền Merchant đã thu</Text>
                    <Text largeLight green bold>16.320.000 đ</Text>
                </View>
                <View row style={styles.moneyBand}>
                    <Text medium grayDark>Phí Clingme</Text>
                    <Text largeLight bold grayDark>3.320.000 đ</Text>
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
                    <View style={{borderTopWidth: 1}}>
                        <Text medium bold grayDark style={{paddingHorizontal: 20, paddingVertical: 5}}>
                            Tại 94, Hoàng Quốc Việt, Cầu giấy: 8.050.000 đ
                        </Text>
                    </View>
                )
            case TYPE_ITEM:
                return (
                    <View>
                        <View row style={{paddingHorizontal: 20, paddingVertical: 5, alignItems: 'flex-start'}}>
                            <Icon name='coin_mark' style={{color: material.orange500, fontSize: 20, paddingRight: 10, paddingTop: 12}}/>
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
                  <Text small blue style={styles.button} onPress={()=>this._handleSeeMore()}> xem thêm </Text>
                )
            default:
                return (
                    <Text>...</Text>
                )
        }
        // if (item.type == TYPE_PLACE) {
        //     return (
        //         <View>
        //             <Border/>
        //             <Text medium bold grayDark style={{paddingHorizontal: 20, paddingVertical: 5}}>
        //                 Tại 94, Hoàng Quốc Việt, Cầu giấy: 8.050.000 đ
        //             </Text>
        //         </View>
        //     )
        // } else if (item.type == TYPE_ITEM) return (
        //     <View>
        //         <Border/>
        //         <View row style={{paddingHorizontal: 20, paddingVertical: 5, alignItems: 'flex-start'}}>
        //             <Icon name='coin_mark' style={{color: material.orange500, fontSize: 20, paddingRight: 10, paddingTop: 12}}/>
        //             <View style={{paddingVertical: 5, flex: 1}}>
        //                 <View row style={styles.subRow}>
        //                     <Text medium bold grayDark>
        //                         #DTL12345
        //                     </Text>
        //                     <Text medium grayDark>
        //                         17:30 17/08/2017
        //                     </Text>
        //                 </View>
        //
        //                 <View row style={styles.subRow}>
        //                     <Text medium orange>
        //                         Cashback Thành công
        //                     </Text>
        //                     <Text medium bold grayDark>
        //                         3.246.000 đ
        //                     </Text>
        //                 </View>
        //
        //                 <View row style={styles.subRow}>
        //                     <Text medium grayDark>
        //                         Phí Clingme
        //                     </Text>
        //                     <Text medium bold grayDark>
        //                         846.000 đ
        //                     </Text>
        //                 </View>
        //             </View>
        //         </View>
        //     </View>
        // )
        //
        // return (<Text medium primary bold> item {item.item} </Text>);
    }

    _getArrayList() {
        // return ([{'item':1},{'item':2},{'item':3},])
        return ([
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
        ]);
    }

    render() {
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={MERCHANT_COLLECTED}
                              onPressTab={data => this._handlePressTab}
                              ref='tabs'/>
                <DateFilter onPressFilter={data => this._handlePressFilter} ref='dateFilter'/>
                {this._renderMoneyBand(this.state.money)}
                <ListViewExtend
                    style={{flex: 1}}
                    onItemRef={ref => this.listview = ref}
                    onEndReached={() => this._loadMore()}
                    keyExtractor={item => item.item}
                    onRefresh={() => this._onRefresh()}
                    dataArray={this._getArrayList()}
                    renderRow={(item) => this._renderBookingItem(item)}
                />


            </Container>
        )
    }
}