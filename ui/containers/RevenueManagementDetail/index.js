import React, {Component} from 'react'
import { View } from 'react-native'
import { connect } from "react-redux";

import {Container, Text, List, ListItem} from 'native-base'
import Content from "~/ui/components/Content";
import styles from './styles'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";

import { getSelectedRevenueItem } from '~/store/selectors/revenue'
import * as commonAction from "~/store/actions/common";

import {REVENUE_PROCESSING, REVENUE_DONE} from '~/store/constants/app'
import {REVENUE_DELIVERY, REVENUE_CLINGME_PAY} from '~/store/constants/app'

const defaultItem = {
    status: 'get item unsuccessfully!!!',
}

@connect(state => ({
    selectedItem: (state.revenue ? getSelectedRevenueItem(state) : defaultItem),
}), {...commonAction})

export default class extends Component {

    constructor(props) {
        super(props)
        const { route } = this.props;
        const item = this.props.selectedItem;
        console.warn('constructor ' + JSON.stringify(item, null, 2));
        let tab = parseInt(route.params.tabId);
        let color = tab == REVENUE_PROCESSING ? styles.revenueProcessing :
            (tab == REVENUE_DONE ? styles.revenueDone : null);
        this.state = {
            currentTab: tab,
            colorStyle: color,
        }
    }

    componentWillFocus() {
        const { route } = this.props;
        const item = this.props.selectedItem;
        console.warn('constructor ' + JSON.stringify(item, null, 2));
        let tab = parseInt(route.params.tabId);
        let color = tab == REVENUE_PROCESSING ? styles.revenueProcessing :
            (tab == REVENUE_DONE ? styles.revenueDone : null);
        this.setState({
            currentTab: tab,
            colorStyle: color,
        })
    }

    _renderTitle() {
        let text = {
            title: '',
            content: '',
        }
        switch (parseInt(this.state.currentTab)) {
            case REVENUE_PROCESSING:
                text = {
                    title: 'Giao dịch đang xử lý',
                    content: 'Thời gian chuyển tiền dự tính: 18/07/2017',
                }
                break;
            case REVENUE_DONE:
                text = {
                    title: 'Giao dịch đã chuyển tiền',
                    content: 'Thời gian chuyển tiền:  15h30  18/07/2017',
                }
                break;
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

    render() {
        return (
            <Container>
                {this._renderTitle()}
                <Content contentContainerStyle={{ alignItems:'center', justifyContent:'flex-start', flex: 1 }}>
                    <View style={{flexDirection: 'row', width:'100%'}}>
                        <Icon name='clingme-wallet' style={{...styles.icon, ...this.state.colorStyle}}/>
                        <View style={{flex: 1}}>
                            <ListItem style={{...styles.row, marginTop: 10}}>
                                <Text medium style={styles.gray}>Clingme Pay</Text>
                                <Text bold large style={styles.gray}>#CL123456</Text>
                            </ListItem>
                            <Border color='rgba(0,0,0,0.5)' size={1}/>
                            <ListItem style={styles.row}>
                                <Text medium style={styles.gray}>Doanh Thu</Text>
                                <Text bold large style={styles.orange}>720.000 đ</Text>
                            </ListItem>
                            <Border color='rgba(0,0,0,0.5)' size={1}/>
                            <ListItem style={styles.row}>
                                <Text medium style={styles.gray}>Tổng tiền giao dịch</Text>
                                <Text bold large style={styles.gray}>800.000 đ</Text>
                            </ListItem>
                            <Border color='rgba(0,0,0,0.5)' size={1}/>
                            <ListItem style={styles.row}>
                                <Text medium style={styles.gray}>Tiền vận chuyển</Text>
                                <Text bold large style={styles.gray}>0 đ</Text>
                            </ListItem>
                            <Border color='rgba(0,0,0,0.5)' size={1}/>
                            <ListItem style={styles.row}>
                                <Text medium style={styles.gray}>Tiền đã thu</Text>
                                <Text bold large style={styles.gray}>0 đ</Text>
                            </ListItem>
                            <Border color='rgba(0,0,0,0.5)' size={1}/>
                            <ListItem style={styles.row}>
                                <Text medium style={styles.gray}>Phí Clingme</Text>
                                <Text bold large style={styles.gray}>80.000 đ</Text>
                            </ListItem>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}