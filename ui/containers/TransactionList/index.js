import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Spinner } from 'native-base'
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
// import Perf from 'react-addons-perf';

import options from './options'

@connect(state => ({
    user: state.auth.user,
    place: state.place,
    transaction: state.transaction
}), { ...commonAction, ...transactionAction, ...authActions })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            refreshing: false,
            loadingMore: false
        }
    }
    // net filter transaction type
    _handlePressFilter(item) {
        // console.log('Handle Press Item', item)
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, transactionFilter.value,
                () => this.setState({ loading: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id, item.currentSelectValue.value.from, item.currentSelectValue.value.to, transactionFilter.value,
                () => this.setState({ loading: false })
            )

        }
    }
    // Not need filter transaction type
    _handlePressTab(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilter = this.refs.dateFilter.getData()
        this.setState({ loading: true })
        if (item.tabID == 1) { // Trả qua Clingme
            this.refs.transactionFilter.updateFilter(options.transactionFilterListClingme)
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to,
                () => this.setState({ loading: false })
            )
        } else { // Trả trực tiếp
            this.refs.transactionFilter.updateFilter(options.transactionFilterListDỉrect)
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to,
                () => this.setState({ loading: false })
            )
        }
    }

    _handleTransactionFilterChange(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilter = this.refs.dateFilter.getData()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to, item.value,
                () => this.setState({ loading: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to, item.value,
                () => this.setState({ loading: false })
            )
        }
    }

    // Need Filter transaction type
    _handleTopDrowpdown(item) {
        let dateFilterData = this.refs.dateFilter.getData()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, transactionFilter.value,
                () => this.setState({ loading: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to, transactionFilter.value,
                () => this.setState({ loading: false })
            )
        }

    }
    componentDidMount() {
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loading: true })
        this.props.getListTransaction(this.props.user.xsession, currentPlace.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            () => this.setState({ loading: false })
        )
    }
    // need care about currentPage
    _loadMore = ()=>{
        console.log('Props', this.props)
        const {transaction} = this.props
        console.log('Trans load More', transaction)
        if (transaction.pageNumber >= transaction.totalPage){
            return;
        }
        console.log('On loadMore trans', transaction)
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ loadingMore: true })
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
            this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value, transaction.pageNumber+1,
                () => this.setState({ loadingMore: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value, transaction.pageNumber+1,
                () => this.setState({ loadingMore: false })
            )
        }
    }

    _onRefresh= () => {
        console.log('On refreshing trans')
        let dateFilterData = this.refs.dateFilter.getData()
        let currentPlace = this.refs.placeDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this.setState({ refreshing: true })
        if (this.refs.tabs.getActiveTab() == 1) { //trả qua Clingme
             this.props.getListTransactionPayWithClingme(this.props.user.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value,
                () => this.setState({ refreshing: false })
            )
        } else { // Trả trực tiếp
            this.props.getListTransaction(this.props.user.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                transactionFilter.value,
                () => this.setState({ refreshing: false })
            )
        }
    }

    _renderTransactionItem(item) {
        var transactionNumberBlock;
        var statusText;
        switch (item.transactionStatus) {
            case 0: // chờ duyệt
            case 3:
                transactionNumberBlock =
                    (<View style={styles.row}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.processing }} />
                        <Text small style={{ ...styles.transactionCode, ...styles.processing }}>{item.dealTransactionIdDisplay}</Text>
                    </View>)
                statusText = <Text warning small>Clingme đã duyệt</Text>
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
        if (transaction.pageNumber >= transaction.totalPage && transaction.totalPage > 0){
            moreData = <View style={{flexDirection: 'row', justifyContent: 'center'}}><Text small>No more data</Text></View>
        }
        return (
            <Container style={styles.container}>
                <TopDropdown ref='placeDropdown' dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown.bind(this)} selectedOption={defaultSelected} />
                <View style={{ marginTop: 50, height: '100%' }}>
                    <TabsWithNoti tabData={options.tabData} activeTab={2} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <TransactionFilter onFilterChange={this._handleTransactionFilterChange.bind(this)}
                        listValue={options.transactionFilterListDỉrect} ref='transactionFilter'
                    />
                    <Content
                        padder
                        onEndReached={this._loadMore} onRefresh={this._onRefresh}
                        refreshing={this.state.refreshing}
                    >
                        {this.state.loading && <Spinner color='red' />}
                        <List dataArray={transaction.listTransaction||[]}
                            renderRow={(item) => this._renderTransactionItem(item)}
                            pageSize={10}
                        >
                        </List>
                        {this.state.loadingMore && <Spinner color='red' />}
                        {noData}
                        {moreData}
                    </Content>

                </View>
            </Container>
        )
    }
}