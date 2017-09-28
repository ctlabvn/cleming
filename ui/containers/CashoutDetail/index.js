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
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <Text medium bold grayDark>Chi tiết Rút tiền</Text>
                    <Text medium bold orange>999.999.999 đ</Text>
                </View>

                <Text style={{margin: 10}}>Thông tin chi tiết</Text>

                <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
                    <Icon name="account" style={{fontSize: 50}}/>
                    <View style={{marginLeft: 10}}>
                        <Text>Ngân hàng TMCP VN</Text>
                        <Text>*1234</Text>
                    </View>
                </View>

                <View style={{marginTop: 10, marginLeft: 10}}>
                    <View style={{flexDirection: 'row', borderTopWidth: 1, justifyContent: 'space-between'}}>
                        <Text medium bold>Tên chủ tài khoản</Text>
                        <Text medium style={{marginRight: 10}}>Chu Thanh Phong</Text>
                    </View>

                    <View style={{flexDirection: 'row', borderTopWidth: 1, justifyContent: 'space-between'}}>
                        <Text medium bold>Mã giao dịch</Text>
                        <Text>99999999</Text>
                    </View>

                    <View style={{flexDirection: 'row', borderTopWidth: 1, justifyContent: 'space-between'}}>
                        <Text medium bold>Thời gian yêu cầu</Text>
                        <Text>17:30 06/09/1969</Text>
                    </View>

                    <View style={{flexDirection: 'row', borderTopWidth: 1, justifyContent: 'space-between'}}>
                        <Text medium bold>Thời gian nhận tiền</Text>
                        <Text>17:30 06/09/1969</Text>
                    </View>
                </View>
            </Container>
        )

    }
}
