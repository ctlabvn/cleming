import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Button, Spinner, Grid, Row, Col } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import * as commonActions from '~/store/actions/common'
import * as bookingActions from '~/store/actions/booking'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import Content from '~/ui/components/Content'
import options from './options'
import { BASE_COUNTDOWN_BOOKING_MINUTE } from '~/ui/shared/constants'
import CircleCountdown from '~/ui/components/CircleCountdown'
import CallModal from '~/ui/components/CallModal'
import { getSession } from '~/store/selectors/auth'
import { formatPhoneNumber } from '~/ui/shared/utils'
import { BOOKING_WAITING_CONFIRM, BOOKING_CONFIRMED, BOOKING_CANCEL } from '~/store/constants/app'
import material from '~/theme/variables/material.js'
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    booking: state.booking,
    modal: state.modal.modal
}), { ...commonActions, ...bookingActions }, null, { withRef: true })
export default class PlaceOrderList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadingMore: false,
            loading: false,
            counting: true,
            modalOpen: false,
            phoneNumber: ''
        }
    }

    onDetailPlacePress() {
        const { forwardTo } = this.props
        forwardTo('placeOrderDetail')
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

    _renderBookingItem(item) {
        let totalQuantity = item.orderRowList ? item.orderRowList.map(x => x.quantity).reduce((a, b) => a + b, 0) : 0
        return (

            <ListItem style={styles.listItem}>
                <Grid>
                    <Row style={{ height: '70%' }}>
                        <Button
                            onPress={() => this.props.forwardTo('placeOrderDetail/' + item.orderCode)}
                            style={styles.listButton}>
                            <View style={styles.rowPadding}>
                                <Text primary bold>#{item.orderCode}</Text>
                                <View style={styles.row}>
                                    <Text small style={{ color: material.black500, marginRight: 5 }}>{moment(item.clingmeCreatedTime * 1000).format('hh:mm:ss   DD/MM/YYYY')}</Text>
                                    <CircleCountdown baseMinute={BASE_COUNTDOWN_BOOKING_MINUTE}
                                        counting={this.state.counting}
                                        countTo={item.bookDate}
                                    />
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Icon name='calendar' style={styles.icon} />
                                    <Text style={{ ...styles.labelUnderImage }}>{moment(item.bookDate).format('DD/MM')}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                                <View style={styles.column}>
                                    <Icon name='history' style={styles.icon} />
                                    <Text style={{ ...styles.labelUnderImage }}>{moment(item.bookDate).format('hh:mm')}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                                <View style={styles.column}>
                                    <Icon name='friend' style={styles.icon} />
                                    <Text style={{ ...styles.labelUnderImage }}>{item.numberOfPeople}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                                <View style={styles.column}>
                                    <Icon name='want-feed' style={styles.icon} />
                                    <Text style={{ ...styles.labelUnderImage }}>{totalQuantity}</Text>
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                        </Button>
                    </Row>
                    <Row style={{ flexDirection: 'column', height: '30%' }}>
                        <View style={{ ...styles.rowPadding }}>
                            <View style={styles.row}>
                                <Icon name='account' style={{ ...styles.icon, ...styles.iconLeft }} />
                                <Text small style={{ color: material.black500 }}>{item.userInfo.memberName}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name='phone' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                                <Text
                                    onPress={this.onModalOpen.bind(this, item.userInfo.phoneNumber)}
                                    primary>{formatPhoneNumber(item.userInfo.phoneNumber)}</Text>
                            </View>
                        </View>
                    </Row>
                </Grid>
            </ListItem >
        )
    }
    _onRefresh = () => {
        this.setState({ loading: true })
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData()
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
    }
    _loadMore = () => {
        const { booking } = this.props
        if (booking.isLast) return
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to,
            this.refs.tabs.getActiveTab(), true, booking.page + 1)
    }
    _handlePressTab(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, item.tabID)
    }

    _handleTopDrowpdown(item) {
        const { booking } = this.props
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._load(item.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())

    }
    _handlePressFilter(item) {
        const { booking } = this.props
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
    }

    // page: int, //page hiện tại muốn lấy,
    // pageNumber: int, //số page tối đa có thể lấy,
    // resultNumber: int, //số lượng kết quả,
    // isLast: boolean, //có phải là trang cuối cùng hay không
    _load(placeId, fromTime, toTime, status, isLoadMore = false, page = 0) {
        const { xsession } = this.props
        if (isLoadMore) {
            this.setState({ loadingMore: true })
        } else {
            this.setState({ loading: true })
        }
        this.props.getBookingList(this.props.xsession, placeId,
            fromTime, toTime, status, page,
            (err, data) => {
                this.setState({ loading: false, loadingMore: false })
                if (data && data.updated && data.updated.resultNumber) {
                    this.refs.tabs.updateNumber(this.refs.tabs.getActiveTab(), data.updated.resultNumber)
                }
            }
        )
    }
    componentDidMount() {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this.setState({ counting: true })
        this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
    }
    componentWillFocus() {
        this.setState({ counting: true })
    }
    componentWillBlur() {
        this.setState({ counting: false })
    }
    render() {
        const { booking, place } = this.props
        if (!booking) {
            return (
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={material.red500} />
                    <Text>Loading...</Text>
                </View>
            )
        }

        // GET PLACE LIST
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))

        return (
            <View style={styles.container}>
                <TopDropdown
                    modalOpen={this.props.modal}
                    ref='placeDropdown'
                    dropdownValues={dropdownValues}
                    onSelect={this._handleTopDrowpdown.bind(this)} />
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />
                <View style={{ marginTop: 50, height: '100%' }}>
                    {/*<View style={styles.merchantAddress}>
                    <Text small white>33 Nguyễn Chí Thanh, Ba Đình, Hà Nội</Text>
                </View>*/}
                    <TabsWithNoti tabData={options.tabData} activeTab={1} ref='tabs'
                        onPressTab={this._handlePressTab.bind(this)} />
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                    <Content
                        padder
                        onEndReached={this._loadMore} onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                    >
                        <List dataArray={booking.bookingList}
                            renderRow={(item) => this._renderBookingItem(item)}
                            pageSize={10}
                        />
                        {this.state.loadingMore && <Spinner color={material.red500} />}
                    </Content>
                </View>
            </View >
        )
    }
}