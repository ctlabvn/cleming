import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Text, List, ListItem} from "native-base";
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
import options from './options'
import ListViewExtend from '~/ui/components/ListViewExtend'
import Spinner from '~/ui/components/Spinner'
import {
    TIME_FORMAT_WITHOUT_SECOND
} from "~/store/constants/app"

const TRANSACTION_PROCESSING = 1;
const TRANSACTION_DONE = 2;

@connect(state => ({
    xsession: getSession(state),
    cashoutHistory: state.cashoutHistory
}), {...commonAction, ...walletAction})
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        const {xsession, getCashoutHistory} = this.props
        this.listview && this.listview.showRefresh(true)
        getCashoutHistory(xsession,
            (err, data) => this.listview && this.listview.showRefresh(false)
        )
    }
    _onRefresh = () => {
        const {getCashoutHistory, xsession} = this.props
        getCashoutHistory(xsession)
    }

    _onEndReached = () => {
        const {xsession, getCashoutHistory} = this.props
        const {cashoutConfirm} = this.props.cashoutHistory
        if (!cashoutConfirm) return
        if (cashoutConfirm.pageNumber >= cashoutConfirm.totalPage) return
        this.spinner.show(true)
        getCashoutHistory(xsession, 2, cashoutConfirm.pageNumber + 1,
            (err, data) => {
                this.spinner.show(false)
            }
        )
    }

    _handlePressFilter() {
        return 0;
    }

    _handlePressTab() {
        return 0;
    }

    _handlePressItem(item) {

    }

    _renderRow(...args) {

        const item = args[0];
        const index = args[2];
        const flagProcess = args[args.length -1]
        let renderBorder = {};

        if (flagProcess == TRANSACTION_PROCESSING) renderBorder = index < this.waitToDoDataLength - 1 ? <Border/> : null;
        else if (flagProcess == TRANSACTION_DONE) renderBorder = index < this.transactionDoneLength - 1 ? <Border/> : null;

        return (
            <ListItem
                noBorder
                onPress={e => this._handlePressItem(item)}
                style={styles.listItem}>
                <View style={{flex: 1}}>
                    <Text medium grayDark style={{alignSelf: 'flex-start'}}>29/09/17</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7}}>
                        <Text medium grayDark>Cashout MSB***123</Text>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Text medium bold green>-100.000 đ</Text>
                            <Icon
                                name="foward"
                                style={{fontSize: 20, color: material.green500}}/>
                        </View>
                    </View>
                    {renderBorder}
                </View>
            </ListItem>
        )

    }


    render() {
        const {forwardTo, cashoutHistory} = this.props


        // const waitToDoData = [{name: 'mot'}, {name: 'hai'}, {name: 'ba'}, {name: 'bon'}];
        const waitToDoData = [{name: 'mot'}, {name: 'mot'}];
        this.waitToDoDataLength = waitToDoData.length;
        const maxHeight = 150;

        const doneData = [{name: 'mot'}, {name: 'hai'}, {name: 'ba'}, {name: 'bon'}];
        this.transactionDoneLength = doneData.length;

        return (
            <Container style={styles.container}>
                <TabsWithNoti
                    tabData={options.tabData}
                    activeTab={1}
                    onPressTab={() => this._handlePressTab()}
                    ref='tabs'/>
                <DateFilter
                    defaultFilter='day'
                    onPressFilter={() => this._handlePressFilter()}
                    ref='dateFilter'/>
                <View>
                    <View style={{backgroundColor: material.gray300, padding: 15}}>
                        <Text strong bold grayDark>Chờ xử lý</Text>
                    </View>
                    <List
                        dataArray={waitToDoData}
                        style={{maxHeight, margin: 0, padding: 0}}
                        renderRow={(...args) => this._renderRow(...args, TRANSACTION_PROCESSING)}/>
                </View>
                <View style={{backgroundColor: material.gray300, padding: 15}}>
                    <Text strong bold grayDark>Đã xử lý</Text>
                </View>
                <ListViewExtend
                    dataArray={doneData}
                    renderRow={(...args) => this._renderRow(...args, TRANSACTION_DONE)}
                    onEndReached={() => this._onEndReached()}
                    onRefresh={this._onRefresh}
                />
                <Spinner onItemRef={ref => this.spinner = ref}/>
            </Container>
        )
    }
}
