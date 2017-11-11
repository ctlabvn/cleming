import React, { Component } from 'react'
import {connect} from "react-redux"
import {View, ActivityIndicator, TextInput, TouchableWithoutFeedback} from 'react-native'
import {Text, Button} from 'native-base'
import CheckBox from '~/ui/elements/CheckBox'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"
import MoneyMaskInput from '~/ui/components/MoneyMaskInput'
import styles from './styles'
import {formatDateTime, revertDateTime, getFormatObj, getDateArray, formatTime} from './utils'
import {createQR} from '~/store/actions/transaction'
import {getSession, getUser} from "~/store/selectors/auth";
import md5 from 'md5'
import moment from "moment"
import QR from './QR'

@connect(state => ({
    xsession: getSession(state),
    user: getUser(state)
}), {createQR})
export default class QRForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            noBill: false,
            money: 0,
            noBillInvoiceNumber: moment().hour()+':'+moment().minute(),
            invoiceNumber: '',
            loading: false
        }
    }

    _onPressGenerate = () => {
        if (!this.props.app || !this.props.app.topDropdown || !this.props.app.topDropdown.getValue()
            || Object.keys(this.props.app.topDropdown.getValue()).length == 0 || this.state.loading) return
        const {user, createQR, xsession} = this.props
        let moneyAmount = revertFormatMoney(this.state.money).trim()
        let invoiceNumber = this.state.noBill ? 
            moment().year().toString() + (moment().month()+1).toString() + moment().date().toString()+ revertDateTime(this.state.noBillInvoiceNumber)
            : this.state.invoiceNumber.trim()
        let placeId = this.props.app.topDropdown.getValue().id
        let timeClient = moment().unix()
        let checkSum =  md5(invoiceNumber+moneyAmount+placeId+timeClient+user.bizAccountId)
        this.setState({loading: true})
        createQR(xsession, invoiceNumber, moneyAmount, placeId, timeClient, checkSum,
            (err, data) => {
                this.setState({loading: false})
                // Case success
                if (data && data.data && data.data.tranQRId){
                    let qrObj = {
                        id: data.data.tranQRId,
                        am: moneyAmount,
                        da: timeClient,
                        mi: 'clingme'+placeId,
                        billid: invoiceNumber
                    }
                    this.qr.open(JSON.stringify(qrObj))
                }
            }
        )
    }

    _onPressNoBill = () => {
        this.setState({noBill: !this.state.noBill, invoiceNumber: ''})
    } 

    _onChangeTextNoBill = (text) => {
        this.setState({noBillInvoiceNumber: formatTime(text)})
    }

    render() {

        let enableBtn = (!this.state.noBill && !!this.state.money && !!this.state.invoiceNumber)
            || (this.state.noBill && !!this.state.money && !!this.state.noBillInvoiceNumber)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', ...styles.pd10 }}>
                <QR ref={ref=>this.qr=ref} />
                
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
                        onChangeText={text=>this.setState({invoiceNumber: text})}
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
                        value={this.state.noBillInvoiceNumber}
                    />
                }

                <Text gray style={{...styles.mb20}}>(Nếu không có mã hoá đơn, vui lòng nhập mã theo định dạng: năm/tháng/ngày/giờ/phút/số tiền)</Text>
                {(enableBtn)
                && <View style={styles.rowCenter}>
                    <Button style={styles.primaryButton} onPress={this._onPressGenerate}>
                        <Text white bold>Tạo QR</Text>
                    </Button>
                </View>
                }

                {(!enableBtn) &&
                    <View style={styles.rowCenter}>
                    <Button style={styles.disableBtn}>
                        <Text white bold>Tạo QR</Text>
                    </Button>
                </View>}

                {this.state.loading &&
                    <View style={styles.rowCenter}>
                        <ActivityIndicator size={80} color={material.primaryColor} />
                    </View>
                }
            </View>
        )
  }
}