import React, { Component } from 'react'
import {View, ActivityIndicator, Modal} from 'react-native'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'

export default class QR extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      qr: ''
    }
  }

  open = (qr) => {
    this.setState({modalVisible: true, qr})
  }

  close = () => {
    this.setState({modalVisible: false, qr: ''})
  }

  render() {
    return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => false}
        >
          <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center',
            backgroundColor: 'white'
          }}>
            <QRCode
                value={this.state.qr}
                size={250}
                bgColor='black'
                fgColor='white'/>
          </View>
        </Modal>
    )
  }
}