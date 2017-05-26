import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Input, Radio, Card } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as orderActions from '~/store/actions/order'
import * as commonActions from '~/store/actions/common'
import * as orderSelectors from '~/store/selectors/order'
import * as authSelectors from '~/store/selectors/auth'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import Content from '~/ui/components/Content'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'
import options from './options'
import { formatNumber } from '~/ui/shared/utils'
import { BASE_COUNTDOWN_ORDER_MINUTE } from '~/ui/shared/constants'
import CircleCountdown from '~/ui/components/CircleCountdown'
import CallModal from '~/ui/components/CallModal'
import moment from 'moment'
@connect(state => ({
    place: state.place,
    order: orderSelectors.getOrder(state),
    session: authSelectors.getSession(state),
}), { ...orderActions, ...commonActions })
// @reduxForm({ form: 'TestForm' })
export default class extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedPlace: props.place.listPlace.map(item => item.placeId).join(','),
            refreshing: false,
            loading: false,
            modalOpen: false,
            phoneNumber: ''
        }

        this.selectedStatus = 0
        this.interval = 0
    }
    _timerCallback = (beforeTime) => {
        console.log('Call _timerCallback', beforeTime)
        const now = (new Date()).getTime()
        console.log('Now', now)
        console.log('Now -Before', now-beforeTime)
        if (now - beforeTime > 2000) {
            console.log('Over 2 second')
            requestAnimationFrame(this._timerCallback)
        }
        
    }
    componentWillFocus() { 
        const { order } = this.props
        let dateFilter = this.refs.dateFilter.getData(); //currentSelectValue
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
        this.setState({refreshing: false, counting: true})
    }

    componentDidMount() {
        this.componentWillFocus()
    }

    componentWillBlur(){
        console.log('Delivery Will Blur')
        this.setState({counting: false})
    }

    loadPage(page = 1, from_time, to_time) {
        const { session, getOrderList } = this.props
        const { selectedPlace } = this.state
        getOrderList(session, selectedPlace, this.selectedStatus, page,
            from_time, to_time,
            () => this.setState({
                refreshing: false,
                loading: false,
            }))
    }
  
    onModalOpen(phoneNumber) {
        this.setState({
          modalOpen: true,
          phoneNumber: phoneNumber
        })
    }
  
    onModalClose() {
        this.setState({
          modalOpen: false
        })
    }

    _handleChangePlace = (item) => {
        let dateFilter = this.refs.dateFilter.getData() //currentSelectValue      
        this.setState({
            selectedPlace: item.id,
        }, () => this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to))
    }

    _onRefresh = () => {
        let dateFilter = this.refs.dateFilter.getData()
        this.setState({ refreshing: true })
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
    }

    _loadMore = () => {
        if (this.state.loading || this.state.refreshing)
            return
        const { order } = this.props
        let dateFilter = this.refs.dateFilter.getData()
        if (order.hasMore) {
            this.setState({ loading: true })
            this.loadPage(order.page + 1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
        }
    }

    _handlePressTab = (item) => {
        this.selectedStatus = item.tabID
        let dateFilter = this.refs.dateFilter.getData()
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
    }
    _handlePressFilter = (item) => {
        this.loadPage(1, item.currentSelectValue.value.from, item.currentSelectValue.value.to)
    }
    _renderRow({ orderInfo, orderRowList }) {
        const { forwardTo } = this.props
        var statusBlock = null;
        const status = this.selectedStatus
        var orderListBock = null
        if (orderRowList != null) {
            orderListBock = (
                <View>
                    <View style={{...styles.block, paddingLeft: 10, paddingRight: 10}}>
                        {orderRowList.map((subItem, index) =>
                            (
                                <View key={index} style={styles.row}>
                                    <Text bold>{subItem.itemName}</Text>
                                    <Text>SL: <Text bold>{subItem.quantity}</Text></Text>
                                </View>
                            )
                        )}
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                </View>
            )
        }


        if (status === 0) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='order-history' style={{ ...styles.deliveryCodeWaitingConfirm, ...styles.icon }} />
                    <Text style={styles.deliveryCodeWaitingConfirm}>{orderInfo.orderCode}</Text>
                </View>
            )
        } else if (status === 1) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='shiping-bike2' style={{ ...styles.deliveryCodeWaitingDelivery, ...styles.icon }} />
                    <Text style={styles.deliveryCodeWaitingDelivery}>{orderInfo.orderCode}</Text>
                </View>
            )
        } else {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />
                    <Text style={styles.deliveryCodeSuccess}>{orderInfo.orderCode}</Text>
                </View>
            )
        }
        const countTo = orderInfo.clingmeCreatedTime + BASE_COUNTDOWN_ORDER_MINUTE*60
        return (
            <ListItem style={styles.deliveryBlock} key={orderInfo.clingmeId}
                onPress={() => {
                    console.log('Forwarding: ', orderInfo.orderCode)
                    forwardTo('deliveryDetail/' + orderInfo.orderCode)
                }
                }>
                <View style={styles.block}>
                    <View style={{ ...styles.row, width: '100%', paddingLeft: 5, paddingRight: 5}}>
                        {statusBlock}
                        <View style={styles.row}>
                            <Text style={styles.time}>{moment(orderInfo.clingmeCreatedTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
                            <CircleCountdown baseMinute={BASE_COUNTDOWN_ORDER_MINUTE} 
                                counting={this.state.counting}
                                countTo={countTo}         
                            />
                        </View>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                {orderListBock}
                <View style={styles.block}>
                    <View style={{ ...styles.row, width: '100%', paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Ghi chú: </Text>
                        <Text>{orderInfo.note}</Text>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.block}>
                    <View style={{...styles.row, marginBottom: 5}}>
                        <View style={styles.row}>
                            <Icon name='account' style={styles.icon} />
                            <Text>{orderInfo.userInfo.memberName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='phone' style={{ ...styles.phoneIcon, ...styles.icon }} />
                            <Text
                              onPress={this.onModalOpen.bind(this, orderInfo.userInfo.phoneNumber)}
                              style={styles.phoneNumber}>{orderInfo.userInfo.phoneNumber}</Text>
                        </View>
                    </View>

                    <View style={{...styles.row, marginBottom: 5}}>
                        <Text>Địa chỉ: {orderInfo.placeInfo.address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Đã thanh toán</Text>
                        <Text bold>{formatNumber(Math.round(orderInfo.moneyAmount))}đ</Text>
                    </View>
                </View>

            </ListItem>
        )
    }

    render() {
        const { handleSubmit, submitting, place } = this.props

        let defaultSelected = {
            id: this.state.selectedPlace,
            name: "Tất cả địa điểm"
        }
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        dropdownValues = [defaultSelected, ...dropdownValues]

        const { orderList } = this.props.order


        return (
            <Container style={styles.container}>
                <TopDropdown dropdownValues={dropdownValues} onSelect={this._handleChangePlace} selectedOption={defaultSelected} />

                <TabsWithNoti tabData={options.tabData}
                    activeTab={0} onPressTab={this._handlePressTab} />
                <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter' />
                <CallModal
                  phoneNumber={this.state.phoneNumber}
                  onCloseClick={this.onModalClose.bind(this)}
                  open={this.state.modalOpen}/>
                <Content
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReached={this._loadMore} onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    style={styles.contentContainer}
                >
                    {orderList && orderList.map(item => (
                        this._renderRow(item)
                    ))}


                </Content>
            </Container>
        )
    }
}