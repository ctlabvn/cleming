import React, { Component } from 'react'
import { LayoutAnimation, ListView } from 'react-native'
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
import * as transactionAction from "~/store/actions/transaction"
import * as metaAction from "~/store/actions/meta"
import Icon from '~/ui/elements/Icon'
import TimeAgo from '~/ui/components/TimeAgo'
import * as commonSelectors from '~/store/selectors/common'
import * as authSelectors from '~/store/selectors/auth'
import * as notificationSelectors from '~/store/selectors/notification'
import options from './options'
import styles from './styles'
import material from '~/theme/variables/material'

import { NOTIFY_TYPE, TRANSACTION_TYPE, SCREEN } from '~/store/constants/app'
import { BASE_COUNTDOWN_ORDER_MINUTE } from "~/ui/shared/constants";
import { formatNumber } from '~/ui/shared/utils'

import I18n from '~/ui/I18n'

@connect(state => ({
  session: authSelectors.getSession(state),
  notifications: notificationSelectors.getNotification(state),
  notificationRequest: commonSelectors.getRequest(state, 'getNotification'),
}), { ...commonActions, ...notificationActions, ...transactionAction, ...metaAction })
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (JSON.stringify(r1) != JSON.stringify(r2)) })
  }

  componentWillFocus() {
    getNotification
    // make it like before    
    const { session, notifications, getNotification, app } = this.props
    if (!notifications.data.length) {
      getNotification(session, 1, () => getNotification(session, 2))
      this.setState({
        refreshing: false,
      })
    } else {
      this.forceUpdate()
    }
  }

  componentWillMount() {
    // this.componentWillFocus()
    const { session, getNotification } = this.props
    getNotification(session, 1, () => getNotification(session, 2))
    this.setState({
      refreshing: false,
    })
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
  // TRANSACTION_CLINGME: 10
  // }


  renderNotificationIcon({ notifyType }) {
    switch (notifyType) {
      case NOTIFY_TYPE.NEW_BOOKING:
        return <Icon name="calendar" style={{ ...styles.icon, ...styles.warning }} />
      case NOTIFY_TYPE.TRANSACTION_CLINGME:
        return <Icon name="clingme-wallet" style={styles.icon} />
      case NOTIFY_TYPE.NEW_ORDER:
        return <Icon name='shiping-bike2' style={{ ...styles.icon, ...styles.warning }} />
      case NOTIFY_TYPE.ORDER_CANCELLED:
        return <Icon name="shiping-bike2" style={{ ...styles.icon, ...styles.error }} />
      // case NOTIFY_TYPE.WAITING:
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
        return <Icon name="order-history" style={{ ...styles.icon, color: material.orange500 }} />
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
        return <Icon name="term" style={{ ...styles.icon }} />
      case NOTIFY_TYPE.ORDER_FEEDBACK:
        return <Icon name="comment" style={{ ...styles.icon }} />
      default:
        return <Icon name="order-history" style={{ ...styles.icon, color: material.orange500 }} />
    }
  }

  renderNotificationContent(item) {
    const border = <Border style={{
      marginLeft: 15,
      marginTop: 10,
    }} color='rgba(0,0,0,0.5)' size={1} />

    switch (item.notifyType) {

      case NOTIFY_TYPE.NEW_BOOKING:
        const minutesRemain = Math.round((item.paramLong2 - Date.now() / 1000) / 60)
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.titleContainer}>
                <Text note style={styles.textGray}>{item.title} </Text>
                <Text bold style={styles.textGray}>{item.content}
                </Text>
              </View>

              {/*{minutesRemain > 0 && <Text small style={{
                color: material.red500,
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 0,
                right: 0,
              }}>Còn {minutesRemain}'</Text>
              }*/}
              <Text small style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 0,
                right: 0,
              }}>{moment(item.paramLong2 * 1000).format('HH:mm   DD/M/YY')}</Text>
              <View style={styles.rowEnd}>
                <Icon name='friend' style={styles.icon} />
                <Text bold>{item.paramId1}</Text>
              </View>
            </View>

            {border}

          </Body>
        )
      case NOTIFY_TYPE.NEW_ORDER:
        let fastDeliveryText = item.paramId3 ? <Text small style={{
          color: material.red500,
        }}>Giao nhanh {BASE_COUNTDOWN_ORDER_MINUTE}'</Text> : null
        return (
            <Body>
            <View style={styles.listItemRow}>
              <View style={styles.subRow}>
                <Text note style={styles.textGray}>{item.title} </Text>
                  {fastDeliveryText}
              </View>

              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>
                  <View style={styles.rowEnd}>
                    <Icon name='want-feed' style={styles.icon}/>
                    <Text bold>{item.paramId1}</Text>
                  </View>

              </View>
            </View>
            {border}

            </Body>
      )
      case NOTIFY_TYPE.ORDER_CANCELLED:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <Text note error>{item.title} </Text>
              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>
                <View style={styles.rowEnd}>
                  <Icon name='want-feed' style={styles.icon} />
                  <Text bold>{item.paramId1}</Text>
                </View>
              </View>

            </View>
            {border}

          </Body>)
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
        return (
            <Body>
            <View style={styles.listItemRow}>
              <Text note style={styles.textGray}>{item.title}</Text>
              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>
                <Text>
                  <Text style={{
                      fontWeight: '900',
                      fontSize: 18,
                  }}>{formatNumber(item.paramDouble1)}</Text>đ
                </Text>
              </View>
            </View>
            {border}
            </Body>
        )
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
          return (
              <Body>
              <View style={styles.listItemRow}>
                <Text note style={styles.textGray}>{item.title}</Text>
                <View style={styles.subRow}>
                  <Text bold style={styles.textGray}>{item.content}</Text>

                  <Text style={{ color: material.blue600,}}>
                    <Text strong style={{
                        fontWeight: '900',
                        color: material.blue600,
                    }}>{formatNumber(item.paramDouble1)}</Text>đ
                  </Text>
                </View>
              </View>
              {border}
              </Body>
          )
      case NOTIFY_TYPE.TRANSACTION_CLINGME:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <Text note style={styles.textGray}>{item.title}</Text>
              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>

                <Text style={{ color: material.blue600,}}>
                  <Text style={{
                      fontWeight: '900',
                      color: material.blue600,
                      fontSize: 24,
                  }}>{formatNumber(item.paramDouble1)}</Text>đ
                </Text>
              </View>
            </View>
            {border}
          </Body>
        )
      case NOTIFY_TYPE.ORDER_FEEDBACK:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.subRow}>
                <Text note style={styles.textGray}>{item.title}</Text>
                <Text small>{moment(item.paramLong2 * 1000).format('hh:mm   DD/M/YY')}</Text>
              </View>

              <View style={styles.subRow}>
                <Text numberOfLines={1} ellipsizeMode='tail'>
                  <Text bold style={styles.textGray}>{item.content}: </Text>
                  {item.paramStr2}
                </Text>
              </View>

            </View>
            {border}
          </Body>
        )
      default:
        return (
          this._defaultContent(item)
        )
    }
  }

  _defaultContent(item) {
      const border = <Border style={{
          marginLeft: 15,
          marginTop: 10,
      }} color='rgba(0,0,0,0.5)' size={1} />

      return (
          <Body>
          <View style={{...styles.listItemRow, flexDirection: 'column'}}>
            <Text note style={styles.textGray}>{item.title}</Text>
            <View style={styles.subRow}>
              <Text bold style={styles.textGray}>{item.content}</Text>
              <Text note style={{...styles.textGray}}>
                <Text strong style={{...styles.textGray}} bold>{formatNumber(item.paramDouble1)}</Text>đ
              </Text>
            </View>
          </View>

          {border}
          </Body>
      )
  }

  handleNotiClick(notification) {
    console.log('Notification Press', notification)
    const { notifyType, paramLong3 } = notification
    const { updateRead, session, updateReadOfline, markWillLoad } = this.props
    if (!notification.isRead) {
      updateReadOfline(notification.notifyId)
      updateRead(session, notification.notifyId)
    }

    // console.log(type, notification)
    switch (notifyType) {
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
      case NOTIFY_TYPE.TRANSACTION_FEEDBACK:
        this.props.forwardTo('transactionDetail/' + paramLong3 + '/' + TRANSACTION_TYPE.DIRECT)
        markWillLoad(SCREEN.TRANSACTION_LIST_DIRECT)
        break
      case NOTIFY_TYPE.TRANSACTION_CLINGME:
        this.props.forwardTo('transactionDetail/' + paramLong3 + '/' + TRANSACTION_TYPE.CLINGME)
        markWillLoad(SCREEN.TRANSACTION_LIST_CLINGME)
        break
      case NOTIFY_TYPE.NEW_BOOKING:
        this.props.forwardTo('placeOrderDetail/' + paramLong3)
        markWillLoad(SCREEN.BOOKING_LIST)
        break
      case NOTIFY_TYPE.NEW_ORDER:
      case NOTIFY_TYPE.ORDER_FEEDBACK:
      case NOTIFY_TYPE.ORDER_CANCELLED:
        this.props.forwardTo('deliveryDetail/' + paramLong3)
        markWillLoad(SCREEN.ORDER_LIST)
        break
      default:
        break
    }
  }
  render() {
    let { notifications, notificationRequest } = this.props
    return (

      <Container>
        <Content
          onEndReached={this._loadMore} onRefresh={this._onRefresh}
          style={styles.container} refreshing={this.state.refreshing}
        >
            {notifications.data.length == 0 && <View style={styles.emptyBlock}><Text strong bold style={styles.underBack}>{I18n.t('no_notification')}</Text></View>}
          {notifications &&
            <ListView
              removeClippedSubviews={false}
              pageSize={10}
              dataSource={this.ds.cloneWithRows(notifications.data)}
              renderRow={(item) => {
                return <ListItem noBorder
                  style={{ ...styles.listItemContainer, backgroundColor: item.isRead ? material.gray300 : 'white' }}
                  onPress={() => this.handleNotiClick(item)}
                  key={item.notifyId}
                >
                  <View style={{
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start'
                  }}>
                    {this.renderNotificationIcon(item)}
                    {!item.isRead && <View style={styles.circle} />}
                  </View>
                  {this.renderNotificationContent(item)}

                </ListItem>
              }
              } />
          }
          {this.state.loading && <Spinner />}

        </Content>


      </Container>

    )
  }
}