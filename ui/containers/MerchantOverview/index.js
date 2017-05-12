import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Content, Container } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonActions from '~/store/actions/common'
import * as placeAction from '~/store/actions/place'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import moment from 'moment'
import { storeTransparent } from '~/assets'
import { formatNumber } from '~/ui/shared/utils'
import LinearGradient from 'react-native-linear-gradient'

@connect(state => ({
    user: state.auth.user,
    place: state.place
}), { ...commonActions, ...placeAction })
export default class MerchantOverview extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let dateFilterData = this.refs.dateFilter.getData()
        this.props.getListPlace(this.props.user.xsession, (err, data) => {
            let toTime = moment(new Date())
            if(data && data.updated && data.updated.listPlace){
                var allPlace = data.updated.listPlace.map(item => item.placeId).join(';')
                this.props.getPlaceStatistic(
                  this.props.user.xsession,
                  allPlace,
                  dateFilterData.currentSelectValue.value.from,
                  dateFilterData.currentSelectValue.value.to)
                this.props.getMerchantNews(
                    this.props.user.xsession,
                    allPlace,
                    dateFilterData.currentSelectValue.value.from,
                    dateFilterData.currentSelectValue.value.to)
            }
        })
    }

    componentWillFocus(){
        console.log('focus')
    }

    _handleChangePlace(item) {
        const { place } = this.props
        let dateFilterData = this.refs.dateFilter.getData()
        this.props.getPlaceStatistic(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to)
        this.props.getMerchantNews(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to)
    }
  
    _handlePressFilter(item) {
        // this.setState({ loading: true })
      let currentPlace = this.refs.placeDropdown.getValue()
      this.props.getPlaceStatistic(
        this.props.user.xsession,
        currentPlace.id,
        item.currentSelectValue.value.from,
        item.currentSelectValue.value.to)
      this.props.getMerchantNews(
        this.props.user.xsession,
        currentPlace.id,
        item.currentSelectValue.value.from,
        item.currentSelectValue.value.to)
    }
    
    renderLoading() {
      return (
        <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <ActivityIndicator
              size="large"
            />
            <Text>Loading...</Text>
        </View>
      )
    }
    
    renderMainContainer() {
        const { handleSubmit, submitting, forwardTo, place } = this.props
        return(
          <View style={{alignItems: 'center'}}>
              <Text style={styles.timeInteval}>{moment(parseInt(place.statistic.fromTime * 1000)).format('DD/MM/YYYY')} đến {moment(parseInt(place.statistic.toTime) * 1000).format('DD/MM/YYYY')}</Text>
    
              <View style={styles.infoContainer}>
                  <View style={styles.infoItemBorderRight}>
                      <Text style={styles.infoItemNumber}>{formatNumber(place.statistic.placeReach)}</Text>
                      <Text style={styles.infoItemLabel}>Tiếp cận</Text>
                  </View>
                  <View style={styles.infoItemBorderRight}>
                      <Text style={styles.infoItemNumber}>{formatNumber(place.statistic.placeView)}</Text>
                      <Text style={styles.infoItemLabel}>Xem</Text>
                  </View>
                  <View style={styles.infoItemBorderRight}>
                      <Text style={styles.infoItemNumber}>{formatNumber(place.statistic.placeInteract)}</Text>
                      <Text style={styles.infoItemLabel}>Tìm hiểu</Text>
                  </View>
                  <View style={styles.infoItem}>
                      <Text style={{ ...styles.infoItemNumber, ...styles.success }}>{formatNumber(place.statistic.placeBought)}</Text>
                      <Text style={styles.infoItemLabel}>Mua</Text>
                  </View>
              </View>
              <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => forwardTo('transactionList')}>
                      <View style={styles.menuItem}>
                          <View style={styles.leftBlock}>
                              <Icon name='transaction' style={styles.icon} />
                              <Text style={{...styles.textLabelRightImage}}>Giao dịch</Text>
                          </View>
                          <View style={styles.rightBlock}>
                              <View style={styles.badgeContainer}><Text small style={styles.numberRight}>{place.news.transactionNews}</Text></View>
                              <Icon name='chevron-right' style={styles.rightIcon} />
                          </View>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => forwardTo('placeOrderList')}>
                      <View style={styles.menuItem}>
                          <View style={styles.leftBlock}>
                              <Icon name='calendar-checked' style={styles.icon} />
                              <Text style={{...styles.textLabelRightImage}}>Đặt chỗ</Text>
                          </View>
                          <View style={styles.rightBlock}>
                              <View style={styles.badgeContainer}><Text small style={styles.numberRight}>{place.news.bookingNews}</Text></View>
                              <Icon name='chevron-right' style={styles.rightIcon} />
                          </View>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => forwardTo('testAnimation')}>
                      <View style={styles.menuItem}>
                          <View style={styles.leftBlock}>
                              <Icon name='shiping-bike2' style={styles.icon} />
                              <Text style={{...styles.textLabelRightImage}}>Đặt giao hàng</Text>
                          </View>
                          <View style={styles.rightBlock}>
                              <View style={styles.badgeContainer}><Text small style={styles.numberRight}>{place.news.orderNews}</Text></View>
                              <Icon name='chevron-right' style={styles.rightIcon} />
                          </View>
                      </View>
                  </TouchableOpacity>
              </ScrollView>
          </View>
        )
    }

    render() {
        const { handleSubmit, submitting, forwardTo, place } = this.props
        let mainContainer = null
        if (!place || !place.listPlace || !place.statistic) {
            mainContainer = this.renderLoading()
        } else {
            mainContainer = this.renderMainContainer()
        }
        let allPlace = place.listPlace.map(item => item.placeId).join(';')
        let defaultSelected = {
            id: allPlace,
            name: "Tất cả địa điểm"
        }
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        dropdownValues = [defaultSelected, ...dropdownValues]

        return (
            <Container style={styles.container}>
                <TopDropdown
                  ref='placeDropdown'
                  dropdownValues={dropdownValues}
                  onSelect={this._handleChangePlace.bind(this)}
                  selectedOption={defaultSelected} />
                 
                <View style={styles.contentContainer}>
                    {/*<View style={{width: '100%', height: 200, backgroundColor: 'lightblue'}}></View>*/}
                    <LinearGradient style={{paddingTop:15}} colors={['#00a9d4', '#007dad']}>  
                      <Image source={storeTransparent} style={{ resizeMode: 'contain', height: 120 }} />
                    </LinearGradient>
                    <View style={styles.dateFilterContainer}>
                        <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    </View>
                    {mainContainer}
                </View>
                

                <View>

                </View>
            </Container>
        )
    }
}