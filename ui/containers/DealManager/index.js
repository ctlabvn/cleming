import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, ActivityIndicator, RefreshControl, Animated, ListView} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {getListDeal, getDealStatistic, updateDateFilter, markReloadDealManager, getTransactionNumber, getBasicStatistic} from '~/store/actions/deal'
import material from '~/theme/variables/material'
import DateFilter from "~/ui/components/DateFilter"
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import DealItem from './DealItem'
import moment from 'moment'
import { getSession } from "~/store/selectors/auth"
import {listDealSelector, dateFilterSelector, viewOverviewSelector, dealReloadSelector, transactionNumberSelector, basicStatisticSelector} from '~/store/selectors/deal'
import {getListPlace} from '~/store/selectors/place'
import ListViewExtend from '~/ui/components/ListViewExtend'
@connect(state => ({
    xsession: getSession(state),
    listDeal: listDealSelector(state),
    viewOverview: viewOverviewSelector(state),
    currentDateFilter: dateFilterSelector(state),
    listPlace: getListPlace(state),
    reload: dealReloadSelector(state),
    transactionNumber: transactionNumberSelector(state),
    basicStatistic: basicStatisticSelector(state)
}), {forwardTo, getListDeal, getDealStatistic, updateDateFilter, markReloadDealManager, getTransactionNumber, getBasicStatistic})

export default class DealManager extends Component {
    constructor(props) {
        super(props)
        this.placeMap = {}
        this.state = {
          refreshing: false,
          scrollValue: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.reload){
        const {xsession, app, markReloadDealManager} = this.props
        const dateValue = this.dateFilter.getData().currentSelectValue.value
        let selectedPlace = app.topDropdown.getValue()
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
          this._load(selectedPlace.id, dateValue.from, dateValue.to)
        }
        markReloadDealManager(false)
      }
    }

    componentDidMount(){
      const {xsession, app} = this.props
      app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
      const dateValue = this.dateFilter.getData().currentSelectValue.value
      let selectedPlace = app.topDropdown.getValue()
      if (selectedPlace && Object.keys(selectedPlace).length > 0) {
        this._load(selectedPlace.id, dateValue.from, dateValue.to)
      }
    }

    componentWillFocus(){
      const {app} = this.props
      app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
    }

    _handleTopDrowpdown = (item) => {
      const dateValue = this.dateFilter.getData().currentSelectValue.value
      this._load(item.id, dateValue.from, dateValue.to)
    }

    _handlePressFilter = (item) => {
        const {app, updateDateFilter} = this.props
        updateDateFilter(item.currentDateFilter)
        let dateValue  = item.currentSelectValue.value
        let selectedPlace = app.topDropdown.getValue()
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
          this._load(selectedPlace.id, dateValue.from, dateValue.to)
        }
    }

    _load = (placeId, from, to, refreshing=false)=>{
      const {xsession, getListDeal, getDealStatistic, getTransactionNumber, getBasicStatistic} = this.props
      refreshing && this.setState({refreshing: true})
      if (placeId == 0) placeId = ''
      getListDeal(xsession, placeId, from, to)
      getDealStatistic(xsession, '', placeId, from, to,
        (err, data) => {
          refreshing && this.setState({refreshing: false})
        }
      )
      getBasicStatistic(xsession, placeId, from, to)
      getTransactionNumber(xsession, placeId, from, to)

    }

    _onRefresh = () => {
      console.log('On refreshing');
      const {xsession, app} = this.props
      const dateValue = this.dateFilter.getData().currentSelectValue.value
      let selectedPlace = app.topDropdown.getValue()
      if (selectedPlace && Object.keys(selectedPlace).length > 0) {
        this._load(selectedPlace.id, dateValue.from, dateValue.to, true)
      }
    }

    _loadMore = () => {
      console.log('On Load More DealManager');
    }

    _renderItem = (item, sectionID, rowID) => {
      const {forwardTo} = this.props
      let address = ''
      if (this.placeMap[item.placeId]){
        address = this.placeMap[item.placeId].address
      }else{
        let foundItem = this.props.listPlace.filter(loopItem => loopItem.placeId == item.placeId)[0]
        address = foundItem['address']
        this.placeMap[item.placeId] = foundItem
      }
      let cloneItem = Object.assign({}, item)
      cloneItem.address = address
      return (
        <View style={{backgroundColor: 'white', marginLeft: 5, marginRight: 5, padding: 5, 
              borderTopLeftRadius: (rowID==0)? 3:0,
              borderTopRightRadius: (rowID==0)? 3:0,
              borderBottomLeftRadius: (rowID == this.props.listDeal.length-1)? 3:0,
              borderBottomRightRadius: (rowID == this.props.listDeal.length-1)? 3:0
        }}>
          {(rowID==0)
            && <Text bold medium style={styles.mb10}>{I18n.t('page_deal_manager')}</Text>
          }
          <DealItem
            image={item.detailPicture}
            name={item.dealName}
            number={item.promoBriefTitle}
            address={address}
            key={item.dealId}
            textLeft={item.promoBriefSmallLeft}
            fromDate={item.fromDate}
            toDate={item.toDate}
            status={item.status}
            promoType={item.promoType}
            onPress={()=>forwardTo('dealInfo', {deal: cloneItem})}
            style={{marginBottom: 15, borderRadius: 3}}
          />
        </View>
      ) 
    }

    _formatIncreaseDecrease = (number) => {
      if (number == undefined) return false
      if (number >=0) return  <Text success>&#8593; {Math.abs(number).toFixed(2)}%</Text>
      else return <Text warning>&#8595; {Math.abs(number).toFixed(2)}%</Text>
    }

    _toFixed = (number) => {
      if (number == undefined) return false
      return number.toFixed(2)
    }

    _forwardToTransList = () => {
      const {forwardTo, currentDateFilter, app} = this.props
      let selectedPlace = app.topDropdown.getValue()
      let dateFilter = this.dateFilter.getData()
      forwardTo('transactionList', {from: 'dealManager', dateFilter, selectedPlace})
    }

    _renderHeader = () => {
      const {forwardTo, currentDateFilter, viewOverview, transactionNumber, basicStatistic} = this.props
      return (
        <View style={{...styles.bgWhite, marginLeft: 5, marginRight: 5, marginBottom: 5, borderRadius: 3}}>
          <View style={{...styles.pb10}}>
                <View style={{...styles.row, ...styles.pd15 }}>
                    <View style={styles.moneyItem}>
                      <Text>{I18n.t('money_number')}</Text>
                      <Text medium bold primary>{formatNumber(viewOverview.totalMoney)} đ</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={this._forwardToTransList}>
                      <View style={styles.moneyItem}>
                        <View style={styles.inline}>
                          <Text medium>{I18n.t('transaction')}</Text>
                          <Icon name='foward' style={styles.icon} />
                        </View>
                        <Text medium bold  primary>{transactionNumber>0?transactionNumber: 0}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{...styles.row, ...styles.pd15 }}>
                    <View style={styles.moneyItem}>
                      <Text>{I18n.t('clingme_fee')}</Text>
                      <Text medium bold primary>{formatNumber(viewOverview.charge)} đ</Text>
                    </View>
                    <View style={styles.moneyItem}>
                      <Text medium>{I18n.t('roi')}</Text>
                      <Text medium bold  primary>{this._toFixed(viewOverview.roi)} %</Text>
                    </View>
                </View>

                <Border/>
                <View style={{...styles.row}}>
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('approach')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(basicStatistic.placeInteract)}</Text>
                      <Text success>{this._formatIncreaseDecrease(basicStatistic.growthPlaceInteract)}</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('view')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(basicStatistic.placeView)}</Text>
                      <Text warning>{this._formatIncreaseDecrease(basicStatistic.growthPlaceView)}</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('find_out')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(basicStatistic.placeReach)}</Text>
                      <Text warning>{this._formatIncreaseDecrease(basicStatistic.growthPlaceReach)}</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('buy')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(basicStatistic.interestCustomer)}</Text>
                      <Text warning>{this._formatIncreaseDecrease(basicStatistic.growthInterestCustomer:0)}</Text>
                    </View>
                </View>
                <Border/>
              </View>
        </View>
      )
    }

    render() {
        const {forwardTo, currentDateFilter, viewOverview, transactionNumber, basicStatistic} = this.props
        return (
          <Container style={styles.container}>
            <DateFilter defaultFilter={currentDateFilter} onPressFilter={this._handlePressFilter} ref={ref=>this.dateFilter=ref} />
            {/*<Animated.ScrollView style={styles.container}
              refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
              onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollValue } } }],
                    { useNativeDriver: true } // <-- Add this
                )}
              >
              </Animated.ScrollView>
            */}
          
            <ListViewExtend
              renderHeader={this._renderHeader}
              dataArray={this.props.listDeal}
              renderRow={(item, sectionID, rowID) => this._renderItem(item, sectionID, rowID)}
              onRefresh={this._onRefresh}
              onEndReachedThreshold={10}
              style={{margin: 5, borderRadius: 3}}
            />

            <TouchableWithoutFeedback onPress={()=>forwardTo('createDeal', {mode: 'new'})}>
              <Animated.View style={{
                ...styles.fabBtn,
                opacity: this.state.scrollValue.interpolate({
                    inputRange: [0, 60],
                    outputRange: [1, 0],
                }),
                transform: [{
                    translateY: this.state.scrollValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                }]
              }}>
                  <Text white style={styles.fabBtnText}>+</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Container>
        )
    }
}
