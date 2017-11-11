import React, { Component } from 'react'
import {View, ActivityIndicator, Modal, TouchableWithoutFeedback} from 'react-native'
import {Text, Button} from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"

export default class ConfirmPopup extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      data: {}
    }
  }

  open = (data) => {
    this.setState({modalVisible: true, data: data})
  }

  close = () => {
    this.setState({modalVisible: false, data: ''})
  }

  _handleOk = () => {
        this.close()
        this.props.onOK && this.props.onOK()
  }

  render() {
    return (
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>this.close()}
        >
            <TouchableWithoutFeedback
                onPress={()=>this.close()}
            >
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)'
                    }}>
                        <View style={{backgroundColor: 'white'}}>
                            <View style={{...styles.rowSpace, ...styles.pd10}}>
                                <Text black>Số tiền:</Text>
                                <Text bold>{formatMoney(this.state.data.moneyAmount)}đ</Text>
                            </View>
                            <View style={{...styles.rowSpace, ...styles.pd10}}>
                                <Text black>Số hoá đơn:</Text>
                                <Text bold>{this.state.data.invoiceNumber}</Text>
                            </View>
                            <View style={styles.rowEnd}>
                                <Button onPress={()=>this.close()} transparent style={{margin: 5}}>
                                    <Text gray>Đóng</Text>
                                </Button>
                                <Button onPress={this._handleOk} style={{...styles.primaryButton, margin: 5}}>
                                    <Text white>Hoàn tất</Text>
                                </Button>
                            </View>
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
  }
}