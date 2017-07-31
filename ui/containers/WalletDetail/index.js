import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Spinner, Text } from "native-base";
import { InteractionManager, View } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet"
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber, chainParse } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import options from "./options";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import ListPay from '~/ui/containers/Wallet/ListPay'

@connect(state => ({
    xsession: getSession(state),
    wallet_detail: state.wallet_detail

}), { ...commonAction,  ...walletAction })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: options.tabData[0],
            loading: false
        }
    }
    _handlePressTab = (item) => {
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this.setState({currentTab: item},
            ()=>this._load(dateFilterData.from, dateFilterData.to)
        )
    }
    _renderMoney() {
        const {wallet_detail} = this.props
        switch (this.state.currentTab.tabID) {
            case 1:
            default:
                return (
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>+{formatNumber(chainParse(wallet_detail, ['moneyAmount']))}</Text>đ
                    </Text>
                )
            case 2:
                return (
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>{formatNumber(chainParse(wallet_detail, ['moneyAmount']))}</Text>đ
                    </Text>
                )
            case 3:
                return (
                    <Text white>
                        <Text white bold style={styles.moneyNumber}>{formatNumber(chainParse(wallet_detail, ['moneyAmount']))}</Text>đ
                    </Text>
                )

        }
    }

    _load = (from, to, page = 1) => {
        const { xsession, getBalanceDetail } = this.props
        this.setState({ loading: true })
        getBalanceDetail(xsession, from, to, this.state.currentTab.tabID, page,
            () => this.setState({ loading: false })
        )
    }

    componentDidMount = () => {
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to)

    }

    _handlePressDateFilter = (item) => {
        let dateFilterData = item.currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to)
    }

    _onRefresh = () => {
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to)
    }

    _loadMore = () => {
        const {wallet_detail} = this.props
        if (wallet_detail.pageNumber >= wallet_detail.totalPage) return
        let dateFilterData = this.dateFilter.getData().currentSelectValue.value
        this._load(dateFilterData.from, dateFilterData.to, wallet_detail.pageNumber+1)
    }

    render() {
        const {wallet_detail} = this.props
        return (
            <Container style={styles.container}>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary }}>
                    <Text white>{this.state.currentTab.text}</Text>
                    {this._renderMoney()}
                </View>
                <TabsWithNoti tabData={options.tabData} onPressTab={this._handlePressTab} ref='tabs' />
                <DateFilter onPressFilter={this._handlePressDateFilter} ref={dateFilter => this.dateFilter = dateFilter} />


                <Content style={styles.content}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                    onEndReached={this._loadMore}
                >
                    <ListPay data={wallet_detail.listRevenueItem} />
                </Content>
            </Container>
        )
    }
}