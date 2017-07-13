import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image } from "react-native";
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
import CardSelection from './CardSelection'
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
export default class extends Component {
    constructor(props) {
        super(props)
        this.accouts = [
            {
                url: 'http://mtalent.com.vn//admin/webroot/upload/image/files/logo-06-05.jpg',
                number: '*4321',
                id: 1
            },
            {
                url: 'http://www.underconsideration.com/brandnew/archives/vietcombank_big.jpg',
                number: '*1234',
                id: 2
            },
        ]
        this.state = {
            moneyAmount: ''
        }

    }
    _handlePressTab = (item) => {

    }
    _handlePressOk = () => {
        console.log('Selected', this.refs.cardSelection.getSelected())
        const {setToast} = this.props
        if (!this.state.moneyAmount || this.state.moneyAmount.trim == ''){
            setToast(getToastMessage(I18n.t('err_money_not_empty')), 'info', null, null, 2000, 'top')
            return
        }else if (isNaN(this.state.moneyAmount)) {
            setToast(getToastMessage(I18n.t('err_money_must_number')), 'info', null, null, 2000, 'top')
            return
        }
    }
    _handlePressClear = () => {
        this.setState({ moneyAmount: '' })
    }
    render() {

        return (
            <Container style={styles.container}>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary }}>
                    <Text white>{I18n.t('balance')}</Text>
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>{formatNumber(16100000)}</Text>đ
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
                    <CardSelection listAccounts={this.accouts} ref='cardSelection' />
                    <TouchableOpacity>
                        <View style={{ ...styles.bankLogoContainer, justifyContent: 'center', height: 50 }}>
                            <Text primary>+  {I18n.t('add_account')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Button style={styles.okBtn} onPress={() => this._handlePressOk()}>
                    <Text white>OK</Text>
                </Button>

            </Container>
        )
    }
}