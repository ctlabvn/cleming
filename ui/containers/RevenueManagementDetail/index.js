import React, {Component} from 'react'
import { View } from 'react-native'
import { connect } from "react-redux";

import {Container, Text, List, ListItem, Spinner} from 'native-base'
import Content from "~/ui/components/Content";
import styles from './styles'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";

import { getSelectedRevenueItem, getDetail } from '~/store/selectors/revenue'
import * as commonAction from "~/store/actions/common";
import * as revenueActions from "~/store/actions/revenue";
import { getSession } from "~/store/selectors/auth";

import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";

import {REVENUE_PROCESSING, REVENUE_DONE} from '~/store/constants/app'
import {REVENUE_DELIVERY, REVENUE_CLINGME_PAY} from '~/store/constants/app'


import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT
} from "~/store/constants/app";

const defaultItem = {
    tranId: '',
}

@connect(state => ({
    xsession: getSession(state),
    revenue: state.revenue,
}), {...commonAction, ...revenueActions})

export default class extends Component {

    constructor(props) {
        super(props)
        const { route } = this.props;

        let tab = parseInt(route.params.tabId);
        let color = tab == REVENUE_PROCESSING ? styles.revenueProcessing :
            (tab == REVENUE_DONE ? styles.revenueDone : null);
        this.state = {
            isLoading: true,
            currentTab: tab,
            colorStyle: color,
            detail: this._defaultDetail(),
        }
    }

    _loadRevenueDetail() {
        const { xsession, getRevenueDetail, selectedItem, route } = this.props
        const tranId = route.params.tranId;
        getRevenueDetail(xsession, tranId, (err, data) => {
            if (data && data.data) {
                this.setState({
                    isLoading: false,
                    detail: data.data
                });
            } else {
                this.setState({
                    isLoading: false,
                })
            }
        });
    }

    componentWillMount() {
        this._loadRevenueDetail();
    }

    componentWillFocus() {
        const { route } = this.props;
        let tab = parseInt(route.params.tabId);
        let color = tab == REVENUE_PROCESSING ? styles.revenueProcessing :
            (tab == REVENUE_DONE ? styles.revenueDone : null);
        this.setState({
            isLoading: true,
            currentTab: tab,
            colorStyle: color,
            detail: this._defaultDetail(),
        })

        this._loadRevenueDetail();
    }

    _renderTitle() {
        let text = {
            title: '',
            content: '',
        }

        let time = this.state.detail ? moment(this.state.detail.tranTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND) : '';

        switch (parseInt(this.state.currentTab)) {
            case REVENUE_PROCESSING:
                text = {
                    title: 'Giao dịch đang xử lý',
                    content: 'Thời gian chuyển tiền dự tính: ' + time,
                }
                break;
            case REVENUE_DONE:
                text = {
                    title: 'Giao dịch đã chuyển tiền',
                    content: 'Thời gian chuyển tiền: ' + time,
                }
                break;
            default:
                text = {
                    title: 'Giao dịch',
                    content: 'Thời gian',
            }
        }

        return (
            <View style={{width: '100%', padding: 15, alignItems: 'center', backgroundColor: 'white'}}>
                <Text largeLight superBold warning style={{...this.state.colorStyle, marginBottom: 5}}>
                    {text.title}
                </Text>
                <Text medium gray>
                    {text.content}
                </Text>
            </View>
        )
    }

    _defaultDetail() {
        return {
            tranTime: '',
            tranType: REVENUE_CLINGME_PAY,
            tranCode: '',
            revenueMoney: '',
            tranMoney: '',
            shipMoney: '',
            paidMoney: '',
            chargeMoney: '',
        }
    }

    render() {

        // iconName = this.state.item.itemType == REVENUE_CLINGME_PAY ? 'clingme-wallet': 'shiping-bike2';

        const {detail} = this.state

        const revenueItem = detail ? detail : this._defaultDetail();
        // const { selectedItem } = this.props;

        iconName = revenueItem.tranType == REVENUE_CLINGME_PAY ? 'clingme-wallet': 'shiping-bike2';

        const spinner =  <Spinner/>

        const content = <View style={{flexDirection: 'row', width:'100%'}}>
            <Icon name={iconName} style={{...styles.icon, ...this.state.colorStyle}}/>
            <View style={{flex: 1}}>
                <ListItem style={{...styles.row, marginTop: 10}}>
                    <Text medium style={styles.gray}>Clingme Pay</Text>
                    <Text bold large style={styles.gray}>#{revenueItem.tranCode}</Text>
                </ListItem>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                <ListItem style={styles.row}>
                    <Text medium style={styles.gray}>Doanh Thu</Text>
                    <Text bold large style={styles.orange}>{formatNumber(revenueItem.revenueMoney)} đ</Text>
                </ListItem>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                <ListItem style={styles.row}>
                    <Text medium style={styles.gray}>Tổng tiền giao dịch</Text>
                    <Text bold large style={styles.gray}>{formatNumber(revenueItem.tranMoney)} đ</Text>
                </ListItem>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                <ListItem style={styles.row}>
                    <Text medium style={styles.gray}>Tiền vận chuyển</Text>
                    <Text bold large style={styles.gray}>{formatNumber(revenueItem.shipMoney)} đ</Text>
                </ListItem>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                <ListItem style={styles.row}>
                    <Text medium style={styles.gray}>Tiền đã thu</Text>
                    <Text bold large style={styles.gray}>{formatNumber(revenueItem.paidMoney)} đ</Text>
                </ListItem>
                <Border color='rgba(0,0,0,0.5)' size={1}/>
                <ListItem style={styles.row}>
                    <Text medium style={styles.gray}>Phí Clingme</Text>
                    <Text bold large style={styles.gray}>{formatNumber(revenueItem.chargeMoney)} đ</Text>
                </ListItem>
            </View>
        </View>

        return (
            <Container>
                {this._renderTitle()}
                <Content contentContainerStyle={{ alignItems:'center', justifyContent:'flex-start', flex: 1 }}>
                    {(this.state.isLoading ? spinner : content)}

                </Content>
            </Container>
        )
    }
}