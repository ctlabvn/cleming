import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Grid, Col, Row
} from 'native-base'
import Content from '~/ui/components/Content'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { InteractionManager } from 'react-native'
import moment from 'moment';
import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'
import * as commonActions from '~/store/actions/common'
import * as bookingActions from '~/store/actions/booking'
import * as notificationActions from '~/store/actions/notification'
import { getSession } from '~/store/selectors/auth'
import styles from './styles'
import { BASE_COUNTDOWN_BOOKING_MINUTE } from '~/ui/shared/constants'
import CircleCountdown from '~/ui/components/CircleCountdown'
import material from '~/theme/variables/material.js'
import { DEFAULT_TIME_FORMAT, DEFAULT_HOUR_FORMAT, DAY_WITHOUT_YEAR, DEFAULT_DATE_FORMAT } from '~/store/constants/app'
import { formatPhoneNumber } from '~/ui/shared/utils'
@connect(state => ({
  xsession: getSession(state),
  user: state.auth.user,
  place: state.place,
  booking: state.booking
}), { ...commonActions, ...bookingActions, ...notificationActions })

export default class PlaceOrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookingDetail: {},
      counting: true
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const { getBookingDetail, app, xsession, updateRead, setToast } = this.props
      let bookingId = this.props.route.params.id
      let bookingArr = this.props.booking.bookingList.filter(item => item.orderCode == bookingId)
      this.setState({ counting: true })
     getBookingDetail(xsession, bookingId,
          (error, data) => {
            console.log('Err Booking detail', error)
            console.log('Booking Detail', data)
            if (data && data.updated) {
              let bookingDetail = data.updated.bookingInfo
              if (!bookingDetail.isReadCorrespond && bookingDetail.notifyIdCorrespond){
                updateRead(xsession, bookingDetail.notifyIdCorrespond)
              }
              this.setState({ bookingDetail: bookingDetail })
              return
            } else {
              setToast('Có lỗi xảy ra, vui lòng thử lại sau', 'danger')
              this.props.forwardTo('merchantOverview')
              return
            }
          }
        )
      // this.setState({ bookingDetail: bookingArr[0] })
    })

  }
  componentWillFocus() {
    InteractionManager.runAfterInteractions(() => {
      const {app, getBookingDetail, updateRead, xsession, setToast} = this.props
      let bookingId = this.props.route.params.id
      let bookingArr = this.props.booking.bookingList.filter(item => item.orderCode == bookingId)
      this.setState({ counting: true })
        getBookingDetail(xsession, bookingId,
          (error, data) => {
            console.log('Err Booking Detail', error)
            console.log('Booking Detail', data)
            let bookingDetail = data.updated.bookingInfo
            if (!bookingDetail.isReadCorrespond && bookingDetail.notifyIdCorrespond){
              updateRead(xsession, bookingDetail.notifyIdCorrespond)
            }
            if (data && data.updated) {
              this.setState({ bookingDetail: data.updated.bookingInfo })
              return
            } else {
              setToast('Có lỗi xảy ra, vui lòng thử lại sau', 'danger')
              this.props.forwardTo('merchantOverview')
              return
            }
          }
        )
      // this.setState({ bookingDetail: bookingArr[0] })
    })
  }
  componentWillBlur() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ counting: false })
    })

  }
  render() {
    console.log('Render Booking Detail')
    if (!this.state || !this.state.bookingDetail || Object.keys(this.state.bookingDetail).length == 0) {
      return (
        <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Spinner />
          <Text small>Loading...</Text>
        </View>
      )
    }
    const { bookingDetail } = this.state
    let orderRow = null
    let totalQuantity = this.state.bookingDetail.orderRowList ? this.state.bookingDetail.orderRowList.map(x => x.quantity).reduce((a, b) => a + b, 0) : 0
    if (this.state.bookingDetail.orderRowList && this.state.bookingDetail.orderRowList.length > 0) {
      orderRow = this.state.bookingDetail.orderRowList.map(item => (
        <View style={styles.row} key={item.itemId}>
          <Text style={{ ...styles.normalText, ...styles.leftText, ...styles.boldText }}>{item.itemName}:</Text>
          <View style={styles.row}>
            <Text style={{ ...styles.normalText }}>SL: </Text>
            <Text style={{ ...styles.normalText, ...styles.rightText, ...styles.boldText }}>{item.quantity}</Text>
          </View>
        </View>
      ))
    }
    let minute = bookingDetail.deliveryMinute < 10 ? '0'.concat(bookingDetail.deliveryMinute) : bookingDetail.deliveryMinute
    let hourMinute = bookingDetail.deliveryHour + ':' + minute
    let bookTimeStr = hourMinute + ':00' + ' ' + moment(bookingDetail.bookDate * 1000).format(DEFAULT_DATE_FORMAT)
    let bookTime = moment(bookTimeStr, DEFAULT_TIME_FORMAT).unix()


    return (
      <Container>

        <View style={styles.merchantAddress}>
          <Text small white>{this.state.bookingDetail.placeInfo.address}</Text>
        </View>

        <View style={{ backgroundColor: material.white500, height: '100%' }}>
          <View style={styles.placeContainer}>
            <View style={{ ...styles.rowPaddingTB, ...styles.center }}>
              <Text grayDark>{moment(this.state.bookingDetail.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
              <View style={{ right: 10, position: 'absolute' }}>
                <CircleCountdown baseMinute={BASE_COUNTDOWN_BOOKING_MINUTE}
                  counting={this.state.counting}
                  countTo={bookTime}
                />
              </View>
            </View>
            <View>
              <Border color='rgba(0,0,0,0.5)' size={1} />
              <View style={styles.row}>
                <View style={styles.column}>
                  <Icon name='calendar' style={styles.icon} />
                  <Text grayDark style={styles.labelUnderImage}>{moment(this.state.bookingDetail.bookDate * 1000).format(DAY_WITHOUT_YEAR)}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                <View style={styles.column}>
                  <Icon name='history' style={styles.icon} />
                  <Text grayDark style={styles.labelUnderImage}>{hourMinute}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                <View style={styles.column}>
                  <Icon name='friend' style={styles.icon} />
                  <Text grayDark style={styles.labelUnderImage}>{this.state.bookingDetail.numberOfPeople}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                <View style={styles.column}>
                  <Icon name='want-feed' style={styles.icon} />
                  <Text grayDark style={styles.labelUnderImage}>{totalQuantity}</Text>
                </View>
              </View>
              <Border color='rgba(0,0,0,0.5)' size={1} />
            </View>
            <View style={styles.rowPaddingTB}>
              <Text style={{ ...styles.normalText, ...styles.leftText }}>Người đặt chỗ:</Text>
              <Text style={{ ...styles.normalText, ...styles.boldText, ...styles.rightText }}>{this.state.bookingDetail.userInfo.memberName}</Text>
            </View>
            <View style={styles.rowPaddingTB}>
              <Text style={{ ...styles.normalText, ...styles.leftText }}>Số điện thoại:</Text>
              <Text style={{ ...styles.normalText, ...styles.boldText, ...styles.rightText }}>{formatPhoneNumber(this.state.bookingDetail.userInfo.phoneNumber)}</Text>
            </View>
            <View style={styles.block}>
              <Text style={{ ...styles.normalText, ...styles.leftText }}>Yêu cầu riêng:</Text>
              <Content>
                <Text style={{ ...styles.normalText, ...styles.leftText }}>
                  {this.state.bookingDetail.note}
                </Text>
              </Content>
            </View>
            <Border color='rgba(0,0,0,0.5)' size={1} />
            <View style={styles.rowPaddingTB}>
              <Text style={{ ...styles.normalText, ...styles.leftText, ...styles.boldText }}>Đặt trước:</Text>
              <View style={styles.row}>
                <Text primary>SL: </Text>
                <Text primary style={{ ...styles.rightText, ...styles.boldText }}>{totalQuantity}</Text>
              </View>
            </View>
            <Content>
              {orderRow}
            </Content>
            {/*{orderRow}*/}
            {/*<Grid>
              <Row style={{ height: '7%' }}>
                <Col style={{ alignItems: 'flex-end' }}>
                  <Text style={{ ...styles.normalText }}>8:12:53</Text>
                </Col>
                <Col style={{ width: '5%' }} />
                <Col>
                  <Text style={{ ...styles.normalText }}>10/03/17</Text>
                </Col>
              </Row>
              <Row style={{ flexDirection: 'column', height: '15%' }}>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Icon name='calendar' style={styles.icon} />
                    <Text style={{ color: 'black' }}>{moment(this.state.bookingDetail.bookDate).format('DD/MM')}</Text>
                  </View>
                  <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                  <View style={styles.column}>
                    <Icon name='history' style={styles.icon} />
                    <Text style={{ color: 'black' }}>{moment(this.state.bookingDetail.bookDate).format('hh:mm')}</Text>
                  </View>
                  <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                  <View style={styles.column}>
                    <Icon name='friend' style={styles.icon} />
                    <Text style={{ color: 'black' }}>{this.state.bookingDetail.numberOfPeople}</Text>
                  </View>
                  <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                  <View style={styles.column}>
                    <Icon name='want-feed' style={styles.icon} />
                    <Text style={{ color: 'black' }}>2</Text>
                  </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
              </Row>
              <Row style={{ height: '10%' }}>
                <Left>
                  <Text style={{ ...styles.normalText, ...styles.leftText }}>Người đặt chỗ:</Text>
                </Left>
                <Right>
                  <Text style={{ ...styles.normalText, ...styles.boldText, ...styles.rightText }}>{this.state.bookingDetail.userInfo.memberName}</Text>
                </Right>
              </Row>
              <Row style={{ height: '10%' }}>
                <Left>
                  <Text style={{ ...styles.normalText, ...styles.leftText }}>Số điện thoại:</Text>
                </Left>
                <Right>
                  <Text style={{ ...styles.normalText, ...styles.boldText, ...styles.rightText }}>{this.state.bookingDetail.userInfo.phoneNumber}</Text>
                </Right>
              </Row>
              <Row style={{ height: '10%' }}>
                <Left>
                  <Text style={{ ...styles.normalText, ...styles.leftText }}>Yêu cầu riêng:</Text>
                </Left>
              </Row>
              <Row style={{ height: '25%' }}>
                <Left>
                  <Content>
                    <Text style={{ ...styles.normalText, ...styles.leftText }}>
                      {this.state.bookingDetail.note}
                    </Text>
                  </Content>
                </Left>
              </Row>
              <Row style={{ flexDirection: 'column', height: '2%', marginTop: 10 }}>
                <Border color='rgba(0,0,0,0.5)' size={1} />
              </Row>
              <Row style={{}}>
                <Left>
                  <Text style={{ ...styles.normalText, ...styles.leftText, ...styles.boldText }}>Đặt trước:</Text>
                </Left>
                <Right style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text primary style={{}}>SL: </Text>
                  <Text primary style={{ ...styles.rightText, ...styles.boldText }}>{totalQuantity}</Text>
                </Right>
              </Row>
              {orderRow}
            </Grid>*/}
          </View>
          {/*<View style={styles.submitContainer}>
            <Grid>
              <Col>
                <Button style={{ ...styles.submitButton, ...styles.declineButton }}>
                  <Text style={{ ...styles.declineText, ...styles.boldText }}>Từ chối</Text>
                </Button>
              </Col>
              <Col>
                <Button style={{ ...styles.submitButton, ...styles.acceptButton }}>
                  <Text style={{ ...styles.boldText }}>Nhận đặt chỗ</Text>
                </Button>
              </Col>
            </Grid>
          </View>*/}
          <View style={styles.codeContainer}>
            <Text style={{ ...styles.normalText, ...styles.codeTitleText }}>Mã đặt chỗ: </Text>
            <Text primary bold style={{ ...styles.codeText }}>#{this.state.bookingDetail.orderCode}</Text>
          </View>
        </View>

      </Container>
    )
  }
}