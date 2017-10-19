import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Text} from "native-base";
import {InteractionManager, View, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import {formatNumber, chainParse} from "~/ui/shared/utils";
import {getSession} from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import Spinner from '~/ui/components/Spinner'
import {
    TIME_FORMAT_WITHOUT_SECOND
} from "~/store/constants/app"
@connect(state => ({
    xsession: getSession(state),
    detail: state.payDetail
}), {...commonAction, ...walletAction})
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
    }

    _handlePressOK() {
        const { goBack } = this.props;
        // alert('Yêu cầu đã được gửi đi');
        goBack();
    }

    componentDidMount() {
        const {xsession, getGigatumBank} = this.props;
        getGigatumBank(xsession);
    }

    render() {
        if (!this.props.detail) return (
            <View/>
        )

        const { balanceMoney } = this.props.route.params;
        const { gigatumBankId, companyName, bankName, branchName, accountNumber, fullName, phoneNumber } = this.props.detail;

        return (
            <Container style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                    <Text medium bold grayDark>Số tiền thanh toán cho Clingme</Text>
                    <Text medium bold orange>{formatNumber(Math.abs(balanceMoney))} đ</Text>
                </View>

                <Border style={{marginHorizontal: 15}}/>
                <Text medium italic bold grayDark style={{margin: 15}}>Thông tin thanh toán</Text>

                <View style={styles.detailContainer}>
                    <View style={styles.rowDetail}>
                        <Text medium grayDark>{companyName}</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Ngân hàng</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>{bankName}</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Chi nhánh</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>{branchName}</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Số tài khoản</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>{accountNumber}</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Họ tên</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>{fullName}</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Số điện thoại</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>{phoneNumber}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity onPress={()=> this._handlePressOK()} style={{margin: 10}}>
                    <View style={{backgroundColor: material.orange500}}>
                        <Text medium bold white style={{alignSelf: 'center', padding: 10}}>Đồng ý</Text>
                    </View>
                </TouchableOpacity>
            </Container>
        )
    }
}
