import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Input, Radio, Card } from 'native-base'
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
@connect(null, authAction)
@reduxForm({ form: 'TestForm' })

export default class DeliveryList extends Component {

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
    render() {
        const { handleSubmit, submitting } = this.props
        var dropdownValues = [
            {
                id: 0,
                name: "Tất cả địa điểm"
            },
            {
                id: 2,
                name: "33 Nguyễn Chí Thanh, Ba Đình, HN"
            },
            {
                id: 3,
                name: "105 Láng Hạ, Đống Đa, HN"
            },
            {
                id: 4,
                name: "98 Hoàng Quốc Việt, Cầu Giấy, HN",
            },
            {
                id: 5,
                name: "5 Đinh Tiên Hoàng, Hoàn Kiếm, HN"
            },
            {
                id: 6,
                name: "69 Bạch Mai, Hai Bà Trưng, HN"
            }
        ]
        var defaultSelected = {
            id: 0,
            name: "Tất cả địa điểm"
        }

        var number = 400000
        return (
            <View style={styles.container}>
                <TopDropdown dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown} selectedOption={defaultSelected} />
                <View style={styles.contentContainer}>
                    <TabsWithNoti tabData={this.tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)} />
                    <View style={{ padding: 10 }}>
                        <View style={styles.deliveryBlock}>
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <View style={styles.deliveryCodeBlock}>
                                        <Icon name='favorite' style={styles.deliveryCodeWaitingConfirm}/>
                                        <Text style={styles.deliveryCodeWaitingConfirm}>#GHIJK</Text>
                                    </View>
                                    <Text style={styles.time}>17:30 14/03/2017</Text>
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <Text bold>Name of product</Text>
                                    <Text>SL: <Text bold>3</Text></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text bold>Name of product</Text>
                                    <Text>SL: <Text bold>3</Text></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text bold>Name of product</Text>
                                    <Text>SL: <Text bold>3</Text></Text>
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                            <View style={styles.block}>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Ghi chú: </Text>
                                    Đây là một ghi chú
                            </Text>

                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1}/>
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        {/*<Icon name='favorite' />*/}
                                        <Thumbnail source={{uri:'http://mobi.clingme.vn:8090/images/resource_image/Clingme_icon_512.png'}} style={styles.avatar}/>
                                        <Text>Username</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Icon name='account' />
                                        <Text style={styles.phoneNumber}>09778765062</Text>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text>Địa chỉ: 98 Hoàng Quốc Việt</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Đã thanh toán</Text>
                                    <Text bold>{number.toLocaleString('vi-VN')}đ</Text>
                                </View>
                            </View>
                            <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                                <Button transparent><Text style={styles.reject}>Từ chối</Text></Button>
                                <Button transparent><Text style={styles.confirm}>Xác nhận</Text></Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}