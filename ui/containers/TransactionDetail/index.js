import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Content, Spinner, Radio, Input } from 'native-base'
import { View, Modal, TouchableOpacity, Animated, Easing, Image, TextInput } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import * as transactionActions from '~/store/actions/transaction'
import { getSession } from '~/store/selectors/auth'
import { storeTransparent, storeFilled } from '~/assets'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    listTransaction: state.transaction.listTransaction
}), transactionActions)
export default class TransactionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactionInfo: {},
            hasNext: false,
            hasPrevious: false,
            modalVisible: false
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
            case 1:
                return (<Text small transparent>Fake success</Text>)
            case 2:
                return (<Text small error>*Hóa đơn không đúng chương trình khuyến mại</Text>)

            default:
                return (<View key='bottomBlock'></View>)
        }
    }
    _showReasonPopup = () => {
        this.setState({ modalVisible: true })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    goPrevious() {
        const { xsession, listTransaction, getTransactionDetail } = this.props
        let transactionId = this.state.transactionInfo.dealTransactionId
        let index = listTransaction.findIndex(item => item.dealTransactionId == transactionId)
        console.log('Find Index Pre', index)
        if (index <= 0) { return }
        index--
        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == listTransaction.length - 1) ? false : true
        let transaction = listTransaction[index]
        console.log('Previous trans', transaction)
        console.log('Has', hasNext + '--' + hasPrevious)
        getTransactionDetail(xsession, transaction.dealTransactionId,
            (err, data) => {
                console.log('ErrData', data)
                if (data.updated && data.updated.data) {
                    this.setState({ transactionInfo: data.updated.data, hasPrevious: hasPrevious, hasNext: hasNext })
                    this.forceUpdate()
                } else {
                    this.setState({ transactionInfo: transaction, hasPrevious: hasPrevious, hasNext: hasNext })
                    this.forceUpdate()
                }
            })
    }
    goNext() {
        const { xsession, listTransaction, getTransactionDetail } = this.props
        let transactionId = this.state.transactionInfo.dealTransactionId
        let index = listTransaction.findIndex(item => item.dealTransactionId == transactionId)
        console.log('Find Index next', index)
        if (index >= listTransaction.length - 1) { return }
        index++

        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == this.props.listTransaction.length - 1) ? false : true
        let transaction = listTransaction[index]
        console.log('Next trans', transaction)
        console.log('Has', hasNext + '--' + hasPrevious)
        getTransactionDetail(xsession, transaction.dealTransactionId,
            (err, data) => {
                console.log('ErrData', data)
                if (data.updated && data.updated.data) {
                    this.setState({ transactionInfo: data.updated.data, hasPrevious: hasPrevious, hasNext: hasNext })
                    this.forceUpdate()
                } else {
                    this.setState({ transactionInfo: transaction, hasPrevious: hasPrevious, hasNext: hasNext })
                    this.forceUpdate()
                }
            })
    }
    componentDidMount() {
        const { xsession, listTransaction, getTransactionDetail, route } = this.props
        let transactionId = route.params.id
        let index = listTransaction.findIndex(item => item.dealTransactionId == transactionId)

        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == listTransaction.length - 1) ? false : true
        getTransactionDetail(xsession, transactionId,
            (err, data) => {
                console.log('ErrData', data)
                if (data.updated && data.updated.data) {
                    this.setState({ transactionInfo: data.updated.data, hasPrevious: hasPrevious, hasNext: hasNext })
                }
            })
    }
    // Go to Page 
    componentWillFocus() {
        const { xsession, listTransaction, getTransactionDetail, route } = this.props
        let transactionId = route.params.id
        console.log('Will focus transID', transactionId)
        let index = listTransaction.findIndex(item => item.dealTransactionId == transactionId)
        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == listTransaction.length - 1) ? false : true
        getTransactionDetail(xsession, transactionId,
            (err, data) => {
                console.log('ErrData', data)
                if (data.updated && data.updated.data) {
                    this.setState({ transactionInfo: data.updated.data, hasPrevious: hasPrevious, hasNext: hasNext })
                }
            }
        )
    }

    //  "transactionStatus": int,	
    // Trạng thái của hoá đơn, 0 và 3 là đang chờ xử lý, 
    // 1 là thành công, 2 là bị từ chối

    render() {
        const { route } = this.props
        const transactionStatus = 'WAITING'
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
                    <Text small>Giao dịch trước</Text>
                </Button>
            )
        } else {
            btnPrev = (
                <Button light disabled transparent style={styles.buttonLeft}>
                    <Icon name="keyboard-arrow-left" style={{ ...styles.icon, ...styles.disabled }} />
                    <Text small>Giao dịch trước</Text>
                </Button>
            )
        }

        if (this.state.hasNext) {
            btnNext = (
                <Button dark transparent style={styles.buttonRight} onPress={() => this.goNext()}>
                    <Text small>Giao dịch sau</Text>
                    <Icon name="keyboard-arrow-right" style={styles.icon} />
                </Button>
            )
        } else {
            btnNext = (
                <Button light disabled transparent style={styles.buttonRight}>
                    <Text small>Giao dịch sau</Text>
                    <Icon name="keyboard-arrow-right" style={{ ...styles.icon, ...styles.disabled }} />
                </Button>
            )
        }
        return (
            <Content ref='content'>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.rowPadding}>
                                <Text small>Không đồng ý với giao dịch <Text small bold>{transactionInfo.dealTransactionIdDisplay}</Text></Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Radio selected={false} style={styles.marginRight} />
                                <Text>Lí do 1</Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Radio selected={true} style={styles.marginRight} />
                                <Text>Lí do 2</Text>
                            </View>
                            <View style={styles.rowPadding}>
                                <Input placeholder='Lí do khác...'
                                    style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: 'lightgrey', height: 40, fontSize: 14 }}
                                />
                            </View>
                            <View style={{ ...styles.rowPadding, justifyContent: 'flex-end', width: '100%' }}>
                                <Button transparent onPress={() => this.setModalVisible(false)}><Text light>Cancel</Text></Button>
                                <Button transparent
                                    onPress={() => this.setModalVisible(false)}
                                ><Text primary>Ok</Text></Button>
                            </View>
                        </View>
                    </View>
                </Modal>
                <PopupPhotoView ref='popupPhotoView' />
                <View style={styles.container}>
                    <View style={styles.topPart}>
                        <View style={styles.rowPadding}>
                            <Text small>{transactionInfo.placeAddress}</Text>
                        </View>
                        <View style={styles.rowPadding}>
                            <View style={styles.transactionContent}>
                                <Text small>Số giao dịch: </Text>
                                <Text small primary>{transactionInfo.dealTransactionIdDisplay}</Text>
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
                            <Text small style={styles.primary}>Thanh toán trực tiếp</Text>
                        </View>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small style={styles.userLabel}>Khách hàng:</Text>
                        <View style={styles.userContent}>
                            <Text small bold>{transactionInfo.userName}</Text>
                            {/*<Thumbnail source={{ uri: 'http://mobi.clingme.vn:8090/images/resource_image/Clingme_icon_512.png' }} style={styles.avatar} />*/}
                            <Icon style={styles.icon} name='account' />
                        </View>
                    </View>

                    <View style={styles.rowPadding}>
                        <Text small>Xem:</Text>
                        <Text small>{moment(transactionInfo.viewDealTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Đánh dấu:</Text>
                        <Text small>{moment(transactionInfo.markTimeDeal * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Chụp hóa đơn:</Text>
                        <Text small>{moment(transactionInfo.boughtTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
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

                    <View style={{ ...styles.rowPadding, ...styles.center }}>
                        {this._renderBottomAction(transactionInfo.transactionStatus)}
                    </View>
                    <View style={styles.navigateInvoiceBlock}>
                        {btnPrev}
                        {btnNext}
                    </View>
                </View>
            </Content>
        )
    }
}