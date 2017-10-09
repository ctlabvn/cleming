import React, { Component, PropTypes } from 'react'
import {
  View,
  TextInput
} from 'react-native'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"


export default class MoneyMaskInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
    }
  }

  render(){
    return (<TextInput
      underlineColorAndroid={'transparent'}
      onChangeText={(text) => {
        this.setState({ text });
        this.props.onChange && this.props.onChange(formatMoney(text))
      }}
      value={formatMoney(this.state.text)}
      keyboardType='numeric'
      {...this.props}
    />)
  }
}