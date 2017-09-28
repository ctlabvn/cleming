import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Text} from "native-base";
import {InteractionManager, View, TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import {formatNumber, chainParse} from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import {getSession} from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import ListViewExtend from '~/ui/components/ListViewExtend'
import Spinner from '~/ui/components/Spinner'
import {
    TIME_FORMAT_WITHOUT_SECOND
} from "~/store/constants/app"
@connect(state => ({
    xsession: getSession(state),
}), {...commonAction, ...walletAction})
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text medium bold>Chi tiết Rút tiền</Text>
            </Container>
        )

    }
}
