import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Button, Spinner } from 'native-base'
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
@connect(state => ({
    user: state.auth.user,
    place: state.place,
    booking: state.booking
}), { ...commonActions, ...bookingActions })
export default class PlaceOrderList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: false,
        }
    }
    _handlePressTab(item) {
        // status: 0 là lấy các booking đang chờ, status = 1 là booking đã được xác nhận

        // Chờ xác nhận 
        console.log('Press Tab', item)
        if (item.id == 1){
            this.props.getBookingList(this.props.user.xsession, '', 0, 1510374407, 0)
        }else{ // Đã xác nhận  1    
            this.props.getBookingList(this.props.user.xsession, '', 0, 1510374407, 1) 
        }
    }

    onDetailPlacePress() {
        const { forwardTo } = this.props
        forwardTo('placeOrderDetail')
    }
    componentDidMount() {
        // console.log('Place list', this.props.place)
        let placeList = this.props.place.listPlace.map(item => item.placeId).join(',')
        console.log('Place', placeList)
        this.props.getBookingList(this.props.user.xsession)
    }
    _renderBookingItem(item) {
        return (
            <View style={styles.block}>
                <Button
                    onPress={this.onDetailPlacePress.bind(this)}
                    style={styles.detailButton}>
                    <View style={styles.rowPadding}>
                        <Text primary bold>{item.orderCode}</Text>
                        <Text small style={{ color: 'black' }}>17:10 10/03/2017</Text>
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
                            <Text style={{ color: 'black' }}>2</Text>
                        </View>
                    </View>
                    <Border color='rgba(0,0,0,0.5)' size={1} />
                    <View style={{ ...styles.rowPadding }}>
                        <View style={styles.row}>
                            <Icon name='account' style={{ ...styles.icon, ...styles.iconLeft }} />
                            <Text small style={{ color: 'black' }}>{item.userInfo.memberName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='phone' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                            <Text primary>{item.userInfo.phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.rowPadding, ...styles.center }}>
                        <Text error small>Đã có 3 mã đặt chỗ được xác nhận trong khoảng thời gian này</Text>
                    </View>
                </Button>
            </View>
        )
    }
    _onRefresh = ()=>{
        console.log('On refresh')
        this.setState({ refreshing: true })
        // page: int, //page hiện tại muốn lấy,
        // pageNumber: int, //số page tối đa có thể lấy,
        // resultNumber: int, //số lượng kết quả,
        // isLast: boolean, //có phải là trang cuối cùng hay không
        this.props.getBookingList(this.props.user.xsession, ()=>{
            this.setState({refreshing: false})
        })
    }
    _loadMore = () => {
        const { booking } = this.props
        console.log('Load More', booking)
        this.setState({loading: true})
        let activeTab = this.refs.tabs.getActiveTab()
        let status = activeTab == 1 ? 0:1
        console.log('active Tab', activeTab)
        if (!booking.isLast){
            this.props.getBookingList(this.props.user.xsession, '', 0, 1510374407, status, booking.page+1, 
                ()=>this.setState({loading: false}))
        }
    }
    render() {
        const { booking } = this.props
        if (!booking) {
            return (
                <View style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='red' />
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.merchantAddress}>
                    <Text small white>33 Nguyễn Chí Thanh, Ba Đình, Hà Nội</Text>
                </View>
                <TabsWithNoti tabData={options.tabData} activeTab={1} ref='tabs' 
                    onPressTab={this._handlePressTab.bind(this)} />
                <Content
                    padder
                    onEndReached={this._loadMore} onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                >
                    <List dataArray={booking.bookingList}
                        renderRow={(item) => this._renderBookingItem(item)}
                        pageSize={10}
                    />
                    {this.state.loading && <Spinner color='red'/>}
                </Content>

            </View >
        )
    }
}