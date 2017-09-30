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
}), {...commonAction, ...walletAction})
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
    }

    _handlePressOK() {
        const { goBack } = this.props;
        alert('Yêu cầu đã được gửi đi');
        goBack();
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                    <Text medium bold grayDark>Số tiền thanh toán cho Clingme</Text>
                    <Text medium bold orange>1.000.000 đ</Text>
                </View>

                <Border style={{marginHorizontal: 15}}/>
                <Text medium italic bold grayDark style={{margin: 15}}>Thông tin thanh toán</Text>

                <View style={styles.detailContainer}>
                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Công ty cổ phần Gigatum Việt Nam</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Ngân hàng</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>Vietcombank</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Chi nhánh</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>Hoàng Quốc Việt</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Số tài khoản</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>0000 0000 000 0000</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Họ tên</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>Nguyễn Văn A</Text>
                    </View>

                    <View style={styles.rowDetail}>
                        <Text medium grayDark>Số điện thoại</Text>
                        <Text medium bold grayDark style={styles.rowSubDetail}>0969 6969 69</Text>
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
