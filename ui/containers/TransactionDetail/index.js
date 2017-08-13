import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Spinner, Text, Thumbnail } from "native-base";
import { Image, InteractionManager, TouchableWithoutFeedback, View } from "react-native";
import Icon from "~/ui/elements/Icon";
import styles from "./styles";
import moment from "moment";
import { formatNumber, getToastMessage, chainParse } from "~/ui/shared/utils";
import * as transactionActions from "~/store/actions/transaction";
import * as commonActions from "~/store/actions/common";
import * as notificationActions from "~/store/actions/notification";
import { getSession } from "~/store/selectors/auth";
import { storeFilled, storeTransparent } from "~/assets";
import PopupPhotoView from "~/ui/components/PopupPhotoView";
import FeedbackDialog from "./FeedbackDialog";
import FeedbackDialogClingme from "./FeedbackDialogClingme";
import PopupInfo from "~/ui/components/PopupInfo";
import Content from "~/ui/components/Content";
import {
    DEFAULT_TIME_FORMAT,
    FEEDBACK_CLM_TRANSACTION,
    GENERAL_ERROR_MESSAGE,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT,
    SCREEN
} from "~/store/constants/app";
import { ViewPager } from "rn-viewpager";
import material from "~/theme/variables/material";
import I18n from '~/ui/I18n'
import * as metaAction from "~/store/actions/meta"
@connect(state => ({
    xsession: getSession(state),
    transaction: state.transaction,
    denyReason: state.transaction.denyReason,
    denyReasonClm: state.transaction.denyReasonClm
}), { ...transactionActions, ...commonActions, ...notificationActions, ...metaAction })
export default class TransactionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 1,
            transactionInfo: {},
            hasNext: false,
            hasPrevious: false,
            // loading: false,
            page: 1 // Swipe effect, 3 page, mainContent in page 1, page 0 & 3 for loading
        }
        this.swiping = false
        this.confirmCounter = 0
    }

    _renderStatus(status) {
        switch (status) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK:
                return <Text medium bold warning>{I18n.t('transaction_wait_confirm')}</Text>
            case TRANSACTION_DIRECT_STATUS.SUCCESS:
                return <Text medium bold success>{I18n.t('transaction_cashback_success')}</Text>
            case TRANSACTION_DIRECT_STATUS.REJECT:
                return <Text medium bold error>{I18n.t('transaction_reject')}</Text>
            default:
                return <Text medium bold warning>{I18n.t('transaction_wait_confirm')}</Text>
        }
    }

    _renderBottomAction(transactionInfo) {
        switch (transactionInfo.transactionStatus) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK:
                return (<Button style={styles.feedbackButton} onPress={() => this._showReasonPopup()}><Text medium white>{I18n.t('transaction_complain')}</Text></Button>)
            case TRANSACTION_DIRECT_STATUS.MERCHANT_CHECKED:
                return (<Button style={styles.feedbackButtonDisable} light disabled><Text>Đã ghi nhận phản hồi</Text></Button>)
            case TRANSACTION_DIRECT_STATUS.SUCCESS:
                return (<Text medium transparent>Fake success</Text>)
            case TRANSACTION_DIRECT_STATUS.REJECT:
                return (<Text medium error>*{transactionInfo.rejectReason}</Text>)

            default:
                return (<View key='bottomBlock'></View>)
        }
    }

    _renderInvoiceBlock(transactionInfo) {
        console.log('Go to function')
        if (transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) {
            console.log('Case 1 show', transactionInfo)
            return (
                <View style={styles.invoiceBlock}>
                    <Text medium style={styles.invoiceLabel}>{I18n.t('bill_number')}: </Text>
                    <Text medium style={styles.invoice}>{transactionInfo.invoiceNumber}</Text>
                </View>)
        } else {
            console.log('Case 2 hide', transactionInfo)
            return (
                <View style={styles.invoiceBlock}>
                    <Text medium transparent style={{ ...styles.invoiceLabel, ...styles.backgroundTransparent, color: 'transparent' }}>{I18n.t('bill_number')}: </Text>
                    <Text medium transparent style={{ ...styles.invoice, ...styles.backgroundTransparent, color: 'transparent' }}>{transactionInfo.invoiceNumber}</Text>
                </View>)
        }

    }

    _showReasonPopup = () => {
        console.log('Show reasion Popup', this.refs.feedBackDialog)
        this.refs.feedbackDialog.setModalVisible(true)
    }

    _showReasonPopupClingme = () => {
        this.refs.feedbackDialogClingme.setModalVisible(true)
    }

    _confirmTransaction = () => {
        // console.log('Confirming', clingmeId)
        if (this.confirmCounter > 0) return
        this.confirmCounter ++
        const { xsession, confirmTransaction, transaction, setToast, markWillLoad } = this.props
        console.log("trans", this.state.transactionInfo)
        confirmTransaction(xsession, this.state.transactionInfo.payOfflineId,
            (err, data) => {
                this.confirmCounter = 0
                console.log('Confirm Err', err)
                console.log('Confirm Data', data)
                if (chainParse(data, ['updated', 'data', 'success'])) {
                    setToast(getToastMessage(I18n.t('confirm_success')), 'info', null, null, 3000, 'top')
                    markWillLoad(SCREEN.TRANSACTION_LIST_CLINGME)
                    this._load(this.state.transactionInfo.transactionId)
                }
            }
        )
    }

    goPrevious = () => {
        const { xsession, transaction } = this.props
        let index = 0, transactionId
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            transactionId = this.state.transactionInfo.transactionId
            index = transaction.payWithClingme.listTransaction.findIndex(item => item.transactionId == transactionId)
            if (index <= 0) return
            index--
            let preTrans = transaction.payWithClingme.listTransaction[index]
            this._load(preTrans.transactionId)
        } else if (this.state.type == TRANSACTION_TYPE_DIRECT) {
            transactionId = this.state.transactionInfo.dealTransactionId
            index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
            if (index <= 0) return
            index--
            let preTrans = transaction.payDirect.listTransaction[index]
            this._load(preTrans.dealTransactionId)
        }
    }

    goNext = () => {
        const { xsession, transaction } = this.props
        let transactionId, index = 0
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            transactionId = this.state.transactionInfo.transactionId
            index = transaction.payWithClingme.listTransaction.findIndex(item => item.transactionId == transactionId)
            if (index >= transaction.payWithClingme.listTransaction.length - 1) return
            index++
            let nextTrans = transaction.payWithClingme.listTransaction[index]
            this._load(nextTrans.transactionId)

        } else if (this.state.type == TRANSACTION_TYPE_DIRECT) {
            transactionId = this.state.transactionInfo.dealTransactionId
            index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
            if (index >= transaction.payDirect.listTransaction.length - 1) return
            index++
            let nextTrans = transaction.payDirect.listTransaction[index]
            this._load(nextTrans.dealTransactionId)
        }
    }

    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {

        const { xsession, listTransaction, getTransactionDetail, route, getListDenyReason, getDenyReasonClm, app, denyReason, denyReasonClm } = this.props
        // this._goToMiddlePage()
        let transactionId = route.params.id
        let transactionType = +route.params.type
        this.setState({ type: transactionType })
        this._load(transactionId)
        // No need frequently update, call one when component mount
        if (!denyReason || denyReason.length == 0) {
            getListDenyReason(xsession)
        }
        if (!denyReasonClm || denyReasonClm.length == 0) {
            getDenyReasonClm(xsession)
        }


        // })

    }

    // Go to Page 
    // componentWillFocus() {
        // InteractionManager.runAfterInteractions(() => {
        // const { app, denyReason, denyReasonClm, getListDenyReason, getDenyReasonClm, xsession, listTransaction, getTransactionDetail, route } = this.props
        // this.confirmCounter = 0
        // this._goToMiddlePage()
        // let transactionId = route.params.id
        // let transactionType = +route.params.type
        // this.setState({ type: transactionType })
        // this._load(transactionId)
        // if (!denyReason || denyReason.length == 0) {
        //     getListDenyReason(xsession)
        // }
        // if (!denyReasonClm || denyReasonClm.length == 0) {
        //     getDenyReasonClm(xsession)
        // }
        // })

    // }

    // componentWillBlur(){
    //     // just to clear the view
    //     // console.log('render')
    //     this.setState({ transactionInfo: {} })
    // }

    renderClingme(transactionInfo){
        let payStatus, helpBtn = null
        // "transactionStatus": int,    // 1 là đã thanh toán, 2 là đã xác nhận
        if (transactionInfo.transactionStatus == 1) {
            payStatus = <Text strong primary bold>{I18n.t('not_confirm_yet')}</Text>
            helpBtn =
                <View style={styles.rowPaddingFull}>
                    <Button transparent style={styles.feedbackClmTransaction} onPress={() => this._showReasonPopupClingme()}>
                        <View style={styles.round20}>
                            <Icon name='help' style={{ ...styles.iconButton, ...styles.primary }} />
                        </View>
                        <Text medium primary>{I18n.t('help')}</Text>
                    </Button>
                    <Button primary style={{ ...styles.confirmButton, ...styles.backgroundPrimary }}
                        onPress={()=>this._confirmTransaction()}
                    >
                        <Text medium white>{I18n.t('confirm')}</Text>
                    </Button>
                </View>
        } else if (transactionInfo.transactionStatus == 2) {
            payStatus = <Text medium success bold>{I18n.t('confirmed')}</Text>
        }

        return (
            <Content>
                <View style={styles.contentRootChild}>
                    <FeedbackDialogClingme ref='feedbackDialogClingme' listValue={this.props.denyReasonClm}
                        transactionCode={transactionInfo.transactionIdDisplay}
                        onClickYes={this._handleFeedbackClingme}
                        dealTransactionId={transactionInfo.clingmeId}
                    />
                    <View style={{ ...styles.block, alignSelf: 'flex-start' }}>
                        <Text medium style={{ alignSelf: 'flex-start' }}>{moment(transactionInfo.invoiceTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>
                    <View style={styles.blockCenter}>
                        <Text medium gray>{I18n.t('transaction_number')}</Text>
                        <Text big bold>{transactionInfo.transactionIdDisplay}</Text>
                    </View>
                    <View style={styles.blockCenter}>
                        <Text medium gray>{I18n.t('total_pay')}</Text>
                        <Text giant bold>{formatNumber(transactionInfo.moneyAmount)}</Text>
                        {payStatus}
                    </View>
                    <View style={styles.blockCenter}>
                        <Text medium gray>{I18n.t('clingme_fee')}</Text>
                        <Text largeLight bold>{formatNumber(transactionInfo.clingmeCost)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text medium>{I18n.t('customer')}</Text>
                        <View style={styles.row}>
                            <Text medium bold style={{ marginRight: 5 }}>{transactionInfo.userName}</Text>

                            {transactionInfo.avatarUrl!='' ?
                                <Thumbnail size={80} source={{ uri: transactionInfo.avatarUrl }} /> :
                                <Icon name='account' style={{ color: 'lightgrey', marginLeft: 5 }} />}
                        </View>
                    </View>
                    <View style={styles.rowCenter}>
                        {helpBtn}
                    </View>
                </View>
            </Content>
        )
    }

    renderDirect(transactionInfo){
        return (
            <Content ref='content' refreshing={true}>
                <FeedbackDialog ref='feedbackDialog' listValue={this.props.denyReason}
                    transactionCode={transactionInfo.dealTransactionIdDisplay}
                    onClickYes={this._handleFeedback}
                    dealTransactionId={transactionInfo.dealTransactionId}
                />
                <PopupPhotoView ref='popupPhotoView' />
                <View style={styles.container}>
                    <View style={styles.topPart}>
                        <View style={styles.rowPadding}>
                            <Text grayDark medium>{transactionInfo.placeAddress}</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <View style={styles.transactionContent}>
                                <Text grayDark medium>{I18n.t('transaction_number')}: </Text>
                                <Text medium primary bold>{transactionInfo.dealTransactionIdDisplay}</Text>
                            </View>
                            <Icon name="coin_mark" style={{ ...styles.icon, ...styles.success }} />
                        </View>
                    </View>
                    <View style={{ ...styles.rowPadding, justifyContent: 'center' }}>
                        {this._renderStatus(transactionInfo.transactionStatus)}
                    </View>
                    <View style={styles.rowPadding}>
                        <Text medium grayDark style={styles.paymenMethodLabel}>{I18n.t('pay_method')}:</Text>
                        <View style={styles.row}>
                            <Icon name="cash" style={{ ...styles.icon, ...styles.primary, ...styles.marginRight }} />
                            <Text medium bold style={styles.primary}>{I18n.t('method_pay_direct')}</Text>
                        </View>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text medium grayDark style={styles.userLabel}>{I18n.t('customer')}:</Text>
                        <View style={styles.userContent}>
                            <Text medium grayDark bold>{transactionInfo.userName}</Text>
                            {/*<Thumbnail source={{ uri: 'http://mobi.clingme.vn:8090/images/resource_image/Clingme_icon_512.png' }} style={styles.avatar} />*/}
                            <Icon style={{ ...styles.icon, marginLeft: 7 }} name='account' />
                        </View>
                    </View>

                    <View style={styles.rowPadding}>
                        <Text medium grayDark>{I18n.t('view')}:</Text>
                        <Text medium grayDark bold>{moment(transactionInfo.viewDealTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text medium grayDark>{I18n.t('mark')}:</Text>
                        <Text medium grayDark bold>{moment(transactionInfo.markTimeDeal * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text medium grayDark>{I18n.t('shot_bill')}:</Text>
                        <Text medium grayDark bold>{moment(transactionInfo.boughtTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>
                    {(transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) &&
                        <View style={styles.rowPadding}>
                            <Text medium grayDark>{I18n.t('export_bill')}:</Text>
                            <Text medium grayDark bold>{moment(transactionInfo.invoiceTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                        </View>
                    }

                    {(transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) &&
                        <View style={styles.invoiceBlock}>
                            <Text medium grayDark style={styles.invoiceLabel}>{I18n.t('bill_number')}: </Text>
                            <Text medium grayDark style={styles.invoice}>{transactionInfo.invoiceNumber}</Text>
                        </View>
                    }
                    <View style={styles.borderBlock}>

                        {(transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) &&
                            <View style={styles.invoiceDetailBlock}>
                                <View style={styles.rowSpaceAround}>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.textInfo}>{formatNumber(transactionInfo.originPrice)}đ</Text>
                                        <Text style={styles.labelInfo}>{I18n.t('bill_money')}</Text>
                                    </View>
                                    {/* <View style={styles.gridItem}>
                                        <Text warning style={styles.textInfo}>-{transactionInfo.salePercent}%</Text>
                                        <Text style={styles.labelInfo}>{I18n.t('discount')}</Text>
                                    </View> */}
                                </View>
                                <View style={styles.rowSpaceAround}>
                                    {/*<View style={styles.gridItem}>*/}

                                        {/*<Text success style={styles.textInfo}>{formatNumber(transactionInfo.cashbackMoney)}đ</Text>*/}
                                        {/*<Text style={styles.labelInfo}>{I18n.t('cashback_money')}</Text>*/}
                                    {/*</View>*/}
                                    <View style={styles.gridItem}>
                                        <Text primary style={styles.textInfo}>{formatNumber(transactionInfo.clingmeCost)}đ</Text>
                                        <Text style={styles.labelInfo}>{I18n.t('clingme_fee')}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        <View style={{ width: '100%', backgroundColor: material.gray300, justifyContent: 'center' }}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.refs.popupPhotoView.setImage(transactionInfo.invoidImage)
                            }}>
                                <Image source={{ uri: transactionInfo.invoidImage }} style={{ resizeMode: 'cover', width: '100%', height: 500 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ ...styles.rowPadding, ...styles.center, marginBottom: 30 }}>
                        {this._renderBottomAction(transactionInfo)}
                    </View>
                </View>
            </Content>
        )
    }

    _renderContent() {
        let transactionInfo = this.state.transactionInfo
        switch(this.state.type){
            case TRANSACTION_TYPE_CLINGME:
                return this.renderClingme(transactionInfo)
            case TRANSACTION_TYPE_DIRECT:
                return this.renderDirect(transactionInfo)            
        }
    }

    _load = (transactionId) => {
        const { xsession, transaction, getTransactionDetail, getTransactionDetailPayWithClingme, type, route, setToast, forwardTo, updateRead, goBack } = this.props
        let transactionType = route.params.type
        // this.setState({ loading: true })
        if (transactionType == TRANSACTION_TYPE_CLINGME) {
            getTransactionDetailPayWithClingme(xsession, transactionId,
                (err, data) => {
                    // this.setState({ loading: false })
                    console.log('Load payCLM', data)
                    console.log('Load payCLM', err)
                    if (err) {
                        setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                        forwardTo('merchantOverview', true)
                        return
                    }

                    if (data && data.updated && data.updated.data) {
                        let transInfo = data.updated.data
                        let hasNext = false, hasPrevious = false
                        if (transaction && transaction.payWithClingme) {
                            let index = transaction.payWithClingme.listTransaction.findIndex(item => item.transactionId == transactionId)
                            if (index != -1) {
                                hasPrevious = (index == 0) ? false : true
                                hasNext = (index == transaction.payWithClingme.listTransaction.length - 1) ? false : true
                            }
                        }
                        // console.log('Start Set State/')
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext },
                            () => {
                                this.swiping = true
                                this.refs.viewPager.setPageWithoutAnimation(this.state.page)

                            }
                        )
                    } else {
                        setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                        goBack()
                        return
                    }
                })
        } else if (transactionType == TRANSACTION_TYPE_DIRECT) {
            getTransactionDetail(xsession, transactionId,
                (err, data) => {
                    console.log('Loaded Detail', data)
                    console.log('Err', err)
                    // this.setState({ loading: false })
                    if (err) {
                        if (err.code == 1811 || err.code == 1812) {
                            setToast(getToastMessage(I18n.t('err_transaction_not_exists')), 'info', null, null, 3000, 'top')
                            forwardTo('merchantOverview', true)
                            return
                        }
                        setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                        forwardTo('merchantOverview', true)
                        return
                    }
                    if (data && data.updated && data.updated.data) {
                        let transInfo = data.updated.data
                        let hasNext = false, hasPrevious = false
                        if (transaction && transaction.payDirect) {
                            let index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
                            // console.log('Index DIRECT', index)
                            if (index != -1) {
                                hasPrevious = (index == 0) ? false : true
                                hasNext = (index == transaction.payDirect.listTransaction.length - 1) ? false : true
                            }

                        }
                        if (!transInfo.isReadCorrespond && transInfo.notifyIdCorrespond) {
                            updateRead(xsession, transInfo.notifyIdCorrespond)
                        }

                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext },
                            () => {
                                this.swiping = true
                                this.refs.viewPager.setPageWithoutAnimation(this.state.page)
                            }
                        )
                    } else {
                        setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                        goBack()
                        return
                    }
                }
            )
        }
    }

    _handleFeedback = (dealTransactionId, reasonId, note) => {
        const { xsession, sendDenyReason, setToast } = this.props
        console.log('Feedback Handle', dealTransactionId + '---' + reasonId + '----' + note)
        sendDenyReason(xsession, dealTransactionId, reasonId, note,
            (err, data) => {
                console.log('Send Deny Reason: ', data)
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    let updateTrans = Object.assign({}, this.state.transactionInfo)
                    updateTrans.transactionStatus = 5
                    this.setState({ transactionInfo: updateTrans })
                    let message = <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, marginBottom: 50 }}><Text white>Đã ghi nhận phản hồi.</Text></View>
                    setToast(message, 'info', null, null, 3000, 'bottom')
                }
            }
        )
    }

    _handleFeedbackClingme = (dealID, selectedValue, note) => {
        const { forwardTo, sendDenyReasonClm, xsession, setToast } = this.props
        sendDenyReasonClm(xsession, this.state.transactionInfo.transactionId, selectedValue, note,
            (err, data) => {
                console.log('Deny Reason CLM', data)
                if (chainParse(data, ['updated', 'data', 'success'])) {
                    setToast(getToastMessage(I18n.t('feedback_message')), 'info', null, null, 3000, 'top')
                }
            }
        )
    }

    _goToMiddlePage = () => {
        this.swiping = true
        this.refs.viewPager && this.refs.viewPager.setPageWithoutAnimation(1)
    }

    goNextViewPager() {
        this.refs.viewPager.setPage(2)
    }

    goPreviousViewPager() {
        this.refs.viewPager.setPage(0)
    }

    onSwipeViewPager(event) {
        if (this.swiping) {
            this.swiping = false
            return
        } else {
            if (event.position < this.state.page) {
                if (this.state.hasPrevious) {
                    this.goPrevious()
                } else {
                    this._goToMiddlePage()
                }

            } else if (event.position > this.state.page) {
                if (this.state.hasNext) {
                    this.goNext()
                } else {
                    this._goToMiddlePage()
                }
            }
        }

    }
    //  "transactionStatus": int,
    // Trạng thái của hoá đơn, 0 và 3 là đang chờ xử lý,
    // 1 là thành công, 2 là bị từ chối

    render() {
        console.log('Render TransactionDetail')
        const { route } = this.props
        if (!this.state || !this.state.transactionInfo || Object.keys(this.state.transactionInfo).length == 0) {
            return (
                // <LoadingModal loading={true} />
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Spinner />
                    {/*<Text>Loading...</Text>*/}
                </View>
            )
        }
        let transactionInfo = this.state.transactionInfo
        console.log('Trans Info', transactionInfo)

        let btnPrev, btnNext
        if (this.state.hasPrevious) {
            btnPrev = (
                <Button dark transparent style={styles.buttonLeft}
                    onPress={() => this.goPreviousViewPager()}>
                    <Icon name="keyboard-arrow-left" style={styles.icon} />
                    <Text medium style={styles.textPrev}>{I18n.t('prev_transaction')}</Text>
                </Button>
            )
        } else {
            btnPrev = (
                <Button light disabled transparent style={styles.buttonLeft}>
                    <Icon name="keyboard-arrow-left" style={{ ...styles.icon, ...styles.disabled }} />
                    <Text medium style={styles.textPrev}>{I18n.t('prev_transaction')}</Text>
                </Button>
            )
        }

        if (this.state.hasNext) {
            btnNext = (
                <Button dark transparent style={styles.buttonRight} onPress={() => this.goNextViewPager()}>
                    <Text medium style={styles.textNext}>{I18n.t('next_transaction')}</Text>
                    <Icon name="keyboard-arrow-right" style={styles.icon} />
                </Button>
            )
        } else {
            btnNext = (
                <Button light disabled transparent style={styles.buttonRight}>
                    <Text medium style={styles.textNext}>{I18n.t('next_transaction')}</Text>
                    <Icon name="keyboard-arrow-right" style={{ ...styles.icon, ...styles.disabled }} />
                </Button>
            )
        }
        
        return (
            <Container style={{backgroundColor: material.white500}}>
                <PopupInfo ref='popupInfo' />
                {/*<LoadingModal loading={this.state.loading} />*/}
                <ViewPager style={{ flex: 1, height: '100%' }}
                    keyboardShouldPersistTaps='always'
                    onPageSelected={(event) => this.onSwipeViewPager(event)}
                    ref='viewPager'
                    initialPage={1}
                >
                    <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Spinner />
                    </View>
                    <View>
                        {this._renderContent()}
                    </View>
                    <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Spinner />
                    </View>
                </ViewPager>
                <View style={styles.navigateInvoiceBlock}>
                    {btnPrev}
                    {btnNext}
                </View>
            </Container>

        )
    }
}