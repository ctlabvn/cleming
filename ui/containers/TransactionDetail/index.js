import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Spinner, Text, Thumbnail, List, ListItem } from "native-base";
import { Image, InteractionManager, TouchableWithoutFeedback, View } from "react-native";
import Icon from "~/ui/elements/Icon";
import styles from "./styles";
import moment from "moment";
import { formatNumber, getToastMessage, chainParse, formatPhoneNumber } from "~/ui/shared/utils";
import * as transactionActions from "~/store/actions/transaction";
import * as commonActions from "~/store/actions/common";
import * as notificationActions from "~/store/actions/notification";
import * as orderActions from "~/store/actions/order";
import { getSession } from "~/store/selectors/auth";
import { storeFilled, storeTransparent } from "~/assets";
import PopupPhotoView from "~/ui/components/PopupPhotoView";
import FeedbackDialog from "./FeedbackDialog";
import FeedbackDialogClingme from "./FeedbackDialogClingme";
import PopupInfo from "~/ui/components/PopupInfo";
import Content from "~/ui/components/Content";
import { BASE_COUNTDOWN_ORDER_MINUTE } from "~/ui/shared/constants"
import {
    DEFAULT_TIME_FORMAT,
    TIME_FORMAT_WITHOUT_SECOND,
    FEEDBACK_CLM_TRANSACTION,
    GENERAL_ERROR_MESSAGE,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT,
    TRANSACTION_TYPE_ORDER_SUCCESS,
    SCREEN, FAST_DELIVERY
} from "~/store/constants/app";
import { ViewPager } from "rn-viewpager";
import material from "~/theme/variables/material";
import I18n from '~/ui/I18n'
import * as metaAction from "~/store/actions/meta"
import LoadingModal from "~/ui/components/LoadingModal"
@connect(state => ({
    xsession: getSession(state),
    transaction: state.transaction,
    denyReason: state.transaction.denyReason,
    denyReasonClm: state.transaction.denyReasonClm
}), { ...transactionActions, ...commonActions, ...notificationActions, ...metaAction, ...orderActions })
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
                return (
                    <View style={styles.row}>
                        <Button style={styles.confirmButton} onPress={()=>{this._handleConfirmDirectTransaction()}}>
                            <View><Text medium white>{I18n.t('confirm_2')}</Text></View>
                        </Button>
                        <Button style={styles.feedbackButton} onPress={() => this._showReasonPopup()}>
                            <View><Text medium white>{I18n.t('transaction_complain')}</Text></View>
                        </Button>
                    </View>
                )
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
        if (transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) {
            return (
                <View style={styles.invoiceBlock}>
                    <Text medium style={styles.invoiceLabel}>{I18n.t('bill_number')}: </Text>
                    <Text medium style={styles.invoice}>{transactionInfo.invoiceNumber}</Text>
                </View>)
        } else {
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
                if (chainParse(data, ['updated', 'data', 'success'])) {
                    setToast(getToastMessage(I18n.t('confirm_success')), 'info', null, null, 3000, 'top')
                    markWillLoad(SCREEN.TRANSACTION_LIST_CLINGME)
                    this._load(this.state.transactionInfo.transactionId)
                }
            }
        )
    }

    _handleConfirmDirectTransaction = () => {
        const {sendDenyReason, xsession, markWillLoad, setToast} = this.props
        this.loadingModal.show()
        sendDenyReason(xsession, this.state.transactionInfo.dealTransactionId, 0, '', 1,
            (err, data) => {
                this.loadingModal.hide()
                if (data && data.updated && data.updated.data && data.updated.data.success){
                    markWillLoad(SCREEN.TRANSACTION_LIST_DIRECT)
                    let updatedTrans = {...this.state.transactionInfo, transactionStatus: TRANSACTION_DIRECT_STATUS.SUCCESS}
                    setToast(getToastMessage(I18n.t('confirm_success')), 'info', null, null, 2000, 'top')
                    this.setState({transactionInfo: updatedTrans})
                }
            }
        )
    }

    goPrevious = () => {
        const { xsession, transaction } = this.props
        let index = 0, transactionId
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            transactionId = this.state.transactionInfo.transactionId
        } else if (this.state.type == TRANSACTION_TYPE_DIRECT) {
            transactionId = this.state.transactionInfo.dealTransactionId
        }else if (this.state.type = TRANSACTION_TYPE_ORDER_SUCCESS){
            transactionId = this.state.transactionInfo.orderInfo.clingmeId
        }
        index = transaction.listTransaction.findIndex(item => item.tranId == transactionId)
        if (index == -1){
            index = transaction.listTransaction.findIndex(item => item.posOrderId == transactionId)
        }
        if (index <= 0) return
        index--
        let preTrans = transaction.listTransaction[index]
        this.setState({ type: preTrans.tranType })
        if (preTrans.tranType == TRANSACTION_TYPE_ORDER_SUCCESS){
            this._load(preTrans.posOrderId, preTrans.tranType)
        }else{
            this._load(preTrans.tranId, preTrans.tranType)
        }
    }

    goNext = () => {
        const { xsession, transaction } = this.props
        let transactionId, index = 0
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            transactionId = this.state.transactionInfo.transactionId
        } else if (this.state.type == TRANSACTION_TYPE_DIRECT) {
            transactionId = this.state.transactionInfo.dealTransactionId
        } else if (this.state.type = TRANSACTION_TYPE_ORDER_SUCCESS){
            transactionId = this.state.transactionInfo.orderInfo.clingmeId
        }
        index = transaction.listTransaction.findIndex(item => item.tranId == transactionId)
        if (index == -1){
            index = transaction.listTransaction.findIndex(item => item.posOrderId == transactionId)
        }
        if (index >= transaction.listTransaction.length - 1) return
        index++
        let nextTrans = transaction.listTransaction[index]
        if (nextTrans.tranType == TRANSACTION_TYPE_ORDER_SUCCESS){
            this._load(nextTrans.posOrderId, nextTrans.tranType)
        }else{
            this._load(nextTrans.tranId, nextTrans.tranType)
        }
    }

    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {

        const { xsession, listTransaction, getTransactionDetail, route, getListDenyReason,
                getDenyReasonClm, app, denyReason, denyReasonClm } = this.props
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

    renderClingme(transactionInfo){
        let payStatus, helpBtn = null
        const {goBack} = this.props
        payStatus = <Text strong primary bold>{I18n.t('paid')}</Text>
        if (transactionInfo.viewNumber == 0){
          helpBtn =
              <View style={styles.rowPaddingFull}>
                  <Button transparent style={styles.feedbackClmTransaction} onPress={() => this._showReasonPopupClingme()}>
                      <View style={styles.round20}>
                          <Icon name='help' style={{ ...styles.iconButton, ...styles.primary }} />
                      </View>
                      <Text medium primary>{I18n.t('help')}</Text>
                  </Button>
                  <Button primary style={{ ...styles.confirmButton, ...styles.backgroundPrimary }}
                    onPress={()=>goBack()}
                  >
                      <Text medium white>{I18n.t('close')}</Text>
                  </Button>
              </View>
        }else{
          helpBtn =
              <View style={styles.rowCenter}>
                  <Button transparent style={styles.feedbackClmTransactionBorder} onPress={() => this._showReasonPopupClingme()}>
                      <View style={styles.round20}>
                          <Icon name='help' style={{ ...styles.iconButton, ...styles.primary }} />
                      </View>
                      <Text medium primary>{I18n.t('help')}</Text>
                  </Button>
              </View>
        }



        // "transactionStatus": int,    // 1 là đã thanh toán, 2 là đã xác nhận
        // if (transactionInfo.transactionStatus == 1) {
        //     payStatus = <Text strong primary bold>{I18n.t('not_confirm_yet')}</Text>
        //     helpBtn =
        //         <View style={styles.rowPaddingFull}>
        //             <Button transparent style={styles.feedbackClmTransaction} onPress={() => this._showReasonPopupClingme()}>
        //                 <View style={styles.round20}>
        //                     <Icon name='help' style={{ ...styles.iconButton, ...styles.primary }} />
        //                 </View>
        //                 <Text medium primary>{I18n.t('help')}</Text>
        //             </Button>
        //             <Button primary style={{ ...styles.confirmButton, ...styles.backgroundPrimary }}
        //                 onPress={()=>this._confirmTransaction()}
        //             >
        //                 <Text medium white>{I18n.t('confirm')}</Text>
        //             </Button>
        //         </View>
        // } else if (transactionInfo.transactionStatus == 2) {
        //     payStatus = <Text medium success bold>{I18n.t('confirmed')}</Text>
        // }

        return (
            <Content>
                <View style={styles.contentRootChild}>
                    <FeedbackDialogClingme ref='feedbackDialogClingme' listValue={this.props.denyReasonClm}
                        transactionCode={transactionInfo.transactionIdDisplay}
                        onClickYes={this._handleFeedbackClingme}
                        dealTransactionId={transactionInfo.transactionId}
                    />
                    <View style={{ ...styles.block, alignSelf: 'flex-start' }}>
                        <Text medium style={{ alignSelf: 'flex-start' }}>{moment(transactionInfo.invoiceTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND)}</Text>
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
    renderOrder = (transactionInfo) => {
        let rejectReason = null
        let otherRequire = chainParse(transactionInfo, ['orderInfo', 'note']);
        let otherRequireBlock = (
            <View style={{ ...styles.block, ...styles.paddingTopMedium }}>
                <Text medium grayDark>{I18n.t('other_require')}</Text>
                <Text strong bold grayDark>{chainParse(transactionInfo, ['orderInfo', 'note'])}</Text>
            </View>
        )
        let totalItem = 0
        if (transactionInfo.orderRowList) {
            totalItem = transactionInfo.orderRowList.map(x => x.quantity).reduce((a, b) => (a + b), 0)
        }
        if (transactionInfo && transactionInfo.orderInfo && transactionInfo.orderInfo.orderRejectReason
            && (transactionInfo.orderInfo.orderRejectReason.note || transactionInfo.orderInfo.orderRejectReason.reason)) {
            rejectReason = (transactionInfo.orderInfo.orderRejectReason.note || transactionInfo.orderInfo.orderRejectReason.reason)
        }
        return (
            <Content>
                <View style={styles.rowPadding}>
                        <Text success largeLight bold>{I18n.t('order_completed')}</Text>
                        <Text medium grayDark style={{ marginRight: 5, marginTop: 3 }}>
                            {moment(chainParse(transactionInfo, ['orderInfo', 'clingmeCreatedTime']) * 1000).format(DEFAULT_TIME_FORMAT)}
                        </Text>
                </View>
                <View style={styles.rowPadding}>
                    <Text medium grayDark>{I18n.t('order_number_2')}</Text>
                    <Text medium primary bold>{chainParse(transactionInfo, ['orderInfo', 'tranId'])}</Text>
                </View>
                {(chainParse(transactionInfo, ['orderInfo', 'feedback']) != null) &&
                    <View style={{ ...styles.block, ...styles.paddingTopMedium, ...styles.pd10 }}>
                        <Text medium grayDark>{I18n.t('customer_feedback')}</Text>
                        <Text medium bold grayDark>{transactionInfo.orderInfo.feedback}</Text>
                    </View>
                }
                {(rejectReason) &&
                    <View style={{ ...styles.block, ...styles.paddingTopMedium }}>
                        <Text medium grayDark>{I18n.t('failed_order_reason')}</Text>
                        <Text medium bold grayDark>{rejectReason}</Text>
                    </View>
                }
                <View style={styles.line} />
                <View style={{ ...styles.block, ...styles.pd10 }}>
                    <Text medium  grayDark>{I18n.t('deliver_address')}</Text>
                    <Text medium bold grayDark>{chainParse(transactionInfo, ['orderInfo', 'fullAddress'])}
                        {(parseFloat(chainParse(transactionInfo, ['orderInfo', 'deliveryDistance'])) > 0) &&
                            <Text medium bold grayDark> - {parseFloat(chainParse(transactionInfo, ['orderInfo', 'deliveryDistance'])).toFixed(2)} km</Text>
                        }
                    </Text>
                </View>


                <View style={styles.rowPaddingTopLarge}>
                    <Text medium grayDark>{I18n.t('receive_user')}</Text>
                    <Text strong bold grayDark>{chainParse(transactionInfo, ['orderInfo', 'userInfo', 'memberName'])}</Text>
                </View>
                <View style={styles.rowPaddingTopMedium}>
                    <Text medium grayDark>{I18n.t('phone_number')}</Text>

                    <TouchableWithoutFeedback>
                        <View style={styles.row}>
                            <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon }} />
                            <Text strong bold
                                primary>{formatPhoneNumber(chainParse(transactionInfo, ['orderInfo', 'userInfo', 'phoneNumber']))}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                    {
                        (chainParse(transactionInfo, ['orderInfo', 'enableFastDelivery']) == FAST_DELIVERY.YES) &&
                        <View style={styles.rowPaddingTopMedium}>
                            <Text medium grayDark>{I18n.t('receive_within')}</Text>
                            <Text medium bold grayDark>{BASE_COUNTDOWN_ORDER_MINUTE}'</Text>
                        </View>
                    }

                    {otherRequire != null ? otherRequireBlock : null}

                    <View style={{...styles.line, marginTop: 5}} />
                    <View style={styles.rowPadding}>
                        <Text medium bold grayDark>{I18n.t('cart')}: {totalItem}</Text>
                    </View>
                    <List
                        style={{marginBottom: 20}}
                        dataArray={transactionInfo.orderRowList}
                        renderRow={(item) => (
                            <ListItem style={styles.orderItem}>
                                <View style={styles.cartLeft}>
                                    <Image style={{ width: 60, height: 60 }} source={{ uri: item.itemImage }} />
                                    <View style={styles.cartContent}>
                                        <Text medium grayDark style={styles.textLeftFlex}>{item.itemName}</Text>
                                        <Text medium grayDark style={styles.textLeft}>{I18n.t('number_full')}: {item.quantity}</Text>
                                    </View>
                                </View>
                                <Text strong bold grayDark style={{ ...styles.itemCash }}>{item.price / 1000}k</Text>
                            </ListItem>
                        )
                        }>
                    </List>
                    <View style={{paddingBottom: 50}}>
                        <View style={styles.rowPadding}>
                            <Text medium bold grayDark>{I18n.t('money')}:</Text>
                            <Text medium bold grayDark>{formatNumber(chainParse(transactionInfo, ['orderInfo', 'price']))}đ</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <Text medium grayDark>{I18n.t('ship_fee')}:</Text>
                            <Text medium
                                grayDark>{(transactionInfo && transactionInfo.orderInfo && transactionInfo.orderInfo.shipPriceReal > 0) ? formatNumber(transactionInfo.orderInfo.shipPriceReal) : 0}đ</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.rowPadding}>
                            <Text strong bold grayDark>{I18n.t('total_pay')}: </Text>
                            <Text strong bold error>{formatNumber(chainParse(transactionInfo, ['orderInfo', 'moneyAmount']))}đ</Text>
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
            case TRANSACTION_TYPE_ORDER_SUCCESS:
                return this.renderOrder(transactionInfo)
        }
    }

    _load = (transactionId, transType) => {
        const { xsession, transaction, getTransactionDetail, getTransactionDetailPayWithClingme, type, route,
            setToast, forwardTo, updateRead, goBack, getOrderDetail, updateViewStatusPayCLM } = this.props
        let transactionType = transType || route.params.type
        // this.setState({ loading: true })
        // markAsReadOffline(transactionId)
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
                        if (transInfo.viewNumber == 0){
                          updateViewStatusPayCLM(xsession, transInfo.transactionId)
                        }
                        let hasNext = false, hasPrevious = false
                        if (transaction) {
                            let index = transaction.listTransaction.findIndex(item => item.tranId == transactionId)
                            if (index != -1) {
                                hasPrevious = (index == 0) ? false : true
                                hasNext = (index == transaction.listTransaction.length - 1) ? false : true
                            }
                        }
                        // console.log('Start Set State/')
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext, type: transactionType },
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
                        if (transaction) {
                            let index = transaction.listTransaction.findIndex(item => item.tranId == transactionId)
                            // console.log('Index DIRECT', index)
                            if (index != -1) {
                                hasPrevious = (index == 0) ? false : true
                                hasNext = (index == transaction.listTransaction.length - 1) ? false : true
                            }

                        }
                        if (!transInfo.isReadCorrespond && transInfo.notifyIdCorrespond) {
                            updateRead(xsession, transInfo.notifyIdCorrespond)
                        }

                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext, type : transactionType},
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
        }else if (transactionType == TRANSACTION_TYPE_ORDER_SUCCESS){
            getOrderDetail(xsession, transactionId,
                (err, data) => {
                    if (err) {
                        if (err.code == 1522) {
                            setToast(getToastMessage(I18n.t('err_order_not_exists')), 'info', null, null, 3000, 'top')
                            goBack()
                            return
                        }
                        setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                        goBack()
                        return
                    }
                    if (data && data.updated) {
                        let transInfo = data.updated
                        let hasNext = false, hasPrevious = false
                        if (transaction) {
                            let index = transaction.listTransaction.findIndex(item => item.posOrderId == transactionId)
                            // console.log('Index DIRECT', index)
                            if (index != -1) {
                                hasPrevious = (index == 0) ? false : true
                                hasNext = (index == transaction.listTransaction.length - 1) ? false : true
                            }
                        }
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext, type : transactionType },
                            () => {
                                this.swiping = true
                                this.refs.viewPager.setPageWithoutAnimation(this.state.page)
                            }
                        )
                    }
                }
            )
        }
    }

    _handleFeedback = (dealTransactionId, reasonId, note) => {
        const { xsession, sendDenyReason, setToast, markWillLoad } = this.props
        this.loadingModal.show()
        sendDenyReason(xsession, dealTransactionId, reasonId, note,
            (err, data) => {
                this.loadingModal.hide()
                if (data && data.updated && data.updated.data && data.updated.data.success) {
                    let updateTrans = Object.assign({}, this.state.transactionInfo)
                    updateTrans.transactionStatus = 5
                    this.setState({ transactionInfo: updateTrans })
                    setToast(getToastMessage(I18n.t('received_feedback')), 'info', null, null, 3000, 'top')
                    markWillLoad(SCREEN.TRANSACTION_LIST_DIRECT)
                }
            }
        )
    }

    _handleFeedbackClingme = (dealID, selectedValue, note) => {
        const { forwardTo, sendDenyReasonClm, xsession, setToast } = this.props
        if (selectedValue==FEEDBACK_CLM_TRANSACTION.MISS || selectedValue==FEEDBACK_CLM_TRANSACTION.REDUNDANT){
            forwardTo('transactionInputFeedback', {dealID: dealID, reasonID: selectedValue})
        }else{
            sendDenyReasonClm(xsession, this.state.transactionInfo.transactionId, selectedValue, note,
                (err, data) => {
                    console.log('Deny Reason CLM', data)
                    if (chainParse(data, ['updated', 'data', 'success'])) {
                        setToast(getToastMessage(I18n.t('feedback_message')), 'info', null, null, 3000, 'top')
                    }
                }
            )
        }
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
        if (!this.state.transactionInfo || Object.keys(this.state.transactionInfo).length == 0) {
          return (
              <View style={{
                  backgroundColor: material.white500,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
              }}>
                  <Spinner color={material.tabBarActiveTextColor} />
              </View>
          )
        }
        let transactionInfo = this.state.transactionInfo
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
                <LoadingModal text={I18n.t('processing')} ref={ref=>this.loadingModal=ref}/>
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
