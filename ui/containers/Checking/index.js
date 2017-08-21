import React, {Component} from 'react'
import {Container, Text, List, ListItem, Spinner, View, Button} from 'native-base'
import {TouchableHighlight} from 'react-native'
import I18n from '~/ui/I18n'
import styles from './styles'
import options from './options'
import {connect} from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as checkingActions from '~/store/actions/checking'
import {getSession} from '~/store/selectors/auth'
import {getCheckingData} from '~/store/selectors/checking'
import {ALL_PLACES_CHECKING} from '~/store/constants/app'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import Content from "~/ui/components/Content";

import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";


@connect(state => ({
    xsession: getSession(state),
    data: getCheckingData(state),
}), {...commonActions, ...checkingActions})

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currenTab: ALL_PLACES_CHECKING,
        }
    }

    componentDidMount() {
        this._load();
    }

    _handlePressFilter(data) {
        // console.warn(JSON.stringify(data));
        const dateFilterData = data.currentSelectValue.value;
        const fromTime = dateFilterData.from;
        const toTime = dateFilterData.to;
        this._load(fromTime, toTime);
    }

    _handlePressTab(data) {

    }

    _onRefresh() {
        this._load()
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

    _load(fromTime, toTime) {
        const {xsession, getCheckingDetail} = this.props;
        if (!fromTime && !toTime) {
            const dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value;
            fromTime = dateFilterData.from;
            toTime = dateFilterData.to;
        }

        getCheckingDetail(xsession, fromTime, toTime, (err, data) => {
        });
    }

    render() {
        const {data} = this.props;
        // console.warn(JSON.stringify(data));
        const detail = data;
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={ALL_PLACES_CHECKING}
                              onPressTab={data => this._handlePressTab(data)}
                              ref='tabs'/>
                <DateFilter onPressFilter={data => this._handlePressFilter(data)} ref='dateFilter'/>
                {this._renderMoneyBand(detail.revenue)}
                <Content
                    padder
                    style={styles.content}
                    onRefresh={() => this._onRefresh()}>
                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            Doanh thu
                        </Text>
                        <View row>
                            <Text strong bold grayDark orange
                                  onPress={() => this._handlePressSumRevenue()}>{formatNumber(detail.revenue)}</Text>
                            <Icon name='foward' style={{fontSize: 20, color: material.orange500}}
                                  onPress={() => this._handlePressSumRevenue()}/>
                        </View>
                    </View>

                    <View style={{marginRight: 20}}>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>Tổng tiền Merchant đã thu:</Text>
                            <Text medium bold grayDark>{formatNumber(detail.mcTotalMoney)}</Text>
                        </View>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>Tổng tiền Clingme đã thu:</Text>
                            <Text medium bold grayDark>{formatNumber(detail.clmTotalMoney)}</Text>
                        </View>
                    </View>

                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            Phí Clingme
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            <Text strong bold grayDark orange>{formatNumber(detail.charge)}</Text>
                        </View>
                    </View>


                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            Đối soát
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            <Text strong bold grayDark
                                  orange>{formatNumber(parseInt(detail.clmTotalMoney) - parseInt(detail.charge))}</Text>
                        </View>
                    </View>

                    <Text medium bold grayDark> Merchant nhận lại từ Clingme </Text>
                    <View row style={{justifyContent: 'center'}}>
                        <Text medium bold grayDark
                              style={{marginHorizontal: 5, alignSelf: 'flex-start'}}>=</Text>
                        <View style={{alignItems: 'center'}}>
                            <Text medium grayDark>Tổng tiền Clingme đã thu</Text>
                            <Text medium bold grayDark>({formatNumber(detail.clmTotalMoney)})</Text>
                        </View>
                        <Text medium bold grayDark
                              style={{marginHorizontal: 2, alignSelf: 'flex-start'}}>-</Text>
                        <View style={{alignItems: 'center'}}>
                            <Text medium grayDark>Phí Clingme đã thu</Text>
                            <Text medium bold grayDark>({formatNumber(detail.charge)})</Text>
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