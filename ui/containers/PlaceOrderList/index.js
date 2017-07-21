import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Grid, List, ListItem, Row, Spinner, Text} from "native-base";
import {InteractionManager, View} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonActions from "~/store/actions/common";
import * as bookingActions from "~/store/actions/booking";
import * as placeActions from "~/store/actions/place";
import * as metaActions from "~/store/actions/meta";
import {InputField} from "~/ui/elements/Form";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import Content from "~/ui/components/Content";
import options from "./options";
import {BASE_COUNTDOWN_BOOKING_MINUTE} from "~/ui/shared/constants";
import CircleCountdown from "~/ui/components/CircleCountdown";
import CallModal from "~/ui/components/CallModal";
import {getSession} from "~/store/selectors/auth";
import {getNews} from "~/store/selectors/place";
import {formatPhoneNumber, chainParse} from "~/ui/shared/utils";
import {
    BOOKING_CANCEL,
    BOOKING_CONFIRMED,
    BOOKING_WAITING_CONFIRM,
    DAY_WITHOUT_YEAR,
    DEFAULT_DATE_FORMAT,
    DEFAULT_HOUR_FORMAT,
    DEFAULT_TIME_FORMAT,
    SCREEN
} from "~/store/constants/app";
import material from "~/theme/variables/material.js";
@connect(state => ({
    xsession: getSession(state),
    booking: state.booking,
    modal: state.modal.modal,
    news: getNews(state),
    meta: state.meta
}), { ...commonActions, ...bookingActions, ...placeActions, ...metaActions }, null, { withRef: true })
export default class PlaceOrderList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadingMore: false,
            loading: false,
            modalOpen: false,
            phoneNumber: '',
            counting: true
        }
        this.isLoadingPlace = false
        this.selectTab = BOOKING_WAITING_CONFIRM
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
        let orderCodeBlock, phoneNumberBlock, listItemStyle = styles.listItem, listButtonStyle = styles.listButton

        let minute = item.deliveryMinute < 10 ? '0'.concat(item.deliveryMinute) : item.deliveryMinute
        let hourMinute = item.deliveryHour + ':' + minute
        let bookTimeStr = hourMinute + ':00' + ' ' + moment(item.bookDate * 1000).format(DEFAULT_DATE_FORMAT)
        let bookTime = moment(bookTimeStr, DEFAULT_TIME_FORMAT).unix()
        switch (item.status){
            case 'WAIT_CONFIRMED':
                orderCodeBlock = (<View style={styles.row}>
                    <Icon name='calendar-checked' style={{ ...styles.icon, ...styles.warning, ...styles.iconLeft }} />
                    <Text medium warning bold>{item.bookingClmCode}</Text>
                </View >)
                phoneNumberBlock = (<View style={styles.row}>
                    <Icon name='phone' style={{ ...styles.icon, ...styles.warning, ...styles.iconLeft }} />
                    <Text medium
                        onPress={this.onModalOpen.bind(this, chainParse(item, ['userInfo', 'phoneNumber']))}
                        warning>{formatPhoneNumber(chainParse(item, ['userInfo', 'phoneNumber']))}</Text>
                </View>)
                break
            case 'CONFIRMED':
                orderCodeBlock = (<View style={styles.row}>
                    <Icon name='calendar-checked' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                    <Text medium primary bold>{item.bookingClmCode}</Text>
                </View >)
                phoneNumberBlock = (<View style={styles.row}>
                    <Icon name='phone' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                    <Text medium
                        onPress={this.onModalOpen.bind(this, chainParse(item, ['userInfo', 'phoneNumber']))}
                        primary>{formatPhoneNumber(chainParse(item, ['userInfo', 'phoneNumber']))}</Text>
                </View>)
                break
            case 'CANCELLED':
                orderCodeBlock = (<View style={styles.row}>
                    <Icon name='calendar-checked' style={{ ...styles.icon, ...styles.gray, ...styles.iconLeft }} />
                    <Text medium bold style={styles.gray}>{item.bookingClmCode}</Text>
                </View >)
                phoneNumberBlock = (<View style={styles.row}>
                    <Icon name='phone' style={{ ...styles.icon, ...styles.gray, ...styles.iconLeft }} />
                    <Text medium
                        onPress={this.onModalOpen.bind(this, chainParse(item, ['userInfo', 'phoneNumber']))}
                        style={styles.gray}>{formatPhoneNumber(chainParse(item, ['userInfo', 'phoneNumber']))}</Text>
                </View>)
                listItemStyle = { ...listItemStyle, ...styles.listItemGray }
                listButtonStyle = { ...listButtonStyle, ...styles.listItemGray }
                break
        }

        return (

            <ListItem style={listItemStyle}>
                <Grid>
                    <Row style={{ height: '70%' }}>
                        <Button
                            onPress={() => this.props.forwardTo('placeOrderDetail/' + item.orderCode)}
                            style={listButtonStyle}>
                            <View style={styles.rowPadding}>
                                {orderCodeBlock}
                                <View style={styles.rowCenter}>
                                    <Text small grayDark style={{ marginRight: 5 }}>{moment(item.clingmeCreatedTime * 1000).format(DEFAULT_TIME_FORMAT)}</Text>
                                    {item.status == 'WAIT_CONFIRMED' && <CircleCountdown baseMinute={BASE_COUNTDOWN_BOOKING_MINUTE}
                                        counting={this.state.counting}
                                        countTo={bookTime}
                                    />}
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Icon name='calendar' style={styles.icon} />
                                    <Text medium grayDark style={{ ...styles.labelUnderImage }}>{moment(item.bookDate * 1000).format(DAY_WITHOUT_YEAR)}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                                <View style={styles.column}>
                                    <Icon name='history' style={styles.icon} />
                                    <Text medium grayDark style={{ ...styles.labelUnderImage }}>{hourMinute}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                                <View style={styles.column}>
                                    <Icon name='friend' style={styles.icon} />
                                    <Text medium grayDark style={{ ...styles.labelUnderImage }}>{item.numberOfPeople}</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} num={12} />
                                <View style={styles.column}>
                                    <Icon name='want-feed' style={styles.icon} />
                                    <Text medium grayDark style={{ ...styles.labelUnderImage }}>{totalQuantity}</Text>
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                        </Button>
                    </Row>
                    <Row style={{ flexDirection: 'column', height: '30%' }}>
                        <View style={{ ...styles.rowPadding }}>
                            <View style={styles.row}>
                                <Icon name='account' style={{ ...styles.icon, ...styles.iconLeft }} />
                                <Text grayDark medium>{chainParse(item, ['userInfo', 'memberName'])}</Text>
                            </View>
                            {phoneNumberBlock}
                        </View>
                    </Row>
                </Grid>
            </ListItem >
        )
    }

    _onRefresh = () => {
        this.setState({ loading: true })
        let { app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        // let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
            this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
        }
    }

    _loadMore = () => {
        const { booking, app } = this.props
        if (booking.isLast) return
        // let currentPlace = this.refs.placeDropdown.getValue()
        let selectedPlace = app.topDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to,
            this.refs.tabs.getActiveTab(), true, booking.page + 1)

    }
    _handlePressTab = (item) => {
        const { app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        this.selectTab = item.tabID
        // let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
            this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, item.tabID)
        }

    }

    _handleTopDrowpdown = (item) => {
        const { booking, xsession, forwardTo } = this.props
        // setSelectedOption(item)
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._load(item.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
    }
    _handlePressFilter(item) {
        const { booking, app } = this.props
        let selectedPlace = app.topDropdown.getValue()
        // let currentPlace = this.refs.placeDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        if (selectedPlace && Object.keys(selectedPlace).length > 0) {
            this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
        }

    }

    // page: int, //page hiện tại muốn lấy,
    // pageNumber: int, //số page tối đa có thể lấy,
    // resultNumber: int, //số lượng kết quả,
    // isLast: boolean, //có phải là trang cuối cùng hay không
    _load(placeId, fromTime, toTime, status, isLoadMore = false, page = 0) {
        const { xsession, clearBookingList, getMerchantNews } = this.props
        if (isLoadMore) {
            this.setState({ loadingMore: true })
        } else {
            // clearBookingList()
            this.setState({ loading: true })
        }
        this.props.getBookingList(this.props.xsession, placeId,
            fromTime, toTime, status, page,
            (err, data) => {
                console.log('Load Order', data)
                this.setState({ loading: false, loadingMore: false })
            }
        )
        getMerchantNews(xsession, placeId,
            (err, data) => {
                if (data && data.updated && data.updated.data) {
                    let newsUpdate = data.updated.data
                    if (newsUpdate.bookingNews < 0) {
                        forwardTo('merchantOverview', true)
                        return
                    }
                    newsUpdate && this.refs.tabs.updateNumber(BOOKING_WAITING_CONFIRM, newsUpdate.bookingNews)
                }
            }
        )
    }
    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
            const { app, news } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
            selectedPlace = app.topDropdown.getValue()

            // let currentPlace = this.refs.placeDropdown.getValue()
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            // this.counting = true
            if (selectedPlace && Object.keys(selectedPlace).length > 0) {
                this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
            } else {
                this.isLoadingPlace = true
            }
            if (news && news.bookingNews) {
                this.refs.tabs.updateNumber(BOOKING_WAITING_CONFIRM, news.bookingNews)
            }
        // })
    }
    componentWillFocus() {
        const { app, news, clearMarkLoad, meta } = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleTopDrowpdown)
        this.setState({ counting: true })
        if (news && news.bookingNews) {
            this.refs.tabs.updateNumber(BOOKING_WAITING_CONFIRM, news.bookingNews)
        }
        if (meta && meta[SCREEN.BOOKING_LIST]){
            console.log('Markload booking')
            let selectedPlace = app.topDropdown.getValue()
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            if (selectedPlace && Object.keys(selectedPlace).length > 0) {
                this._load(selectedPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
            }
            clearMarkLoad(SCREEN.BOOKING_LIST)
        }
    }
    componentWillBlur() {
        // InteractionManager.runAfterInteractions(() => {
            this.setState({ counting: false })
        // })
    }
    
    // componentWillReceiveProps(nextProps) {
    //     if (this.isLoadingPlace && nextProps.place && nextProps.place.listPlace) {
    //         this.isLoadingPlace = false
    //         let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
    //         let currentPlace = nextProps.place.listPlace.map(item => ({
    //             id: item.placeId,
    //             name: item.address
    //         }))[0]
    //         this._load(currentPlace.id, dateFilterData.from, dateFilterData.to, this.refs.tabs.getActiveTab())
    //     }
    // }
    render() {
        const { booking, place } = this.props
        if (!booking) {
            return (
                <View style={{ backgroundColor: material.white500, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={material.red500} />
                </View>
            )
        }

        // GET PLACE LIST
        // let dropdownValues = place.listPlace.map(item => ({
        //     id: item.placeId,
        //     name: item.address
        // }))

        return (
            <View style={styles.container}>
                {/*<TopDropdown
                    modalOpen={this.props.modal}
                    ref='placeDropdown'
                    dropdownValues={dropdownValues}
                    selectedOption={selectedPlace}
                    onSelect={this._handleTopDrowpdown.bind(this)} />*/}
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />
                <View style={{ height: '100%' }}>
                    {/*<View style={styles.merchantAddress}>
                    <Text small white>33 Nguyễn Chí Thanh, Ba Đình, Hà Nội</Text>
                </View>*/}
                    <TabsWithNoti tabData={options.tabData} activeTab={BOOKING_WAITING_CONFIRM} ref='tabs'
                        onPressTab={this._handlePressTab} />
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