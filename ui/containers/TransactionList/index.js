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
import * as placeActions from '~/store/actions/place'
import TransactionFilter from '~/ui/components/TransactionFilter'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import Content from '~/ui/components/Content'
import { getSession } from '~/store/selectors/auth'
import { getNews } from '~/store/selectors/place'
import { getListTransactionDirect, getListTransactionCLM } from '~/store/selectors/transaction'
// import { getSelectedPlace } from '~/store/selectors/place'
import options from './options'
import material from '~/theme/variables/material.js'
import { TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT, TRANSACTION_DIRECT_STATUS, TIME_FORMAT_WITHOUT_SECOND } from '~/store/constants/app'

// export const getListTransactionDirect = state => state.place.transaction.payDirect || []

// export const getListTransactionCLM = state => state.place.transaction.payWithClingme || []

// payDirect
// payWithClingme

@connect(state => ({
    xsession: getSession(state),
    news: getNews(state),
    // place: state.place,
    // selectedPlace: getSelectedPlace(state),
    payDirect: getListTransactionDirect(state),
    payWithClingme: getListTransactionCLM(state)
}), { ...commonAction, ...transactionAction, ...authActions, ...placeActions })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: TRANSACTION_TYPE_CLINGME,
            loading: false,
            loadingMore: false
        }
        this.isLoadingPlace = false

    }
    // need filter transaction type
    _handlePressFilter(item) {
        // let currentPlace = this.refs.placeDropdown.getValue()
        const { app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
            this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
        }
    }
    // Not need filter transaction type
    _handlePressTab(item) {
        const { app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        this.setState({ currentTab: item.tabID },
            () => {
                // let currentPlace = this.refs.placeDropdown.getValue()
                let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
                if (item.tabID == TRANSACTION_TYPE_CLINGME) { // Trả qua Clingme
                    this.refs.transactionFilter.updateFilter(options.transactionFilterListClingme)
                } else { // Trả trực tiếp
                    this.refs.transactionFilter.updateFilter(options.transactionFilterListDirect)
                }
                if (selectedPlace && Object.keys(selectedPlace).length > 0) {
                    this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to)
                }

            }
        )

    }

    _handleTransactionFilterChange(item) {
        // let currentPlace = this.refs.placeDropdown.getValue()
        const { app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
            this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, item.value)
        }

    }

    // Need Filter transaction type
    _handleTopDrowpdown = (item) => {
        // setSelectedOption(item)
        console.log('Handle Change TopDropdown', item)
        const { getMerchantNews, xsession } = this.props
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(item.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
        getMerchantNews(xsession, item.id,
            (err, data) => {
                if (data && data.updated && data.updated.data) {
                    let newsUpdate = data.updated.data
                    newsUpdate && this.refs.tabs.updateNumber(TRANSACTION_TYPE_CLINGME, newsUpdate.payThroughClmNotifyNumber)
                    newsUpdate && this.refs.tabs.updateNumber(TRANSACTION_TYPE_DIRECT, newsUpdate.payDirectionNotifyNumber)
                }
            }
        )
    }
    confirmTransaction = (clingmeId) => {
        const { confirmTransaction, xsession, setToast, forwardTo } = this.props
        forwardTo('transactionDetail/' + clingmeId + '/' + TRANSACTION_TYPE_CLINGME)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { app, news } = this.props
            let selectedPlace = app.topDropdown.getValue()
            app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            // let currentPlace = this.refs.placeDropdown.getValue()
            let transactionFilterComponent = this.refs.transactionFilter
            let transactionFilter = transactionFilterComponent.getCurrentValue()
            if (selectedPlace && Object.keys(selectedPlace).length > 0) {
                this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to)
            } else {
                this.isLoadingPlace = true
            }
            news && this.refs.tabs.updateNumber(TRANSACTION_TYPE_CLINGME, news.payThroughClmNotifyNumber)
            news && this.refs.tabs.updateNumber(TRANSACTION_TYPE_DIRECT, news.payDirectionNotifyNumber)
        })
    }
    componentWillFocus() {
        InteractionManager.runAfterInteractions(() => {
            const { app, news } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
            news && this.refs.tabs.updateNumber(TRANSACTION_TYPE_CLINGME, news.payThroughClmNotifyNumber)
            news && this.refs.tabs.updateNumber(TRANSACTION_TYPE_DIRECT, news.payDirectionNotifyNumber)
        })
    }
    _load(placeId, fromTime, toTime, filter = 0, page = 1, isLoadMore = false) {
        const { xsession, getListTransaction, getListTransactionPayWithClingme, payWithClingme, payDirect } = this.props
        let transactionFilterComponent = this.refs.transactionFilter
        if (isLoadMore) {
            this.setState({ loadingMore: true })
        } else {
            this.setState({ loading: true })
        }

        if (this.state.currentTab == TRANSACTION_TYPE_CLINGME) {
            getListTransactionPayWithClingme(xsession, placeId, fromTime, toTime, filter, page,
                (err, data) => {
                    this.setState({ loading: false, loadingMore: false })
                    if (data && data.updated && data.updated.data) {
                        transactionFilterComponent.updateIndicatorNumber(data.updated.data.totalRecord)
                    }
                }
            )
        } else if (this.state.currentTab == TRANSACTION_TYPE_DIRECT) {
            getListTransaction(xsession, placeId, fromTime, toTime, filter, page,
                (err, data) => {
                    this.setState({ loading: false, loadingMore: false })
                    if (data && data.updated && data.updated.data) {
                        transactionFilterComponent.updateIndicatorNumber(data.updated.data.totalRecord)

                    }

                }
            )
        }
    }
    // need care about currentPage
    _loadMore = () => {
        const { transaction, payWithClingme, payDirect, app } = this.props
        let pageNumber, totalPage
        if (this.state.currentTab == TRANSACTION_TYPE_CLINGME) {
            pageNumber = payWithClingme.pageNumber
            totalPage = payWithClingme.totalPage
        } else {
            pageNumber = payDirect.pageNumber
            totalPage = payDirect.totalPage
        }
        if (pageNumber >= totalPage) return
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = app.topDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value, pageNumber + 1)
    }

    _onRefresh = () => {
        console.log('On refreshing trans')
        const {app} = this.props
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = app.topDropdown.getValue()
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
                                <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                                <Text small bold grayDark>{item.userName}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text bold secondary style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text grayDark><Text bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
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
                        <View style={styles.blockConfirmed}>
                            <View style={styles.rowPadding}>
                                <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                                <Text bold grayDark style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>

                            </View>
                            <View style={styles.rowPadding}>
                                <Text small grayDark>Khách hàng: <Text small bold grayDark>{item.userName}</Text></Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Text success small>Đã xác nhận</Text>
                                <Text grayDark><Text bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </ListItem>
                )
        }
    }

    _renderTransactionItem(item) {
        let iconBlock, statusText, transactionCode, timeBlock
        let moneyText = <Text bold grayDark style={styles.moneyNumber}>{formatNumber(item.originPrice)}đ</Text>
        switch (item.transactionStatus) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK: //chờ duyệt
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={{ ...styles.icon, ...styles.warning }} />
                    </View>
                )
                statusText = <Text small warning>Chờ phê duyệt</Text>
                transactionCode = <Text bold grayDark>{item.dealTransactionIdDisplay}</Text>
                timeBlock = <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                break
            case TRANSACTION_DIRECT_STATUS.SUCCESS: // thành công
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='coin_mark' style={{ ...styles.icon, ...styles.success }} />
                    </View>
                )
                statusText = <Text small grayDark>Cashback thành công</Text>
                transactionCode = <Text bold grayDark>{item.dealTransactionIdDisplay}</Text>
                timeBlock = <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                break
            case TRANSACTION_DIRECT_STATUS.REJECT: // bị từ chối
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='unlike_s' style={{ ...styles.icon, ...styles.reject }} />
                    </View>
                )
                statusText = <Text small error>Bị từ chối</Text>
                transactionCode = <Text bold grayDark>{item.dealTransactionIdDisplay}</Text>
                moneyText = <Text bold gray style={styles.moneyNumber}></Text>
                timeBlock = <Text style={styles.timestamp} small grayDark>{moment(item.boughtTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                break
            default:
                iconBlock = (
                    <View style={styles.iconBlock}>
                        <Icon name='order-history' style={styles.icon} />
                    </View>
                )
                statusText = <Text small warning>Chờ phê duyệt</Text>
                transactionCode = <Text bold>{item.dealTransactionIdDisplay}</Text>
                timeBlock = <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
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
                                {timeBlock}
                            </View>
                            <View style={styles.row}>
                                {statusText}
                                {moneyText}
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
        const { transaction, payWithClingme, payDirect } = this.props
        if (this.state.currentTab == TRANSACTION_TYPE_CLINGME) {
            return (<List dataArray={payWithClingme.listTransaction}
                renderRow={(item) => {
                    return this._renderRow(item)
                }}
                pageSize={10}
            ></List>)
        } else if (this.state.currentTab == TRANSACTION_TYPE_DIRECT) {
            return (
                <List dataArray={payDirect.listTransaction}
                    renderRow={(item) => {
                        return this._renderRow(item)
                    }}
                    pageSize={10}></List>
            )
        }
    }
    render() {
        console.log('Render TransactionList')
        const { forwardTo, payDirect, payWithClingme } = this.props
        if (!payDirect && !payWithClingme) {
            return (
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={material.red500} />
                    <Text>Loading...</Text>
                </View>
            )
        }
        // let dropdownValues = place.listPlace.map(item => ({
        //     id: item.placeId,
        //     name: item.address
        // }))

        // let noData = null
        // if (transaction.listTransaction && transaction.listTransaction.length == 0) {
        //     noData = <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}><Text small>Không có dữ liệu.</Text></View>
        // }
        // let moreData = null
        // if (transaction.pageNumber >= transaction.totalPage && transaction.totalPage > 0) {
        //     moreData = <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text small>No more data</Text></View>
        // }
        return (
            <Container style={styles.container}>
                {/*<TopDropdown ref='placeDropdown' dropdownValues={dropdownValues}
                    selectedOption={selectedPlace}
                    onSelect={this._handleTopDrowpdown.bind(this)} />*/}
                <View style={{ height: '100%' }}>
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
                        {/*{noData}
                        {moreData}*/}
                    </Content>

                </View>
            </Container>
        )
    }
}