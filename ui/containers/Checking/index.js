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
import DateFilterPeriod from './DateFilterPeriod'

@connect(state => ({
    xsession: getSession(state),
    data: getCheckingData(state),
    checking: state.checking,
    datefiltercurrentvalue: getCheckingDateFilterCurrentSelectValue(state),
}), {...commonActions, ...checkingActions})

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currenTab: ALL_PLACES_CHECKING,
            detail: {}
        }
    }

    componentDidMount() {
        this._load();
    }

    _handlePressFilter(data, needSet=true) {
        console.log('Change Period', data);
        const {setCheckingPeriod} = this.props
        let index = this.props.checking.listCompareCheckDt.findIndex (item=>item.compareId==data.id)
        let detail = Object.assign({}, this.props.checking.listCompareCheckDt[index])
        this.setState({detail: detail})
        needSet && setCheckingPeriod(data.id)
    }

    _handlePressTab(data) {

    }

    _onRefresh() {
        this._load()
    }
    _loadMore = () => {
      const {checking} = this.props
      console.log('Trigger Load More', checking);
      if (checking.pageNumber >= checking.totalPage) return
      this._load(checking.pageNumber+1)

    }
    _handlePressSumRevenue() {
        // const item = this.refs.dateFilter.getCurrentSelectValue()

        // const { setCheckingDateFilterCurrentSelectValue } = this.props;
        // setCheckingDateFilterCurrentSelectValue(item);
        //
        // const { datefiltercurrentvalue } =this.props;

        const {forwardTo} = this.props
        forwardTo('transactionHistory');
    }



    _load(page=1) {
        const {xsession, getCheckingDetail} = this.props;
        // if (!fromTime && !toTime) {
        //     const dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value;
        //     fromTime = dateFilterData.from;
        //     toTime = dateFilterData.to;
        // }

        getCheckingDetail(xsession, page, (err, data) => {
          console.log('Err Checking', err);
          console.log('Data Checking', data);
        });
    }

    _gotoCashoutAccount() {
        const {forwardTo} = this.props
        forwardTo('cashoutAccount');
    }

    _generateDataForDateFilterPeriod = () => {
      const {checking} = this.props
      // console.log('Checking', checking);
      if (checking && checking.listCompareCheckDt){
        return checking.listCompareCheckDt.map(item => ({
          id: item.compareId,
          type: item.cycleType,
          fromTime: item.fromTime,
          toTime: item.toTime
        }))
      }
      return []
    }

    render() {
        const {data} = this.props;
        const {detail} = this.state
        const clmTotalMoneySubCharge = parseInt(detail.clmMoneyCollected) - parseInt(detail.clmCharge)
        const clmTotalMoneySubChargeTextStyle = clmTotalMoneySubCharge > 0 ? styles.textTitle : styles.textTitleBlur;
        const chargeSubClmTotalMoney = (parseInt(detail.clmCharge) - parseInt(detail.clmMoneyCollected))
        const chargeSubClmTotalMoneyTextStyle = chargeSubClmTotalMoney > 0 ? styles.textTitle : styles.textTitleBlur;
        //"status": int,			// 2 là đang đối soát, 3 là đã đối soát
        let colorStyle = (detail.status == 2) ? styles.warning : styles.success
        let checkText = (detail.status == 2) ? I18n.t('not_checking_yet') : I18n.t('checked')
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={ALL_PLACES_CHECKING}
                              onPressTab={data => this._handlePressTab(data)}
                              ref='tabs'/>

                <DateFilterPeriod data={this._generateDataForDateFilterPeriod()} onChangeDate={data => this._handlePressFilter(data)}
                  loadMore={this._loadMore} select={this.props.checking.checkingPeriod}
                />
                <Content
                    padder
                    style={styles.content}
                    onRefresh={() => this._onRefresh()}>

                    <View>
                        <Text strong bold style={{...styles.title, ...colorStyle}}>{'\x3C'}{checkText}{'\x3E'}</Text>
                        <Border/>
                        <View row style={styles.moneyTitle}>
                            <Text strong bold grayDark>{I18n.t('total_revenue')}</Text>
                            <View row>
                                <Text strong bold grayDark style={{...colorStyle}}
                                      onPress={() => this._handlePressSumRevenue()}>{formatNumber(detail.mcMoneyCollected+detail.clmMoneyCollected)}</Text>
                                <Icon name='foward' style={{...styles.icon, ...colorStyle}}
                                      onPress={() => this._handlePressSumRevenue()}/>
                            </View>
                        </View>
                    </View>

                    <View style={{marginRight: 20}}>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>{I18n.t('total_money_merchant_get')}</Text>
                            <Text medium bold grayDark>{formatNumber(detail.mcMoneyCollected)}</Text>
                        </View>
                        <View row style={styles.moneyContent}>
                            <Text medium grayDark>{I18n.t('total_money_clingme_get')}</Text>
                            <Text medium bold grayDark>{formatNumber(detail.clmMoneyCollected)}</Text>
                        </View>
                    </View>

                    <Border style={styles.marginTop}/>

                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark>
                            {I18n.t('clingme_fee')}
                        </Text>
                        <View row>
                            <Text strong bold grayDark style={{...colorStyle}}  onPress={() => this._handlePressSumRevenue()}>{formatNumber(detail.clmCharge)}</Text>
                            <Icon name='foward' style={{...styles.icon, ...colorStyle}}
                                  onPress={() => this._handlePressSumRevenue()}/>
                        </View>
                    </View>

                    <Border/>

                    <View row style={styles.moneyTitle}>
                        <Text strong bold grayDark style={clmTotalMoneySubChargeTextStyle}>
                            {I18n.t('merchant_get_money_from_clingme')}
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            {clmTotalMoneySubCharge > 0
                            && <Text strong bold grayDark style={{...colorStyle}}>{formatNumber(clmTotalMoneySubCharge)}</Text>}
                        </View>
                    </View>

                    <View row style={styles.moneyTitle}>
                        <Text strong bold style={chargeSubClmTotalMoneyTextStyle}>
                            {I18n.t('clingme_get_money_from_merchant')}
                        </Text>
                        <View row style={styles.moneyNoIcon}>
                            {chargeSubClmTotalMoney > 0
                            && <Text strong bold grayDark style={{...colorStyle}}>{formatNumber(chargeSubClmTotalMoney)}</Text>}
                        </View>
                    </View>

                </Content>
                {/* <Border color='rgba(0,0,0,0.5)' size={1} style={styles.marginBottom}/> */}
                {/* <View style={styles.fixButtonBlock}>
                    <Text medium onPress={() => alert('thanh toán Clingme')} gray>{I18n.t('clingme_pay')}</Text>
                    <Text medium onPress={() => this._gotoCashoutAccount()} primary>{I18n.t('cashout_account')}</Text>
                </View> */}
            </Container>
        )
    }
}
