import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input, Form } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as transactionAction from "~/store/actions/transaction";
import * as authActions from "~/store/actions/auth";
import * as placeActions from "~/store/actions/place";
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
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
}), { ...commonAction, ...transactionAction, ...authActions, ...placeActions })
@reduxForm({ form: 'BankAccountForm' })
export default class extends Component {
    constructor(props) {
        super(props)
    }
    _handlePressOk = () => {
        
    }
    render() {

        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
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
                <Button style={styles.okBtn} onPress={() => this._handlePressOk()}>
                    <Text white>OK</Text>
                </Button>
            </Container>
        )
    }
}