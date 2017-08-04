import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input, Form } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
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
import { Field, formValueSelector, reduxForm } from "redux-form"
import { InputField } from "~/ui/elements/Form"
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT
} from "~/store/constants/app";
import I18n from '~/ui/I18n'


@connect(state => ({
    xsession: getSession(state),
    banks: state.banks
}), { ...commonAction, ...walletAction })
@reduxForm({ form: 'BankAccountForm' })
export default class extends Component {
    constructor(props) {
        super(props)
        this.listBank = []
    }
    _handlePressOk = (input) => {
        console.log('Form Input: ', input)
        const {account_number, account_owner, area, bank_name, branch, identity_card} = input
        const {addBank, xsession} = this.props
        addBank(xsession, account_owner, identity_card, account_number, 1, area, branch,
            (err, data) => {
                console.log('Add bank Err', err)
                console.log('Add bank data', data)
            }
        )
        // addBank(xsession, accountName, idNumber, accountNumber, bankId, area, branchName){
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
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <SearchableDropdown dropdownValues={this.listBank}/>
                    <Form style={styles.form}>
                        <Text gray>{I18n.t('account_owner')}</Text>
                        <Field autoCapitalize="none" name="account_owner"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputField}
                            style={styles.inputItem}
                        />

                        <Text gray>{I18n.t('identity_card')}</Text>
                        <Field name="identity_card"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputField}
                            style={styles.inputItem}
                            keyboardType="numeric"
                        />

                        <Text gray>{I18n.t('account_number')}</Text>
                        <Field name="account_number"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputField}
                            style={styles.inputItem}
                            keyboardType="numeric" 
                        />

                        <Text gray>{I18n.t('bank_name')}</Text>
                        <Field name="bank_name"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputField}
                            style={styles.inputItem}
                        />

                        <Text gray>{I18n.t('area')}</Text>
                        <Field name="area"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputField}
                            style={styles.inputItem}
                        />

                        <Text gray>{I18n.t('branch')}</Text>
                        <Field name="branch"
                            icon={(input, active) => input.value && active ? 'close' : false}
                            iconStyle={{ color: material.black500 }}
                            onIconPress={input => input.onChange('')}
                            component={InputField}
                            style={styles.inputItem}
                        />
                    </Form>
                </Content>
                <Button style={styles.okBtn} onPress={handleSubmit(this._handlePressOk)}>
                    <Text white>OK</Text>
                </Button>
            </Container>
        )
    }
}