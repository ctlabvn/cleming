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
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                    <Text medium bold grayDark>Số tiền rút</Text>
                    <Text medium bold orange>999.999.999 đ</Text>
                </View>

                <View style={{backgroundColor: material.gray300}}>
                    <Text medium italic bold grayDark style={{margin: 15}}>Thông tin chi tiết</Text>
                </View>

                <View style={{flexDirection: 'row', margin: 15, alignItems: 'center'}}>
                    <Icon gray name="account" style={{fontSize: 50}}/>
                    <View style={{marginLeft: 15}}>
                        <Text medium bold grayDark>Ngân hàng TMCP VN</Text>
                        <Text style={{marginTop: 5}}>*1234</Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <Border/>
                    <View style={styles.rowDetail}>
                        <Text medium bold grayDark>Tên chủ tài khoản</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>Chu Thanh Phong</Text>
                    </View>

                    <Border/>
                    <View style={styles.rowDetail}>

                        <Text medium bold grayDark>Mã giao dịch</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>99999999</Text>
                    </View>

                    <Border/>
                    <View style={styles.rowDetail}>
                        <Text medium bold grayDark>Thời gian yêu cầu</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>17:30 06/09/1969</Text>
                    </View>

                    <Border/>
                    <View style={styles.rowDetail}>
                        <Text medium bold grayDark>Thời gian nhận tiền</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>17:30 06/09/1969</Text>
                    </View>
                </View>
            </Container>
        )

    }
}
