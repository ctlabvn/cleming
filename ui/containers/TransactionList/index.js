import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, Content, Input, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonAction from '~/store/actions/common'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
@connect(null, commonAction)
@reduxForm({ form: 'TestForm' })
export default class TransactionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentTransactionTypeFilter: 1
        }
        this.transactionFilterListValue = [
            {
                value: 1,
                display: 'Tất cả giao dịch'
            },
            {
                value: 2,
                display: 'Giao dịch có Cashback'
            },
            {
                value: 3,
                display: 'Chờ Clingme hoàn tiền'
            },
            {
                value: 4,
                display: 'Clingme đã hoàn tiền'
            }
        ];
    }
    _handlePressTransactionFilter() {
        console.log('press filter')
        this.refs.transactionTypePopup.setModalVisible(true)
    }
    _handleYesFilterTransactionType(item) {
        this.setState({ currentTransactionTypeFilter: item })
    }
    _handlePressFilter(item) {
        console.log('Pressing Filter', item)
    }
    _handlePressTab(item) {
        console.log('Praten press tab', item)
    }
    render() {
        const { handleSubmit, submitting, forwardTo } = this.props
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
        var currentFilter = this.transactionFilterListValue.filter((item) => item.value == this.state.currentTransactionTypeFilter)[0].display
        var tabData = [
            {
                tabID: 1,
                text: 'Trả qua Clingme',
                number: 4
            },
            {
                tabID: 2,
                text: 'Trả trực tiếp',
                number: 50
            }
        ]
        return (
            <View style={styles.container}>
                <TopDropdown dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown} selectedOption={defaultSelected} />
                <RadioPopup ref='transactionTypePopup' listValue={this.transactionFilterListValue} selectedValue={this.state.currentTransactionTypeFilter} onClickYes={this._handleYesFilterTransactionType.bind(this)} />
                <View style={{ marginTop: 50, height: '100%' }}>
                    <TabsWithNoti tabData={tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)} />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} />
                    <View style={styles.filterByTransactionType}>
                        <TouchableOpacity onPress={() => this._handlePressTransactionFilter()}>
                            <View style={styles.leftContainer}>
                                <Icon name='filter' style={styles.transactionTypeIcon} />
                                <Text small>{currentFilter}</Text>
                            </View>
                        </TouchableOpacity>

                        <Text small style={styles.numberRight}>10</Text>
                    </View>
                    <Content style={{ padding: 10, height: '100%' }}>


                        <TouchableOpacity onPress={() => forwardTo('transactionDetail')}>
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='order-history' style={{ ...styles.icon, ...styles.processing }} />
                                        <Text small style={{ ...styles.transactionCode, ...styles.processing }}>#CL123456</Text>
                                    </View>
                                    <Text small style={styles.moneyNumber}>400.000đ</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <View style={styles.placeholder} />
                                        <Text small>Khách hàng: <Text bold small>Username</Text></Text>
                                    </View>
                                    <Text style={styles.timestamp} small>17:30 14/10/2017</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='option_check' style={{ ...styles.icon, ...styles.notPayIcon }} />
                                        <Text style={styles.processing} small>Đang xử lí</Text>
                                    </View>
                                    <Text style={styles.processing} small>Chưa trả phí Clingme</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Border color='rgba(0,0,0,0.5)' size={1} />



                        <TouchableOpacity onPress={() => forwardTo('transactionDetail')}>
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='coin_mark' style={{ ...styles.icon, ...styles.success }} />
                                        <Text small style={{ ...styles.transactionCode, ...styles.success }}>#CL123456</Text>
                                    </View>
                                    <Text small style={styles.moneyNumber}>400.000đ</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <View style={styles.placeholder} />
                                        <Text small>Khách hàng: <Text small bold>Username</Text></Text>
                                    </View>
                                    <Text style={styles.timestamp} small>17:30 14/10/2017</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='option_check' style={{ ...styles.icon, ...styles.notPayIcon }} />
                                        <Text style={styles.success} small>Thành công</Text>
                                    </View>
                                    <Text style={styles.processing} small>Chưa trả phí Clingme</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                        <TouchableOpacity onPress={() => forwardTo('transactionDetail')}>
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='unlike_s' style={{ ...styles.icon, ...styles.reject }} />
                                        <Text small style={{ ...styles.transactionCode, ...styles.reject }}>#CL123456</Text>
                                    </View>
                                    <Text small style={styles.moneyNumber}>400.000đ</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <View style={styles.placeholder} />
                                        <Text small>Khách hàng: <Text bold small>Username</Text></Text>
                                    </View>
                                    <Text small style={styles.timestamp}>17:30 14/10/2017</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='option_check' style={{ ...styles.icon, ...styles.notPayIcon }} />
                                        <Text small style={styles.reject}>Bị từ chối</Text>
                                    </View>
                                    <Text small style={styles.processing}>Chưa trả phí Clingme</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Border color='rgba(0,0,0,0.5)' size={1} />
                        <TouchableOpacity onPress={() => forwardTo('transactionDetail')}>
                            <View style={styles.block}>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <View style={styles.placeholder} />
                                        <Text small style={{ ...styles.transactionCode, ...styles.reject }}>#CL123456</Text>
                                    </View>
                                    <Text small style={styles.moneyNumber}>17:30 14/10/2017</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <View style={styles.placeholder} />
                                        <Text small>Khách hàng: <Text bold small>Username</Text></Text>
                                    </View>
                                    <Text small success style={styles.timestamp}>Thành công</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='option_check' style={{ ...styles.icon, ...styles.notPayIcon }} />
                                        <Text small>Số HĐ: </Text><Text bold primary>00425</Text>
                                    </View>
                                    <Text bold>400.000đ</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <View style={styles.placeholder} />
                                        <Text small warning>Chờ Clingme hoàn tiền</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>


                    </Content>

                </View>
            </View>
        )
    }
}