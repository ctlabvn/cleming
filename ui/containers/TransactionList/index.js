import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as transactionAction from "~/store/actions/transaction";
import * as authActions from "~/store/actions/auth";
import * as placeActions from "~/store/actions/place";
import * as metaActions from "~/store/actions/meta";
import TransactionFilter from "~/ui/components/TransactionFilter";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession, getUser } from "~/store/selectors/auth";
import { getNews } from "~/store/selectors/place";
import { getListTransactionCLM, getListTransactionDirect } from "~/store/selectors/transaction";
import options from "./options";
import material from "~/theme/variables/material.js";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT,
    TRANSACTION_DISPLAY,
    SCREEN
} from "~/store/constants/app";
import I18n from '~/ui/I18n'
import ListTransaction from './TransactionListComponent'
import { getRouter } from '~/store/selectors/common'
@connect(state => ({
    xsession: getSession(state),
    user: getUser(state),
    news: getNews(state),
    payDirect: getListTransactionDirect(state),
    payWithClingme: getListTransactionCLM(state),
    meta: state.meta,
    router: getRouter(state),  
}), { ...commonAction, ...transactionAction, ...authActions, ...placeActions, ...metaActions })
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: this._getDefaultActiveTab(),
            loading: false,
            loadingMore: false
        }
        
        this.isLoadingPlace = false
        this.currentPlace = -1
        if (props.app && props.app.topDropdown){
            let selectedPlace = props.app.topDropdown.getValue()
            if (selectedPlace && selectedPlace.id){
                this.currentPlace = selectedPlace.id
            }
        }
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
        this.currentPlace = item.id
        const { xsession } = this.props
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(item.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
    }
    confirmTransaction = (clingmeId) => {
        const { confirmTransaction, xsession, setToast, forwardTo } = this.props
        forwardTo('transactionDetail/' + clingmeId + '/' + TRANSACTION_TYPE_CLINGME)
    }

    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
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
        this._updateNews(news)
    }

    _updateNews = (newsData) => {
        // guard code:
        if(!newsData)
            return

        // then extract data
        const {user} = this.props
        switch(user.isPay){
            case TRANSACTION_DISPLAY.BOTH:
            default:
                // newsData && this.refs.tabs.updateNumber(TRANSACTION_TYPE_CLINGME, newsData.payThroughClmNotifyNumber)
                // newsData && this.refs.tabs.updateNumber(TRANSACTION_TYPE_DIRECT, newsData.payDirectionNotifyNumber)
                this.refs.tabs.updateMultipleNumber(
                    [
                        {
                            tabID: TRANSACTION_TYPE_CLINGME,
                            number: newsData.payThroughClmNotifyNumber
                        },
                        {
                            tabID: TRANSACTION_TYPE_DIRECT,
                            number: newsData.payDirectionNotifyNumber
                        }
                    ]
                )
                break
            case TRANSACTION_DISPLAY.CLINGME:
                this.refs.tabs.updateNumber(TRANSACTION_TYPE_CLINGME, newsData.payThroughClmNotifyNumber)
                break
            case TRANSACTION_DISPLAY.DIRECT:
                this.refs.tabs.updateNumber(TRANSACTION_TYPE_DIRECT, newsData.payDirectionNotifyNumber)
                break
        }
    }

    _getTabData = () => {
        const {user} = this.props
        switch(user.isPay){            
            case TRANSACTION_DISPLAY.CLINGME:
                return options.tabDataClingme
            case TRANSACTION_DISPLAY.DIRECT:
                return options.tabDataDirect
            // default is all
            // case TRANSACTION_DISPLAY.BOTH:
            default:
                return options.tabData
        }
    }

    _getDefaultActiveTab = () => {
        const {user} = this.props
        switch(user.isPay){            
            case TRANSACTION_DISPLAY.CLINGME: 
                return TRANSACTION_TYPE_CLINGME
            // case TRANSACTION_DISPLAY.BOTH:
            // case TRANSACTION_DISPLAY.DIRECT:
            default:
                return TRANSACTION_TYPE_DIRECT
        }
    }


    _getTransactionFilterValue = () => {
        const {user} = this.props
        switch(user.isPay){            
            case TRANSACTION_DISPLAY.CLINGME: 
                return options.transactionFilterListClingme
            // case TRANSACTION_DISPLAY.BOTH:
            // case TRANSACTION_DISPLAY.DIRECT:
            default:
                return options.transactionFilterListDirect
        }
    }

    componentWillReceiveProps(nextProps){
        const { app, clearMarkLoad, router } = this.props
        const { meta } = nextProps
        if (!router || router.route != 'transactionList'){
            console.log('Not in transList')
            return
        }
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = app.topDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        if (meta && meta[SCREEN.TRANSACTION_LIST_DIRECT] && this.state.currentTab == TRANSACTION_TYPE_DIRECT){
            console.log('Case reload tranDirect')
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
            clearMarkLoad(SCREEN.TRANSACTION_LIST_DIRECT)
        }else if(meta && meta[SCREEN.TRANSACTION_LIST_CLINGME] && this.state.currentTab == TRANSACTION_TYPE_CLINGME){
            console.log('Case reload tranClm')
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
            clearMarkLoad(SCREEN.TRANSACTION_LIST_CLINGME)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {router} = this.props
        if (!router || router.route != 'transactionList'){
            return false
        }
        return true
    }

    componentWillFocus() {
        // InteractionManager.runAfterInteractions(() => {
        const { app, news, meta, clearMarkLoad } = this.props
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
        let currentPlace = app.topDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        if (meta && meta[SCREEN.TRANSACTION_LIST_DIRECT]){
            console.log('Markload transaction direct')
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
            clearMarkLoad(SCREEN.TRANSACTION_LIST_DIRECT)
        }else if(meta && meta[SCREEN.TRANSACTION_LIST_CLINGME]){
            console.log('Markload transaction clingme')
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
            clearMarkLoad(SCREEN.TRANSACTION_LIST_CLINGME)
        }else if(currentPlace && currentPlace.id != this.currentPlace){
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
        }
        
        
        this._updateNews(news)
        this._isNeedUpdateTab() && this.setState({currentTab: this._getDefaultActiveTab()})
    }

    _isNeedUpdateTab(){
        const {user} = this.props
        let tabData = this.refs.tabs.getData()
        switch(user.isPay){
            case TRANSACTION_DISPLAY.BOTH:
                if (tabData.length == 1){
                    return true
                }
                break
            case TRANSACTION_DISPLAY.DIRECT:
                if (tabData.length == 2 || tabData[0].tabID != TRANSACTION_TYPE_DIRECT){
                    return true
                }
                break
            case TRANSACTION_DISPLAY.CLINGME: 
                if (tabData.length == 2 || tabData[0].tabID != TRANSACTION_TYPE_CLINGME){
                    return true
                }
                break
            default:
                return false
        }
        return false
    }

    
    _load(placeId, fromTime, toTime, filter = 0, page = 1, isLoadMore = false) {
        this.currentPlace = placeId
        const { xsession, getListTransaction, getListTransactionPayWithClingme, payWithClingme, payDirect, getMerchantNews } = this.props
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

        getMerchantNews(xsession, placeId,
            (err, data) => {
                if (data && data.updated && data.updated.data) {
                    let newsUpdate = data.updated.data
                    this._updateNews(newsUpdate)
                }
            }
        )
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
        const { app } = this.props
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
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.transactionId + '/' + item.transactionType)}
                    >
                        <View style={styles.block}>
                            <View style={styles.rowPadding}>
                                <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                                <Text medium bold grayDark>{item.userName}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text largeLight bold secondary style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>
                            </View>
                            <View style={styles.rowCenter}>
                                <Text medium grayDark><Text big bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                            <View style={styles.row}>
                                <Text small primary>{I18n.t('paid')}</Text>
                                <Button transparent style={styles.button} onPress={() => this.confirmTransaction(item.transactionId)}>
                                    <Text medium bold primary>{I18n.t('detail')}</Text>
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
                        onPress={() => this.props.forwardTo('transactionDetail/' + item.transactionId + '/' + item.transactionType)}
                    >
                        <View style={styles.blockConfirmed}>
                            <View style={styles.rowPadding}>
                                <Text style={styles.timestamp} small grayDark>{moment(item.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
                                <Text bold grayDark style={styles.transactionCodeClingme}>{item.transactionIdDisplay}</Text>

                            </View>
                            <View style={styles.rowPadding}>
                                <Text small grayDark>{I18n.t('customer')}: <Text small bold grayDark>{item.userName}</Text></Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Text success small>{I18n.t('confirmed')}</Text>
                                <Text grayDark><Text bold grayDark style={styles.moneyNumberClingme}>{formatNumber(item.moneyAmount)}</Text>đ</Text>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                    </ListItem>
                )
        }
    }

    _renderList() {
        const { transaction, payWithClingme, payDirect } = this.props
        
        return <ListTransaction onEndReached={this._loadMore} onRefresh={this._onRefresh}
             key='listTrans' data={this.state.currentTab == TRANSACTION_TYPE_CLINGME ? payWithClingme.listTransaction : payDirect.listTransaction} />
        
    }
    
    render() {
        console.log('Render TransactionList')
        const { forwardTo, payDirect, payWithClingme } = this.props
        if (!payDirect && !payWithClingme) {
            return (
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={material.red500} />
                    {/*<Text>Loading...</Text>*/}
                </View>
            )
        }
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
                    <TabsWithNoti tabData={this._getTabData()} activeTab={this._getDefaultActiveTab()} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <TransactionFilter onFilterChange={this._handleTransactionFilterChange.bind(this)}
                        listValue={this._getTransactionFilterValue()} ref='transactionFilter'
                    />
                    <Content
                        padder
                        onRefresh={this._onRefresh}
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