import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Modal, Image} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import CheckBox from '~/ui/elements/CheckBox'
import styles from './styles'
import {EXCLUSIVE_TYPE} from "~/store/constants/app"

export default class DealImageSelector extends Component {
    constructor(props) {
      super(props)
      this.state = {
        selected : EXCLUSIVE_TYPE.CASHBACK
      }
    }
    _setSelected = (select) => {
      this.setState({selected: select})
    }

    getSelected = () => {
      return this.state.selected
    }

    setSelected = (value) => {
      this.setState({selected: value})
    }

    render() {
      const {forwardTo} = this.props
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={()=>this._setSelected(EXCLUSIVE_TYPE.CASHBACK)}>
            <View style={styles.row}>
              <View style={styles.inline}>
                <Text style={styles.label}>{I18n.t('cashback_discount')}</Text>
                <Icon name='coin_mark' style={{...styles.icon, ...styles.success, ...styles.ml3}} />
              </View>
              <CheckBox
                  type="radio"
                  parent={this}
                  checked={this.state.selected == EXCLUSIVE_TYPE.CASHBACK}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={()=>this._setSelected(EXCLUSIVE_TYPE.NORMAL)}>
            <View style={styles.row}>
              <View style={styles.inline}>
                <Text style={styles.label}>{I18n.t('normal_discount')}</Text>
              </View>
              <CheckBox
                  type="radio"
                  parent={this}
                  checked={this.state.selected == EXCLUSIVE_TYPE.NORMAL}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    }
}
