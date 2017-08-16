import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";

import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'

@connect(state => ({
    xsession: getSession(state),
}), { ...commonAction })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {

    }

    render() {
        const { forwardTo } = this.props
        return (
            <Container style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.moneyBlock}>
                        <View style={{...styles.row, ...styles.mt20}}>
                            <Text medium>{I18n.t('balance_available')}</Text>
                            <Text bold style={styles.moneyNumber}>{formatNumber(1900000)}đ</Text>
                        </View>
                        <View style={{...styles.rowRight, ...styles.mt20}}>
                            <Button style={styles.cashoutBtn} onPress={()=>forwardTo('withDraw')}>
                                <Icon name='cash_out' style={styles.cashoutIcon} />
                                <Text white medium>Cashout</Text>
                            </Button>
                        </View>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <TouchableOpacity onPress={()=>forwardTo('cashoutHistory')}> 
                        <View>
                            <View style={{...styles.row, ...styles.pd10}}>
                                <Text gray>(14/08/2017)</Text>
                            </View>
                            <View style={{...styles.row, ...styles.pd10}}>
                                <Text gray bold medium>{I18n.t('cashout_history')}</Text>
                                <View style={styles.row}>
                                    <Text medium bold success>{formatNumber(26034000)}đ</Text>
                                    <Icon name='foward' style={styles.forwardIcon}/>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Button style={styles.bottomButton}>
                    <View>
                        <Text medium bold gray>{I18n.t('checking_history')}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text medium gray>{I18n.t('detail')}</Text>
                        <Icon name='foward' style={{...styles.forwardIcon, color: 'black'}}/>
                    </View>
                </Button>
            </Container>
        )
    }
}