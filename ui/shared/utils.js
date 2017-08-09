import material from '~/theme/variables/material'
import React, { Component } from 'react'
import {View} from 'react-native'
import {Text} from 'native-base'

import { Platform } from 'react-native'

export const getPopoverOptions = (popoverWidth, fromRect, arrowPadding = -5) => ({
  fromRect,
  // from center
  translateOrigin: { x: popoverWidth / 2 - 20 },
  placement: 'auto',
  contentStyle: {
    width: popoverWidth,
    padding: 0,
  },
  popoverStyle: {
    left: material.deviceWidth - popoverWidth - 3,
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  arrowStyle: {
    // borderTopColor:'transparent'
    left: popoverWidth - 30 + arrowPadding,
  },
})


export const getTextParts = text => {
  const match = text.match(/#(.*?)#/)
  return match
    ? [text.substr(0, match.index), match[1], text.substr(match.index + match[0].length)]
    : [text]
}

export const formatNumber = str => {
  if (!str) return str
  if (!isNaN(str)){
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


export const isValidEmail = (email) => {
  email = email.trim();
  return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null
}

export const isValidPhoneNumber = (phone) => {
  return phone.match(/^\d{10,11}$/) !== null
}

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''
  if (!isNaN(phoneNumber)) {
    phoneNumber = phoneNumber.toString()
  }
  if ((m = phoneNumber.match(/^(84)(\d{2})(\d{3})(\d{4})$/))
    || (m = phoneNumber.match(/^(84)(\d{3})(\d{3})(\d{4})$/))) {
    return `(${m[1]})${m[2]} ${m[3]} ${m[4]}`
  } else if ((m = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/))
    || (m = phoneNumber.match(/^(\d{4})(\d{3})(\d{4})$/))) {
    return `${m[1]} ${m[2]} ${m[3]}`
  } else {
    m = phoneNumber.match(/^(\d{4})(\d{4})(\d{4,})$/)
    return `${m[1]} ${m[2]} ${m[3]}`
  }
}


export const convertVn = (str) => {
  return str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/gi, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/gi, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/gi, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/gi, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/gi, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/gi, 'y')
    .replace(/đ/gi, 'd');
}

export const chainParse = (obj, attrArr) => {
  if (!obj){
    return null
  }
  let cloneObj = Object.assign({}, obj)
  for (let i=0; i<attrArr.length; i++){
    cloneObj = cloneObj[attrArr[i]]
    if (!cloneObj) return null 
  }
  return cloneObj
}

export const getToastMessage = (message) => {
  return <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, borderRadius: 5, marginTop: 50 }}>
    <Text white>{message}</Text>
  </View>
}

export const getServerMode = (versionName) => {
  let splitArr = versionName.split(".")
  if (Platform.OS == 'android'){
    return (splitArr.length == 3) ? 'PROD':'DEV'
  }else{
    return (splitArr[splitArr.length-1] % 2 == 0) ? 'PROD':'DEV' 
  }
  
}

export const _isArrDiff = (arr1, arr2, checkProperties) => {
    if (arr1.length != arr2.length) return true
    for (let i = 0; i < arr1.length; i++) {
        if (_isDiff(arr1[i], arr2[i], checkProperties)) return true
    }
    return false
}

export const _isArrDiffPartial = (arr1, arr2, checkProperties) => {
  let length1 = arr1.length
  let length2 = arr2.length  
  if (length1 != length2) return true
  return (
      _isDiff(arr1[0], arr2[0], checkProperties) 
      || _isDiff(arr1[length1], arr2[length1], checkProperties)
  )
}

export const _isDiff = (item1, item2, checkProperties) => {
    if (!item1 && !item2) return false
    if (!item1) return true
    if (!item2) return true
    for (let i=0; i<checkProperties.length; i++){
      if (item1[checkProperties[i]] != item2[checkProperties[i]]){
        return true
      }
    }
    return false
}