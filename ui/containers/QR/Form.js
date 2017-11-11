import React, { Component } from 'react'
import {View, ActivityIndicator, TextInput, TouchableWithoutFeedback} from 'react-native'
import {Text, Button} from 'native-base'
import CheckBox from '~/ui/elements/CheckBox'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'
import { formatMoney } from "~/ui/shared/utils"
import MoneyMaskInput from '~/ui/components/MoneyMaskInput'
import styles from './styles'
import {formatDateTime, revertDateTime, getFormatObj, getDateArray} from './utils'
import {createQR} from '~/store/actions/transaction'
import {getSession, getUser} from "~/store/selectors/auth";

@connect(state => ({
    xsession: getSession(state),
}), {createQR})
export default class QRForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            noBill: false,
            money: 0,
            noBillCode: ''
        }
    }

    _onPressGenerate = () => {

    }

    _onPressNoBill = () => {
        this.setState({noBill: !this.state.noBill})
    } 

    _onChangeTextNoBill = (text) => {
        console.log('Text', text)
        console.log('Format Obj', formatDateTime(text))
        this.setState({noBillCode: formatDateTime(text)})
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', ...styles.pd10 }}>
                <Text bold black medium style={{...styles.mt20, ...styles.mb20}}>Tạo mã QR để khách hàng thanh toán trên Clingme</Text>
                <View style={styles.rowSpace}>
                    <MoneyMaskInput 
                        placeholder='Nhập số tiền cần thanh toán'
                        underlineColorAndroid={'transparent'}
                        onChange={text=>this.setState({money: formatMoney(text)})}
                        style={{...styles.inputMoney, ...styles.mb20}}
                    />
                    <Text large gray bold> đ</Text>
                </View>
                {!this.state.noBill &&
                    <TextInput 
                        placeholder='Nhập số hoá đơn'
                        underlineColorAndroid={'transparent'}
                        style={{...styles.inputStyle, ...styles.mb20}}
                        disable
                    />
                }
                {this.state.noBill &&
                    <View style={{...styles.fakeDisable, ...styles.mb20}} />
                }
                <TouchableWithoutFeedback onPress={this._onPressNoBill}>
                    <View style={{...styles.rowStart, ...styles.mb20}}>
                        <CheckBox checked={this.state.noBill}/>
                        <Text>Không có mã hoá đơn</Text>
                    </View>
                </TouchableWithoutFeedback>

                {this.state.noBill &&
                    <TextInput 
                        placeholder='Nhập số hoá đơn'
                        underlineColorAndroid={'transparent'}
                        style={{...styles.inputStyle, ...styles.mb20}}
                        keyboardType='numeric'
                        onChangeText={this._onChangeTextNoBill}
                        value={this.state.noBillCode}
                    />
                }

                <Text gray style={{...styles.mb20}}>(Nếu không có mã hoá đơn, vui lòng nhập mã theo định dạng: năm/tháng/ngày/giờ/phút/số tiền)</Text>
                <View style={styles.rowCenter}>
                    <Button style={styles.primaryButton} onPress={this._onPressGenerate}>
                        <Text white bold>Tạo QR</Text>
                    </Button>
                </View>
            </View>
        )
  }
}