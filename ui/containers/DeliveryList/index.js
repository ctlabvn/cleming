import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Thumbnail, Button, Spinner } from 'native-base'
import { View, Modal } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as orderActions from '~/store/actions/order'
import * as commonActions from '~/store/actions/common'
import * as placeActions from '~/store/actions/place'
import * as orderSelectors from '~/store/selectors/order'
import * as authSelectors from '~/store/selectors/auth'
import {getSelectedPlace} from '~/store/selectors/place'
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
import { formatPhoneNumber } from '~/ui/shared/utils'
import { ORDER_WAITING_CONFIRM, ORDER_WAITING_DELIVERY, ORDER_SUCCESS, ORDER_CANCEL, DEFAULT_TIME_FORMAT }
    from '~/store/constants/app'
@connect(state => ({
    place: state.place,
    selectedPlace: getSelectedPlace(state),
    order: orderSelectors.getOrder(state),
    session: authSelectors.getSession(state),
}), { ...orderActions, ...commonActions, ...placeActions })
// @reduxForm({ form: 'TestForm' })
export default class extends Component {

    constructor(props) {
        super(props)
        let selectedPlace
        if (props.selectedPlace && Object.keys(props.selectedPlace).length>0){
            selectedPlace = props.selectedPlace.id
        }else{
            selectedPlace = props.place.listPlace[0].id
        }
        this.state = {
            selectedPlace: selectedPlace,
            loading: false,
            loadingMore: false,
            modalOpen: false,
            phoneNumber: ''
        }

        this.selectedStatus = 0
        this.interval = 0
    }

    componentWillFocus() {
        const { order } = this.props
        let dateFilter = this.refs.dateFilter.getData(); //currentSelectValue
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
        this.setState({counting: true })
    }

    componentDidMount() {
        this.componentWillFocus()
    }

    componentWillBlur() {
        this.setState({ counting: false })
    }

    loadPage(page = 1, from_time, to_time, isLoadMore=false) {
        const { session, getOrderList, clearOrderList } = this.props
        const { selectedPlace } = this.state
        if (isLoadMore){
            this.setState({loadingMore: true})
        }else{
            clearOrderList()
            this.setState({loading: true})
        }
        getOrderList(session, selectedPlace, this.selectedStatus, page,
            from_time, to_time,
            () => this.setState({
                loading: false,
                loadingMore: false,
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
        const { setSelectedOption } = this.props
        setSelectedOption(item)
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value //currentSelectValue      
        this.setState({
            selectedPlace: item.id,
        }, () => this.loadPage(1, dateFilter.from, dateFilter.to))
    }

    _onRefresh = () => {
        let dateFilter = this.refs.dateFilter.getData()
        this.loadPage(1, dateFilter.currentSelectValue.value.from, dateFilter.currentSelectValue.value.to)
    }

    _loadMore = () => {
        if (this.state.loading || this.state.loadingMore)
            return
        const { order } = this.props
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value
        if (order.hasMore) {
            this.loadPage(order.page + 1, dateFilter.from, dateFilter.to, true)
        }
    }

    _handlePressTab = (item) => {
        this.selectedStatus = item.tabID
        let dateFilter = this.refs.dateFilter.getData().currentSelectValue.value
        this.loadPage(1, dateFilter.from, dateFilter.to)
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
                    <View style={{ ...styles.block, paddingLeft: 10, paddingRight: 10 }}>
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


        if (status === ORDER_WAITING_CONFIRM) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='order-history' style={{ ...styles.deliveryCodeWaitingConfirm, ...styles.icon }} />
                    <Text style={styles.deliveryCodeWaitingConfirm}>{orderInfo.orderCode}</Text>
                </View>
            )
        } else if (status === ORDER_WAITING_DELIVERY) {
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    <Icon name='shiping-bike2' style={{ ...styles.deliveryCodeWaitingDelivery, ...styles.icon }} />
                    <Text style={styles.deliveryCodeWaitingDelivery}>{orderInfo.orderCode}</Text>
                </View>
            )
        } else if (status == ORDER_SUCCESS){
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                    <Icon name='shiping-bike2' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />
                    <Text style={styles.deliveryCodeSuccess}>{orderInfo.orderCode}</Text>
                </View>
            )
        }else{
            statusBlock = (
                <View style={styles.deliveryCodeBlock}>
                    {/*<Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />*/}
                    <Icon name='shiping-bike2' style={{ ...styles.grey, ...styles.icon }} />
                    <Text style={styles.grey}>{orderInfo.orderCode}</Text>
                </View>
            )
        }
        const countTo = orderInfo.clingmeCreatedTime + BASE_COUNTDOWN_ORDER_MINUTE * 60
        let listItemStyle = (status!=ORDER_CANCEL) ? styles.deliveryBlock:styles.deliveryBlockCacel
        return (
            <ListItem style= {listItemStyle} key={orderInfo.clingmeId}
                onPress={() => {
                    forwardTo('deliveryDetail/' + orderInfo.orderCode)
                }
                }>
                <View style={styles.block}>
                    <View style={{ ...styles.row, width: '100%', paddingLeft: 5, paddingRight: 5 }}>
                        {statusBlock}
                        <View style={styles.row}>
                            <Text style={styles.time}>{moment(orderInfo.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                            {(status == ORDER_SUCCESS) && (
                                <Icon name='done' style={{ ...styles.deliveryCodeSuccess, ...styles.icon }} />
                            )}
                            <CircleCountdown baseMinute={BASE_COUNTDOWN_ORDER_MINUTE}
                                counting={this.state.counting}
                                countTo={countTo}
                            />
                        </View>
                    </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                {orderListBock}
                <View>
                    <View style={styles.rowLeft}><Text bold style={styles.textLeft}>Ghi chú: </Text></View>
                    <View style={styles.rowLeft}><Text style={styles.textLeft}>{orderInfo.note}</Text></View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.block}>
                    {orderInfo.userInfo &&
                        (<View style={{ ...styles.row, marginBottom: 10, marginTop: 5 }}>
                            <View style={styles.row}>
                                <Icon name='account' style={styles.icon} />
                                <Text>{orderInfo.userInfo.memberName}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name='phone' style={{ ...styles.phoneIcon, ...styles.icon }} />
                                <Text
                                    onPress={this.onModalOpen.bind(this, orderInfo.userInfo.phoneNumber)}
                                    style={styles.phoneNumber}>{formatPhoneNumber(orderInfo.userInfo.phoneNumber)}</Text>
                            </View>
                        </View>)}

                    <View style={{ ...styles.row, marginBottom: 5 }}>
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
        const { handleSubmit, submitting, place, selectedPlace } = this.props


        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))

        const { orderList } = this.props.order

        return (
            <Container style={styles.container}>
                <TopDropdown dropdownValues={dropdownValues} onSelect={this._handleChangePlace} 
                    selectedOption={selectedPlace}
                />

                <TabsWithNoti tabData={options.tabData}
                    activeTab={0} onPressTab={this._handlePressTab} />
                <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter' />
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />
                <Content
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReached={this._loadMore} onRefresh={this._onRefresh}
                    refreshing={this.state.loading}
                    style={styles.contentContainer}
                >
                    {orderList && orderList.map(item => (
                        this._renderRow(item)
                    ))}
                    {this.state.loadingMore &&
                        <Spinner />
                    }
                </Content>
            </Container>
        )
    }
}