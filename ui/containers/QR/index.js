import React, { Component } from 'react'
import {View} from 'react-native'
import QRCode from 'react-native-qrcode';
export default class QR extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCode
            value='Vũ Long Hải'
            size={250}
            bgColor='black'
            fgColor='white'/>
      </View>
    )
  }
}