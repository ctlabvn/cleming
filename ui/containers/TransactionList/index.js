import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, Content, Input, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonAction from '~/store/actions/common'
import * as transactionAction from '~/store/actions/transaction'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
@connect(state => ({
    user: state.auth.user,
    place: state.place,
    listTransaction: state.transaction.listTransaction
}), { ...commonAction, ...transactionAction })
@reduxForm({ form: 'TestForm' })
export default class TransactionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentTransactionTypeFilter: 0,
            loading: false,
        }
        this.transactionFilterListValue = [
            {
                value: 0,
                display: 'Tất cả giao dịch'
            },
            {
                value: 1,
                display: 'Clingme đã duyệt'
            },
            {
                value: 2,
                display: 'Cashback thành công'
            },
            {
                value: 3,
                display: 'Bị từ chối'
            }
        ];
    }
    _handlePressTransactionFilter() {
        this.refs.transactionTypePopup.setModalVisible(true)
    }
    _handleYesFilterTransactionType(item) {
        this.setState({ currentTransactionTypeFilter: item })
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, item)
    }
    _handlePressFilter(item) {
        // this.setState({ loading: true })
        let currentPlace = this.refs.placeDropdown.getValue()
        this.props.getListTransaction(this.props.user.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, this.state.currentTransactionTypeFilter)
    }
    _handlePressTab(item) {
        console.log('Praten press tab', item)
    }
    _handleTopDrowpdown(item) {
        // console.log('Place Dropdown Change', item)
        let dateFilterData = this.refs.dateFilter.getData()
        // console.log('Date Filter Data Change Dropdown', dateFilterData)
        // this.setState({ loading: true })
        this.props.getListTransaction(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, this.state.currentTransactionTypeFilter)
    }
    componentDidMount() {
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, this.state.currentTransactionTypeFilter)

    }
    _renderTransactionItem(item) {
        var transactionNumberBlock;
        var statusText;
        switch (item.transactionStatus) {
            case 0: // chờ duyệt
                transactionNumberBlock =
                    (<View style={styles.row}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.processing }} />
                        <Text small style={{ ...styles.transactionCode, ...styles.processing }}>{item.dealTransactionIdDisplay}</Text>
                    </View>)
                statusText = <Text warning small>Đang xử lí</Text>
                break
            case 3:
                transactionNumberBlock =
                    (<View style={styles.row}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.processing }} />
                        <Text small style={{ ...styles.transactionCode, ...styles.processing }}>{item.dealTransactionIdDisplay}</Text>
                    </View>)
                statusText = <Text warning small>Đang xử lí</Text>
                break

            case 1: // thành công
                transactionNumberBlock =
                    (<View style={styles.row}>
                        <Icon name='coin_mark' style={{ ...styles.icon, ...styles.success }} />
                        <Text small style={{ ...styles.transactionCode, ...styles.success }}>{item.dealTransactionIdDisplay}</Text>
                    </View>)
                statusText = <Text success small>Thành công</Text>
                break
            case 2: // Bị từ chối
                transactionNumberBlock = (
                    <View style={styles.row}>
                        <Icon name='unlike_s' style={{ ...styles.icon, ...styles.reject }} />
                        <Text small style={{ ...styles.transactionCode, ...styles.reject }}>{item.dealTransactionIdDisplay}</Text>
                    </View>
                )
                statusText = <Text small error>Bị từ chối</Text>
                break
            default:
                transactionNumberBlock =
                    (<View style={styles.row}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.processing }} />
                        <Text small style={{ ...styles.transactionCode, ...styles.processing }}>{item.dealTransactionIdDisplay}</Text>
                    </View>)
                statusText = <Text warning small>Đang xử lí</Text>
                break
        }
        var payClingmeText;
        var payIndicator = null
        if (parseInt(item.paymentStatus) > 0) {
            payClingmeText = <Text small>Đã trả phí Clingme</Text>
        } else {
            payClingmeText = <Text small warning>Chưa trả phí Clingme</Text>
            payIndicator = <View style={styles.readIndicator} />
        }
        return (
            <ListItem key={item.dealTransactionId}
                onPress={() => this.props.forwardTo('transactionDetail')}
                style={styles.listItem}
            >
                <View style={styles.block}>
                    <View style={styles.row}>
                        {transactionNumberBlock}
                        <Text bold>{formatNumber(item.originPrice)}đ</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <View style={styles.placeholder} />
                            <Text small>Khách hàng: <Text bold small>{item.userName}</Text></Text>
                        </View>
                        <Text style={styles.timestamp} small>{moment(item.boughtTime * 1000).format('hh:mm  DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <View style={styles.placeholder}>
                                {payIndicator}
                            </View>
                            {statusText}
                        </View>
                        {payClingmeText}
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
            </ListItem>
        )
    }
    render() {
        console.log('Rerender Loading', this.state.loading)
        const { handleSubmit, submitting, forwardTo, listTransaction, place } = this.props
        // console.log('Re-render', this.props.listTransaction)
        // First Time
        if (!listTransaction) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <ActivityIndicator
                        size="large"
                    />
                    <Text>Loading...</Text>
                </View>
            )
        }
        var dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        var defaultSelected = dropdownValues[0]
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
        var noData = null
        if (listTransaction.length == 0) {
            noData = <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}><Text small>Không có dữ liệu.</Text></View>
        }
        return (
            <View style={styles.container}>
                <TopDropdown ref='placeDropdown' dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown.bind(this)} selectedOption={defaultSelected} />
                <RadioPopup ref='transactionTypePopup' listValue={this.transactionFilterListValue} selectedValue={this.state.currentTransactionTypeFilter} onClickYes={this._handleYesFilterTransactionType.bind(this)} />
                <View style={{ marginTop: 50, height: '100%' }}>
                    <TabsWithNoti tabData={tabData} activeTab={2} onPressTab={this._handlePressTab.bind(this)} />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />

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
                        {/*{this.state.loading &&
                            (<View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                <Text>Loading...</Text>
                            </View>)
                        }*/}
                        <List dataArray={listTransaction.slice(0, 10)}
                            renderRow={(item) => this._renderTransactionItem(item)}
                            pageSize={10}
                        >
                        </List>
                        {noData}
                        {/*{listTransaction.slice(0, 10).map((item) => this._renderTransactionItem(item))}*/}


                        {/*<TouchableOpacity onPress={() => forwardTo('transactionDetail')}>
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
                                        <View style={styles.placeholder}>
                                            <View style={styles.readIndicator} />
                                        </View>
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
                                        <View style={styles.placeholder}>
                                            <View style={styles.readIndicator} />
                                        </View>
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
                                        <View style={styles.placeholder}>
                                            <View style={styles.readIndicator} />
                                        </View>
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
                                        <View style={styles.placeholder}>
                                            <View style={styles.readIndicator} />
                                        </View>
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
                        </TouchableOpacity>*/}


                    </Content>

                </View>
            </View>
        )
    }
}