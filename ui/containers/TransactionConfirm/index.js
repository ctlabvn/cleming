import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text, Button, Content, Spinner, Radio, Input } from 'native-base'
import { View, Modal, TouchableOpacity, Animated, Easing, Image, TextInput } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import * as transactionActions from '~/store/actions/transaction'
import { getSession } from '~/store/selectors/auth'
import { storeTransparent, storeFilled } from '~/assets'

export default class TransactionConfirm extends Component {
    constructor(props) {
        super(props)
    }
    goPrevious() {

    }
    goNext() {

    }
    render() {
        let btnPrev = (
            <Button dark transparent style={styles.buttonLeft}
                onPress={() => this.goPrevious()}>
                <Icon name="keyboard-arrow-left" style={styles.icon} />
                <Text small>Giao dịch trước</Text>
            </Button>
        )


        let btnNext = (
            <Button dark transparent style={styles.buttonRight} onPress={() => this.goNext()}>
                <Text small>Giao dịch sau</Text>
                <Icon name="keyboard-arrow-right" style={styles.icon} />
            </Button>
        )

        return (
            <Container style={styles.container}>
                {/*<Content ref='content' style={styles.content}>*/}
                    <View style={styles.contentRootChild}>
                        <View style={{...styles.block, alignSelf: 'flex-start'}}>
                            <Text style={{ alignSelf: 'flex-start' }}>12:29:53 6/3/17</Text>
                        </View>
                        <View style={styles.block}>
                            <Text>Số đơn hàng</Text>
                            <Text bold style={{ fontSize: 24 }}>#CL123456</Text>
                        </View>
                        <View style={styles.block}>
                            <Text>Tổng tiền thanh toán</Text>
                            <Text bold style={{ fontSize: 40 }}>310.000</Text>
                            <Text success bold>Đã thanh toán</Text>
                        </View>
                        <View style={styles.block}>
                            <Text bold>Name Of Place</Text>
                            <Text>33 Nguyễn Chí Thanh, Ba Đình, HN</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Khách hàng</Text>
                            <View style={styles.row}>
                                <Text bold>XXX</Text>
                                <Icon name='account' style={{ color: 'lightgrey', marginLeft: 5 }} />
                            </View>
                        </View>
                    </View>
                {/*</Content>*/}
                <View style={styles.navigateBlock}>
                    {btnPrev}
                    {btnNext}
                </View>
            </Container>

        )
    }
}