import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import {
  Button, Container, ListItem, List, Spinner,
  Text, Item, View, Input, Left, Right, Body,
} from 'native-base'

import moment from 'moment'

import Content from '~/ui/components/Content'
import Border from '~/ui/elements/Border'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as notificationActions from '~/store/actions/notification'

import Icon from '~/ui/elements/Icon'
import TimeAgo from '~/ui/components/TimeAgo'
import * as commonSelectors from '~/store/selectors/common'
import * as authSelectors from '~/store/selectors/auth'
import * as notificationSelectors from '~/store/selectors/notification'
import options from './options'
import styles from './styles'
import material from '~/theme/variables/material'

import { NOTIFY_TYPE, TRANSACTION_TYPE } from '~/store/constants/app'

import { formatNumber } from '~/ui/shared/utils'

@connect(state => ({
  session: authSelectors.getSession(state),
  notifications: notificationSelectors.getNotification(state),
  notificationRequest: commonSelectors.getRequest(state, 'getNotification'),
}), { ...commonActions, ...notificationActions })
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,
    }
  }

  componentWillFocus() {
    // make it like before    
    const { session, notifications, getNotification, app } = this.props
    // app.topDropdown.show(false)

    if (!notifications.data.length) {
      getNotification(session, 1, () => getNotification(session, 2))
    }

    this.setState({
      refreshing: false,
    })

  }

  componentWillMount() {
    this.componentWillFocus()
  }

  _onRefresh = () => {
    const { session, getNotification } = this.props
    this.setState({ refreshing: true })
    getNotification(session, 1, () => getNotification(session, 2, () => this.setState({ refreshing: false })))
  }

  _loadMore = () => {
    if (this.state.loading || this.state.refreshing)
      return
    // console.log('load more')
    const { session, notifications, getNotification } = this.props
    if (notifications.hasMore) {
      this.setState({ loading: true })
      getNotification(session, notifications.page + 1, () => this.setState({ loading: false }))
    }
  }

  _handleNotiRead = (e) => {
    this.props.app.showNotification({
      title: "My Push Token",
      message: this.props.app.pushToken,
    })
  }
  // export const NOTIFY_TYPE = {
  //   COMMENT: 1,
  //   PAY: 2,
  //   NEW_BILL: 3,
  //   DEAL_EXPIRED: 4,
  //   TRANSACTION_DIRECT_WAITING: 5,
  //   TRANSACTION_DIRECT_SUCCESS: 7,
  //   NEW_BOOKING: 6,
  //   NEW_ORDER: 8,
  //   TRANSACTION_FEEDBACK: 9,
  //   ORDER_FEEDBACK: 11,
  //   ORDER_CANCELLED: 12,
  // }


  renderNotificationIcon({ notifyType }) {
    switch (notifyType) {
      case NOTIFY_TYPE.NEW_BOOKING:
        return <Icon name="calendar" style={styles.icon} />
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
        return <Icon name="clingme-wallet" style={styles.icon} />
      // case NOTIFY_TYPE.WAITING:
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
        return <Icon name="order-history" style={{ ...styles.icon, color: material.orange500 }} />
      default:
        return <Icon name="order-history" style={{ ...styles.icon, color: material.orange500 }} />
    }
  }

  renderNotificationContent({ title, notifyType, paramLong2, content, paramDouble1 }) {
    const border = <Border style={{
      marginLeft: 15,
      marginTop: 10,
    }} color='rgba(0,0,0,0.5)' size={1} />

    switch (notifyType) {

      case NOTIFY_TYPE.BOOKING:
        const minutesRemain = Math.round((paramLong2 - Date.now() / 1000) / 60)
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.titleContainer}>
                <Text note style={styles.textGray}>{title} </Text>
                <Text bold style={styles.textGray}>{content}
                </Text>
              </View>

              {minutesRemain > 0 && <Text small style={{
                color: material.red500,
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 0,
                right: 0,
              }}>Còn {minutesRemain}'</Text>
              }

              <Text note small style={{
                alignSelf: 'flex-end'
              }}>{moment(paramLong2 * 1000).format('hh:mm     DD/M/YY')}</Text>
            </View>

            {border}

          </Body>
        )

      case NOTIFY_TYPE.SUCCESS:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.titleContainer}>
                <Text note style={styles.textGray}>{title}</Text>
                <Text bold style={styles.textGray}>{content}
                </Text>
              </View>

              <Text style={{
                alignSelf: 'flex-end',
                marginRight: 0,
                color: material.blue600,
              }}>
                <Text style={{
                  fontWeight: '900',
                  color: material.blue600,
                  fontSize: 22,
                }}>{formatNumber(paramDouble1)}</Text>đ
                  </Text>

            </View>
            {border}
          </Body>
        )

      // case NOTIFY_TYPE.WAITING:
      default:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.titleContainer}>
                <Text note style={styles.textGray}>{title}</Text>
                <Text bold style={styles.textGray}>{content}</Text>
              </View>
              <Text note style={{
                alignSelf: 'flex-end',
                ...styles.textGray
              }}>
                <Text style={{
                  ...styles.textGray
                }} bold>{formatNumber(paramDouble1)}</Text>đ
              </Text>
            </View>


            {border}
          </Body>
        )


    }
  }

  handleNotiClick(notification) {
    console.log('Notification Press', notification)
    const { notifyType, paramLong3 } = notification
    // console.log(type, notification)
    switch (notifyType) {
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
        this.props.forwardTo('transactionDetail/' + paramLong3 + '/' + TRANSACTION_TYPE.DIRECT)
        break
      case NOTIFY_TYPE.NEW_BOOKING:
        this.props.forwardTo('placeOrderDetail/' + paramLong3)
        break
      case NOTIFY_TYPE.NEW_ORDER:
        this.props.forwardTo('deliveryDetail/' + paramLong3)
        break
      default:
        break
    }
  }

  render() {

    // const { notificationRequest} = this.props    
    // const data= []
    // for(let i=1;i<100;i++){
    //   data.push({title: 'title'+i,notifyType:1})
    // }
    // const notifications = {
    //   data,
    // }

    // we store the page so we must not set removeClippedSubviews to true, sometime it is for tab too
    const { notifications, notificationRequest } = this.props

    return (

      <Container>
        {
          // <Button onPress={this._handleNotiRead} noPadder style={{
          //   alignSelf:'flex-end',              
          //   marginRight: 10,              
          // }} transparent><Text active small>Đánh dấu tất cả đã đọc</Text>
          // </Button>
        }

        <Content
          onEndReached={this._loadMore} onRefresh={this._onRefresh}
          style={styles.container} refreshing={this.state.refreshing}
        >
          {notifications &&
            <List
              removeClippedSubviews={false}
              pageSize={10}
              dataArray={notifications.data} renderRow={(item) =>
                <ListItem noBorder style={styles.listItemContainer} onPress={() => this.handleNotiClick(item)}>
                  <View style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                  }}>
                    {this.renderNotificationIcon(item)}
                    <View style={styles.circle} />
                  </View>
                  {this.renderNotificationContent(item)}

                </ListItem>
              } />
          }

          {this.state.loading && <Spinner />}

        </Content>


      </Container>

    )
  }
}