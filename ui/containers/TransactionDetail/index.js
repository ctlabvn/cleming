import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Content } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
export default class TransactionDetail extends Component {

    _renderStatus(status){
        switch(status){
            case 'WAITING':
                return <Text small bold warning>Chờ xử lí</Text>
            case 'SUCCESS':
                return <Text small bold success>Thành công</Text>
            case 'REJECT':
                return <Text small bold error>* Bị từ chối</Text>
            default:
                return <Text small bold warning>Chờ xử lí</Text>
        }
    }
    _renderBar(status){
        switch(status){
            case 'WAITING':
                return <View style={{...styles.barMain, ...styles.backgroundWarning}}></View>
            case 'SUCCESS':
                return <View style={{...styles.barMain, ...styles.backgroundSuccess}}></View>
            case 'REJECT':
                return <View style={{...styles.barMain, ...styles.backgroundError}}></View>
            default:
                return <View style={{...styles.barMain, ...styles.backgroundWarning}}></View>
        }
    }
    render() {
        // 'WAITING', 'SUCCESS', 'REJECT'
        const transactionStatus = 'REJECT'
        return (
            <Content>
                <View style={styles.container}>
                    <View style={styles.rowPadding}>
                        <Text small>33 Nguyễn Chí Thanh, Ba Đình, HN</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <View style={styles.transactionContent}>
                            <Text small>Số giao dịch: </Text>
                            <Text small primary>#CL12345</Text>
                        </View>
                        <Icon name="coin_mark" style={{ ...styles.icon, ...styles.success }} />
                    </View>

                    <View style={styles.rowPadding}>
                        <Text small style={styles.paymenMethodLabel}>Hình thức thanh toán:</Text>
                        <View style={styles.row}>
                            <Icon name="cash" style={{...styles.icon, ...styles.primary, ...styles.marginRight}} />
                            <Text small style={styles.primary}>Thanh toán trực tiếp</Text>
                        </View>
                    </View>

                    <View style={styles.rowPadding}>
                        <Text small style={styles.userLabel}>Khách hàng:</Text>
                        <View style={styles.userContent}>
                            <Text small bold>Username</Text>
                            {/*<Thumbnail source={{ uri: 'http://mobi.clingme.vn:8090/images/resource_image/Clingme_icon_512.png' }} style={styles.avatar} />*/}
                            <Icon style={styles.icon} name='account' />
                        </View>
                    </View>


                    <View style={styles.rowPadding}>
                        <Text small style={styles.mark}>Đánh dấu: 00:00:00 10/10/2010</Text>
                        {this._renderStatus(transactionStatus)}
                    </View>

                    <View style={styles.bar}>
                        <View style={styles.barPart}>
                            <View style={{...styles.arrowDown, ...styles.borderTopBlue}}></View>
                            <View style={{...styles.barMain, ...styles.backgroundBlue}}></View>
                            <View style={styles.barHiddenPartBottom}></View>
                        </View>
                        <View style={styles.barPart}>
                            <View style={styles.barHiddenPartTop}></View>
                            <View style={{...styles.barMain, ...styles.backgroundPrimary}}></View>
                            <View style={{...styles.arrowUp, ...styles.borderBottomPrimary}}></View>
                        </View>
                        <View style={styles.barPart}>
                            <View style={styles.barHiddenPartTop}></View>
                            {this._renderBar(transactionStatus)}
                            <View style={styles.barHiddenPartBottom}></View>
                        </View>
                    </View>


                    <View style={{...styles.rowPadding, ...styles.center}}>
                        <Text small>Xuất hóa đơn: 00:00:00 11/11/2011</Text>
                    </View>

                    <View style={styles.invoiceBlock}>
                        <Text small style={styles.invoiceLabel}>Số hóa đơn: </Text>
                        <Text small style={styles.invoice}>000425</Text>
                    </View>
                    <View style={styles.borderBlock}>
                        
                        <View style={styles.invoiceDetailBlock}>
                            <View style={styles.rowSpaceAround}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.textInfo}>666.666đ</Text>
                                    <Text style={styles.labelInfo}>Tổng tiền hóa đơn</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text warning style={styles.textInfo}>-20%</Text>
                                    <Text style={styles.labelInfo}>Tỷ lệ giảm giá</Text>
                                </View>
                            </View>
                            <View style={styles.rowSpaceAround}>
                                <View style={styles.gridItem}>
                                    <Text success style={styles.textInfo}>69.699đ</Text>
                                    <Text style={styles.labelInfo}>Tổng tiền Cashback</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text primary style={styles.textInfo}>10.111đ</Text>
                                    <Text style={styles.labelInfo}>Phí Clingme</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 200, backgroundColor: 'lightgrey' }}></View>
                        <View style={styles.row}>
                            <Text small>Mã giao hàng:</Text>
                            <Text small>0</Text>
                        </View>
                        <View style={styles.row}>
                            <Text small>Mã đặt trước:</Text>
                            <Text small bold>#FF6969</Text>
                        </View>
                    </View>
                    {transactionStatus == 'WAITING' && <View style={styles.rowPadding}>
                        <Button light style={styles.confirmButton}>
                            <Text>Không đồng ý</Text>
                        </Button>
                        <Button style={{...styles.confirmButton, ...styles.backgroundPrimary}}>
                            <Text>Đồng ý</Text>
                        </Button>
                    </View>}
                    
                    {transactionStatus == 'SUCCESS' && <View style={{...styles.rowPadding, ...styles.center}}>
                        <Text small warning>Chờ Clingme hoàn tiền</Text>
                    </View>}
                    
                    {transactionStatus == 'REJECT' && <View style={{...styles.rowPadding, ...styles.center}}>
                        <Text small error>* Hóa đơn không đúng chương trình khuyến mãi</Text>
                    </View>}

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