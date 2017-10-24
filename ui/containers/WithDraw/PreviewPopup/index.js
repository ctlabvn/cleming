import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Text} from "native-base";
import {InteractionManager, View, Keyboard, Modal} from "react-native";
import styles from "./styles";
import * as commonAction from "~/store/actions/common";
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import {formatNumber, getToastMessage} from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import material from "~/theme/variables/material.js";
import {chainParse} from "~/ui/shared/utils"
import {GENERAL_ERROR_MESSAGE} from "~/store/constants/app"
import I18n from '~/ui/I18n'
import Border from "~/ui/elements/Border";

export default class PreviewPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showing: false,
            data: {}
        }
    }

    show = (data) => {
        this.setState({showing: true, data: data})
    }

    showExistBank = (selectedBank, moneyAmount) =>{
        const data = {
            bank: selectedBank.bankName,
            account_number: selectedBank.accountNumber,
            money_amount: moneyAmount,
            account_owner: selectedBank.accountName,
            phone_number: selectedBank.phoneNumber,
        }
        this.setState({showing: true, data: data})
    }

    hide = () => {
        this.setState({showing: false, data: {}})
    }

    _handleOk = () => {
        console.log('Go _handleOk')
        this.props.onOk()
        this.hide()
    }

    render() {
        const {showing} = this.state
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={showing}
                onRequestClose={() => {
                    hide()
                }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Text bold white>{I18n.t('money_receipt_information')}</Text>
                        </View>
                        <View style={styles.textContanter}>
                            <Text medium orange style={styles.text}>{I18n.t('bank_account_receive_money')}</Text>
                        </View>
                        <View style={styles.pd10}>

                            <View style={styles.rowInfo}>
                                <Text medium gray>{I18n.t('bank_name')}: </Text>
                                <Text medium bold grayDark
                                      style={styles.textContent}
                                      numberOfLines={2}>{this.state.data.bank}</Text>
                            </View>

                            {this.state.data.branch &&
                            <View style={styles.rowInfo}>
                                <Text medium gray>{I18n.t('branch')}: </Text>
                                <Text medium bold grayDark
                                      style={styles.textContent}
                                      numberOfLines={2}>{this.state.data.branch}</Text>
                            </View>}

                            <View style={styles.rowInfo}>
                                <Text medium gray>{I18n.t('account_number')}: </Text>
                                <Text medium bold grayDark>{this.state.data.account_number}</Text>
                            </View>

                            { this.state.data.account_owner &&
                            <View style={styles.rowInfo}>
                                <Text medium gray>{I18n.t('account_owner')}: </Text>
                                <Text medium bold grayDark>{this.state.data.account_owner.toUpperCase()}</Text>
                            </View>}

                            { this.state.data.phone_number &&
                            <View style={styles.rowInfo}>
                                <Text medium gray>{I18n.t('phone_number')}: </Text>
                                <Text medium bold grayDark>{this.state.data.phone_number}</Text>
                            </View>}

                            <View style={{paddingVertical: 15}}>
                            <Border/>
                            </View>

                            <View style={styles.rowInfo}>
                                <Text medium gray>{I18n.t('money_number')}: </Text>
                                <Text strong bold orange>{formatNumber(this.state.data.money_amount)} đ</Text>
                            </View>

                            {/*<View style={styles.rowInfo}>*/}
                                {/*<Text medium gray>Phí chuyển khoản: </Text>*/}
                                {/*<Text strong bold grayDark>0 đ</Text>*/}
                            {/*</View>*/}

                            <View style={styles.textContanter}>
                                <Text medium gray italic style={styles.textAccetpArticle}>{I18n.t('accept_article')}</Text>
                            </View>

                        </View>
                        <View style={styles.confirmContainer}>
                            <Button transparent onPress={() => this.hide()} style={styles.confirmBtn}>
                                <Text gray>{I18n.t('close')}</Text>
                            </Button>
                            <Button transparent onPress={this._handleOk} style={styles.confirmBtn}>
                                <Text primary>{I18n.t('ok')}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

}
