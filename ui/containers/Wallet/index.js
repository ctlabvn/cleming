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
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT
} from "~/store/constants/app";
import I18n from '~/ui/I18n'
import ListPay from './ListPay'

@connect(state => ({
    xsession: getSession(state),
    wallet: state.wallet
}), { ...commonAction, ...walletAction })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to)
    }
    _load = (from, to, page = 1) => {
        const { xsession, getBalance } = this.props
        this.setState({ loading: true })
        getBalance(xsession, from, to, page,
            () => this.setState({ loading: false })
        )
    }

    _handlePressDateFilter = (item) => {
        console.log('Press Date Filter', item)
        let dateFilterData = item.currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to)
    }

    _onRefresh = () => {
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to)
    }

    _loadMore = () => {
        const {wallet} = this.props
        if (wallet.pageNumber >= wallet.totalPage) return
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to, wallet.pageNumber+1)
    }

    render() {
        const { forwardTo, wallet } = this.props
        return (
            <Container style={styles.container}>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary }}>
                    <Text white>{I18n.t('balance')}</Text>
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>{formatNumber(wallet.moneyAmount)}</Text>đ
                    </Text>
                </View>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary }}>
                    <View style={styles.row}>
                        <Icon name='settings' style={{ ...styles.icon, ...styles.mr3 }} />
                        <Text white>Vietcombank *4321</Text>
                    </View>
                    <Button bordered style={styles.borderWhite} onPress={() => forwardTo('withDraw')}>
                        <Text white>{I18n.t('withdraw')}</Text>
                    </Button>
                </View>
                <DateFilter onPressFilter={this._handlePressDateFilter} ref={dateFilter => this.dateFilter = dateFilter} />

                <TouchableOpacity onPress={() => this.props.forwardTo('walletDetail')}>
                    <View style={{ ...styles.rowCenter, ...styles.borderBottomPrimary, ...styles.pd10 }}>
                        <Text primary>{I18n.t('view_detail')}</Text>
                    </View>
                </TouchableOpacity>
                <Content style={styles.content}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                    onEndReached={this._loadMore}
                >
                    <ListPay data={wallet.listRevenueItem} />
                </Content>
            </Container>
        )
    }
}