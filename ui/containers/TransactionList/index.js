import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Spinner, Button } from 'native-base'
import { View, InteractionManager } from 'react-native'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonAction from '~/store/actions/common'
import * as transactionAction from '~/store/actions/transaction'
import * as authActions from '~/store/actions/auth'
import TransactionFilter from '~/ui/components/TransactionFilter'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import Content from '~/ui/components/Content'
import { getSession } from '~/store/selectors/auth'
import options from './options'
import material from '~/theme/variables/material.js'
import { TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT } from '~/store/constants/app'

@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    transaction: state.transaction
}), { ...commonAction, ...transactionAction, ...authActions })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            loadingMore: false,
            currentTab: TRANSACTION_TYPE_CLINGME
        }
    }
    // need filter transaction type
    _handlePressFilter(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
    }
    // Not need filter transaction type
    _handlePressTab(item) {
        this.setState({ currentTab: item.tabID },
            () => {
                let currentPlace = this.refs.placeDropdown.getValue()
                let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
                if (item.tabID == TRANSACTION_TYPE_CLINGME) { // Trả qua Clingme
                    this.refs.transactionFilter.updateFilter(options.transactionFilterListClingme)
                } else { // Trả trực tiếp
                    this.refs.transactionFilter.updateFilter(options.transactionFilterListDirect)
                }
                this._load(currentPlace.id, dateFilterData.from, dateFilterData.to)
            }
        )

    }

    _handleTransactionFilterChange(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, item.value)
    }

    // Need Filter transaction type
    _handleTopDrowpdown(item) {
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(item.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
    }
    confirmTransaction = (clingmeId) => {
        const { confirmTransaction, xsession, setToast, forwardTo } = this.props
        forwardTo('transactionDetail/' + clingmeId + '/' + TRANSACTION_TYPE_CLINGME)
    }
    componentDidMount() {
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilterComponent = this.refs.transactionFilter
        let transactionFilter = transactionFilterComponent.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to)
    }
    _load(placeId, fromTime, toTime, filter = 0, page = 1, isLoadMore = false) {
        const { xsession, getListTransaction, getListTransactionPayWithClingme } = this.props
        let transactionFilterComponent = this.refs.transactionFilter
        if (isLoadMore) {
            this.setState({ loadingMore: true })
        } else {
            this.setState({ loading: true })
        }

        if (this.state.currentTab == TRANSACTION_TYPE_CLINGME) {
            getListTransactionPayWithClingme(xsession, placeId, fromTime, toTime, filter, page,
                () => {
                    this.setState({ loading: false, loadingMore: false })
                    transactionFilterComponent.updateIndicatorNumber(this.props.transaction.payWithClingme.totalRecord)
                }
            )
        } else if (this.state.currentTab == TRANSACTION_TYPE_DIRECT) {
            getListTransaction(xsession, placeId, fromTime, toTime, filter, page,
                () => {
                    this.setState({ loading: false, loadingMore: false })
                    transactionFilterComponent.updateIndicatorNumber(this.props.transaction.payDirect.totalRecord)
                }
            )
        }
    }
    // need care about currentPage
    _loadMore = () => {
        const { transaction } = this.props
        let pageNumber, totalPage
        if (this.state.currentTab == TRANSACTION_TYPE_CLINGME) {
            pageNumber = transaction.payWithClingme.pageNumber
            totalPage = transaction.payWithClingme.totalPage
        } else {
            pageNumber = transaction.payDirect.pageNumber
            totalPage = transaction.payDirect.totalPage
        }
        if (pageNumber >= totalPage) return
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value, pageNumber + 1)
    }

    _onRefresh = () => {
        console.log('On refreshing trans')
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
    }
    _renderTransactionPayWithClingmeItem(item) {
        //  "transactionStatus": int,		// trạng thái transaction 1 là đã thanh toán, 2 là đã xác nhận
        switch (item.transactionStatus) {
            case 1:
            default:
                return (
                    <ListItem style={styles.listItem}
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.clingmeId + '/' + item.transactionType)}
                    >
                        <View style={styles.block}>
                            <View style={styles.rowPadding}>
                                <Text style={styles.timestamp} small>{moment(item.invoiceTime * 1000).format('hh:mm   DD/MM/YYYY')}</Text>
                                <Text small bold>{item.userName}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text bold primary style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text><Text bold style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                            <View style={styles.row}>
                                <Text small primary>Đã thanh toán</Text>
                                <Button transparent style={styles.button} onPress={() => this.confirmTransaction(item.clingmeId)}>
                                    <Text bold primary>Xác nhận</Text>
                                    <Icon name='foward' style={styles.primary} />
                                </Button>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </ListItem>
                )
            case 2:
                return (
                    <ListItem style={styles.listItem}
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.clingmeId + '/' + item.transactionType)}
                    >
                        <View style={styles.block}>
                            <View style={styles.rowPadding}>
                                <Text style={styles.timestamp} small>{moment(item.invoiceTime * 1000).format('hh:mm   DD/MM/YYYY')}</Text>
                                <Text bold primary style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>

                            </View>
                            <View style={styles.rowPadding}>
                                <Text small>Khách hàng: <Text small bold>{item.userName}</Text></Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Text success small>Đã xác nhận</Text>
                                <Text><Text bold style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </ListItem>
                )
        }
    }

    _renderTransactionItem(item) {
        let iconBlock, statusText, transactionCode
        switch (item.transactionStatus) {
            case 0: //chờ duyệt
            case 3:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={{...styles.icon, ...styles.warning}} />
                    </View>
                )
                statusText = <Text small warning>Chờ phê duyệt</Text>
                transactionCode = <Text bold>{item.dealTransactionIdDisplay}</Text>
                break
            case 1: // thành công
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='coin_mark' style={{...styles.icon, ...styles.success}} />
                    </View>
                )
                statusText = <Text small>Cashback thành công</Text>
                transactionCode = <Text bold>{item.dealTransactionIdDisplay}</Text>
                break
            case 2: // bị từ chối
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='unlike_s' style={{...styles.icon, ...styles.reject}} />
                    </View>
                )
                statusText = <Text small error>Bị từ chối</Text>
                transactionCode = <Text bold>{item.dealTransactionIdDisplay}</Text>
                break
            default:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={styles.icon} />
                    </View>
                )
                statusText = <Text small warning>Chờ phê duyệt</Text>
                transactionCode = <Text bold>{item.dealTransactionIdDisplay}</Text>
        }
        return (
            <ListItem
                onPress={() => this.props.forwardTo('transactionDetail/' + item.dealTransactionId + '/' + item.transactionType)}
                style={styles.listItem}
            >
                <View style={styles.block}>
                    <View style={{ ...styles.row, alignItems: 'flex-start' }}>
                        {iconBlock}
                        <View style={{ width: '100%', flex: 1 }}>
                            <View style={styles.row}>
                                {transactionCode}
                                <Text style={styles.timestamp} small>{moment(item.boughtTime * 1000).format('hh:mm   DD/MM/YYYY')}</Text>
                            </View>
                            {/*<View style={{ ...styles.row, marginTop: 2 }}>
                                <Text small>Khách hàng: <Text bold small>{item.userName}</Text></Text>
                            </View>*/}
                            <View style={styles.row}>
                                {statusText}
                                <Text bold style={styles.moneyNumber}>{formatNumber(item.originPrice)}đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                }
            </ListItem>
        )
    }

    _renderRow(item) {
        if (item.transactionType == TRANSACTION_TYPE_CLINGME) { // Over clingme
            return this._renderTransactionPayWithClingmeItem(item)
        } else { // Direct
            return this._renderTransactionItem(item)
        }
    }
    _renderList() {
        const { transaction } = this.props
        if (this.state.currentTab == TRANSACTION_TYPE_CLINGME) {
            return (<List dataArray={transaction.payWithClingme.listTransaction}
                renderRow={(item) => {
                    return this._renderRow(item)
                }}
                pageSize={10}
            ></List>)
        } else if (this.state.currentTab == TRANSACTION_TYPE_DIRECT) {
            return (
                <List dataArray={transaction.payDirect.listTransaction}
                    renderRow={(item) => {
                        return this._renderRow(item)
                    }}
                    pageSize={10}></List>
            )
        }
    }
    render() {
        const { handleSubmit, submitting, forwardTo, transaction, place } = this.props
        if (!transaction) {
            return (
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={material.red500} />
                    <Text>Loading...</Text>
                </View>
            )
        }
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        let defaultSelected = dropdownValues[0]
        if (dropdownValues.length > 1) {
            defaultSelected = {
                id: '',
                name: 'Tất cả địa điểm'
            }
            dropdownValues = [defaultSelected, ...dropdownValues]
        }

        let noData = null
        if (transaction.listTransaction && transaction.listTransaction.length == 0) {
            noData = <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}><Text small>Không có dữ liệu.</Text></View>
        }
        let moreData = null
        if (transaction.pageNumber >= transaction.totalPage && transaction.totalPage > 0) {
            moreData = <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text small>No more data</Text></View>
        }
        return (
            <Container style={styles.container}>
                <TopDropdown ref='placeDropdown' dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown.bind(this)} selectedOption={defaultSelected} />
                <View style={{ marginTop: 50, height: '100%' }}>
                    <TabsWithNoti tabData={options.tabData} activeTab={TRANSACTION_TYPE_CLINGME} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <TransactionFilter onFilterChange={this._handleTransactionFilterChange.bind(this)}
                        listValue={options.transactionFilterListClingme} ref='transactionFilter'
                    />
                    <Content
                        padder
                        onEndReached={this._loadMore} onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                    >
                        {this._renderList()}
                        {this.state.loadingMore && <Spinner color={material.red500} />}
                        {noData}
                        {moreData}
                    </Content>

                </View>
            </Container>
        )
    }
}