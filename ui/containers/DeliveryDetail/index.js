import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner, Container, List, ListItem, Text } from 'native-base'
import { View, Image } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import * as orderActions from '~/store/actions/order'
import * as orderSelectors from '~/store/selectors/order'
import * as authSelectors from '~/store/selectors/auth'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import Content from '~/ui/components/Content'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'
import { formatNumber } from '~/ui/shared/utils'
import moment from 'moment'

@connect(state => ({
    xsession: authSelectors.getSession(state),
    order: orderSelectors.getOrder(state),
}), orderActions)

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDetail: {}
        }
    }
    componentDidMount() {
        const { route, getOrderDetail, xsession } = this.props
        let deliveryId = route.params.id
        getOrderDetail(xsession, deliveryId,
            (err, data) => {
                this.setState({ orderDetail: data.updated })
            }
        )
    }
    componentWillFocus() {
        const { route, getOrderDetail, xsession } = this.props
        let deliveryId = route.params.id
        getOrderDetail(xsession, deliveryId,
            (err, data) => {
                if (data && data.updated) {
                    this.setState({ orderDetail: data.updated })
                }
            }
        )
    }

    render() {
        const { route } = this.props
        if (!this.state || !this.state.orderDetail || Object.keys(this.state.orderDetail).length == 0) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Spinner color='red' />
                    <Text small>Loading...</Text>
                </View>
            )
        }
        const orderDetail = this.state.orderDetail
        let totalItem = 0
        if (orderDetail.orderRowList){
            totalItem = orderDetail.orderRowList.map(x=>x.quantity).reduce((a,b)=>(a+b), 0)
        }
        console.log('Order detail instate', orderDetail)
        return (
            <Container style={styles.container}>
                <View style={{ ...styles.rowPadding, ...styles.backgroundPrimary, width: '100%', justifyContent: 'center' }}>
                    <Text white center bold>{orderDetail.orderInfo.placeInfo.address}</Text>
                </View>

                <Content padder>
                    <View style={styles.rowPadding}>
                        <Text success small>Đã thanh toán</Text>
                        <Text small>{moment(orderDetail.orderInfo.clingmeCreatedTime).format('hh:mm:ss DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Đặt hàng số</Text>
                        <Text primary>{orderDetail.orderInfo.tranId}</Text>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <View>
                        <Text small>Địa chỉ giao hàng</Text>
                        <Text bold>{orderDetail.orderInfo.fullAddress}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Người nhận</Text>
                        <Text bold>{orderDetail.orderInfo.userInfo.memberName}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Số điện thoại</Text>
                        <Text bold>{orderDetail.orderInfo.userInfo.phoneNumber}</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Yêu cầu nhận hàng trong</Text>
                        <Text bold>45'</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Yêu cầu khác</Text>
                        <Text bold>{orderDetail.orderInfo.note}</Text>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <View style={styles.rowPadding}>
                        <Text small bold>Giỏ hàng: {totalItem}</Text>
                    </View>
                    <List dataArray={orderDetail.orderRowList}
                        renderRow={(item) => (
                            <ListItem style={styles.orderItem}>
                                <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://tea-3.lozi.vn/v1/images/resized/korokke-72882-1434777201' }} />
                                <View style={{justifyContent: 'flex-start'}}>
                                    <Text small>{item.itemName}</Text>
                                    <Text small light>Số lượng: {item.quantity}</Text>
                                </View>
                                <Text bold>{item.price/1000}k</Text>
                            </ListItem>
                        )
                        }>
                    </List>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <View style={styles.rowPadding}>
                        <Text small>Tiền hàng:</Text>
                        <Text bold>{formatNumber(orderDetail.orderInfo.moneyAmount)}đ</Text>
                    </View>
                    <View style={styles.rowPadding}>
                        <Text small>Phí giao hàng:</Text>
                        <Text bold>{orderDetail.shipPriceReal > 0 ? formatNumber(orderDetail.shipPriceReal):0}đ</Text>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <View style={styles.rowPadding}>
                        <Text small>Tổng tiền thanh toán: </Text>
                        <Text bold error>{formatNumber(orderDetail.orderInfo.moneyAmount)}đ</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}