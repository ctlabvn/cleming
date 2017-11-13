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
      text: props.value || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value){
      this.setState({value: nextProps.value})
    }
  }

  render(){
    return (<TextInput
      underlineColorAndroid={'transparent'}
      onChangeText={(text) => {
        this.setState({ text })
        this.props.onChange && this.props.onChange(formatMoney(text))
      }}
      value={formatMoney(this.state.text)}
      keyboardType='numeric'
      {...this.props}
    />)
  }
}