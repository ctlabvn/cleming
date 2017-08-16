import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image, Keyboard, ScrollView } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";

import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import Border from "~/ui/elements/Border"

@connect(state => ({
    xsession: getSession(state),
}), { ...commonAction })
export default class extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
    
    }
   
    
    render() {
        const {forwardTo} = this.props
        return (
            <ScrollView style={styles.container}>
                <View style={{...styles.rowPaddingLarge}}>
                    <Text medium bold>{I18n.t('money_withdrawn_2')}</Text>
                    <Text bold style={styles.moneyNumber}>{formatNumber(1900000)}đ</Text>
                </View>
                <View style={{...styles.row, ...styles.pd10, ...styles.borderTop}}>
                    <Text>{I18n.t('info_detail')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <View style={{...styles.row}}>
                        <Image source={{ uri: "http://www.underconsideration.com/brandnew/archives/vietcombank_big.jpg" }} style={styles.bankLogo} />
                        <View>
                            <Text medium bold>MSB-Ngan hang Hang Hai Viet Nam</Text>
                            <Text gray>****1234</Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('account_owner')}</Text>
                    <Text gray>Trần Thanh Phong</Text>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('transaction_code')}</Text>
                    <Text gray>7237488556</Text>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('request_time')}</Text>
                    <Text gray>17:30  06/07/17</Text>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('receive_time')}</Text>
                    <Text gray>14:30  06/07/17</Text>
                </View>
            </ScrollView>
        )
    }
}