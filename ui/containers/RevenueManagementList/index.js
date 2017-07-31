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

import I18n from '~/ui/I18n'

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
    }

    componentDidMount() {
        this._loadData();
    }

    componentWillFocus() {
        this._loadData();
    }

    _loadData() {
        let dateFilter = this.refs.dateFilter.getData();
        fromTime = dateFilter.currentSelectValue.value.from;
        toTime = dateFilter.currentSelectValue.value.to;
        option = this.state.currentTab;
        pageNumber = 1;

        const { xsession, getRevenueList } = this.props;

        getRevenueList(xsession, fromTime, toTime, option, pageNumber, (err, data) => {
            // console.warn('get list ' + JSON.stringify(data.data.listRevenueItem));
            this.setState({ data: data.data })

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

        this._loadData();
    }

    _handlePressFilter(data) {
        // console.warn(JSON.stringify(data.currentSelectValue.value));
        this._loadData();
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
        let {tranId, tranCode, tranTime, tranType, userName, userId, moneyAmount} = item

        let type = 'Giao hàng'; // default
        let iconName = 'shiping-bike2'; // default
        let iconColor = material.orange500; // default

        switch (tranType) {
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
                                <Text largeLight bold grayDark>{tranCode}</Text>
                                <Text medium grayDark>{moment(parseInt(tranTime) * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                            </View>

                            <View style={styles.subRow}>
                                <Text medium grayDark>{type}</Text>
                            </View>

                            <View style={styles.subRow}>
                                <Text medium grayDark>{userName}</Text>
                                <Text largeLight grayDark><Text largeLight bold>+{formatNumber(parseInt(moneyAmount))}</Text> đ</Text>
                            </View>
                        </View>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1}/>
                </View>
            </ListItem>
        )
    }

    _getListItem() {
        if (this.state.data) return this.state.data.listRevenueItem;
    }

    _getTotalMoney() {
        if (this.state.data) {
            return this.state.data.totalMoney;
        } else {
            return 0;
        }
    }

    _renderContent() {
        const { data } = this.state;
        if (!this.state.data) return <Text medium bold warning> Data is null! </Text>
        let listItem = this.state.data.listRevenueItem;
        if (!listItem.length) return <Text medium bold warning> {I18n.t('have_no_data')} </Text>
        return (<List dataArray={listItem}
                      renderRow={(item) => {return this._renderItem(item)}}
                      pageSize={10}/>)
    }

    _loadMore() {

    }

    _onRefresh() {
        this._loadData();
    }

    render() {
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={REVENUE_PROCESSING} onPressTab={this._handlePressTab.bind(this)}
                              ref='tabs'/>
                <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter'/>
                {this._renderMoneyBand(this._getTotalMoney())}
                <Content padder onEndReached={() => this._loadMore} onRefresh={()=>this._onRefresh()} refreshing={this.state.loading}>
                    {this._renderContent()}
                </Content>
            </Container>
        )
    }
}