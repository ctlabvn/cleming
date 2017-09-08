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
@connect(null, {forwardTo})

export default class DealManager extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){

    }

    render() {
        const {forwardTo} = this.props
        return (
          <TouchableWithoutFeedback onPress={()=>forwardTo('dealInfo')}>
            <View style={styles.dealContainer}>
              <View style={{...styles.inline, ...styles.mb10}}>
                <Image source={{uri: this.props.image}} style={styles.dealImage}/>
                <View style={styles.dealRight}>
                  <Text bold medium>{this.props.name}</Text>
                  <View style={styles.inline}>
                    <View style={{...styles.inline, ...styles.dealTransactionIcon}}>
                      <Icon name='coin_mark' style={{...styles.icon, ...styles.success, ...styles.mr3}} />
                      <Icon name='coin_mark' style={{...styles.icon, ...styles.success, ...styles.mr3}} />
                      <Icon name='coin_mark' style={{...styles.icon, ...styles.success, ...styles.mr3}} />
                    </View>
                    <Text bold warning large style={styles.discountNumber}>- {this.props.number} %</Text>
                  </View>
                  <Text>{this.props.address}</Text>
                </View>
              </View>
              <Border />
            </View>
          </TouchableWithoutFeedback>
        )
    }
}
