import React, { PureComponent } from "react";
import { Button, List, ListItem, Text, Body } from "native-base";
import { View } from "react-native";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import material from "~/theme/variables/material.js";
import { NOTIFY_TYPE, TRANSACTION_TYPE, SCREEN } from '~/store/constants/app'
import { BASE_COUNTDOWN_ORDER_MINUTE } from "~/ui/shared/constants";
import { formatNumber } from "~/ui/shared/utils";
import moment from "moment";
import styles from "./styles";
import {
    TIME_FORMAT_WITHOUT_SECOND
} from "~/store/constants/app"

export default class extends PureComponent {

    renderNotificationIcon({ notifyType }) {
        switch (notifyType) {
          case NOTIFY_TYPE.NEW_BOOKING:
            return <Icon name="calendar" style={styles.iconWarning} />
          case NOTIFY_TYPE.TRANSACTION_CLINGME:
            return <Icon name="clingme-wallet" style={styles.icon} />
          case NOTIFY_TYPE.NEW_ORDER:
            return <Icon name='shiping-bike2' style={styles.iconWarning} />
          case NOTIFY_TYPE.ORDER_CANCELLED:
            return <Icon name="shiping-bike2" style={styles.iconError} />
          // case NOTIFY_TYPE.WAITING:
          case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
            return <Icon name="order-history" style={styles.iconWarning} />
          case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
            return <Icon name="term" style={styles.icon} />
          case NOTIFY_TYPE.ORDER_FEEDBACK:
            return <Icon name="comment" style={styles.icon} />
          default:
            return <Icon name="order-history" style={styles.iconWarning} />
        }
      }

  renderNotificationContent(item) {
    switch (item.notifyType) {

      case NOTIFY_TYPE.NEW_BOOKING:
        const minutesRemain = Math.round((item.paramLong2 - Date.now() / 1000) / 60)
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.subRow}>
                  <Text note style={styles.textGray}>{item.title} </Text>
                  <Text small>{moment(item.paramLong2 * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                </View>
              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>
                <View style={styles.rowEnd}>
                  <Icon name='friend' style={styles.icon} />
                  <Text bold>{item.paramId1}</Text>
                </View>
              </View>
            </View>
            <Border style={styles.border}/>
          </Body>
        )
      case NOTIFY_TYPE.NEW_ORDER:
        let fastDeliveryText = <Text small>{moment(item.paramLong2 * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
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
            <Border style={styles.border}/>

            </Body>
      )
      case NOTIFY_TYPE.ORDER_CANCELLED:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.subRow}>
                <Text note error>{item.title}</Text>
                <Text small>{moment(item.paramLong2 * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
              </View>
              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>
                <View style={styles.rowEnd}>
                  <Icon name='want-feed' style={styles.icon} />
                  <Text bold>{item.paramId1}</Text>
                </View>
              </View>

            </View>
            <Border style={styles.border}/>

          </Body>)
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
        return (
            <Body>
            <View style={styles.listItemRow}>
              <Text note style={styles.textGray}>{item.title}</Text>
              <View style={styles.subRow}>
                <Text bold style={styles.textGray}>{item.content}</Text>
                <Text>
                  <Text style={styles.textWaiting}>{formatNumber(item.paramDouble1)}</Text>đ
                </Text>
              </View>
            </View>
            <Border style={styles.border}/>
            </Body>
        )
      case NOTIFY_TYPE.TRANSACTION_DIRECT_SUCCESS:
          return (
              <Body>
              <View style={styles.listItemRow}>
                <Text note style={styles.textGray}>{item.title}</Text>
                <View style={styles.subRow}>
                  <Text bold style={styles.textGray}>{item.content}</Text>

                  <Text style={styles.textBlue}>
                    <Text strong style={styles.textBlue}>{formatNumber(item.paramDouble1)}</Text>đ
                  </Text>
                </View>
              </View>
              <Border style={styles.border}/>
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
                  <Text style={styles.textClingme}>{formatNumber(item.paramDouble1)}</Text>đ
                </Text>
              </View>
            </View>
            <Border style={styles.border}/>
          </Body>
        )
      case NOTIFY_TYPE.ORDER_FEEDBACK:
        return (
          <Body>
            <View style={styles.listItemRow}>
              <View style={styles.subRow}>
                <Text note style={styles.textGray}>{item.title}</Text>
                <Text small>{moment(item.paramLong2 * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
              </View>

              <View style={styles.subRow}>
                <Text numberOfLines={1} ellipsizeMode='tail'>
                  <Text bold style={styles.textGray}>{item.content}: </Text>
                  {item.paramStr2}
                </Text>
              </View>

            </View>
            <Border style={styles.border}/>
          </Body>
        )
      default:
        return (
          this._defaultContent(item)
        )
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

          <Border/>
          </Body>
      )
  }

    render(){
        const {item, onNotiClick} = this.props

        return (
            <ListItem noBorder
              style={styles[item.isRead ? 'listItemContainerRead' : 'listItemContainer']}
              onPress={() => onNotiClick(item)}
              key={item.notifyId}
            >
              <View style={styles.listItemContent}>
                {this.renderNotificationIcon(item)}
                {!item.isRead && <View style={styles.circle} />}
              </View>
              {this.renderNotificationContent(item)}

            </ListItem>
        )
    }
}
