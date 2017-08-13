import React, { Component } from 'react'
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
import ListViewExtend from '~/ui/components/ListViewExtend'
import { NOTIFY_TYPE, TRANSACTION_TYPE, SCREEN } from '~/store/constants/app'
import I18n from '~/ui/I18n'

import NotificationItem from './NotificationItem'
const checkProperties=['notifyId', 'isRead']

@connect(state => ({
  session: authSelectors.getSession(state),
  notifications: notificationSelectors.getNotification(state),
  // notificationRequest: commonSelectors.getRequest(state, 'getNotification'),
}), { ...commonActions, ...notificationActions, ...transactionAction, ...metaAction })

export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,      
    }    
  }

  componentWillBlur(){
    this.listview.scrollToTop()
  }

  componentWillFocus() {
    // this.content.scrollToTop()
    // make it like before    
    // const { session, notifications, getNotification, app } = this.props
    // if (notifications.hasMore && !notifications.data.length) {
    //   getNotification(session, 1, () => getNotification(session, 2))      
    // } 

    // this.setState({
    //   refreshing: false,      
    // })
  }


  componentWillMount() {
    // this.componentWillFocus()
    const { session, getNotification, notifications } = this.props

    if (notifications.hasMore && !notifications.data.length) {
      getNotification(session, 1, () => getNotification(session, 2))      
    }    
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

  _defaultContent(item) {
      return (
          <Body>
          <View style={styles.listItemRow}>
            <Text note style={styles.textGray}>{item.title}</Text>
            <View style={styles.subRow}>
              <Text bold style={styles.textGray}>{item.content}</Text>
              <Text note style={styles.textGray}>
                <Text strong style={styles.textGray} bold>{formatNumber(item.paramDouble1)}</Text>đ
              </Text>
            </View>
          </View>

          {border}
          </Body>
      )
  }

  _handleNotiClick=(notification) =>{
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
    const { notifications } = this.props        
    return (

      <Container>
          {notifications.hasMore ?
        <ListViewExtend     
          onItemRef={ref=>this.listview=ref}
          keyExtractor={item=>item.notifyId}
          dataArray={notifications.data}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this._loadMore}  
          renderRow={(item) => <NotificationItem item={item} onNotiClick={this._handleNotiClick} />}
        />

        : <View style={styles.emptyBlock}>
              <Text strong bold style={styles.underBack}>{I18n.t('no_notification')}</Text>
            </View>
          }

          {this.state.loading && <Spinner />}
      </Container>

    )
  }
}