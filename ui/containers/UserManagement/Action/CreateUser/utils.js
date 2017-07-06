/**
 * Created by vjtc0n on 5/5/17.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ListItem, Text, View, Grid, Col, List
} from 'native-base'
import CheckBox from '~/ui/elements/CheckBox'
import validate from 'validate.js'
import _ from 'underscore'

import { Field } from 'redux-form'
import {
    InputField,
    CheckBoxField,
    // DateField,
} from '~/ui/elements/Form'

import styles from './styles'
import material from '~/theme/variables/material'
import { convertVn } from '~/ui/shared/utils'

const namePattern = /^([A-Za-z_]{2,}\s)*[A-Za-z_]{2,}$/
const usernameConstraints = {
  username: {
    format: {
      pattern: namePattern,
      flags: 'g'
    }
  }
}

const phonePattern = /^0\d{9,10}$/
const phoneConstraints = {
  phone: {
    format: {
      pattern: phonePattern,
      flags: 'i'
    }
  }
}

const emailConstraints = {
  email: {
    email: true
  }
}

export const RenderTextField = ({errorStyle, ...props}) => (
  <View style={{ ...styles.inputContainer, ...errorStyle }}>
    <Field
      iconStyle={styles.closeIcon}
      icon={input => input.value ? 'close' : false}
      onIconPress={input => input.onChange('')}
      inputStyle={styles.inputText}
      style={styles.inputField}
      component={InputField}
      placeholderTextColor={material.gray500} 
      {...props}
    />
  </View>
)

// if long then seperate
export const validateField = (values) => {
  const errors = {}
  if(!values) return errors
  
  if (values.name.trim() == '') {
    errors.name = "Bạn cần nhập Họ tên."
      return errors;
  } else {
    // if (!_.isUndefined(validate({username: values.name}, usernameConstraints))) {
    //   errors.name = "Tên cần có ít nhất 2 ký tự, tối đa 1 dấu cách giữa các ký tự và không bao gồm các ký tự đặc biệt và số"
    // }
    if(!convertVn(values.name).match(namePattern)){
      errors.name = "Tên cần có ít nhất 2 ký tự, không bao gồm các ký tự đặc biệt và số."
        return errors;
    }
  }
  
  if (values.phone.trim() == '') {
    errors.phone = "Bạn cần nhập số điện thoại."
      return errors;
  } else {
    if (!_.isUndefined(validate({phone: values.phone}, phoneConstraints))) {
      errors.phone = "Bạn nhập chưa đúng định dạng số điện thoại."
        return errors;
    }
  }
  
  if (values.email.trim() != '') {
    if (!_.isUndefined(validate({email: values.email}, emailConstraints))) {
      errors.email = "Bạn nhập chưa đúng định dạng email."
        return errors;
    }
  }
  
  return errors
}

@connect(state => ({  
  place: state.place,
}))
export class RenderGroup extends Component {
  constructor(props) {
    super(props)

    this.children = {}
    this.selectedPlaceId = props.selectedPlaceId
  }
  
  componentWillMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {

  }
  
  componentDidMount() {

    this.props.onReady && this.props.onReady(this)
      // alert('selected place utils' + this.state.selectedPlace)

      // this.setDefaultChecked();
  }

  
  handleCheck(address){

    console.log(this.children)

    if(address && address.placeId !== this.selectedPlaceId){
      let prevChild = this.children[this.selectedPlaceId]
      prevChild && prevChild.setState({checked: false})
      this.selectedPlaceId = address.placeId
      prevChild = this.children[this.selectedPlaceId]
      prevChild && prevChild.setState({checked: true})
    }    
  }
  
  
  render() {

    const {place} = this.props
      
    return (
      <View style={{marginTop: 10}}>
        
        <Text style={styles.leftAddressTitleText}>Danh sách địa điểm</Text>
            
        
        {place.listPlace && place.listPlace.map((address,index) => (
              <ListItem key={index} 
                  onPress={()=>this.handleCheck(address)}
                  style={styles.listItem}>
                  <Text small numberOfLines={2} style={styles.left}>{address.address}</Text>
                  <View style={styles.right}>
                      <CheckBox
                          onReady={ref=>this.children[address.placeId]=ref}
                          type="radio"
                          parent={this}
                          checked={address.placeId === this.selectedPlaceId}                          
                      />
                  </View>
              </ListItem>
          ))}
        
      </View>
    )
  }
}