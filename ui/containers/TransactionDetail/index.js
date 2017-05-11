import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Content } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import {formatNumber} from '~/ui/shared/utils'
@connect(state => ({
    user: state.auth.user,
    place: state.place,
    listTransaction: state.transaction.listTransaction
}))
export default class TransactionDetail extends Component {
    //  "transactionStatus": int,	
    // Trạng thái của hoá đơn, 0 và 3 là đang chờ xử lý, 
    // 1 là thành công, 2 là bị từ chối
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
    render() {
        const { route } = this.props
        let transactionId = route.params.id
        let transactionInfo = this.props.listTransaction.filter((item) => item.dealTransactionIdDisplay == transactionId)[0]
        const transactionStatus = 'WAITING'
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

                    <View style={{...styles.rowPadding, ...styles.center}}>
                        <Button light style={styles.confirmButton}>
                            <Text>Không đồng ý</Text>
                        </Button>
                    </View>

                    <View style={styles.navigateInvoiceBlock}>
                        <View style={styles.previousInvoiceBlock}>
                            <Icon name="keyboard-arrow-left" />
                            <Text small>Giao dịch trước</Text>
                        </View>
                        <View style={styles.nextInvoiceBlock}>
                            <Text small>Giao dịch sau</Text>
                            <Icon name="keyboard-arrow-right" />
                        </View>
                    </View>
                </View>
            </Content>
        )
    }
}