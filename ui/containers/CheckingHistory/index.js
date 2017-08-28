import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Text, Item, Input } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image, Keyboard, ScrollView, ActivityIndicator } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet"
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import Border from "~/ui/elements/Border"
import ListViewExtend from '~/ui/components/ListViewExtend'
import Spinner from '~/ui/components/Spinner'
import {
    DEFAULT_DATE_FORMAT
} from "~/store/constants/app"
@connect(state => ({
    xsession: getSession(state),
    checkingHistory: state.checkingHistory
}), { ...commonAction, ...walletAction })
export default class extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        const {xsession, getCheckingHistory} = this.props
        this.listview && this.listview.showRefresh(true)
        getCheckingHistory(xsession,
            (err, data) => this.listview && this.listview.showRefresh(false)
        )
    }

     _onRefresh = () => {
        const {getCheckingHistory, xsession} = this.props
        getCheckingHistory(xsession)
    }

    _onEndReached = () => {
        console.log('On End Reach')
        const {xsession, getCheckingHistory} = this.props
        const {compareCheckComfirm} = this.props.checkingHistory
        if (!compareCheckComfirm) return
        if (compareCheckComfirm.pageNumber >= compareCheckComfirm.totalPage) return
        this.spinner.show(true)
        getCheckingHistory(xsession, 2, compareCheckComfirm.pageNumber+1,
          (err, data) => {
            this.spinner.show(false)
          }
        )
    }

    _renderRowNotCheck = (item) => {
        return (
            <View>
                <View style={styles.rowPadding}>
                    <Text medium>{item.name}</Text>
                    <View style={styles.row}>
                        <Text warning bold style={styles.moneyNumber}>{formatNumber(item.moneyAmount)}đ</Text>
                        <Icon name='foward' style={styles.forwardIconWarning}/>
                    </View>
                </View>
                <View style={styles.rowPadding}>
                    <Text italic>({moment(item.fromTime*1000).format(DEFAULT_DATE_FORMAT)} - {moment(item.toTime*1000).format(DEFAULT_DATE_FORMAT)})</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
            </View>
        )
    }

    // "type": int     // 0 là không xác định, 1 là Clingme nợ, 2 là MC nợ
    _renderRowChecked = (item) => {
        let text
        switch (item.type){
            case 0:
            default:
                text = ''
                break
            case 1:
                text = 'Clingme nợ'
                break
            case 2:
                text = 'Đối tác nợ'
                break
        }
        return (
            <View>
                <View style={styles.rowPadding}>
                    <Text medium>{item.name}</Text>
                    <View style={styles.row}>
                        <Text success bold style={styles.moneyNumber}>{formatNumber(item.moneyAmount)}đ</Text>
                        <Icon name='foward' style={styles.forwardIconSuccess}/>
                    </View>
                </View>
                <View style={styles.rowPadding}>
                    <Text italic>({moment(item.fromTime*1000).format(DEFAULT_DATE_FORMAT)} - {moment(item.toTime*1000).format(DEFAULT_DATE_FORMAT)})</Text>
                </View>
                <View style={styles.rowPadding}>
                    <Text warning>{text}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
            </View>
        )
    }
    
    render() {
        const {forwardTo} = this.props
        const {checkingHistory} = this.props
        if (checkingHistory && checkingHistory.compareCheckWait && checkingHistory.compareCheckComfirm){
            return (
                <Container style={styles.container}>
                    <View style={{...styles.rowPadding }}>
                        <Text bold medium>{I18n.t('checking_history')}</Text>
                    </View>

                    <View style={{...styles.rowPadding, ...styles.borderTop}}>
                        <Text bold medium italic warning>{I18n.t('not_checking_yet')}</Text>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <ListViewExtend
                        dataArray={checkingHistory.compareCheckWait.listCompareCheckItem}
                        renderRow={(item) => this._renderRowNotCheck(item)}
                        style={{minHeight: 150}}
                        onRefresh={this._onRefresh}
                        onItemRef={ref=>this.listview=ref}
                    />
                    <View style={{...styles.rowPadding, ...styles.borderTop}}>
                        <Text bold medium italic success>{I18n.t('checked')}</Text>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <ListViewExtend
                        dataArray={checkingHistory.compareCheckComfirm.listCompareCheckItem}
                        renderRow={(item) => this._renderRowChecked(item)}
                        onEndReached={()=>this._onEndReached()}
                        onRefresh={this._onRefresh}
                    />
                    <Spinner onItemRef={ref=>this.spinner=ref} />
                </Container>
            )
        }
        return <ActivityIndicator color={material.primaryColor} />
    }
}