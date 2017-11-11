import React, { Component } from 'react'
import {View, ActivityIndicator, Modal, TouchableWithoutFeedback} from 'react-native'
import {Text} from 'native-base'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'
import Icon from "~/ui/elements/Icon"
import I18n from '~/ui/I18n'
import styles from './styles'

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
          <View style={styles.fullScreenPopup}>
            <View style={{width: '100%', height: 50, backgroundColor: material.primaryColor, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableWithoutFeedback>
                <Icon style={{fontSize: 25, color: 'white', padding: 10}} name='back' onPress={()=>this.close()}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={{
              width: '100%', flex: 1,justifyContent: 'flex-start', alignItems: 'center',
              backgroundColor: 'white', padding: 10
            }}>
              <Text bold medium grayDark style={{marginBottom: 40}}>{I18n.t('qr_use_hint')}</Text>
              {this.props.loading &&
                  <ActivityIndicator size={80} color={material.primaryColor} />
              }
              {!this.props.loading &&
                  <QRCode
                    value={this.state.qr}
                    size={250}
                    bgColor='black'
                    fgColor='white'/>
              }
              
            </View>
            <View style={styles.fixBottomButtonBlock}>
                <TouchableWithoutFeedback>
                    <View style={{...styles.bottomBtn, ...styles.bgWarning}}>
                        <Text white bold>{I18n.t('gen_another')}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={{...styles.bottomBtn, ...styles.bgPrimary}}> 
                        <Text white bold>{I18n.t('paid')}</Text>
                    </View>
                </TouchableWithoutFeedback>
              </View>
          </View>
        </Modal>
    )
  }
}