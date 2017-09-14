import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Container, Text, List, ListItem, Spinner, Button} from 'native-base'
import { TouchableHighlight } from 'react-native'

import * as commonAction from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import {getSession} from "~/store/selectors/auth";
import { setCheckingDateFilterCurrentSelectValue } from "~/store/actions/checking";
import * as transactionAction from "~/store/actions/transaction";
import {getHistoryListTransaction} from "~/store/selectors/transaction";
import { getCheckingDateFilterCurrentSelectValue } from "~/store/selectors/checking";

import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'

import ListViewExtend from '~/ui/components/ListViewExtend'

import styles from './styles'
import options from './options'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import Content from "~/ui/components/Content";

import TopDropdownAllPlace from '~/ui/components/TopDropdownAllPlace'
import {getListPlace} from'~/store/selectors/place'

import {formatNumber} from "~/ui/shared/utils";
import {MERCHANT_COLLECTED, CLINGME_COLLECTED} from '~/store/constants/app'

import moment from "moment";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    DEFAULT_TIME_FORMAT
} from "~/store/constants/app";

import apiChecking from '~/store/api/checking'

import I18n from '~/ui/I18n'

const TYPE_PLACE = 1
const TYPE_ITEM = 2
const TYPE_SEE_MORE = 3

const FIRST_LEVEL_SHOW = 2
const SECOND_LEVEL_SHOW = 10

@connect(state => ({
    xsession: getSession(state),
    data: getHistoryListTransaction(state),
    listPlace: getListPlace(state),
    checkingDateFilterCurrentSelectValue: getCheckingDateFilterCurrentSelectValue(state),
}), {...transactionAction, ...commonAction, setCheckingDateFilterCurrentSelectValue})

export default class extends Component {

    constructor(props) {
        super(props);
        const {app} = props

        let selectedPlace = app.topDropdown ? props.app.topDropdown.getValue() : null;

        const {data} = props;
        const totalHistoryList = this._parseListPlaceTran(data.listPlaceTran)
        const historyList = this._getArray(totalHistoryList)

        this.state = {
            currentTab: MERCHANT_COLLECTED,
            placeId: selectedPlace ? selectedPlace.placeId : null,
            fromTime: null,
            toTime: null,
            loading: false,
            totalHistoryList: totalHistoryList,
            historyList: historyList,
        }

    }

    _load(placeId = this.state.placeId, fromTime = this.state.fromTime, toTime = this.state.toTime, option = this.state.currentTab, pageNumber = 0) {
        const {getTransactionHistoryList, xsession} = this.props;
        // get All place when placeId == null

        // this.setState({
        //     loading: true,
        // })
        // this.listview.showRefresh(true)
        getTransactionHistoryList(xsession, placeId == 0 ? null : placeId, fromTime, toTime, option, (err, data) => {
            // this.setState({
            //     loading: false,
            //     updateHistoryList: true,
            // })
            // this.listview.showRefresh(false)
        })
        // getTransactionHistoryList(xsession, placeId, fromTime, toTime, option, (err, data) => {})
    }

    _setDateFilterCurrentSelectValue(){
        const {checkingDateFilterCurrentSelectValue} = this.props;

        this.refs.dateFilter.setCurrentSelectValue(checkingDateFilterCurrentSelectValue);

        // const dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value;
        // console.warn('3.1.1. dateFilterData' + JSON.stringify(dateFilterData));

        fromTime = checkingDateFilterCurrentSelectValue.value.from;
        toTime = checkingDateFilterCurrentSelectValue.value.to;

        // fromTime = dateFilterData.from;
        // toTime = dateFilterData.to;

        this.setState({
            fromTime: fromTime,
            toTime: toTime,
        }, () => this._load())
    }

    componentWillFocus() {
        this._setDateFilterCurrentSelectValue();
    }

    componentDidMount() {
        const {app} = this.props;
        app.topDropdown.setCallbackPlaceChange(data => this._handleTopDrowpdown(data))

        this._setDateFilterCurrentSelectValue();

        // const dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value;
        // fromTime = dateFilterData.from;
        // toTime = dateFilterData.to;
        //
        // this.setState({
        //     fromTime: fromTime,
        //     toTime: toTime,
        // }, () => this._load())
    }

    _handleTopDrowpdown(data) {
        if (data && data.id) this.setState({
            placeId: data.id
        }, () => this._load());
        else (this._load());
    }

    _handlePressFilter(data) {
        // console.warn('handlePressfilter data' + JSON.stringify(data))
        fromTime = data.currentSelectValue.value.from;
        toTime = data.currentSelectValue.value.to;

        this.setState({
            fromTime: fromTime,
            toTime: toTime,
        }, () => this._load())

        const item = data.currentSelectValue;

        const { setCheckingDateFilterCurrentSelectValue } = this.props;
        setCheckingDateFilterCurrentSelectValue(item);
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
            moneyTitle = I18n.t('total_money_merchant_get')
        } else {
            moneyTitle = I18n.t('total_money_clingme_get')
        }

        return (
            <View style={styles.moneyBandContainer}>
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
        this._load();
    }

    _handleSeeMore(item) {
        if (item.flagList) item.flagList.levelList = item.flagList.levelList + 1;
        // item.numberItemHidding = 0;
        const newHistoryList = this._getArray(this.state.totalHistoryList)
        this.setState({
            historyList: newHistoryList,
        })
    }

    _handlePressItem(item) {
        /*
        below is API "tran-list"
        "tranType": int, // 1 là trả qua Clm, 2 là trả trực tiếp, 3 là order

        below is API "transaction-history"
        "tranType": int  // 0 là giao dịch trực tiếp, 1 là order, 2 là trả qua clingme
        **/
        const { forwardTo } = this.props;
        switch (item.tranType) {
            case 0:
                forwardTo('transactionDetail', {id: item.tranId, type: 2})
                break;
            case 1:
                forwardTo('transactionDetail', {id: item.tranId, type: 3})
                break;
            case 2:
                forwardTo('transactionDetail', {id: item.tranId, type: 1})
                break;
        }

    }

    _renderTransactionItem(item) {
        console.log('render Row Item');
        if (item.seeMore) {
            // const numberItemHidding = 'xem thêm (' + item.numberItemHidding + ')';
            if (item.flagList.levelList > 1) return null;

            let numberItemHidding = 0;
            if (item.flagList.levelList == 0 && item.totalItem > FIRST_LEVEL_SHOW) numberItemHidding = item.totalItem - FIRST_LEVEL_SHOW;
            if (item.flagList.levelList == 1 && item.totalItem > SECOND_LEVEL_SHOW) numberItemHidding = item.totalItem - SECOND_LEVEL_SHOW;

            if (numberItemHidding <= 0) return null;

            let buttonContent = 'xem thêm (' + numberItemHidding + ')';
            return (
                <View>
                    <Button transparent gray bordered small rounded style={styles.button}
                            onPress={() => this._handleSeeMore(item)}>
                        <Text small blue>
                            {buttonContent}
                        </Text>
                    </Button>
                </View>
            )
        }

        if (item.placeId) {
            // console.log(JSON.stringify(item));
            return (
                <View style={styles.center}>
                    <Border/>
                    <Text medium bold grayDark style={styles.textPlaceTitle}>
                        {item.placeAddress}
                    </Text>
                    <Text medium strong bold grayDark style={styles.numberPlaceTitle}>
                        {formatNumber(item.totalMoney)} đ
                    </Text>
                </View>
            )
        }

        if (item.tranId) {
            if (item.level > item.flagList.levelList) return null;
            let status;
            let iconName = 'coin_mark';
            switch (item.tranType) {
                case 0:
                    status = I18n.t('cashback_success')
                    iconName = 'coin_mark';
                    break;
                case 1:
                    status = I18n.t('delivery_success')
                    iconName = 'shiping-bike2';
                    break;
                case 2:
                    status = I18n.t('confirmed')
                    iconName = 'clingme-wallet';
                    break;
            }

            return (
                <View>

                        <Border/>

                    <TouchableHighlight
                        underlayColor={material.gray200}
                        onPress={()=> this._handlePressItem(item)}>
                        <View row style={styles.item}>
                            <Icon name={iconName}
                                  style={styles.itemIcon}/>
                            <View style={styles.groupRow}>
                                <View row style={styles.subRow}>
                                    <Text medium bold
                                          grayDark>{item.tranCode && (item.tranCode.indexOf('#') ? '#' : '')}{item.tranCode}</Text>
                                    <Text medium
                                          grayDark>{moment(item.tranTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                                </View>

                                <View row style={styles.subRow}>
                                    <Text medium orange>{status}</Text>
                                    <Text medium bold grayDark>{item.moneyAmount} đ</Text>
                                </View>

                                <View row style={styles.subRow}>
                                    <Text medium grayDark>{I18n.t('clingme_fee')}</Text>
                                    <Text medium bold grayDark>{item.charge} đ</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }

        if (item.notification) return (
            <Text meium bold style={{alignSelf: 'center'}}>{item.notification}</Text>
        )
    }

    _parseListPlaceTran(listPlaceTran) {
        var result = [];
        if (listPlaceTran) listPlaceTran.map((item, index) => {
            if (item.listTransactionDto.length != 0) {
                // console.warn('will show place ' + JSON.stringify(item));
                let flagList = {placeId: item.placeId, levelList: 0}

                if (this.state && this.state.placeId && this.state.placeId > 0) {
                    flagList.levelList = 99;
                }

                if (this.state && (!this.state.placeId || this.state.placeId == 0)) {
                    result.push({
                        keyExtractor: result.length,
                        placeId: item.placeId,
                        placeAddress: item.placeAddress,
                        totalMoney: item.totalMoney,
                        flagList: flagList
                    })
                }
                // result = result.concat(item.listTransactionDto.slice(0,2));
                item.listTransactionDto.map((value, index) => {
                    if (index < FIRST_LEVEL_SHOW) {
                        // console.warn(JSON.stringify(value));
                        result.push({
                            ...value,
                            level: 0,
                            flagList: flagList,
                            keyExtractor: result.length,
                        })

                    }
                    else if (index < SECOND_LEVEL_SHOW) result.push({
                        ...value,
                        level: 1,
                        flagList: flagList,
                        keyExtractor: result.length,
                    })
                    else result.push({
                            ...value,
                            level: 2,
                            flagList: flagList,
                            keyExtractor: result.length,
                        })
                })

                if (item.listTransactionDto.length - FIRST_LEVEL_SHOW > 0) {
                    result.push({
                        placeId: item.placeId,
                        placeAddress: item.placeAddress,
                        seeMore: true,
                        placeIndex: index,
                        flagList: flagList,
                        totalItem: item.listTransactionDto.length,
                        keyExtractor: result.length,
                    })
                }
            }
        })

        console.log('test arr ' + JSON.stringify(result));
        return result;
    }

    _getArray(totalHistoryList) {
        // let listPlaceTranParsed = totalHistoryList;
        if (totalHistoryList.length == 0) return [{notification: 'Danh sách rỗng.'}]
        // return listPlaceTranParsed;
        let result = [];
        totalHistoryList.map((item, index) => {
            if (item.seeMore && item.flagList.levelList <= 1) {

                let numberItemHidding = 0;
                if (item.flagList.levelList == 0 && item.totalItem > FIRST_LEVEL_SHOW) numberItemHidding = item.totalItem - FIRST_LEVEL_SHOW;
                if (item.flagList.levelList == 1 && item.totalItem > SECOND_LEVEL_SHOW) numberItemHidding = item.totalItem - SECOND_LEVEL_SHOW;

                if (numberItemHidding > 0) result.push({...item});
            } else if (item.placeId || (item.level <= item.flagList.levelList)) {
                result.push({...item})
            }
        })

        return result;
    }

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        const newTotalHistoryList = this._parseListPlaceTran(data.listPlaceTran)
        const newHistoryList = this._getArray(newTotalHistoryList)
        this.setState({
            totalHistoryList: newTotalHistoryList,
            historyList: newHistoryList
        })
    }

    _getListPlace() {
        const {listPlace} = this.props
        // console.warn('test '+JSON.stringify(listPlace))
        newListPlace = Array.from(listPlace);
        const itemAll = {placeId: 0, name: I18n.t('all_places'), address: I18n.t('all_places')}
        newListPlace.splice(0, 0, itemAll);
        return newListPlace;
    }

    _handleSelectPlace(item) {
        // console.warn(JSON.stringify(item))
        this.setState({
            placeId: item.placeId,
        }, () => this._load());
    }

    render() {
        const {data} = this.props;

        const listPlace = this._getListPlace();

        return (
            <Container style={styles.container}>
                <View style={styles.spaceView}/>
                <TabsWithNoti tabData={options.tabData} activeTab={this.state.currentTab}
                              onPressTab={data => this._handlePressTab(data)}
                              ref='tabs'/>
                <DateFilter
                    defaultFilter='month'
                    type='lite-round'
                    onPressFilter={data => this._handlePressFilter(data)}
                    ref='dateFilter'/>
                {this._renderMoneyBand()}
                {data && <ListViewExtend
                    style={styles.listViewExtend}
                    onItemRef={ref => this.listview = ref}
                    onEndReached={() => this._loadMore()}
                    keyExtractor={item => item.keyExtractor}
                    onRefresh={() => this._onRefresh()}
                    dataArray={this.state.historyList}
                    renderRow={(item) => this._renderTransactionItem(item)}
                    rowHasChanged={true}
                />}
                <TopDropdownAllPlace
                    dropdownValues={listPlace}
                    onSelect={item => this._handleSelectPlace(item)}
                />
            </Container>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        this.listview.showRefresh(false);
    }
}