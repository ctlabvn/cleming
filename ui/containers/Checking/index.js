import React, {Component} from 'react'
import {Container, Text, List, ListItem, Spinner, View, Button} from 'native-base'
import {TouchableHighlight} from 'react-native'
import I18n from '~/ui/I18n'
import styles from './styles'
import options from './options'
import {connect} from 'react-redux'
import * as commonActions from '~/store/actions/common'
import {ALL_PLACES_CHECKING} from '~/store/constants/app'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import Content from "~/ui/components/Content";

import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";


@connect(null, commonActions)

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currenTab: ALL_PLACES_CHECKING,
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
                <TabsWithNoti tabData={options.tabData} activeTab={ALL_PLACES_CHECKING}
                              onPressTab={data => this._handlePressTab}
                              ref='tabs'/>
                <DateFilter onPressFilter={data => this._handlePressFilter} ref='dateFilter'/>
                {this._renderMoneyBand(this.state.money)}
                <Content
                    padder
                    style={styles.content}
                    onEndReached={() => this._loadMore()}
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.loading}>
                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            Doanh thu
                        </Text>
                        <View row>
                            <Text strong bold grayDark orange
                                  onPress={() => this._handlePressSumRevenue()}>21.592.000</Text>
                            <Icon name='foward' style={{fontSize: 20, color: material.orange500}}
                                  onPress={() => this._handlePressSumRevenue()}/>
                        </View>
                    </View>

                    <View style={{marginRight: 20}}>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>Tổng tiền Merchant đã thu:</Text>
                            <Text medium bold grayDark>16.320.000</Text>
                        </View>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>Tổng tiền Clingme đã thu:</Text>
                            <Text medium bold grayDark>5.272.000</Text>
                        </View>
                    </View>

                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            Phí Clingme
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            <Text strong bold grayDark orange>4.265.000</Text>
                        </View>
                    </View>


                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            Merchant nhận lại từ Clingme
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            <Text strong bold grayDark orange>1.007.000</Text>
                        </View>
                    </View>
                    {/*<View style={{marginLeft: 20}}>*/}
                        {/*<Text medium>Merchant nhận lại từ Clingme</Text>*/}
                    {/*</View>*/}
                    <View row style={{justifyContent: 'center'}}>
                        <Text medium bold grayDark
                              style={{marginHorizontal: 10, alignSelf: 'flex-start'}}>=</Text>
                        <View style={{alignItems: 'center'}}>
                            <Text medium grayDark>Tổng tiền Clingme đã thu</Text>
                            <Text medium bold grayDark>(5.272.000)</Text>
                        </View>
                        <Text medium bold grayDark
                              style={{marginHorizontal: 10, alignSelf: 'flex-start'}}>-</Text>
                        <View style={{alignItems: 'center'}}>
                            <Text medium grayDark>Phí Clingme đã thu</Text>
                            <Text medium bold grayDark>(4.265.000)</Text>
                        </View>

                    </View>

                </Content>
                <Border color='rgba(0,0,0,0.5)' size={1} style={{marginBottom: 50}}/>
                <View style={styles.fixButtonBlock}>
                    <Text medium onPress={() => alert('thanh toán Clingme')} gray>Thanh toán Clingme</Text>
                    <Text medium onPress={() => alert('tài khoản Cashout')} primary>Tài khoản Cashout</Text>
                </View>
            </Container>
        )
    }
}