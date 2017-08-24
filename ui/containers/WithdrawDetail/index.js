import React, { Component } from "react";
import { connect } from "react-redux";
import { InteractionManager, View, Image, ActivityIndicator, ScrollView } from "react-native";
import {Text} from 'native-base'
import styles from "./styles";
import * as commonAction from "~/store/actions/common";
import {getCashoutDetail} from "~/store/actions/wallet"
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage, chainParse } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import Border from "~/ui/elements/Border"

import {
    TIME_FORMAT_WITHOUT_SECOND
} from "~/store/constants/app"
@connect(state => ({
    xsession: getSession(state),
}), { getCashoutDetail })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
          cashoutDetail: {},
          loading: false
        }
    }
    componentDidMount = () => {
      const {route, getCashoutDetail, xsession} = this.props
      const cashoutID = route.params.id
      this.setState({loading: true})
      getCashoutDetail(xsession, cashoutID,
          (err, data) => {
            this.setState({loading: false})
            if (data && data.data){
              this.setState({cashoutDetail : data.data})
            }
          }
      )
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.loading && <View
                  style={{position: 'absolute', top: 30, width: '100%', flexDirection: 'row', justifyContent: 'center', elevation: 2}}
                  >
                  <ActivityIndicator color={material.primaryColor} size='large'/>
                </View>}
                <View style={{...styles.rowPaddingLarge}}>
                    <Text medium bold>{I18n.t('money_withdrawn_2')}</Text>
                    <Text bold style={styles.moneyNumber}>{formatNumber(this.state.cashoutDetail.moneyAmount)}đ</Text>
                </View>
                <View style={{...styles.row, ...styles.pd10, ...styles.borderTop}}>
                    <Text>{I18n.t('info_detail')}</Text>
                </View>
                <Border/>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <View style={{...styles.row}}>
                        <Image source={{ uri: this.state.cashoutDetail.bankIcon }} style={styles.bankLogo} />
                        <View style={{marginLeft: 5}}>
                            <Text medium bold>{this.state.cashoutDetail.bankName}</Text>
                            <Text gray>{this.state.cashoutDetail.accountNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('account_owner')}</Text>
                    <Text gray>{this.state.cashoutDetail.accountName}</Text>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('transaction_code')}</Text>
                    <Text gray>{this.state.cashoutDetail.tranCode}</Text>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('request_time')}</Text>
                    <Text gray>{moment(this.state.cashoutDetail.requestTime*1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                </View>
                <View style={{...styles.rowPadding, ...styles.ml20, ...styles.borderBottom}}>
                    <Text bold gray>{I18n.t('receive_time')}</Text>
                    <Text gray>{moment(this.state.cashoutDetail.confirmTime*1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                </View>
            </ScrollView>
        )
    }
}
