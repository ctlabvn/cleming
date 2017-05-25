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
import {TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT} from '~/store/constants/transaction'

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
            currentTab: TRANSACTION_TYPE_DIRECT
        }
    }
    // net filter transaction type
    _handlePressFilter(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == TRANSACTION_TYPE_CLINGME) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, transactionFilter.value,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, transactionFilter.value,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )

        }
    }
    // Not need filter transaction type
    _handlePressTab(item) {
        this.setState({ currentTab: item.tabID })
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilter = this.refs.dateFilter.getData()
        this.setState({ loading: true })
        if (item.tabID == TRANSACTION_TYPE_CLINGME) { // Trả qua Clingme
            this.refs.transactionFilter.updateFilter(options.transactionFilterListClingme)
            this.props.getListTransactionPayWithClingme(this.props.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        } else { // Trả trực tiếp
            this.refs.transactionFilter.updateFilter(options.transactionFilterListDirect)
            this.props.getListTransaction(this.props.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        }
    }

    _handleTransactionFilterChange(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilter = this.refs.dateFilter.getData()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == TRANSACTION_TYPE_DIRECT) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to, item.value,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to, item.value,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        }
    }

    // Need Filter transaction type
    _handleTopDrowpdown(item) {
        let dateFilterData = this.refs.dateFilter.getData()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == TRANSACTION_TYPE_CLINGME) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, transactionFilter.value,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, transactionFilter.value,
                () => {
                    this.setState({ loading: false })
                    this.refs.transactionFilter.updateIndicatorNumber(this.props.transaction.totalRecord)
                }
            )
        }

    }
    confirmTransaction = (clingmeId)=>{
        const {confirmTransaction, xsession, setToast} = this.props
        console.log('Confirming', clingmeId)
        confirmTransaction(xsession, clingmeId,
            (err, data)=>{
                if (data && data.updated && data.updated.data.success){
                    let message = <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, marginBottom: 50 }}><Text white>Đã ghi nhận phản hồi.</Text></View>
                    setToast(message, 'info', 3000, 'bottom')
                }
            }
        )
    }
    componentDidMount() {
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilterComponent = this.refs.transactionFilter
        let transactionFilter = transactionFilterComponent.getCurrentValue()
        this.setState({ loading: true })
        this.props.getListTransaction(this.props.xsession, currentPlace.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            () => {
                this.setState({ loading: false })
                transactionFilterComponent.updateIndicatorNumber(this.props.transaction.totalRecord)
            }
        )
    }
    // need care about currentPage
    _loadMore = () => {
        console.log('Props', this.props)
        const { transaction } = this.props
        console.log('Trans load More', transaction)
        if (this.refs.tabs.getActiveTab() == TRANSACTION_TYPE_CLINGME){
            if (transaction.payWithClingme.pageNumber >= transaction.payWithClingme.totalPage) return
        }else{
            if (transaction.payDirect.pageNumber >= transaction.payDirect.totalPage) return
        }
        
        console.log('On loadMore trans', transaction)
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loadingMore: true })
        if (this.refs.tabs.getActiveTab() == TRANSACTION_TYPE_CLINGME) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value, transaction.payWithClingme.pageNumber + 1,
                () => this.setState({ loadingMore: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value, transaction.payDirect.pageNumber + 1,
                () => this.setState({ loadingMore: false })
            )
        }
    }

    _onRefresh = () => {
        console.log('On refreshing trans')
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == TRANSACTION_TYPE_CLINGME) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value,
                () => this.setState({ loading: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value,
                () => this.setState({ loading: false })
            )
        }
    }
    _renderTransactionPayWithClingmeItem(item) {
        //  "transactionStatus": int,		// trạng thái transaction 1 là đã thanh toán, 2 là đã xác nhận
        switch (item.transactionStatus) {
            case 1:
            default:
                return (
                    <ListItem style={styles.listItem}
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.clingmeId+ '/'+item.transactionType)}
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
                                <Button transparent style={styles.button} onPress={()=>this.confirmTransaction(item.clingmeId)}>
                                    <Text bold primary>Xác nhận giao dịch</Text>
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
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.clingmeId + '/'+item.transactionType)}
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
                    <View style={{ ...styles.iconBlock, ...styles.backgroundWarning }}>
                        <Icon name='order-history' style={styles.icon} />
                    </View>
                )
                statusText = <Text small warning>Chờ phê duyệt</Text>
                transactionCode = <Text small bold warning>{item.dealTransactionIdDisplay}</Text>
                break
            case 1: // thành công
                iconBlock = (
                    <View style={{ ...styles.iconBlock, ...styles.backgroundSuccess }}>
                        <Icon name='coin_mark' style={styles.icon} />
                    </View>
                )
                statusText = <Text small success>Cashback thành công</Text>
                transactionCode = <Text small bold success>{item.dealTransactionIdDisplay}</Text>
                break
            case 2: // bị từ chối
                iconBlock = (
                    <View style={{ ...styles.iconBlock, ...styles.backgroundError }}>
                        <Icon name='unlike_s' style={styles.icon} />
                    </View>
                )
                statusText = <Text small error>Bị từ chối</Text>
                transactionCode = <Text small bold error>{item.dealTransactionIdDisplay}</Text>
                break
            default:
                iconBlock = (
                    <View style={{ ...styles.iconBlock, ...styles.backgroundWarning }}>
                        <Icon name='order-history' style={styles.icon} />
                    </View>
                )
                statusText = <Text small warning>Chờ phê duyệt</Text>
                transactionCode = <Text small bold warning>{item.dealTransactionIdDisplay}</Text>
        }
        return (
            <ListItem
                onPress={() => this.props.forwardTo('transactionDetail/' + item.dealTransactionId+ '/'+item.transactionType)}
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
                            <View style={{ ...styles.row, marginTop: 2 }}>
                                <Text small>Khách hàng: <Text bold small>{item.userName}</Text></Text>
                            </View>
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
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='red' />
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
                    <TabsWithNoti tabData={options.tabData} activeTab={2} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <TransactionFilter onFilterChange={this._handleTransactionFilterChange.bind(this)}
                        listValue={options.transactionFilterListDirect} ref='transactionFilter'
                    />
                    <Content
                        padder
                        onEndReached={this._loadMore} onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                    >
                        {this._renderList()}
                        {this.state.loadingMore && <Spinner color='red' />}
                        {noData}
                        {moreData}
                    </Content>

                </View>
            </Container>
        )
    }
}