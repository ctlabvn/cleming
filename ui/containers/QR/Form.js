import React, { Component } from 'react'
import {connect} from "react-redux"
import {View, TextInput, TouchableWithoutFeedback} from 'react-native'
import {Text, Button, Content} from 'native-base'
import CheckBox from '~/ui/elements/CheckBox'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"
import MoneyMaskInput from '~/ui/components/MoneyMaskInput'
import styles from './styles'
import {formatDateTime, revertDateTime, getFormatObj, getDateArray, formatTime, INVOICE_TYPE} from './utils'
import {createQR} from '~/store/actions/transaction'
import {getSession, getUser} from "~/store/selectors/auth";
import md5 from 'md5'
import moment from "moment"
import QR from './QR'
import ConfirmPopup from './ConfirmPopup'
import I18n from '~/ui/I18n'


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
        let invoiceNumber = this.state.noBill ? this.state.noBillInvoiceNumber : this.state.invoiceNumber.trim()
        this.confirmPopup.open({moneyAmount, invoiceNumber, noBill: this.state.noBill})
    }

    _doGenerate = () => {
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
        this.qr.open()
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
            <Content style={{backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <QR ref={ref=>this.qr=ref} loading={this.state.loading}/>
                    <ConfirmPopup ref={ref=>this.confirmPopup=ref} onOK={this._doGenerate} />
                    <Text bold grayDark medium style={{...styles.mt20, ...styles.mb20}}>{I18n.t('qr_hint')}</Text>
                    <View style={{...styles.rowSpace, ...styles.inputStyle, ...styles.mb20}}>
                        <MoneyMaskInput 
                            placeholder={I18n.t('qr_money_hint')}
                            underlineColorAndroid={'transparent'}
                            onChange={text=>this.setState({money: formatMoney(text)})}
                            style={{...styles.inputMoney}}
                        />
                        <Text medium style={styles.currency}> đ</Text>
                    </View>
                    {!this.state.noBill &&
                        <TextInput 
                            placeholder={I18n.t('qr_invoice_hint')}
                            underlineColorAndroid={'transparent'}
                            style={{...styles.inputStyle, ...styles.mb20}}
                            onChangeText={text=>this.setState({invoiceNumber: text})}
                            autoCorrect={false}
                        />
                    }
                    {this.state.noBill && 
                        <View style={{...styles.fakeDisable, ...styles.mb20}} />
                    }
                    <TouchableWithoutFeedback onPress={this._onPressNoBill}>
                        <View style={{...styles.rowStart, ...styles.mb20}}>
                            <CheckBox checked={this.state.noBill}/>
                            <Text grayDark>{I18n.t('no_bill_hint')}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {this.state.noBill &&
                        <View style={{...styles.rowSpace, ...styles.mb20}}>
                            <Text grayDark>{I18n.t('invoice_time_hint')}</Text>
                            <TextInput 
                                underlineColorAndroid={'transparent'}
                                style={{...styles.dateTimeInput}}
                                keyboardType='numeric'
                                onChangeText={this._onChangeTextNoBill}
                                value={this.state.noBillInvoiceNumber}
                            />
                        </View>
                    }

                    <Text gray style={{...styles.mb20}}>(Nếu không có mã hoá đơn, vui lòng nhập mã theo định dạng: năm/tháng/ngày/giờ/phút/số tiền)</Text>
                    {(enableBtn) && <View style={styles.rowCenter}>
                        <TouchableWithoutFeedback onPress={this._onPressGenerate}>
                            <View style={styles.primaryButton} >
                                <Text white bold>Tạo QR</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    }

                    {(!enableBtn) &&<View style={styles.rowCenter}>
                        <TouchableWithoutFeedback onPress={this._onPressGenerate}>
                            <View style={styles.disableBtn} >
                                <Text grayDark bold>Tạo QR</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>}

                    {/* {this.state.loading &&
                        <View style={styles.rowCenter}>
                            <ActivityIndicator size={80} color={material.primaryColor} />
                        </View>
                    } */}
                </View>
            </Content>
        )
  }
}