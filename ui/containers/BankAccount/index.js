import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input, Form } from "native-base";
import { InteractionManager, View, TouchableOpacity, KeyboardAvoidingView, Keyboard} from "react-native";
import styles from "./styles";
import * as commonAction from "~/store/actions/common";
import * as walletAction from '~/store/actions/wallet'
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
import SearchableDropdown from '~/ui/components/SearchableDropdown'
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import CheckBox from '~/ui/elements/CheckBox'
import material from "~/theme/variables/material.js";
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { InputFieldWithErr } from "~/ui/elements/Form"
import { chainParse } from "~/ui/shared/utils"
import { GENERAL_ERROR_MESSAGE } from "~/store/constants/app"
import I18n from '~/ui/I18n'
import {validate} from './validate'
import LoadingModal from "~/ui/components/LoadingModal"
import PreviewPopup from './PreviewPopup'
@connect(state => ({
    xsession: getSession(state),
    banks: state.banks,
}), { ...commonAction, ...walletAction, resetForm:reset })
@reduxForm({ form: 'BankAccountForm', validate })

export default class extends Component {
    constructor(props) {
        super(props)
        this.listBank = []
        this.state = {
            loading: false
        }
    }
    _handlePressOk = (input) => {
        console.log('Input: ', input)
        const {account_number, account_owner, area, branch, identity_card} = input
        const {addBank, xsession, setToast} = this.props
        if (!this.bankDropdown || !this.bankDropdown.getValue() || !this.bankDropdown.getValue().id) return
        let bankID = this.bankDropdown.getValue().id
        this.setState({loading: true})
        addBank(xsession, account_owner, identity_card, account_number, bankID, area, branch,
            (err, data) => {
                console.log('Add bank Err', err)
                console.log('Add bank data', data)
                this.setState({loading: false})
                if (chainParse(data, ['data', 'success'])){
                    setToast(getToastMessage(I18n.t('add_bank_success')), 'danger', null, null, 3000, 'top')
                    this.props.resetForm('BankAccountForm')
                    Keyboard.dismiss()
                }else{
                    setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'danger', null, null, 2000, 'top')
                }
            }
        )
    }
    _onPressOk = (input) => {
      let data = Object.assign({}, input)
      data['bank']=this.bankDropdown.getValue().name
      console.log('Data: ', data)
      this.preview.show(data)
    }
    componentDidMount(){
        const {xsession, getListBank} = this.props
        getListBank(xsession,
            (err, data) => {
                console.log('List Bank Err: ', err)
                console.log('List Bank Data: ', data)
            }
        )
    }
    render() {
        const {handleSubmit, banks} = this.props
        if (banks.length > 0 && this.listBank.length == 0){
            this.listBank = banks.map(item=>({
                id: item.bankId,
                name: item.displayName
            }))
            console.log('List Bank', this.listBank)
        }
        // {handleSubmit(this._handlePressOk)}
        return (
            <Container style={styles.container}>
                <LoadingModal loading = {this.state.loading} />
                <PreviewPopup ref={ref=>this.preview=ref} onOk={handleSubmit(this._handlePressOk)}/>
                <Content style={styles.content}>
                    <Form style={styles.form}>
                        <Text gray>{I18n.t('account_owner')}</Text>
                        <Field autoCapitalize="none" name="account_owner"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputFieldWithErr}
                            style={styles.inputItem}
                        />
                        {}
                        <Text gray>{I18n.t('identity_card')}</Text>
                        <Field name="identity_card"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputFieldWithErr}
                            style={styles.inputItem}
                            keyboardType="numeric"
                        />

                        <Text gray>{I18n.t('account_number')}</Text>
                        <Field name="account_number"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
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
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputFieldWithErr}
                            style={styles.inputItem}
                        />
                    </Form>
                </Content>
                <Button style={styles.okBtn} onPress={handleSubmit(this._onPressOk)}>
                    <Text white>OK</Text>
                </Button>
            </Container>
        )
    }
}
