import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Content, Spinner } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
@connect(state => ({
    user: state.auth.user,
    place: state.place,
    listTransaction: state.transaction.listTransaction
}))
export default class TransactionDetail extends Component {
    //  "transactionStatus": int,	
    // Trạng thái của hoá đơn, 0 và 3 là đang chờ xử lý, 
    // 1 là thành công, 2 là bị từ chối
    constructor(props) {
        super(props)
        this.state = {
            transactionInfo: {},
            hasNext: false,
            hasPrevious: false
        }
    }
    _renderStatus(status) {
        switch (status) {
            case (0 | 3):
                return <Text small bold warning>Clingme đã duyệt</Text>
            case 1:
                return <Text small bold success>Thành công</Text>
            case 2:
                return <Text small bold error>* Bị từ chối</Text>
            default:
                return <Text small bold warning>Chờ xử lí</Text>
        }
    }
    _renderBar(status) {
        switch (status) {
            case (0 | 3):
                return <View style={{ ...styles.barMain, ...styles.backgroundWarning }}></View>
            case 1:
                return <View style={{ ...styles.barMain, ...styles.backgroundSuccess }}></View>
            case 2:
                return <View style={{ ...styles.barMain, ...styles.backgroundError }}></View>
            default:
                return <View style={{ ...styles.barMain, ...styles.backgroundWarning }}></View>
        }
    }
    goPrevious() {
        console.log('Go previous')
        let transactionId = this.state.transactionInfo.dealTransactionIdDisplay
        console.log('Transaction ID', transactionId)
        let index = this.props.listTransaction.findIndex(item => item.dealTransactionIdDisplay == transactionId)
        if (index <= 0) { return }
        index--

        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == this.props.listTransaction.length - 1) ? false : true
        let transaction = this.props.listTransaction[index]

        this.setState({ transactionInfo: transaction, hasPrevious: hasPrevious, hasNext: hasNext })
    }
    goNext() {
        console.log('Go Next')
        let transactionId = this.state.transactionInfo.dealTransactionIdDisplay
        let index = this.props.listTransaction.findIndex(item => item.dealTransactionIdDisplay == transactionId)
        if (index >= this.props.listTransaction.length - 1) { return }
        index++

        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == this.props.listTransaction.length - 1) ? false : true
        let transaction = this.props.listTransaction[index]
        
        this.setState({ transactionInfo: transaction, hasPrevious: hasPrevious, hasNext: hasNext })
    }
    componentDidMount(){
        console.log('Will did mount')
        let transactionId = this.props.route.params.id
        let index = this.props.listTransaction.findIndex(item => item.dealTransactionIdDisplay == transactionId)
        
        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == this.props.listTransaction.length - 1) ? false : true
        let transaction = this.props.listTransaction[index]
        console.log('Transaction Set state', transaction)
        this.setState({ transactionInfo: transaction, hasPrevious: hasPrevious, hasNext: hasNext })
    }
    // Go to Page 
    componentWillReceiveProps(){
        console.log('Will receive props')
        let transactionId = this.props.route.params.id
        let index = this.props.listTransaction.findIndex(item => item.dealTransactionIdDisplay == transactionId)
        
        let hasPrevious = (index == 0) ? false : true
        let hasNext = (index == this.props.listTransaction.length - 1) ? false : true
        let transaction = this.props.listTransaction[index]
        console.log('Transaction Set state', transaction)
        this.setState({ transactionInfo: transaction, hasPrevious: hasPrevious, hasNext: hasNext })   
    }
    componentWillFocus(){
        console.log('Will Focus detail')
    }

    render() {
        const { route } = this.props
        let transactionInfo = this.state.transactionInfo
        const transactionStatus = 'WAITING'
        if (Object.keys(this.state.transactionInfo).length == 0) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='red' />
                    <Text small>Loading...</Text>
                </View>
            )
        }
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
                    <Icon name="keyboard-arrow-left" style={{...styles.icon, ...styles.disabled}} />
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
        }else{
            btnNext = (
                <Button light disabled transparent style={styles.buttonRight}>
                    <Text small>Giao dịch sau</Text>
                    <Icon name="keyboard-arrow-right" style={{...styles.icon, ...styles.disabled}} />
                </Button>
            )
        }
        return (
            <Content>
                <View style={styles.container}>
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
                        <Text small style={styles.mark}>Đánh dấu: {moment(transactionInfo).format('hh:mm:ss DD/MM/YYYY')}</Text>
                        {this._renderStatus(transactionInfo.transactionStatus)}
                    </View>

                    <View style={styles.bar}>
                        <View style={styles.barPart}>
                            <View style={{ ...styles.arrowDown, ...styles.borderTopBlue }}></View>
                            <View style={{ ...styles.barMain, ...styles.backgroundBlue }}></View>
                            <View style={styles.barHiddenPartBottom}></View>
                        </View>
                        <View style={styles.barPart}>
                            <View style={styles.barHiddenPartTop}></View>
                            <View style={{ ...styles.barMain, ...styles.backgroundPrimary }}></View>
                            <View style={{ ...styles.arrowUp, ...styles.borderBottomPrimary }}></View>
                        </View>
                        <View style={styles.barPart}>
                            <View style={styles.barHiddenPartTop}></View>
                            {this._renderBar(transactionInfo.transactionStatus)}
                            <View style={styles.barHiddenPartBottom}></View>
                        </View>
                    </View>


                    <View style={{ ...styles.rowPadding, ...styles.center }}>
                        <Text small>Xuất hóa đơn: {moment(transactionInfo.invoiceTime).format('hh:mm:ss DD/MM/YYYY')}</Text>
                    </View>

                    <View style={styles.invoiceBlock}>
                        <Text small style={styles.invoiceLabel}>Số hóa đơn: </Text>
                        <Text small style={styles.invoice}>000425</Text>
                    </View>
                    <View style={styles.borderBlock}>

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
                                    {transactionStatus == 'REJECT' ?
                                        <Text style={{ ...styles.textInfo, ...styles.lineThrough }}>{transactionInfo.cashbackMoney}đ</Text> : <Text success style={styles.textInfo}>{formatNumber(transactionInfo.cashbackMoney)}đ</Text>}
                                    <Text style={styles.labelInfo}>Tổng tiền Cashback</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    {transactionStatus == 'REJECT' ?
                                        <Text style={{ ...styles.textInfo, ...styles.lineThrough }}>{transactionInfo.clingmeCost}đ</Text> : <Text primary style={styles.textInfo}>{formatNumber(transactionInfo.clingmeCost)}đ</Text>}
                                    <Text style={styles.labelInfo}>Phí Clingme</Text>
                                </View>
                            </View>
                        </View>
                        {/*<View style={{ height: 200, backgroundColor: 'lightgrey' }}></View>
                        <View style={styles.row}>
                            <Text small>Mã giao hàng:</Text>
                            <Text small>0</Text>
                        </View>
                        <View style={styles.row}>
                            <Text small>Mã đặt trước:</Text>
                            <Text small bold>#FF6969</Text>
                        </View>*/}
                    </View>
                    {(transactionInfo.transactionStatus == 0 || transactionInfo.transactionStatus == 3) && <View style={styles.rowPadding}>
                        <Button light style={styles.confirmButton}>
                            <Text>Không đồng ý</Text>
                        </Button>
                    </View>}

                    <View style={{ ...styles.rowPadding, ...styles.center }}>
                        <Button light style={styles.confirmButton}>
                            <Text>Không đồng ý</Text>
                        </Button>
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