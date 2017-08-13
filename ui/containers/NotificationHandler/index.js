import React, { Component } from 'react'
import { View } from 'native-base'
import PushNotification from 'react-native-push-notification'
import { connect } from 'react-redux'

import { SENDER_ID } from '~/store/constants/api'
import * as commonActions from '~/store/actions/common'
import * as notificationActions from '~/store/actions/notification'
import * as authActions from '~/store/actions/auth'
import * as metaActions from "~/store/actions/meta"
import * as placeActions from '~/store/actions/place'
import { getSession } from '~/store/selectors/auth'
import { NOTIFY_TYPE, TRANSACTION_TYPE, SCREEN } from '~/store/constants/app'
import { getSelectedPlace } from '~/store/selectors/place'
@connect(state => ({
  xsession: getSession(state),
  selectedPlace: getSelectedPlace(state),
}), { ...commonActions, ...notificationActions, ...metaActions, ...authActions, ...placeActions })
export default class NotificationHandler extends Component {

  initPushNotification(options) {
    PushNotification.configure({
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
      // senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotification.requestPermissions() later
        */
      requestPermissions: true,

      ...options,
    })
  }

  showNotification(options) {
    // trigger local notification, like fetch from push server
    return PushNotification.localNotification(options)
  }

  constructor(props) {
    super(props)
    this.initPushNotification({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        this.props.setPushToken(token.token)
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification)
        if (notification.userInteraction) {
          this._handleNoti(notification)
        } else {
          if (this.props.xsession) {
            let currentPlace = this.props.selectedPlace
            if (currentPlace && currentPlace.id) {
              this.props.getMerchantNews(this.props.xsession, currentPlace.id)
            }
            const title = notification.title ? notification.title + " " + notification.message : notification.alert
            this.props.setToast(title, 'warning', this._handleNoti, notification, 5000)
            this._markWillLoad(notification)
            this.props.getNotification(this.props.xsession, 1,
              () => this.props.getNotification(this.props.xsession, 2)
            )
          }
        }
      },

      senderID: SENDER_ID,
    })
  }
  _markWillLoad = (notification) => {
    const {markWillLoad} = this.props
    let notificationData = notification.data
    switch (notificationData.type) {
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
      case NOTIFY_TYPE.TRANSACTION_FEEDBACK:
        markWillLoad(SCREEN.TRANSACTION_LIST_DIRECT)
        break
      case NOTIFY_TYPE.TRANSACTION_CLINGME:
        markWillLoad(SCREEN.TRANSACTION_LIST_CLINGME)
        break
      case NOTIFY_TYPE.NEW_BOOKING:
        markWillLoad(SCREEN.BOOKING_LIST)
        break
      case NOTIFY_TYPE.NEW_ORDER:
      case NOTIFY_TYPE.ORDER_REPUSH_1:
      case NOTIFY_TYPE.ORDER_REPUSH_2:
        markWillLoad(SCREEN.ORDER_LIST)
        break
    }
  }

  _handleNoti = (notification) => {
    const { xsession, updateRead, forwardTo } = this.props
    if (notification.param2) {
      updateRead(xsession, param2)
    }
    console.log('Call handle Noti')
    let notificationData = notification.data
    switch (notificationData.type) {
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
      case NOTIFY_TYPE.TRANSACTION_FEEDBACK:
        forwardTo('transactionDetail', {id: notificationData.param1, type: TRANSACTION_TYPE.DIRECT})
        break
      case NOTIFY_TYPE.TRANSACTION_CLINGME:
      case NOTIFY_TYPE.TRANSACTION_CLINGME_REPUSH:
        forwardTo('transactionDetail', {id: notificationData.param1, type: TRANSACTION_TYPE.CLINGME})
        break
      case NOTIFY_TYPE.NEW_BOOKING:
        forwardTo('placeOrderDetail', {id: notificationData.param1})
        break
      case NOTIFY_TYPE.NEW_ORDER:
      case NOTIFY_TYPE.ORDER_REPUSH_1:
      case NOTIFY_TYPE.ORDER_REPUSH_2:
        forwardTo('deliveryDetail', {id: notificationData.param1})
        break
    }
  }

  render() {
    return (
        <View />
    )
  }
}

