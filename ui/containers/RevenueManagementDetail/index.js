import React, {Component} from 'react'
import { View } from 'react-native'
import {Container, Text, List, ListItem} from 'native-base'
import Content from "~/ui/components/Content";
import styles from './styles'
import Icon from '~/ui/elements/Icon'

import Border from "~/ui/elements/Border";

import {REVENUE_PROCESSING, REVENUE_DONE} from '~/store/constants/app'

export default class extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTab: REVENUE_PROCESSING,
            colorStyle: styles.revenueProcessing,
        }
    }

    componentWillFocus() {
        let tab = REVENUE_DONE;
        let color = tab == REVENUE_PROCESSING ? styles.revenueProcessing :
            (tab == REVENUE_DONE ? styles.revenueDone : null);

        this.setState({
            currentTab: tab,
            colorStyle: color,
        })
    }

    _renderTitle() {
        let text = {
            title: 'Giao dịch đang xử lý',
            content: 'Thời gian chuyển tiền dự tính: 18/07/2017',
        }
        switch (this.state.currentTab) {
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