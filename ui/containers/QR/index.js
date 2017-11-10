import React, { Component } from 'react'
import {View, ActivityIndicator} from 'react-native'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'

export default class QR extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
        <ActivityIndicator size={70} animating={true} color={material.primaryColor} />
        <QRCode
            value='Vũ Long Hải'
            size={250}
            bgColor='black'
            fgColor='white'/>
      </View>
    )
  }
}