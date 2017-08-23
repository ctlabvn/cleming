import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Container, Text, List, ListItem, Spinner, Button} from 'native-base'

import * as commonAction from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import {getSession} from "~/store/selectors/auth";
import * as transactionAction from "~/store/actions/transaction";
import {getHistoryListTransaction} from "~/store/selectors/transaction";

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
import {
    TIME_FORMAT_WITHOUT_SECOND,
    DEFAULT_TIME_FORMAT
} from "~/store/constants/app";

import apiChecking from '~/store/api/checking'

import I18n from '~/ui/I18n'

const TYPE_PLACE = 1
const TYPE_ITEM = 2
const TYPE_SEE_MORE = 3

@connect(state => ({
    xsession: getSession(state),
    data: getHistoryListTransaction(state),
}), {...transactionAction, ...commonAction})

export default class extends Component {

    constructor(props) {
        super(props);
        const {app} = props

        let selectedPlace = app.topDropdown ? props.app.topDropdown.getValue() : null;

        this.state = {
            currentTab: MERCHANT_COLLECTED,
            placeId: selectedPlace? selectedPlace.placeId : null,
            fromTime: null,
            toTime: null,
            loading: false,
        }

    }

    _load(placeId=this.state.placeId, fromTime=this.state.fromTime, toTime=this.state.toTime, option=this.state.currentTab, pageNumber = 0) {
        const {getTransactionHistoryList, xsession} = this.props;
        getTransactionHistoryList(xsession, placeId, fromTime, toTime, option, (err, data) => {})
    }

    componentDidMount() {
        const {app} = this.props;
        app.topDropdown.setCallbackPlaceChange(data => this._handleTopDrowpdown(data))

        const dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value;
        fromTime = dateFilterData.from;
        toTime = dateFilterData.to;

        this.setState({
            fromTime: fromTime,
            toTime: toTime,
        }, ()=> this._load())
    }

    _handleTopDrowpdown(data) {
        if (data && data.id) this.setState({
            placeId: data.id
        },()=>this._load());
        else (this._load());
    }

    _handlePressFilter(data) {
        fromTime = data.currentSelectValue.value.from;
        toTime = data.currentSelectValue.value.to;

        this.setState({
            fromTime: fromTime,
            toTiem: toTime,
        }, ()=> this._load())
    }

    _handlePressTab(data) {
        switch (data.tabID) {
            case MERCHANT_COLLECTED:
                this.setState({
                    currentTab: MERCHANT_COLLECTED,
                }, () => this._load());
                break;
            case CLINGME_COLLECTED:
                this.setState({
                    currentTab: CLINGME_COLLECTED,
                }, () => this._load());
                break;
        }
    }

    _onRefresh() {

    }

    _renderMoneyBand() {
        const {data} = this.props;
        if (!data) return;

        let moneyTitle;
        if (this.state.currentTab == MERCHANT_COLLECTED) {
            moneyTitle = 'Tổng tiền [Merchant] đã thu'
        } else {
            moneyTitle = 'Tổng tiền Clingme đã thu'
        }

        return (
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                <View row style={styles.moneyBand}>
                    <Text medium grayDark>{moneyTitle}</Text>
                    <Text largeLight green bold>{formatNumber(data.totalMoney)} đ</Text>
                </View>
                <View row style={styles.moneyBand}>
                    <Text medium grayDark>Phí Clingme</Text>
                    <Text largeLight bold grayDark>{formatNumber(data.charge)} đ</Text>
                </View>
            </View>
        )
    }

    _loadMore() {
        // alert('đang tải ...');
        return 1;
    }

    _onRefresh() {

    }

    _handleSeeMore(item) {
        alert('xem thêm ' + JSON.stringify(item))
    }

    _renderBookingItem(item) {
        if (item.seeMore)
            return (
                <View>
                    <Button transparent gray bordered small rounded style={styles.button}
                            onPress={() => this._handleSeeMore(item)}>
                        <Text small>
                            xem thêm
                        </Text>
                    </Button>
                </View>
            )

        if (item.placeId)
            return (
                <View>
                    <Border/>
                    <Text medium bold grayDark style={{paddingHorizontal: 20, paddingVertical: 5}}>
                        {item.placeAddress}: 9.999.999 đ
                    </Text>
                </View>
            )

        if (item.tranId) {
            let status;
            switch (item.tranType) {
                case 0:
                    status = 'Cashback thành công'
                    break;
                case 1:
                    status = 'Giao thành công'
                    break;
                case 2:
                    status = 'Đã xác nhận'
                    break;
            }

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
                                <Text medium bold grayDark>#{item.tranCode}</Text>
                                <Text medium grayDark>{moment(item.tranTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                            </View>

                            <View row style={styles.subRow}>
                                <Text medium orange>{status} {item.tranType}</Text>
                                <Text medium bold grayDark>{item.moneyAmount} đ</Text>
                            </View>

                            <View row style={styles.subRow}>
                                <Text medium grayDark>Phí Clingme</Text>
                                <Text medium bold grayDark>{item.charge} đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }

    }

    _parseListPlaceTran(listPlaceTran) {
        var result = [];
        if (listPlaceTran) listPlaceTran.map((item, index) => {
            if (item.listTransactionDto.length != 0) {
                result.push({placeId: item.placeId, placeAddress: item.placeAddress})
                result = result.concat(item.listTransactionDto);
                result.push({placeId: item.placeId,
                    placeAddress: item.placeAddress,
                    seeMore: true,
                    placeIndex: index,
                    flag: result[result.length-1]})
            }
        })

        console.log('test arr ' + JSON.stringify(result));
        return result;
    }

    render() {

        const { data } = this.props;

        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={this.state.currentTab}
                              onPressTab={data => this._handlePressTab(data)}
                              ref='tabs'/>
                <DateFilter onPressFilter={data => this._handlePressFilter(data)} ref='dateFilter'/>
                {this._renderMoneyBand()}
                {data && <ListViewExtend
                    style={{flex: 1}}
                    onItemRef={ref => this.listview = ref}
                    onEndReached={() => this._loadMore()}
                    keyExtractor={item => item.item}
                    onRefresh={() => this._onRefresh()}
                    dataArray={this._parseListPlaceTran(data.listPlaceTran)}
                    renderRow={(item) => this._renderBookingItem(item)}
                />}


            </Container>
        )
    }
}