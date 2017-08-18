import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image, Keyboard, ScrollView } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletActions from "~/store/actions/wallet";

import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import CheckBox from '~/ui/elements/CheckBox'
import material from "~/theme/variables/material.js";
import BankSelection from './BankSelection'
import I18n from '~/ui/I18n'


@connect(state => ({
    xsession: getSession(state),
    bank: state.wallet.bank,
    wallet: state.wallet
}), { ...commonAction, ...walletActions })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moneyAmount: ''
        }

    }
    componentDidMount = () => {
        const {xsession, getBanks} = this.props
        getBanks(xsession)
    }
    _handlePressOk = () => {
        // console.log('Selected', this.bankSelection.getSelected())
        const {setToast, cashout, xsession} = this.props
        if (!this.state.moneyAmount || this.state.moneyAmount.trim == ''){
            setToast(getToastMessage(I18n.t('err_money_not_empty')), 'info', null, null, 2000, 'top')
            return
        }else if (isNaN(this.state.moneyAmount)) {
            setToast(getToastMessage(I18n.t('err_money_must_number')), 'info', null, null, 2000, 'top')
            return
        }
        let selectedBank = this.bankSelection.getSelected()
        cashout(xsession, selectedBank.bankId, selectedBank.accountNumber, this.state.moneyAmount,
            (err, data) => {
                if (data && data.data && data.data.success){
                    Keyboard.dismiss()
                    this._handlePressClear()
                    setToast(getToastMessage('Chúng tôi đã nhận được yêu cầu rút tiền của quý khách và sẽ xử lí trong thời gian sớm nhất.'), 'info', null, null, 2000, 'top')
                }else{
                    Keyboard.dismiss()
                }
            }
        )
        
    }
    _handlePressClear = () => {
        this.setState({ moneyAmount: '' })
    }
    
    render() {
        const {forwardTo, bank, wallet} = this.props
        return (
            <Container style={styles.container}>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary }}>
                    <Text white>{I18n.t('balance')}</Text>
                    <Text white>
                        <Text white bold style={styles.banmoneyNumber}>{formatNumber(wallet.moneyAmount)}</Text>đ
                    </Text>
                </View>
                <View style={styles.rowPadding}>
                    <Item style={styles.item}>
                        <Input
                            style={styles.input}
                            keyboardType='phone-pad'
                            placeholder={I18n.t('withdrawn_amount')}
                            onChangeText={(value) => this.setState({ moneyAmount:value })}
                            value={this.state.moneyAmount.toString()}
                        />
                        {(this.state.moneyAmount != 0 || this.state.moneyAmount.length > 0) && 
                            <Icon name='close' style={{...styles.icon, color:material.gray500 }} onPress={this._handlePressClear} />}
                    </Item>
                </View>
                <View style={styles.rowCenter}>
                    <Text gray>{I18n.t('receive_account')}</Text>
                </View>
                <View style={styles.pd10}>
                    <ScrollView>
                        <View style={{paddingBottom: 150}}>
                            <BankSelection listAccounts={bank} ref={bankSelection=>this.bankSelection=bankSelection} />
                            <TouchableOpacity onPress={()=>forwardTo('bankAccount')}>
                                <View style={{ ...styles.bankLogoContainer, justifyContent: 'center', height: 50 }}>
                                    <Text primary>+  {I18n.t('add_account')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <Button style={styles.okBtn} onPress={() => this._handlePressOk()}>
                    <Text white>OK</Text>
                </Button>

            </Container>
        )
    }
}