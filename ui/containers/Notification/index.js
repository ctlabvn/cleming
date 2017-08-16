import React, { Component } from 'react'
import {
  Button, Container, ListItem, List,
  Text, Item, View, Input, Left, Right, Body,
} from 'native-base'

import moment from 'moment'

import Content from '~/ui/components/Content'
// import Border from '~/ui/elements/Border'
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
import Spinner from '~/ui/components/Spinner'
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
  
  componentWillFocus() {
    // this.content.scrollToTop()
    // make it like before    
    // const { session, notifications, getNotification, app } = this.props
    // if (notifications.hasMore && !notifications.data.length) {
    //   getNotification(session, 1, () => getNotification(session, 2))      
    // } 
    this.listview && this.listview.swing()
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
    this.listview.showRefresh(true)
    getNotification(session, 1, () => getNotification(session, 2, 
      () => this.listview.showRefresh(false)
    ))
  }

  _loadMore = () => {
    if (this.spinner.state.shown || this.listview.state.refreshing)
      return
    // console.log('load more')
    const { session, notifications, getNotification } = this.props
    if (notifications.hasMore) {
      this.spinner.show(true)
      getNotification(session, notifications.page + 1, 
        () => this.spinner.show(false)
      )
    }
  }

  _handleNotiClick=(notification) =>{
    console.log('Notification Press', notification)
    const { notifyType, paramLong3 } = notification
    const { updateRead, session, updateReadOfline, markWillLoad, forwardTo } = this.props
    if (!notification.isRead) {
      updateReadOfline(notification.notifyId)
      updateRead(session, notification.notifyId)
    }

    // console.log(type, notification)
    switch (notifyType) {
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
      case NOTIFY_TYPE.TRANSACTION_FEEDBACK:
        forwardTo('transactionDetail', {id: paramLong3, type: TRANSACTION_TYPE.DIRECT})
        markWillLoad(SCREEN.TRANSACTION_LIST_DIRECT)
        break
      case NOTIFY_TYPE.TRANSACTION_CLINGME:
        forwardTo('transactionDetail', {id: paramLong3, type: TRANSACTION_TYPE.CLINGME})
        markWillLoad(SCREEN.TRANSACTION_LIST_CLINGME)
        break
      case NOTIFY_TYPE.NEW_BOOKING:
        forwardTo('placeOrderDetail', {id: paramLong3})
        markWillLoad(SCREEN.BOOKING_LIST)
        break
      case NOTIFY_TYPE.NEW_ORDER:
      case NOTIFY_TYPE.ORDER_FEEDBACK:
      case NOTIFY_TYPE.ORDER_CANCELLED:
        forwardTo('deliveryDetail', {id: paramLong3})
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
        {notifications.hasMore ?  null : <View style={styles.emptyBlock}><Text strong bold style={styles.underBack}>{I18n.t('no_notification')}</Text></View>}
        <ListViewExtend     
          onItemRef={ref=>this.listview=ref}
          keyExtractor={item=>item.notifyId}
          dataArray={notifications.data}
          onRefresh={this._onRefresh}
          onEndReached={this._loadMore}  
          renderRow={(item) => <NotificationItem item={item} onNotiClick={this._handleNotiClick} />}
          rowHasChanged={true}
        />

         <Spinner onItemRef={ref=>this.spinner=ref} />
      </Container>

    )
  }
}