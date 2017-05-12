import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Input, Radio, Card, Content } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'

import { formatNumber } from '~/ui/shared/utils'

@connect(state=>({
    place: state.place,
}), authAction)
// @reduxForm({ form: 'TestForm' })
export default class extends Component {

    constructor(props) {
        super(props)
        this.tabData = [
            {
                tabID: 1,
                text: 'Chờ xác nhận'
            },
            {
                tabID: 2,
                text: 'Chờ giao hàng'
            },
            {
                tabID: 3,
                text: 'Thành công'
            },
        ]
    }
    _handlePressTab(item) {
        console.log('Press tab Delivery', item)
    }
    _numberWithDot(x) {
        return formatNumber(x)
    }
    _renderRow(item) {
        var statusBlock=null;
        var bottomBlock=null;
        if (item.status == 'WAITING_CONFIRM'){
            statusBlock =  (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='order-history' style={{ ...styles.deliveryCodeWaitingConfirm, ...styles.icon }} />
                    <Text style={styles.deliveryCodeWaitingConfirm}>{item.deliveryCode}</Text>
                </View>
            )
            bottomBlock = (
                <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                    <Button transparent><Text style={styles.reject}>Từ chối</Text></Button>
                    <Button transparent><Text style={styles.confirm}>Xác nhận</Text></Button>
                </View>
            )
        }else if(item.status == 'WAITING_DELIVERY'){
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='shiping-bike2' style={{ ...styles.deliveryCodeWaitingDelivery, ...styles.icon }} />
                    <Text style={styles.deliveryCodeWaitingDelivery}>{item.deliveryCode}</Text>
                </View>
            )
            bottomBlock = (
                <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                    <Button transparent><Text style={styles.reject}>Hủy</Text></Button>
                    <Button transparent><Text style={styles.confirm}>Đã giao thành công</Text></Button>
                </View>
            )
        }else if (item.status == 'DELIVERY_SUCCESS'){
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />
                    <Text style={styles.deliveryCodeSuccess}>{item.deliveryCode}</Text>
                </View>
            )
        }
        return (
            <View style={styles.deliveryBlock} key={item.deliveryCode}>
                <View style={styles.block}>
                    <View style={styles.row}>
                        {statusBlock}
                        <Text style={styles.time}>17:30 14/03/2017</Text>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.block}>
                    {item.products.map((subItem, index)=>
                        (
                            <View key={index} style={styles.row}>
                                <Text bold>{subItem.name}</Text>
                                <Text>SL: <Text bold>{subItem.number}</Text></Text>
                            </View>
                        )
                    )}
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.block}>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Ghi chú: </Text>
                        Đây là một ghi chú
                    </Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.block}>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Icon name='account' style={styles.icon} />
                            <Text>Username</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='phone' style={{ ...styles.phoneIcon, ...styles.icon }} />
                            <Text style={styles.phoneNumber}>09778765062</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text>Địa chỉ: 98 Hoàng Quốc Việt</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Đã thanh toán</Text>
                        <Text bold>{this._numberWithDot(item.total)}đ</Text>
                    </View>
                </View>
                {bottomBlock}
            </View>
        )
    }
    render() {
        const { handleSubmit, submitting, place } = this.props
        let allPlace = place.listPlace.map(item => item.placeId).join(';')
        let defaultSelected = {
            id: allPlace,
            name: "Tất cả địa điểm"
        }
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        dropdownValues = [defaultSelected, ...dropdownValues]

        var number = 400000
        var items=[
            {
                products: [
                    {
                        name: 'Name of Product',
                        number: 1
                    },
                    {
                        name: 'Name of Product',
                        number: 2
                    },
                    {
                        name: 'Name of Product',
                        number: 3
                    },
                ],
                status: 'WAITING_CONFIRM',
                deliveryCode: '#GHI123',
                total: 1200000
            },
            {
                products: [
                    {
                        name: 'Name of Product',
                        number: 1
                    },
                    {
                        name: 'Name of Product',
                        number: 2
                    },
                    {
                        name: 'Name of Product',
                        number: 3
                    },
                ],
                status: 'WAITING_DELIVERY',
                deliveryCode: '#GHI456',
                total: 300000
            },
            {
                products: [
                    {
                        name: 'Name of Product',
                        number: 1
                    },
                    {
                        name: 'Name of Product',
                        number: 2
                    },
                    {
                        name: 'Name of Product',
                        number: 3
                    },
                ],
                status: 'DELIVERY_SUCCESS',
                deliveryCode: '#GHI785',
                total: 690000
            },

        ]

        return (
            <View style={styles.container}>
                <TopDropdown dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown} selectedOption={defaultSelected} />
                <View style={styles.contentContainer}>
                    <TabsWithNoti tabData={this.tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)} />

                    <Content style={{ padding: 10, height: 200 }}>
                        {items.map(item=>(
                            this._renderRow(item)
                        ))}
                    </Content>

                </View>
            </View>
        )
    }
}