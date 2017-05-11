import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Spinner } from 'native-base'
import { View, InteractionManager } from 'react-native'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonAction from '~/store/actions/common'
import * as transactionAction from '~/store/actions/transaction'
import TransactionFilter from '~/ui/components/TransactionFilter'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import Content from '~/ui/components/Content'

import options from './options'

@connect(state => ({
    user: state.auth.user,
    place: state.place,
    listTransaction: state.transaction.listTransaction
}), { ...commonAction, ...transactionAction })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    _handlePressFilter(item) {
        console.log('Handle Press Item', item)
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, transactionFilter.value,
                () => this.setState({loading: false})
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, transactionFilter.value,
                () => this.setState({ loading: false })
            )

        }
    }
    _handlePressTab(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilter = this.refs.dateFilter.getData()
        this.setState({loading: true})
        if (item.tabID == 1) { // Trả qua Clingme
            this.refs.transactionFilter.updateFilter(options.transactionFilterListClingme)
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to,
                ()=>this.setState({loading: false})
            )
        } else { // Trả trực tiếp
            this.refs.transactionFilter.updateFilter(options.transactionFilterListDỉrect)
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to,
                ()=>this.setState({loading: false})
            )
        }
    }
    _handleTopDrowpdown(item) {
        let dateFilterData = this.refs.dateFilter.getData()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({loading: true})
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, transactionFilter.value,
                ()=>this.setState({loading: false})
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, transactionFilter.value,
                ()=>this.setState({loading: false})
            )
        }

    }
    componentWillFocus(){
        console.log('Component Will Focus')
    }
    componentDidMount() {
        console.log('Did mount transaction list')
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({loading: true})
        this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            ()=>this.setState({loading: false})
        )
    }
    _handleTransactionFilterChange(item) {
        console.log('On Change Filter', item)
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
            <ListItem
                onPress={() => this.props.forwardTo('transactionDetail/' + item.dealTransactionIdDisplay)}
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
                {
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                }
            </ListItem>
        )
    }
    render() {
        console.log('render transaction list')
        const { handleSubmit, submitting, forwardTo, listTransaction, place } = this.props
        if (!listTransaction) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='red' />
                    <Text>Loading...</Text>
                </View>
            )
        }
        var dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        var defaultSelected = dropdownValues[0]
        // var currentFilter;
        // currentFilter = options.transactionFilterListDỉrect.filter((item) => item.value == this.state.currentTransactionTypeFilter)[0].display

        var noData = null
        if (listTransaction.length == 0) {
            noData = <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}><Text small>Không có dữ liệu.</Text></View>
        }
        return (
            <Container style={styles.container}>
                <TopDropdown ref='placeDropdown' dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown.bind(this)} selectedOption={defaultSelected} />
                {/*<RadioPopup ref='transactionTypePopup' listValue={options.transactionFilterListDỉrect} onClickYes={this._handleYesFilterTransactionType.bind(this)} />*/}
                <View style={{ marginTop: 50, height: '100%' }}>
                    <TabsWithNoti tabData={options.tabData} activeTab={2} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <TransactionFilter onFilterChange={this._handleTransactionFilterChange.bind(this)}
                        listValue={options.transactionFilterListDỉrect} ref='transactionFilter'
                    />
                    {/*<View style={styles.filterByTransactionType}>
                        <TouchableOpacity onPress={() => this._handlePressTransactionFilter()}>
                            <View style={styles.leftContainer}>
                                <Icon name='filter' style={styles.transactionTypeIcon} />
                                <Text small>{currentFilter}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text small style={styles.numberRight}>10</Text>
                    </View>*/}

                    <Content style={{ padding: 10, height: '100%' }} refreshing={true}>
                        {this.state.loading &&
                            (<View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Spinner color='red' />
                            </View>)
                        }
                        {/*<View style={{ backgroundColor: 'grey', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Spinner color='red' />
                        </View>*/}

                        <List dataArray={listTransaction}
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
            </Container>
        )
    }
}