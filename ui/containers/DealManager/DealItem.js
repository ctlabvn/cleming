import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, Image} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import moment from 'moment'
import {DEFAULT_DATE_FORMAT} from '~/store/constants/app'
@connect(null, {forwardTo})

export default class DealManager extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){

    }

    render() {
        const {forwardTo} = this.props
        // status: int, //trạng thái của deal, 
        // 1 – deal đang hoạt động, 
        // 2 – deal đang tạm ngừng,
        // 4–deal đang chờ Clingme xác nhận và đưa lên hệ thống, 
        // 5 – deal đã bị Clingme reject và không đưa lên hệ thống.

        // promoType=3: Giảm giá theo số tiền
        // promoType=1: Giảm giá theo phần trăm
        // promoType=2: Quà tặng theo điều kiện
        
        let statusText
        if (this.props.status == 1){
          statusText = <Text small success>{I18n.t('deal_working')}</Text>
        }else if (this.props.status == 4){
          statusText = <Text small warning>Chờ duyệt</Text>
        }else{
          statusText = <Text small error>{I18n.t('deal_ended')}</Text>
        }
        return (
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View style={{...styles.dealContainer, ...this.props.style}}>
              <View style={{...styles.inline, ...styles.mb10}}>
                <Image source={{uri: this.props.image}} style={styles.dealImage}/>
                <View style={styles.dealRight}>
                  <Text bold medium>{this.props.name}</Text>
                  <Text small gray>{this.props.address}</Text>
                  <View style={{...styles.row, marginTop: 5}}>
                    <View style={{...styles.dealTransactionIcon}}>
                      <Text small gray>({moment(this.props.fromDate*1000).format(DEFAULT_DATE_FORMAT)} - {moment(this.props.toDate*1000).format(DEFAULT_DATE_FORMAT)})</Text>
                      {statusText}
                    </View>
                    <Text bold warning large style={styles.discountNumber}>- {this.props.number}</Text>
                  </View>
                  
                </View>
              </View>
              {!this.props.withoutLine && <Border />}
            </View>
          </TouchableWithoutFeedback>
        )
    }
}
