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
        this.state = ({
            loading: false
        })
    }

    _load() {
        const {route, getCashoutDetail, xsession} = this.props;
        getCashoutDetail(xsession, route.params.cashoutId, () => {
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        this._load();
    }

    getTime(time) {
        if (time > 0) return moment(time * 1000).format(DEFAULT_TIME_FORMAT);
        return '--:--:--  --/--/--';
    }

    render() {

        if (!this.props.detail) return (
            <View/>
        )

        const {
            moneyAmount, bankIcon, bankName, accountNumber, accountName,
            tranCode, requestTime, confirmTime
        } = this.props.detail;

        return (
            <Container loading={true} style={styles.container}>
                {this.state.loading &&
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                <Spinner shown={true} color={material.primaryColor}/>
                    </View>}
                {!this.state.loading &&
                <View>
                    {/*<View style={styles.moneyWithDrawnContainer}>*/}
                        {/*<Text medium bold grayDark>{I18n.t('money_withdrawn_2')}</Text>*/}
                        {/*<Text medium bold orange>{formatNumber(moneyAmount)} đ</Text>*/}
                    {/*</View>*/}

                    {/*<View style={styles.moneyInfoLabelContainer}>*/}
                        {/*<Text medium italic grayDark style={styles.margin15}>{I18n.t('info_detail')}</Text>*/}
                    {/*</View>*/}

                    <View style={styles.bankDetailContainer}>
                        <View style={styles.bankImageContainer}>
                            <Image source={{uri: bankIcon}}
                                   resizeMode={'contain'}
                                   style={styles.bankImage}/>
                        </View>
                        <View style={styles.accountDetailContainer}>
                            <Text medium bold grayDark numberOfLines={3}>{bankName}</Text>
                            <Text italic bold style={styles.marginTop5}>{accountNumber}</Text>
                        </View>
                    </View>

                    <View style={styles.detailContainer}>
                        <Border/>
                        <View style={styles.rowDetail}>
                            <Text medium bold grayDark>{I18n.t('money_withdrawn_2')}</Text>
                            <Text medium grayDark style={styles.rowSubDetail}>{formatNumber(moneyAmount)} đ</Text>
                        </View>

                        <Border/>
                        <View style={styles.rowDetail}>
                            <Text medium bold grayDark>{I18n.t('account_owner')}</Text>
                            <Text medium grayDark style={styles.rowSubDetail}>{accountName.toUpperCase()}</Text>
                        </View>

                        <Border/>
                        <View style={styles.rowDetail}>

                            <Text medium bold grayDark>{I18n.t('transaction_code')}</Text>
                            <Text medium grayDark style={styles.rowSubDetail}>{tranCode}</Text>
                        </View>

                        <Border/>
                        <View style={styles.rowDetail}>
                            <Text medium bold grayDark>{I18n.t('request_time')}</Text>
                            <Text medium grayDark style={styles.rowSubDetail}>{this.getTime(requestTime)}</Text>
                        </View>

                        <Border/>
                        <View style={styles.rowDetail}>
                            <Text medium bold grayDark>{I18n.t('clingme_transfer_time')}</Text>
                            <Text medium grayDark style={styles.rowSubDetail}>{this.getTime(confirmTime)}</Text>
                        </View>
                    </View>
                </View>}
            </Container>
        )
    }
}
