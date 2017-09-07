import React, {Component} from 'react'
import {Container, Text, List, Spinner, View, Button} from 'native-base'
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

import { getCheckingDateFilterCurrentSelectValue } from "~/store/selectors/checking";

@connect(state => ({
    xsession: getSession(state),
    data: getCheckingData(state),
    datefiltercurrentvalue: getCheckingDateFilterCurrentSelectValue(state),
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
        const dateFilterData = data.currentSelectValue.value;
        const fromTime = dateFilterData.from;
        const toTime = dateFilterData.to;
        this._load(fromTime, toTime);

        const item = data.currentSelectValue;

        const { setCheckingDateFilterCurrentSelectValue } = this.props;
        setCheckingDateFilterCurrentSelectValue(item);
    }

    _handlePressTab(data) {

    }

    _onRefresh() {
        this._load()
    }

    _handlePressSumRevenue() {
        const item = this.refs.dateFilter.getCurrentSelectValue()

        const { setCheckingDateFilterCurrentSelectValue } = this.props;
        setCheckingDateFilterCurrentSelectValue(item);

        const { datefiltercurrentvalue } =this.props;

        const {forwardTo} = this.props
        forwardTo('transactionHistory');
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

    _gotoCashoutAccount() {
        const {forwardTo} = this.props
        forwardTo('cashoutAccount');
    }

    render() {
        const {data} = this.props;
        const detail = data;
        const clmTotalMoneySubCharge = parseInt(detail.clmTotalMoney) - parseInt(detail.charge)
        const clmTotalMoneySubChargeTextStyle = clmTotalMoneySubCharge > 0 ? styles.textTitle : styles.textTitleBlur;

        const chargeSubClmTotalMoney = (parseInt(detail.charge) - parseInt(detail.clmTotalMoney))
        const chargeSubClmTotalMoneyTextStyle = chargeSubClmTotalMoney > 0 ? styles.textTitle : styles.textTitleBlur;
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={ALL_PLACES_CHECKING}
                              onPressTab={data => this._handlePressTab(data)}
                              ref='tabs'/>
                <DateFilter
                    defaultFilter='month'
                    type='lite-round'
                    onPressFilter={data => this._handlePressFilter(data)}
                    ref='dateFilter'/>

                <Content
                    padder
                    style={styles.content}
                    onRefresh={() => this._onRefresh()}>

                    <View>
                        <Text strong bold green style={styles.title}>{'\x3C'}{I18n.t('checked')}{'\x3E'}</Text>
                        <Border/>
                        <View row style={styles.moneyTitle}>
                            <Text largeLight bold grayDark>{I18n.t('total_revenue')}</Text>
                            <View row>
                                <Text large bold grayDark orange
                                      onPress={() => this._handlePressSumRevenue()}>{formatNumber(detail.revenue)}</Text>
                                <Icon name='foward' style={styles.icon}
                                      onPress={() => this._handlePressSumRevenue()}/>
                            </View>
                        </View>
                    </View>

                    <View style={{marginRight: 20}}>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>{I18n.t('total_money_merchant_get')}</Text>
                            <Text medium bold grayDark>{formatNumber(detail.mcTotalMoney)}</Text>
                        </View>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>{I18n.t('total_money_clingme_get')}</Text>
                            <Text medium bold grayDark>{formatNumber(detail.clmTotalMoney)}</Text>
                        </View>
                    </View>

                    <Border style={styles.marginTop}/>

                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            {I18n.t('clingme_fee')}
                        </Text>
                        <View row>
                            <Text strong bold grayDark orange  onPress={() => this._handlePressSumRevenue()}>{formatNumber(detail.charge)}</Text>
                            <Icon name='foward' style={styles.icon}
                                  onPress={() => this._handlePressSumRevenue()}/>
                        </View>
                    </View>

                    <Border/>

                    <View row style={styles.moneyTitle}>
                        <Text largeLight bold grayDark style={clmTotalMoneySubChargeTextStyle}>
                            {I18n.t('merchant_get_money_from_clingme')}
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            {clmTotalMoneySubCharge > 0
                            && <Text large bold grayDark orange>{formatNumber(clmTotalMoneySubCharge)}</Text>}
                        </View>
                    </View>

                    <View row style={styles.moneyTitle}>
                        <Text largeLight bold style={chargeSubClmTotalMoneyTextStyle}>
                            {I18n.t('clingme_get_money_from_merchant')}
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            {chargeSubClmTotalMoney > 0
                            && <Text large bold grayDark orange>{formatNumber(chargeSubClmTotalMoney)}</Text>}
                        </View>
                    </View>

                </Content>
                <Border color='rgba(0,0,0,0.5)' size={1} style={styles.marginBottom}/>
                <View style={styles.fixButtonBlock}>
                    <Text medium onPress={() => alert('thanh toán Clingme')} gray>{I18n.t('clingme_pay')}</Text>
                    <Text medium onPress={() => this._gotoCashoutAccount()} primary>{I18n.t('cashout_account')}</Text>
                </View>
            </Container>
        )
    }
}