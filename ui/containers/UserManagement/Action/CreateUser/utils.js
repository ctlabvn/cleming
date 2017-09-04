/**
 * Created by vjtc0n on 5/5/17.
 */
import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
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

import ListViewExtend from '~/ui/components/ListViewExtend'

import styles from './styles'
import material from '~/theme/variables/material'
import { convertVn } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'

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
    errors.name = I18n.t('err_name_empty')
      return errors;
  } else {
    // if (!_.isUndefined(validate({username: values.name}, usernameConstraints))) {
    //   errors.name = "Tên cần có ít nhất 2 ký tự, tối đa 1 dấu cách giữa các ký tự và không bao gồm các ký tự đặc biệt và số"
    // }
    if(!convertVn(values.name).match(namePattern)){
      errors.name = I18n.t('err_name_invalid_format')
        return errors;
    }
  }

  if (values.phone.trim() == '') {
    errors.phone = I18n.t('err_phone_empty')
      return errors;
  } else {
    if (!_.isUndefined(validate({phone: values.phone}, phoneConstraints))) {
      errors.phone = I18n.t('err_phone_invalid_format')
        return errors;
    }
  }

  if (values.email.trim() != '') {
    if (!_.isUndefined(validate({email: values.email}, emailConstraints))) {
      errors.email = I18n.t('err_email_invalid_format')
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


  scrollToTop(){
    this.listView && this.listView.scrollTo({ x: 0, y: 0, animated: true });
  }

   scrollToEnd(){
    this.listView && this.listView.scrollToEnd()
  }

  handleCheck(address){

    // console.log(this.children)

    if(address && address.placeId !== this.selectedPlaceId){
      let prevChild = this.children[this.selectedPlaceId]
      prevChild && prevChild.setState({checked: false})
      this.selectedPlaceId = address.placeId
      prevChild = this.children[this.selectedPlaceId]
      prevChild && prevChild.setState({checked: true})
    }
  }

  renderRow(address, rowID){
    // console.log('render item', rowID)
    const renderedRow = (
      <TouchableOpacity
          onPress={()=>this.handleCheck(address)}
          style={styles.listItem}>

          <Text small numberOfLines={2} style={styles.left}>{address.address}</Text>

          <CheckBox
              onReady={ref=>this.children[address.placeId]=ref}
              type="radio"
              parent={this}
              checked={address.placeId === this.selectedPlaceId}
          />

      </TouchableOpacity>
    )

    if(rowID == 0){
      return (
        <View>
          {this.props.firstItem}
          {renderedRow}
        </View>
      )
    } else if(rowID == this.props.place.listPlace.length - 1) {
      return (
        <View>
          {renderedRow}
          {this.props.lastItem}
        </View>
      )
    } else {
      return renderedRow
    }

  }


  render() {
    // removeClippedSubviews={false} to prevent CRASH, as recommend from github this is bug of ListView, should use FlatList instead
    return (
        <ListViewExtend
              contentContainerStyle={styles.listContent}
              removeClippedSubviews={false}
              ref={ref=>this.listView = ref}
              keyExtractor={item=>item.placeId}
              dataArray={this.props.place.listPlace}
              renderRow={(address, sectionID, rowID)=> this.renderRow(address, rowID)}
              rowHasChanged={true}
          />

    )
  }
}
