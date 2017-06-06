import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text, Button, Spinner, Radio, Input, Toast, Thumbnail } from 'native-base'
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback, Animated, Easing, Image, TextInput } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import * as transactionActions from '~/store/actions/transaction'
import * as commonActions from '~/store/actions/common'
import { getSession } from '~/store/selectors/auth'
import { storeTransparent, storeFilled } from '~/assets'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import FeedbackDialog from './FeedbackDialog'
import FeedbackDialogClingme from './FeedbackDialogClingme'
import PopupInfo from '~/ui/components/PopupInfo'
import LoadingModal from '~/ui/components/LoadingModal'
import Content from '~/ui/components/Content'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT, TRANSACTION_DIRECT_STATUS, 
        DEFAULT_TIME_FORMAT, FEEDBACK_CLM_TRANSACTION} from '~/store/constants/app'
import { ViewPager } from 'rn-viewpager'
import material from '~/theme/variables/material'
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    transaction: state.transaction,
    denyReason: state.transaction.denyReason
}), { ...transactionActions, ...commonActions })
export default class TransactionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 1,
            transactionInfo: {},
            hasNext: false,
            hasPrevious: false,
            loading: false,
            page: 1 // Swipe effect, 3 page, mainContent in page 1, page 0 & 3 for loading
        }
        this.swiping = false
        this.denyReasonClingme = [
            {
                reason: 'Trả thừa tiền',
                reasonId: 1
            },
            {
                reason: 'Trả thiếu tiền',
                reasonId: 2
            },
            {
                reason: 'Khác',
                reasonId: 3
            },
        ]
    }
    _renderStatus(status) {
        switch (status) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK:
                return <Text bold warning>Giao dịch chờ phê duyệt</Text>
            case TRANSACTION_DIRECT_STATUS.SUCCESS:
                return <Text bold success>Giao dịch thành công</Text>
            case TRANSACTION_DIRECT_STATUS.REJECT:
                return <Text bold error>Giao dịch bị từ chối</Text>
            default:
                return <Text bold warning>Giao dịch chờ phê duyệt</Text>
        }
    }
    _renderBottomAction(status) {
        switch (status) {
            case TRANSACTION_DIRECT_STATUS.WAITING_MERCHANT_CHECK:
                return (<Button style={styles.feedbackButton} onPress={() => this._showReasonPopup()}><Text white>Không đồng ý</Text></Button>)
            case TRANSACTION_DIRECT_STATUS.MERCHANT_CHECKED:
                return (<Button style={styles.feedbackButtonDisable} light disabled><Text>Đã ghi nhận phản hồi</Text></Button>)
            case TRANSACTION_DIRECT_STATUS.SUCCESS:
                return (<Text small transparent>Fake success</Text>)
            case TRANSACTION_DIRECT_STATUS.REJECT:
                return (<Text small error>*Hóa đơn không đúng chương trình khuyến mại</Text>)

            default:
                return (<View key='bottomBlock'></View>)
        }
    }
    _renderInvoiceBlock(transactionInfo) {
        if (transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) {
            return (
                <View style={styles.invoiceBlock}>
                    <Text small style={styles.invoiceLabel}>Số hóa đơn: </Text>
                    <Text small style={styles.invoice}>{transactionInfo.invoiceNumber}</Text>
                </View>)
        } else {
            return (
                <View style={styles.invoiceBlock}>
                    <Text small transparent style={{ ...styles.invoiceLabel, ...styles.backgroundTransparent }}>Số hóa đơn: </Text>
                    <Text small transparent style={{ ...styles.invoice, ...styles.backgroundTransparent }}>{transactionInfo.invoiceNumber}</Text>
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
        const { xsession, confirmTransaction, transaction, setToast } = this.props
        console.log("trans", transaction)
        confirmTransaction(xsession, this.state.transactionInfo.clingmeId,
            (err, data) => {
                if (data && data.updated && data.updated.data.success) {
                    let message = <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, marginBottom: 50 }}><Text white>Xác nhận thành công.</Text></View>
                    setToast(message, 'info', 3000, 'bottom')
                    // forwardTo('transactionDetail/' + clingmeId + '/' + TRANSACTION_TYPE_CLINGME)
                    this._load(this.state.transactionInfo.clingmeId)
                }
            }
        )
    }
    goPrevious = () => {
        const { xsession, transaction } = this.props
        let index = 0, transactionId
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            transactionId = this.state.transactionInfo.clingmeId
            index = transaction.payWithClingme.listTransaction.findIndex(item => item.clingmeId == transactionId)
            if (index <= 0) return
            index--
            let preTrans = transaction.payWithClingme.listTransaction[index]
            this._load(preTrans.clingmeId)
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
            transactionId = this.state.transactionInfo.clingmeId
            index = transaction.payWithClingme.listTransaction.findIndex(item => item.clingmeId == transactionId)
            if (index >= transaction.payWithClingme.listTransaction.length - 1) return
            index++
            let nextTrans = transaction.payWithClingme.listTransaction[index]
            this._load(nextTrans.clingmeId)

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
        const { xsession, listTransaction, getTransactionDetail, route, getListDenyReason } = this.props
        // this._goToMiddlePage()
        let transactionId = route.params.id
        let transactionType = route.params.type
        this.setState({ type: transactionType })
        this._load(transactionId)
        // No need frequently update, call one when component mount
        getListDenyReason(xsession)
    }

    // Go to Page 
    componentWillFocus() {
        this._goToMiddlePage()
        const { xsession, listTransaction, getTransactionDetail, route } = this.props
        let transactionId = route.params.id
        let transactionType = route.params.type
        this.setState({ type: transactionType })
        this._load(transactionId)
    }

    _renderContent() {
        let transactionInfo = this.state.transactionInfo
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            let payStatus
            // "transactionStatus": int,	// 1 là đã thanh toán, 2 là đã xác nhận
            if (transactionInfo.transactionStatus == 1) {
                payStatus = <Text success bold>Đã thanh toán</Text>
            } else if (transactionInfo.transactionStatus == 2) {
                payStatus = <Text success bold>Đã xác nhận</Text>
            }
            return (
                <View style={styles.contentRootChild}>
                    <FeedbackDialogClingme ref='feedbackDialogClingme' listValue={this.denyReasonClingme}
                        transactionCode={transactionInfo.transactionIdDisplay}
                        onClickYes={this._handleFeedbackClingme}
                        dealTransactionId={transactionInfo.clingmeId}
                    />
                    <View style={{ ...styles.blockCenter, alignSelf: 'flex-start' }}>
                        <Text style={{ alignSelf: 'flex-start' }}>{moment(transactionInfo.invoiceTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                    </View>
                    <View style={styles.blockCenter}>
                        <Text>Số đơn hàng</Text>
                        <Text bold style={{ fontSize: 24 }}>{transactionInfo.transactionIdDisplay}</Text>
                    </View>
                    <View style={styles.blockCenter}>
                        <Text>Tổng tiền thanh toán</Text>
                        <Text bold style={{ fontSize: 40 }}>{formatNumber(transactionInfo.moneyAmount)}</Text>
                        {payStatus}
                    </View>
                    <View style={styles.blockCenter}>
                        <Text bold>{transactionInfo.placeName}</Text>
                        <Text>{transactionInfo.placeAddress}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Khách hàng</Text>
                        <View style={styles.row}>
                            <Text bold style={{ marginRight: 5 }}>{transactionInfo.userName}</Text>
                            {/*<Icon name='account' style={{ color: 'lightgrey', marginLeft: 5 }} />*/}
                            <Thumbnail size={80} source={{ uri: transactionInfo.avatarUrl }} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Button dark bordered style={styles.feedbackClmTransaction} onPress={() => this._showReasonPopupClingme()}>
                            <Text>Trợ giúp</Text>
                        </Button>
                        <Button dark style={{...styles.feedbackClmTransaction, ...styles.confirmButton}} onPress={() => this._confirmTransaction()}>
                            <Text>Đồng ý</Text>
                        </Button>
                        
                    </View>
                </View>
            )
        } else if (this.state.type == TRANSACTION_TYPE_DIRECT) {
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
                                <Text small>{transactionInfo.placeAddress}</Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <View style={styles.transactionContent}>
                                    <Text small>Số giao dịch: </Text>
                                    <Text small primary bold>{transactionInfo.dealTransactionIdDisplay}</Text>
                                </View>
                                <Icon name="coin_mark" style={{ ...styles.icon, ...styles.success }} />
                            </View>
                        </View>
                        <View style={{ ...styles.rowPadding, justifyContent: 'center' }}>
                            {this._renderStatus(transactionInfo.transactionStatus)}
                        </View>
                        <View style={styles.rowPadding}>
                            <Text small style={styles.paymenMethodLabel}>Hình thức thanh toán:</Text>
                            <View style={styles.row}>
                                <Icon name="cash" style={{ ...styles.icon, ...styles.primary, ...styles.marginRight }} />
                                <Text small bold style={styles.primary}>Thanh toán trực tiếp</Text>
                            </View>
                        </View>
                        <View style={styles.rowPadding}>
                            <Text small style={styles.userLabel}>Khách hàng:</Text>
                            <View style={styles.userContent}>
                                <Text small bold>{transactionInfo.userName}</Text>
                                {/*<Thumbnail source={{ uri: 'http://mobi.clingme.vn:8090/images/resource_image/Clingme_icon_512.png' }} style={styles.avatar} />*/}
                                <Icon style={{ ...styles.icon, marginLeft: 7 }} name='account' />
                            </View>
                        </View>

                        <View style={styles.rowPadding}>
                            <Text small>Xem:</Text>
                            <Text small bold>{moment(transactionInfo.viewDealTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <Text small>Đánh dấu:</Text>
                            <Text small bold>{moment(transactionInfo.markTimeDeal * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <Text small>Chụp hóa đơn:</Text>
                            <Text small bold>{moment(transactionInfo.boughtTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                        </View>
                        {this._renderInvoiceBlock(transactionInfo)}
                        <View style={styles.borderBlock}>

                            {(transactionInfo.transactionStatus != TRANSACTION_DIRECT_STATUS.REJECT) &&
                                <View style={styles.invoiceDetailBlock}>
                                    <View style={styles.rowSpaceAround}>
                                        <View style={styles.gridItem}>
                                            <Text style={styles.textInfo}>{formatNumber(transactionInfo.originPrice)}đ</Text>
                                            <Text style={styles.labelInfo}>Tổng tiền hóa đơn</Text>
                                        </View>
                                        <View style={styles.gridItem}>
                                            <Text warning style={styles.textInfo}>-{transactionInfo.salePercent}%</Text>
                                            <Text style={styles.labelInfo}>Tỷ lệ giảm giá</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowSpaceAround}>
                                        <View style={styles.gridItem}>

                                            <Text success style={styles.textInfo}>{formatNumber(transactionInfo.cashbackMoney)}đ</Text>
                                            <Text style={styles.labelInfo}>Tổng tiền Cashback</Text>
                                        </View>
                                        <View style={styles.gridItem}>
                                            <Text primary style={styles.textInfo}>{formatNumber(transactionInfo.clingmeCost)}đ</Text>
                                            <Text style={styles.labelInfo}>Phí Clingme</Text>
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
                            {this._renderBottomAction(transactionInfo.transactionStatus)}
                        </View>
                    </View>
                </Content>
            )
        }
    }
    _load = (transactionId) => {
        const { xsession, transaction, getTransactionDetail, getTransactionDetailPayWithClingme, type, route } = this.props
        let transactionType = route.params.type
        this.setState({ loading: true })
        if (transactionType == TRANSACTION_TYPE_CLINGME) {
            getTransactionDetailPayWithClingme(xsession, transactionId,
                (err, data) => {
                    this.setState({ loading: false })
                    console.log('ErrData', data)
                    if (data && data.updated && data.updated.data) {
                        let transInfo = data.updated.data
                        let hasNext = false, hasPrevious = false
                        if (transaction && transaction.payWithClingme) {
                            let index = transaction.payWithClingme.listTransaction.findIndex(item => item.clingmeId == transactionId)
                            hasPrevious = (index == 0) ? false : true
                            hasNext = (index == transaction.payWithClingme.listTransaction.length - 1) ? false : true
                        }
                        // console.log('Start Set State/')
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext },
                            () => {
                                this.swiping = true
                                this.refs.viewPager.setPageWithoutAnimation(this.state.page)

                            }
                        )
                    }
                })
        } else if (transactionType == TRANSACTION_TYPE_DIRECT) {
            getTransactionDetail(xsession, transactionId,
                (err, data) => {
                    this.setState({ loading: false })
                    if (data && data.updated && data.updated.data) {
                        let transInfo = data.updated.data
                        let hasNext = false, hasPrevious = false
                        if (transaction && transaction.payDirect) {
                            let index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
                            hasPrevious = (index == 0) ? false : true
                            hasNext = (index == transaction.payDirect.listTransaction.length - 1) ? false : true
                        }
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext },
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
                    setToast(message, 'info', 3000, 'bottom')
                }
            }
        )
    }
    _handleFeedbackClingme = (dealID, selectedValue, note) => {
        console.log('Deal ID zzz', dealID+'---'+selectedValue+'---'+note)
        const {forwardTo} = this.props
        if (selectedValue == FEEDBACK_CLM_TRANSACTION.MISS || selectedValue == FEEDBACK_CLM_TRANSACTION.REDUNDANT){
            forwardTo('transactionInputFeedback/'+dealID+'/'+selectedValue)     
        }else{
            this.refs.popupInfo.show('Chúng tôi sẽ xử lý và thông báo kết quả trong thời gian sớm nhất.')
        }
    }
    _goToMiddlePage = () => {
        this.swiping = true
        this.refs.viewPager.setPageWithoutAnimation(1)
    }
    goNextViewPager(){
        this.refs.viewPager.setPage(2)
    }
    goPreviousViewPager(){
        this.refs.viewPager.setPage(0)
    }
    onSwipeViewPager(event) {
        if (this.swiping) {
            console.log('GO Swiping reset')
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
        const { route } = this.props
        if (!this.state || !this.state.transactionInfo || Object.keys(this.state.transactionInfo).length == 0) {
            return (
                // <LoadingModal loading={true} />
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Spinner />
                    <Text>Loading...</Text>
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
                    <Text small style={styles.textPrev}>Giao dịch trước</Text>
                </Button>
            )
        } else {
            btnPrev = (
                <Button light disabled transparent style={styles.buttonLeft}>
                    <Icon name="keyboard-arrow-left" style={{ ...styles.icon, ...styles.disabled }} />
                    <Text small style={styles.textPrev}>Giao dịch trước</Text>
                </Button>
            )
        }

        if (this.state.hasNext) {
            btnNext = (
                <Button dark transparent style={styles.buttonRight} onPress={() => this.goNextViewPager()}>
                    <Text small style={styles.textNext}>Giao dịch sau</Text>
                    <Icon name="keyboard-arrow-right" style={styles.icon} />
                </Button>
            )
        } else {
            btnNext = (
                <Button light disabled transparent style={styles.buttonRight}>
                    <Text small style={styles.textNext}>Giao dịch sau</Text>
                    <Icon name="keyboard-arrow-right" style={{ ...styles.icon, ...styles.disabled }} />
                </Button>
            )
        }
        return (
            <Container style={{ paddingBottom: 40 }}>
                <PopupInfo ref='popupInfo' />
                {/*<LoadingModal loading={this.state.loading} />*/}
                <ViewPager style={{ flex: 1 }}
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