import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Text} from "native-base";
import {InteractionManager, View, TouchableWithoutFeedback, ActivityIndicator, Image} from "react-native";
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
    DEFAULT_TIME_FORMAT
} from "~/store/constants/app"
@connect(state => ({
    xsession: getSession(state),
    detail: state.cashout.cashoutAndPayHistoryDetail
}), {...commonAction, ...walletAction})
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
    }

    _load(){
        const { route, getCashoutDetail, xsession } = this.props;
        getCashoutDetail(xsession, route.params.cashoutId)
    }

    componentDidMount() {
        this._load();
    }

    render() {

        if (!this.props.detail) return (
            <View/>
        )


        const { moneyAmount, bankIcon, bankName, accountNumber, accountName,
            tranCode, requestTime, confirmTime } = this.props.detail;

        return (
            <Container style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                    <Text medium bold grayDark>Số tiền rút</Text>
                    <Text medium bold orange>{formatNumber(moneyAmount)} đ</Text>
                </View>

                <View style={{backgroundColor: material.gray300}}>
                    <Text medium italic bold grayDark style={{margin: 15}}>Thông tin chi tiết</Text>
                </View>

                <View style={{flexDirection: 'row', margin: 15, alignItems: 'center'}}>
                    <View style={{borderRadius: 5, borderWidth: 0.5, borderColor: material.gray200}}>
                    <Image source={{ uri: bankIcon }}
                           resizeMode={'contain'}
                           style={{ width: 100, height: 60, borderRadius: 5, borderWidth: 1}} />
                    </View>
                    <View style={{marginLeft: 15}}>
                        <Text medium bold grayDark>{bankName}</Text>
                        <Text style={{marginTop: 5}}>{accountNumber}</Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <Border/>
                    <View style={styles.rowDetail}>
                        <Text medium bold grayDark>Tên chủ tài khoản</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>{accountName}</Text>
                    </View>

                    <Border/>
                    <View style={styles.rowDetail}>

                        <Text medium bold grayDark>Mã giao dịch</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>{tranCode}</Text>
                    </View>

                    <Border/>
                    <View style={styles.rowDetail}>
                        <Text medium bold grayDark>Thời gian yêu cầu</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>{moment(requestTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>

                    { confirmTime && <Border/>}
                    { confirmTime && <View style={styles.rowDetail}>
                        <Text medium bold grayDark>Thời gian nhận tiền</Text>
                        <Text medium grayDark style={styles.rowSubDetail}>{moment(confirmTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>}
                </View>
            </Container>
        )

    }
}
