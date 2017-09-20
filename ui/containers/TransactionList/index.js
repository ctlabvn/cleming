import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Text } from "native-base";
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
import Spinner from '~/ui/components/Spinner'
import Icon from "~/ui/elements/Icon";
// import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession, getUser } from "~/store/selectors/auth";
import { getNews } from "~/store/selectors/place";
import { getListTransaction } from "~/store/selectors/transaction";
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
// import { getRouter } from '~/store/selectors/common'
@connect(state => ({
    xsession: getSession(state),
    user: getUser(state),
    currentDateFilter: state.transaction.currentDateFilter,
    transaction: state.transaction,
    meta: state.meta,
    // router: getRouter(state),
}), { ...commonAction, ...transactionAction, ...authActions, ...placeActions, ...metaActions })
export default class extends Component {
    constructor(props) {
        super(props)
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
        this.props.updateDateFilter(item.currentDateFilter)

        const { app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
            this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
        }
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
        forwardTo('transactionDetail', {id: clingmeId, type: TRANSACTION_TYPE_CLINGME})
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { app } = this.props
            let selectedPlace = app.topDropdown.getValue()
            app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            let transactionFilterComponent = this.refs.transactionFilter
            let transactionFilter = transactionFilterComponent.getCurrentValue()
            if (selectedPlace && Object.keys(selectedPlace).length > 0) {
                this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to)
            } else {
                this.isLoadingPlace = true
            }
        })

    }

    componentWillReceiveProps(nextProps){
        const { app, clearMarkLoad } = this.props
        const { meta } = nextProps
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = app.topDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        if (meta && meta[SCREEN.TRANSACTION_LIST_DIRECT]){
            console.log('Case reload tranDirect')
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
            clearMarkLoad(SCREEN.TRANSACTION_LIST_DIRECT)
        }else if(meta && meta[SCREEN.TRANSACTION_LIST_CLINGME]){
            console.log('Case reload tranClm')
            this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
            clearMarkLoad(SCREEN.TRANSACTION_LIST_CLINGME)
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const {router} = this.props
    //     if (!router || router.route != 'transactionList'){
    //         return false
    //     }
    //     return true
    // }

    componentWillFocus() {
        InteractionManager.runAfterInteractions(() => {
            const { app, meta, clearMarkLoad } = this.props
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
        })

        this.listview && this.listview.swing()
    }

    // componentWillBlur(){
    // }

    _load(placeId, fromTime, toTime, filter = 0, page = 1, isLoadMore = false) {
        this.currentPlace = placeId
        const { xsession, getListAllTransaction } = this.props
        let transactionFilterComponent = this.refs.transactionFilter
        if (isLoadMore) {
            this.spinner.show(true)
        } else {
            this.listview.showRefresh(true)
        }
        getListAllTransaction(xsession, placeId, fromTime, toTime, filter, page,
            (err, data) => {
                if (isLoadMore) {
                    this.spinner.show(false)
                } else {
                    this.listview.showRefresh(false)
                }
                if (data && data.data) {
                    transactionFilterComponent.updateIndicatorNumber(data.data.totalRecord)
                }
            }
        )

        // getMerchantNews(xsession, placeId,
        //     (err, data) => {
        //         if (data && data.updated && data.updated.data) {
        //             let newsUpdate = data.updated.data
        //             this._updateNews(newsUpdate)
        //         }
        //     }
        // )
    }
    // need care about currentPage
    _loadMore = () => {
        const { transaction, app } = this.props
        let pageNumber = transaction.pageNumber
        let totalPage = transaction.totalPage
        if (pageNumber >= totalPage) return
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = app.topDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value, pageNumber + 1, true)
    }

    _onRefresh = () => {
        console.log('On refreshing trans')
        const { app } = this.props
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        let currentPlace = app.topDropdown.getValue()
        let transactionFilter = this.refs.transactionFilter.getCurrentValue()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, transactionFilter.value)
    }

    _renderList() {
        const { transaction } = this.props
        // onScrollDown = {()=>this.filterBlock.setNativeProps({style: {width: 0, height: 0, opacity: 0}})}
        // onScrollUp = {()=>this.filterBlock.setNativeProps({style: {width: 'auto', height: 'auto', opacity: 1}})}
        return <ListTransaction onItemRef={ref=>this.listview=ref}
                onEndReached={this._loadMore} onRefresh={this._onRefresh}
                itemKey='tranId' data={transaction.listTransaction}
               />
    }

    render() {
        console.log('Render TransactionList')
        const { forwardTo,  currentDateFilter, transaction } = this.props
        // if (!payDirect && !payWithClingme) {
        //     return (
        //         <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        //             <Spinner color={material.red500} />
        //             {/*<Text>Loading...</Text>*/}
        //         </View>
        //     )
        // }
        // let noData = null
        // if (transaction.listTransaction && transaction.listTransaction.length == 0) {
        //     noData = <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}><Text small>Không có dữ liệu.</Text></View>
        // }
        // let moreData = null
        // if (transaction.pageNumber >= transaction.totalPage && transaction.totalPage > 0) {
        //     moreData = <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text small>No more data</Text></View>
        // }
        // <TabsWithNoti tabData={this._getTabData()} activeTab={this._getDefaultActiveTab()} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
        // let filterStyle= this.state.showFilter ? {width: 'auto', height: 'auto', opacity: 1} : {width: 0, height: 0, opacity: 0}
        return (
            <Container style={styles.container}>
                <View style={{ flex: 1 }}>
                  <View ref={ref => this.filterBlock=ref}>
                    <DateFilter defaultFilter={currentDateFilter}  onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <TransactionFilter onFilterChange={this._handleTransactionFilterChange.bind(this)}
                        listValue={options.transactionFilter} ref='transactionFilter'
                    />
                    <View style={{...styles.revenueBlock}}>
                      <Text grayDark>{I18n.t('confirmed_revenue')}</Text>
                      <Text medium bold primary>{formatNumber(transaction.revenueApproved)} đ</Text>
                    </View>
                    {(transaction.revenueApproved == transaction.revenueWait) && <View style={styles.linePrimary} />}
                    {(transaction.revenueApproved != transaction.revenueWait) && 
                        <View>
                            <View style={{...styles.revenueBlock, ...styles.primaryBorder}}>
                                <Text grayDark>{I18n.t('waiting_revenue')}</Text>
                                <Text medium bold warning>{formatNumber(transaction.revenueWait)} đ</Text>
                            </View>
                            <View style={styles.linePrimary} />
                        </View>
                    }
                  </View>
                        {this._renderList()}
                        <Spinner onItemRef={ref=>this.spinner=ref}
                        // color={material.red500}
                        />
                        {/*{noData}
                        {moreData}*/}


                </View>
            </Container>
        )
    }
}
