import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, List, ListItem, Spinner, Text, Item, Input, Form} from "native-base";
import {InteractionManager, View, TouchableOpacity, Image, Keyboard, ScrollView} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletActions from "~/store/actions/wallet";

import Icon from "~/ui/elements/Icon";
import moment from "moment";
import {formatNumber, getToastMessage} from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import {getSession} from "~/store/selectors/auth";
import CheckBox from '~/ui/elements/CheckBox'
import material from "~/theme/variables/material.js";
import BankSelection from './BankSelection'
import BankAccount from '../BankAccount'
import I18n from '~/ui/I18n'

/* add bank account */
import {Field, formValueSelector, reduxForm, reset} from "redux-form"
import {InputFieldWithErr} from "~/ui/elements/Form"
import SearchableDropdown from '~/ui/components/SearchableDropdown'
import {validate} from './validate'
import PreviewPopup from './PreviewPopup'
/***/

@connect(state => ({
    xsession: getSession(state),
    bank: state.wallet.bank,
    listBank: state.banks,
    cashoutOverview: state.cashoutOverview
}), {...commonAction, ...walletActions, resetForm: reset})

@reduxForm({form: 'AddBankAccountForm', validate})

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moneyAmount: '',
            useDiffrenceAccount: false,
        }
        this.listBank = []
    }

    componentDidMount = () => {
        const {xsession, getBanks, getListBank} = this.props
        getBanks(xsession, (err, data)=> {
            if (data) {
                // console.warn(JSON.stringify(data));
                this.bankSelection.selectDefaultItem(data.data[0]);
            }
        })
        getListBank(xsession)
    }
    _handlePressOk = () => {
        // console.log('Selected', this.bankSelection.getSelected())
        const {setToast, cashout, xsession} = this.props
        if (!this.state.moneyAmount || this.state.moneyAmount.trim == '') {
            setToast(getToastMessage(I18n.t('err_money_not_empty')), 'info', null, null, 2000, 'top')
            return
        } else if (isNaN(this.state.moneyAmount)) {
            setToast(getToastMessage(I18n.t('err_money_must_number')), 'info', null, null, 2000, 'top')
            return
        }
        let selectedBank = this.bankSelection.getSelected()
        cashout(xsession, selectedBank.bankId, selectedBank.accountNumber, this.state.moneyAmount,
            (err, data) => {
                if (data && data.data && data.data.success) {
                    Keyboard.dismiss()
                    this._handlePressClear()
                    setToast(getToastMessage('Chúng tôi đã nhận được yêu cầu rút tiền của quý khách và sẽ xử lí trong thời gian sớm nhất.'), 'info', null, null, 2000, 'top')
                } else {
                    Keyboard.dismiss()
                }
            }
        )

    }

    _handlePressOkAdvance(data) {
        Keyboard.dismiss();
        if (this.state.useDiffrenceAccount) {
            data['bank'] = this.bankDropdown.getValue().name
            this.preview.show(data)
        }
        else this._handlePressOk()
    }

    _handlePressClear = () => {
        this.setState({moneyAmount: ''})
    }

    _handleCallBackSelected() {
        this.setState({useDiffrenceAccount: false});
    }

    _handlePressUseDiffrenceAccount() {
        this.bankSelection.unSelectedALlItem();
        if (!this.state.useDiffrenceAccount) {
            this.props.resetForm('AddBankAccountForm');
        }
        this.setState({
            useDiffrenceAccount: true,
        }, () => {
            // alert('done');
            if (this.refs.input1) this.refs.input1.value = '';
        })
    }

    _renderFormAddAccount() {
        const {listBank} = this.props
        if (listBank && listBank.length > 0 && this.listBank.length == 0) {
            this.listBank = listBank.map(item => ({
                id: item.bankId,
                name: item.displayName
            }))
        }

        // this.props.resetForm('AddBankAccountForm');

        return (
            <View style={{padding: 10}}>
                <Text gray>{I18n.t('account_owner')}</Text>
                <Field autoCapitalize="none" name="account_owner"
                       icon={(input, active) => input.value && active ? 'close' : false}
                       iconStyle={{color: material.black500}}
                       ref='input1'
                       onIconPress={input => input.onChange('')}
                       component={InputFieldWithErr}
                       style={styles.inputItem}
                />

                <Text gray>{I18n.t('identity_card')}</Text>
                <Field name="identity_card"
                       icon={(input, active) => input.value && active ? 'close' : false}
                       iconStyle={{color: material.black500}}
                       ref='input2'
                       onIconPress={input => input.onChange('')}
                       component={InputFieldWithErr}
                       style={styles.inputItem}
                       keyboardType="numeric"
                />

                <Text gray>{I18n.t('account_number')}</Text>
                <Field name="account_number"
                       icon={(input, active) => input.value && active ? 'close' : false}
                       iconStyle={{color: material.black500}}
                       ref='input3'
                       onIconPress={input => input.onChange('')}
                       component={InputFieldWithErr}
                       style={styles.inputItem}
                       keyboardType="numeric"
                />

                <Text gray>{I18n.t('bank_name')}</Text>
                <SearchableDropdown dropdownValues={this.listBank} ref={ref => this.bankDropdown = ref}/>

                <Text gray>{I18n.t('branch')}</Text>
                <Field name="branch"
                       icon={(input, active) => input.value && active ? 'close' : false}
                       iconStyle={{color: material.black500}}
                       ref='input4'
                       onIconPress={input => input.onChange('')}
                       component={InputFieldWithErr}
                       style={styles.inputItem}
                />
            </View>
        )
    }


    _submitDiffrenceAccount(data) {
        const {account_number, account_owner, area, branch, identity_card} = data
        const bankID = this.bankDropdown.getValue().id
        // console.warn(account_number + '\n' + account_owner + '\n' + area + '\n' + branch + '\n' + identity_card + '\n' + bankID);
    }

    render() {

        const {forwardTo, bank, cashoutOverview} = this.props

        const {handleSubmit} = this.props;
        // if (handleSubmit) handleSubmit((d) => alert('submit'));
        // else console.warn('use diff acc ');

        return (
            <Container style={styles.container}>
                {/*<View>*/}
                <PreviewPopup ref={ref => this.preview = ref}
                              onOk={handleSubmit((data) => this._submitDiffrenceAccount(data))}/>
                <Content>
                    <View style={{...styles.rowPadding, ...styles.backgroundPrimary}}>
                        <Text white bold>{I18n.t('balance')}</Text>
                        <Text white>
                            <Text white bold style={styles.moneyNumber}>{formatNumber(cashoutOverview.balanceMoney)}
                                đ</Text>
                        </Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Item style={styles.item}>
                            <Input
                                style={styles.input}
                                keyboardType='phone-pad'
                                placeholder={I18n.t('withdrawn_amount')}
                                onChangeText={(value) => this.setState({moneyAmount: value})}
                                value={this.state.moneyAmount.toString()}
                            />
                            {(this.state.moneyAmount != 0 || this.state.moneyAmount.length > 0) &&
                            <Icon name='close' style={{...styles.icon, color: material.gray500}}
                                  onPress={this._handlePressClear}/>}
                        </Item>
                    </View>
                    <View style={styles.rowCenter}>
                        <Text gray>{I18n.t('receive_account')}</Text>
                    </View>
                    {/*<View style={styles.pd10}>*/}
                    {/*<ScrollView>*/}
                    <View style={{paddingBottom: 50}}>
                        <BankSelection
                            callback={() => this._handleCallBackSelected()}
                            listAccounts={bank}
                            ref={bankSelection => this.bankSelection = bankSelection}/>

                        {/*<TouchableOpacity onPress={() => forwardTo('bankAccount')}>*/}
                            {/*<View style={{...styles.bankLogoContainer, justifyContent: 'center', height: 50}}>*/}
                                {/*<Text primary>+ {I18n.t('add_account')}</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}

                        <TouchableOpacity onPress={() => this._handlePressUseDiffrenceAccount()}>
                            <View style={styles.bankLogoContainer}>
                                <Text blue medium style={{textAlign: 'center'}}>Tài khoản nhận tiền khác</Text>
                                <CheckBox type="radio" checked={this.state.useDiffrenceAccount}
                                          onPress={() => this._handlePressUseDiffrenceAccount()}/>
                            </View>
                        </TouchableOpacity>

                        {this.state.useDiffrenceAccount && this._renderFormAddAccount()}

                    </View>

                </Content>
                {/*</View>*/}
                <Button style={styles.okBtn} onPress={handleSubmit((data) => this._handlePressOkAdvance(data))}>
                    <Text white>Đồng ý</Text>
                </Button>

            </Container>
        )
    }
}