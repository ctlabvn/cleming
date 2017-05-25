import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text, Button, Content, Spinner, Radio, Input, Toast, Thumbnail } from 'native-base'
import { View, Modal, TouchableOpacity, Animated, Easing, Image, TextInput } from 'react-native'
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
import {TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT} from '~/store/constants/transaction'
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
        }
    }
    _renderStatus(status) {
        switch (status) {
            case 0:
            case 3:
                return <Text bold warning>Giao dịch chờ phê duyệt</Text>
            case 1:
                return <Text bold success>Giao dịch thành công</Text>
            case 2:
                return <Text bold error>Giao dịch bị từ chối</Text>
            default:
                return <Text bold warning>Giao dịch chờ phê duyệt</Text>
        }
    }
    _renderBottomAction(status) {
        switch (status) {
            case 0:
            case 3:
                return (<Button style={styles.feedbackButton} onPress={() => this._showReasonPopup()}><Text white>Không đồng ý</Text></Button>)
            case 5:
                return (<Button style={styles.feedbackButtonDisable} light disabled><Text>Đã ghi nhận phản hồi</Text></Button>)
            case 1:
                return (<Text small transparent>Fake success</Text>)
            case 2:
                return (<Text small error>*Hóa đơn không đúng chương trình khuyến mại</Text>)

            default:
                return (<View key='bottomBlock'></View>)
        }
    }
    _showReasonPopup = () => {
        console.log('Show reasion Popup', this.refs.feedBackDialog)
        this.refs.feedBackDialog.setModalVisible(true)
    }
    goPrevious() {
        const { xsession, transaction } = this.props
        let index=0, transactionId
        if (this.state.type == TRANSACTION_TYPE_CLINGME){
            transactionId = this.state.transactionInfo.clingmeId
            index = transaction.payWithClingme.listTransaction.findIndex(item => item.clingmeId == transactionId)
            if (index <= 0) return
            index --
            let preTrans = transaction.payWithClingme.listTransaction[index]
            this._load(preTrans.clingmeId)
        }else if(this.state.type == TRANSACTION_TYPE_DIRECT){
            transactionId = this.state.transactionInfo.dealTransactionId
            index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
            if (index <= 0) return
            index--
            let preTrans = transaction.payDirect.listTransaction[index]
            this._load(preTrans.dealTransactionId)
        }
    }

    goNext() {
        const { xsession, transaction} = this.props
        let transactionId, index=0
        if (this.state.type == TRANSACTION_TYPE_CLINGME){
            transactionId = this.state.transactionInfo.clingmeId
            index = transaction.payWithClingme.listTransaction.findIndex(item => item.clingmeId == transactionId)
            if (index >= transaction.payWithClingme.listTransaction.length-1) return
            index ++
            let nextTrans = transaction.payWithClingme.listTransaction[index]
            this._load(nextTrans.clingmeId)

        }else if(this.state.type == TRANSACTION_TYPE_DIRECT){
            transactionId = this.state.transactionInfo.dealTransactionId
            index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
            if (index >= transaction.payDirect.listTransaction.length-1) return
            index++
            let nextTrans = transaction.payDirect.listTransaction[index]
            this._load(nextTrans.dealTransactionId)
        }
    }
    componentDidMount() {
        const { xsession, listTransaction, getTransactionDetail, route, getListDenyReason } = this.props
        let transactionId = route.params.id
        let transactionType = route.params.type
        this.setState({ type: transactionType })
        this._load(transactionId)
        // No need frequently update, call one when component mount
        getListDenyReason(xsession)
    }

      // Go to Page 
    componentWillFocus() {
        const { xsession, listTransaction, getTransactionDetail, route } = this.props
        let transactionId = route.params.id
        let transactionType = route.params.type
        this.setState({ type: transactionType })
        this._load(transactionId)
    }

    _renderContent() {
        let transactionInfo = this.state.transactionInfo
        console.log('Render trans Info', transactionInfo)
        if (this.state.type == TRANSACTION_TYPE_CLINGME) {
            let payStatus
            // "transactionStatus": int,	// 1 là đã thanh toán, 2 là đã xác nhận
            if (transactionInfo.transactionStatus == 1){
                payStatus = <Text success bold>Đã thanh toán</Text>
            }else if (transactionInfo.transactionStatus == 2){
                payStatus = <Text success bold>Đã xác nhận</Text>
            }
            return (
                <View style={styles.contentRootChild}>
                    <View style={{ ...styles.blockCenter, alignSelf: 'flex-start' }}>
                        <Text style={{ alignSelf: 'flex-start' }}>{moment(transactionInfo.invoiceTime*1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
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
                            <Text bold style={{marginRight: 5}}>{transactionInfo.userName}</Text>
                            {/*<Icon name='account' style={{ color: 'lightgrey', marginLeft: 5 }} />*/}
                            <Thumbnail size={80} source={{uri: transactionInfo.avatarUrl}} />
                        </View>
                    </View>
                </View>
            )
        } else if (this.state.type == TRANSACTION_TYPE_DIRECT) {
            return (
                <Content ref='content'>
                    <FeedbackDialog ref='feedBackDialog' listValue={this.props.denyReason}
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
                            <Text small bold>{moment(transactionInfo.viewDealTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <Text small>Đánh dấu:</Text>
                            <Text small bold>{moment(transactionInfo.markTimeDeal * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <Text small>Chụp hóa đơn:</Text>
                            <Text small bold>{moment(transactionInfo.boughtTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
                        </View>

                        <View style={styles.invoiceBlock}>
                            <Text small style={styles.invoiceLabel}>Số hóa đơn: </Text>
                            <Text small style={styles.invoice}>000425</Text>
                        </View>


                        <View style={styles.borderBlock}>

                            {(transactionInfo.transactionStatus != 2) &&
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
                            <View style={{ width: '100%', backgroundColor: 'lightgrey', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    this.refs.popupPhotoView.setImage(transactionInfo.invoidImage)
                                }}>
                                    <Image source={{ uri: transactionInfo.invoidImage }} style={{ resizeMode: 'cover', width: '100%', height: 500 }} />
                                </TouchableOpacity>
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
    _load(transactionId) {
        const { xsession, transaction, getTransactionDetail, getTransactionDetailPayWithClingme, type, route } = this.props
        let transactionType = route.params.type
        if (transactionType == TRANSACTION_TYPE_CLINGME) {
            getTransactionDetailPayWithClingme(xsession, transactionId,
                (err, data) => {
                    console.log('ErrData', data)
                    if (data.updated && data.updated.data) {
                        let transInfo = data.updated.data
                        let hasNext = false, hasPrevious = false
                        if (transaction && transaction.payWithClingme) {
                            let index = transaction.payWithClingme.listTransaction.findIndex(item => item.clingmeId == transactionId)
                            console.log('Index PayWith Clm', index)
                            hasPrevious = (index == 0) ? false : true
                            hasNext = (index == transaction.payWithClingme.listTransaction.length - 1) ? false : true
                        }
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext })
                    }
                })
        } else if (transactionType == TRANSACTION_TYPE_DIRECT) {
            getTransactionDetail(xsession, transactionId,
                (err, data) => {
                    if (data.updated && data.updated.data) {
                        let transInfo = data.updated.data
                        let hasNext = false, hasPrevious = false
                        if (transaction && transaction.payDirect) {
                            let index = transaction.payDirect.listTransaction.findIndex(item => item.dealTransactionId == transactionId)
                            hasPrevious = (index == 0) ? false : true
                            hasNext = (index == transaction.payDirect.listTransaction.length - 1) ? false : true
                        }
                        this.setState({ transactionInfo: transInfo, hasPrevious: hasPrevious, hasNext: hasNext })
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

    //  "transactionStatus": int,	
    // Trạng thái của hoá đơn, 0 và 3 là đang chờ xử lý, 
    // 1 là thành công, 2 là bị từ chối

    render() {
        const { route } = this.props
        if (!this.state || !this.state.transactionInfo || Object.keys(this.state.transactionInfo).length == 0) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='red' />
                    <Text small>Loading...</Text>
                </View>
            )
        }
        let transactionInfo = this.state.transactionInfo
        console.log('Trans Info', transactionInfo)

        let btnPrev, btnNext
        if (this.state.hasPrevious) {
            btnPrev = (
                <Button dark transparent style={styles.buttonLeft}
                    onPress={() => this.goPrevious()}>
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
                <Button dark transparent style={styles.buttonRight} onPress={() => this.goNext()}>
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
                {this._renderContent()}
                <View style={styles.navigateInvoiceBlock}>
                    {btnPrev}
                    {btnNext}
                </View>
            </Container>

        )
    }
}