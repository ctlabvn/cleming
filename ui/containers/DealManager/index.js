import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {getListDeal, getDealStatistic} from '~/store/actions/deal'
import material from '~/theme/variables/material'
import DateFilter from "~/ui/components/DateFilter"
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import DealItem from './DealItem'
import moment from 'moment'
import { getSession } from "~/store/selectors/auth"
import {listDealSelector} from '~/store/selectors/deal'
import {getListPlace} from '~/store/selectors/place'
import ListViewExtend from '~/ui/components/ListViewExtend'
@connect(state => ({
    xsession: getSession(state),
    listDeal: listDealSelector(state),
    listPlace: getListPlace(state)
}), {forwardTo, getListDeal, getDealStatistic})

export default class DealManager extends Component {
    constructor(props) {
        super(props)
        this.placeMap = {}
    }

    componentDidMount(){
      const {xsession, getListDeal, app} = this.props
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
        const {app} = this.props
        let dateValue  = item.currentSelectValue.value
        let selectedPlace = app.topDropdown.getValue()
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
          this._load(selectedPlace.id, dateValue.from, dateValue.to)
        }
    }

    _load = (placeId, from, to)=>{
      const {xsession, getListDeal, getDealStatistic} = this.props
      console.log('Get List Deal Statistic', getDealStatistic);
      this.listview.showRefresh(true)
      getListDeal(xsession, placeId, from, to,
        (err, data) => {
          this.listview.showRefresh(false)
        }
      )
      getDealStatistic(xsession, 116014, from, to,
        (err, data) => {
          console.log('Deal Statistic Err', err)
          console.log('Deal Statistic Data', data)
        }
      )
    }

    _loadMore = () => {
      console.log('On Load More DealManager');
    }

    _renderItem = (item) => {
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
      return <DealItem
        image={item.detailPicture}
        name={item.dealName}
        number={item.promoBriefTitle}
        address={address}
        key={item.dealId}
        textLeft={item.promoBriefSmallLeft}
        onPress={()=>forwardTo('dealInfo', {deal: cloneItem})}
      />
    }

    render() {
        const {forwardTo} = this.props
        return (
          <Container style={styles.bgWhite}>
            <DateFilter onPressFilter={this._handlePressFilter} ref={ref=>this.dateFilter=ref} />
            <ScrollView style={styles.container}>
              <View style={{...styles.cardBlock, ...styles.pb10}}>
                <View style={{...styles.row, ...styles.pd15 }}>
                    <View style={styles.moneyItem}>
                      <Text>{I18n.t('revenue')}</Text>
                      <Text medium bold primary>{formatNumber(9500353)} đ</Text>
                    </View>
                    <View style={styles.moneyItem}>
                      <Text medium>{I18n.t('clingme_fee')}</Text>
                      <Text medium bold  primary>{formatNumber(1200000)} đ</Text>
                    </View>
                </View>

                <Border/>
                <View style={{...styles.row}}>
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('approach')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(5700)}</Text>
                      <Text success>&#8593; 42.5%</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('view')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(5700)}</Text>
                      <Text warning>&#8595; 32.5%</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('find_out')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(179)}</Text>
                      <Text warning>&#8593; 8.25%</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('buy')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(57)}</Text>
                      <Text warning>&#8595; 3.25%</Text>
                    </View>
                </View>
                <Border/>
              </View>

              <TouchableWithoutFeedback onPress={()=>forwardTo('transactionList')}>
                <View style={{...styles.row, ...styles.pd10, ...styles.cardBlock}}>
                    <View style={styles.inline}>
                      <Icon name='coin_mark' style={{...styles.icon, ...styles.success, ...styles.mr3}} />
                      <Text>{I18n.t('transaction')}</Text>
                    </View>
                    <View style={styles.inline}>
                      <Text>87</Text>
                      <Icon name='foward' style={styles.icon} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={{...styles.cardBlock, ...styles.pd10,}}>
                <Text bold medium style={styles.mb10}>{I18n.t('page_deal_manager')}</Text>
                <ListViewExtend
                    dataArray={this.props.listDeal}
                    renderRow={(item) => this._renderItem(item)}
                    keyExtractor={item=>item.dealId}
                    onRefresh={this._onRefresh}
                    onItemRef={ref=>this.listview=ref}
                />
              </View>
            </ScrollView>
            <Button style={styles.fabBtn}
              onPress={()=>forwardTo('createDeal')}
              >
                <Text white style={styles.fabBtnText}>+</Text>
            </Button>
          </Container>
        )
    }
}
