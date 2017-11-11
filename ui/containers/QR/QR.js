import React, { Component } from 'react'
import {View, ActivityIndicator, Modal, TouchableWithoutFeedback} from 'react-native'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'
import Icon from "~/ui/elements/Icon"

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
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => false}
        >
          <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'center',
              backgroundColor: 'white'
            }}>
            <View style={{width: '100%', height: 50, backgroundColor: material.primaryColor, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableWithoutFeedback>
                <Icon style={{fontSize: 25, color: 'white', padding: 10}} name='back' onPress={()=>this.close()}/>
              </TouchableWithoutFeedback>
            </View>
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
          </View>
        </Modal>
    )
  }
}