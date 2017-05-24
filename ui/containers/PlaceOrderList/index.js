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
import {BASE_COUNTDOWN_BOOKING_MINUTE} from '~/ui/shared/constants'
import CircleCountdown from '~/ui/components/CircleCountdown'
import CallModal from '~/ui/components/CallModal'
import { getSession } from '~/store/selectors/auth'
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    booking: state.booking
}), { ...commonActions, ...bookingActions })
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
                    <Row style={{height: '80%'}}>
                        <Button
                          onPress={() => this.props.forwardTo('placeOrderDetail/' + item.orderCode)}
                          style={styles.listButton}>
                            <View style={styles.rowPadding}>
                                <Text primary bold>{item.orderCode}</Text>
                                <View style={styles.row}>
                                    <Text small style={{ color: 'black', marginRight: 5 }}>{moment(item.clingmeCreatedTime * 1000).format('hh:mm:ss DD/MM/YYYY')}</Text>
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
                                    <Text style={{ color: 'black' }}>{moment(item.bookDate).format('DD/MM')}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                                <View style={styles.column}>
                                    <Icon name='history' style={styles.icon} />
                                    <Text style={{ color: 'black' }}>{moment(item.bookDate).format('hh:mm')}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                                <View style={styles.column}>
                                    <Icon name='friend' style={styles.icon} />
                                    <Text style={{ color: 'black' }}>{item.numberOfPeople}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                                <View style={styles.column}>
                                    <Icon name='want-feed' style={styles.icon} />
                                    <Text style={{ color: 'black' }}>{totalQuantity}</Text>
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                        </Button>
                    </Row>
                    <Row style={{flexDirection: 'column', height: '20%'}}>
                        <View style={{ ...styles.rowPadding }}>
                            <View style={styles.row}>
                                <Icon name='account' style={{ ...styles.icon, ...styles.iconLeft }} />
                                <Text small style={{ color: 'black' }}>{item.userInfo.memberName}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name='phone' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                                <Text
                                  onPress={this.onModalOpen.bind(this, item.userInfo.phoneNumber)}
                                  primary>{item.userInfo.phoneNumber}</Text>
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
        let status = this.refs.tabs.getActiveTab() == 1 ? 0 : 1
        // page: int, //page hiện tại muốn lấy,
        // pageNumber: int, //số page tối đa có thể lấy,
        // resultNumber: int, //số lượng kết quả,
        // isLast: boolean, //có phải là trang cuối cùng hay không
        this.props.getBookingList(this.props.xsession, currentPlace.id,
            dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            status, () => this.setState({ loading: false }))
    }
    _loadMore = () => {
        const { booking } = this.props
        this.setState({ loadingMore: true })
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData()
        let status = this.refs.tabs.getActiveTab() == 1 ? 0 : 1

        if (!booking.isLast) {
            this.props.getBookingList(this.props.xsession, currentPlace.id,
                dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
                status, booking.page + 1,
                () => this.setState({ loadingMore: false }))
        }
    }
    _handlePressTab(item) {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData()
        let status = item == 1 ? 0 : 1
        this.props.getBookingList(this.props.xsession, currentPlace.id,
            dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            status, () => this.setState({ loading: false }))
    }
    _handleTopDrowpdown(item) {
        const { booking } = this.props
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData()
        let status = this.refs.tabs.getActiveTab() == 1 ? 0 : 1
        this.setState({ loading: true })
        this.props.getBookingList(this.props.xsession, item.id,
            dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            status, () => this.setState({ loading: false }))

    }
    _handlePressFilter(item) {
        const { booking } = this.props
        let currentPlace = this.refs.placeDropdown.getValue()
        let status = this.refs.tabs.getActiveTab() == 1 ? 0 : 1
        this.setState({ loading: true })
        this.props.getBookingList(this.props.xsession, currentPlace.id,
            item.currentSelectValue.value.from, item.currentSelectValue.value.to,
            status, () => this.setState({ loading: false }))
    }
    componentDidMount() {
        let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData()
        let status = this.refs.tabs.getActiveTab() == 1 ? 0 : 1
        this.setState({ loading: true, counting: true })
        this.props.getBookingList(this.props.xsession, currentPlace.id,
            dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to,
            status, () => this.setState({ loading: false }))
    }
    componentWillFocus(){
        this.setState({counting: true})
    }
    componentWillBlur(){
        this.setState({counting: false})
    }
    render() {
        const { booking, place } = this.props
        if (!booking) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='red' />
                    <Text>Loading...</Text>
                </View>
            )
        }

        // GET PLACE LIST
        let allPlace = place.listPlace.map(item => item.placeId).join(',')
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        let defaultSelected = {
            id: allPlace,
            name: "Tất cả địa điểm"
        }
        dropdownValues = [defaultSelected, ...dropdownValues]
        return (
            <View style={styles.container}>
                <TopDropdown ref='placeDropdown' dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown.bind(this)} selectedOption={defaultSelected} />
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
                        {this.state.loadingMore && <Spinner color='red' />}
                    </Content>
                </View>
                <CallModal
                  phoneNumber={this.state.phoneNumber}
                  onCloseClick={this.onModalClose.bind(this)}
                  open={this.state.modalOpen}/>
            </View >
        )
    }
}