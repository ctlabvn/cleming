import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Input, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import Content from '~/ui/components/Content'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
@connect(null, authAction)
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
                <View style={{ marginTop: 50 }}>
                    <TabsWithNoti tabData={tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)} />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} />
                    <View style={styles.filterByTransactionType}>
                        <TouchableOpacity onPress={() => this._handlePressTransactionFilter()}>
                            <View style={styles.leftContainer}>
                                <Icon name='tune' style={styles.transactionTypeIcon} />
                                <Text>{currentFilter}</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.numberRight}>10</Text>
                    </View>
                </View>
            </View>
        )
    }
}