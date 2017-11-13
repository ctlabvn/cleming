import React, { Component } from 'react'
import {connect} from "react-redux"
import {View, TextInput, TouchableWithoutFeedback} from 'react-native'
import {Text, Button, Content} from 'native-base'
import CheckBox from '~/ui/elements/CheckBox'
import QRCode from 'react-native-qrcode'
import material from '~/theme/variables/material'
import { formatMoney, revertFormatMoney, getToastMessage } from "~/ui/shared/utils"
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
import {setToast, goBack} from '~/store/actions/common'
import ErrorPopup from './ErrorPopup'

@connect(state => ({
    xsession: getSession(state),
    user: getUser(state)
}), {createQR, setToast, goBack})
export default class QRForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            noBill: false,
            money: '',
            noBillInvoiceNumber: this._formatTwoDigit(moment().hour())+':'+this._formatTwoDigit(moment().minute()),
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

    _reset = () => {
        this.setState({
            noBill: false,
            money: '',
            noBillInvoiceNumber: this._formatTwoDigit(moment().hour())+':'+this._formatTwoDigit(moment().minute()),
            invoiceNumber: '',
            loading: false
        })
    }

    _formatTwoDigit = (number) => {
        return (number < 10) ? 0+number.toString() : number.toString()
    }

    _doGenerate = () => {
        if (!this.props.app || !this.props.app.topDropdown || !this.props.app.topDropdown.getValue()
        || Object.keys(this.props.app.topDropdown.getValue()).length == 0 || this.state.loading) return
        const {user, createQR, xsession} = this.props
        let moneyAmount = revertFormatMoney(this.state.money).trim()
        let invoiceNumber = this.state.noBill ? 
            moment().year().toString() + this._formatTwoDigit((moment().month()+1)) + this._formatTwoDigit(moment().date())+ revertDateTime(this.state.noBillInvoiceNumber)
            : this.state.invoiceNumber.trim()
        let placeId = this.props.app.topDropdown.getValue().id
        let timeClient = moment().unix()
        let checkSum =  md5(invoiceNumber+moneyAmount+placeId+timeClient+user.bizAccountId)
        this.setState({loading: true})
        this.qr.open()
        
        createQR(xsession , invoiceNumber, moneyAmount, placeId, timeClient, checkSum,
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
                }else{
                    this.errorPopup.open()
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

    _onPaid = () => {
        this.props.goBack()
    }

    _onGenAnother = () => {
        this._reset()
    }

    _onRetry = () =>{
        this._doGenerate()
    }

    _onCancelError = () => {
        this.qr.close()
    }

    render() {

        let enableBtn = (!this.state.noBill && !!this.state.money && !!this.state.invoiceNumber)
            || (this.state.noBill && !!this.state.money && !!this.state.noBillInvoiceNumber)
        return (
            <Content style={{backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <QR ref={ref=>this.qr=ref} loading={this.state.loading} 
                        onPaid={this._onPaid}
                        onGenAnother={this._onGenAnother}
                    />
                    <ErrorPopup ref={ref=>this.errorPopup=ref} 
                        onRetry={this._onRetry}  
                        onCancel={this._onCancelError}  
                    />
                    <ConfirmPopup ref={ref=>this.confirmPopup=ref} onOK={this._doGenerate} />
                    <Text bold grayDark medium style={{...styles.mt20, ...styles.mb20}}>{I18n.t('qr_hint')}</Text>
                    <View style={{...styles.rowSpace, ...styles.inputStyle, ...styles.mb20}}>
                        <MoneyMaskInput 
                            placeholder={I18n.t('qr_money_hint')}
                            underlineColorAndroid={'transparent'}
                            onChange={text=>this.setState({money: formatMoney(text)})}
                            value={this.state.money}
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
                            value={this.state.invoiceNumber}
                            autoCorrect={false}
                            autoCapitalize='none'
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

                    {(enableBtn) && <View style={styles.rowCenter}>
                        <TouchableWithoutFeedback onPress={this._onPressGenerate}>
                            <View style={styles.primaryButton} >
                                <Text white bold>{I18n.t('create_qr_2')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    }

                    {(!enableBtn) &&<View style={styles.rowCenter}>
                        <TouchableWithoutFeedback>
                            <View style={styles.disableBtn} >
                                <Text grayDark bold>{I18n.t('create_qr_2')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>}
                </View>
            </Content>
        )
  }
}