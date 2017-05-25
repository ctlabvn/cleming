import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Grid, Col, Row
} from 'native-base'
import Content from '~/ui/components/Content'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import moment from 'moment';
import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'
import * as commonActions from '~/store/actions/common'
import * as bookingActions from '~/store/actions/booking'
import styles from './styles'
import { BASE_COUNTDOWN_BOOKING_MINUTE } from '~/ui/shared/constants'
import CircleCountdown from '~/ui/components/CircleCountdown'

const longText = "When the scroll view is disabled, this defines how far your touch may move off of the button," +
  "before deactivating the button. Once deactivated, try moving it back and youll see that the button is once again " +
  "reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a " +
  "constant to reduce memory allocations."
@connect(state => ({
  user: state.auth.user,
  place: state.place,
  booking: state.booking
}), { ...commonActions, ...bookingActions })

export default class PlaceOrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookingDetail: {},
      counting: true
    }
  }
  componentDidMount() {
    const { getBookingDetail } = this.props
    let bookingId = this.props.route.params.id
    let bookingArr = this.props.booking.bookingList.filter(item => item.orderCode == bookingId)
    this.setState({ counting: true })
    if (!bookingArr || bookingArr.length == 0) {
      // if not in store, load from API
      getBookingDetail(this.props.user.xsession, bookingId,
        (error, data) => {
          console.log('Err Booking detail', error)
          console.log('Booking Detail', data)
          if (data.updated) {
            this.setState({ bookingDetail: data.updated.bookingInfo })
            return
          }
        }
      )
    }
    this.setState({ bookingDetail: bookingArr[0] })
  }
  componentWillFocus() {
    let bookingId = this.props.route.params.id
    let bookingArr = this.props.booking.bookingList.filter(item => item.orderCode == bookingId)
    this.setState({ counting: true })
    if (!bookingArr || bookingArr.length == 0) {
      //if not in store, load from API
      getBookingDetail(this.props.user.xsession, bookingId,
        (error, data) => {
          console.log('Err Booking Detail', error)
          console.log('Booking Detail', data)
          if (data.updated) {
            this.setState({ bookingDetail: data.updated.bookingInfo })
            return
          }
        }
      )
    }
    this.setState({ bookingDetail: bookingArr[0] })
  }
  componentWillBlur() {
    this.setState({ counting: false })
  }
  render() {
    if (!this.state || !this.state.bookingDetail || Object.keys(this.state.bookingDetail).length == 0) {
      return (
        <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color='red' />
          <Text small>Loading...</Text>
        </View>
      )
    }
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
    return (
      <Container>

        <View style={styles.merchantAddress}>
          <Text small white>{this.state.bookingDetail.placeInfo.address}</Text>
        </View>

        <View style={{ backgroundColor: 'white', height: '100%' }}>
          <View style={styles.placeContainer}>
            <View style={{ ...styles.rowPaddingTB, ...styles.center }}>
              <Text>{moment(this.state.bookingDetail.clingmeCreatedTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
              <View style={{right: 10, position: 'absolute'}}>
                <CircleCountdown baseMinute={BASE_COUNTDOWN_BOOKING_MINUTE}
                  counting={this.state.counting}
                  countTo={this.state.bookingDetail.bookDate}
                />
              </View>
            </View>
            <View>
              <Border color='rgba(0,0,0,0.5)' size={1} />
              <View style={styles.row}>
                <View style={styles.column}>
                  <Icon name='calendar' style={styles.icon} />
                  <Text style={styles.labelUnderImage}>{moment(this.state.bookingDetail.bookDate).format('DD/MM')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12}/>
                <View style={styles.column}>
                  <Icon name='history' style={styles.icon} />
                  <Text style={styles.labelUnderImage}>{moment(this.state.bookingDetail.bookDate).format('hh:mm')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12}/>
                <View style={styles.column}>
                  <Icon name='friend' style={styles.icon} />
                  <Text style={styles.labelUnderImage}>{this.state.bookingDetail.numberOfPeople}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12}/>
                <View style={styles.column}>
                  <Icon name='want-feed' style={styles.icon} />
                  <Text style={styles.labelUnderImage}>{totalQuantity}</Text>
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
              <Text style={{ ...styles.normalText, ...styles.boldText, ...styles.rightText }}>{this.state.bookingDetail.userInfo.phoneNumber}</Text>
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