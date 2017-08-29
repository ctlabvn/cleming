import React, {Component} from "react";
import {Container, Spinner, Text, View} from "native-base";
import Content from "~/ui/components/Content";
import {connect} from "react-redux";
import {InteractionManager} from "react-native";
import moment from "moment";
import Border from "~/ui/elements/Border";
import Icon from "~/ui/elements/Icon";

import CallModal from "~/ui/components/CallModal";

import * as commonActions from "~/store/actions/common";
import * as bookingActions from "~/store/actions/booking";
import * as notificationActions from "~/store/actions/notification";
import {getSession} from "~/store/selectors/auth";
import styles from "./styles";
import {BASE_COUNTDOWN_BOOKING_MINUTE} from "~/ui/shared/constants";
import CircleCountdown from "~/ui/components/CircleCountdown";
import material from "~/theme/variables/material.js";
import {
    DAY_WITHOUT_YEAR,
    DEFAULT_DATE_FORMAT,
    DEFAULT_HOUR_FORMAT,
    DEFAULT_TIME_FORMAT,
    TIME_FORMAT_WITHOUT_SECOND_FULL_YEAR,
    GENERAL_ERROR_MESSAGE
} from "~/store/constants/app";
import {formatPhoneNumber, chainParse, getToastMessage} from "~/ui/shared/utils";
import I18n from '~/ui/I18n'
@connect(state => ({
    xsession: getSession(state),
    // user: state.auth.user,
    // place: state.place,
    booking: state.booking
}), {...commonActions, ...bookingActions, ...notificationActions})

export default class PlaceOrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookingDetail: null,
            modalOpen: false,
        }
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {app, getBookingDetail, updateRead, xsession, setToast} = this.props
            let bookingId = this.props.route.params.id
            // let bookingArr = this.props.booking.bookingList.filter(item => item.orderCode == bookingId)
            // this.setState({counting: true})
            getBookingDetail(xsession, bookingId,
                (error, data) => {
                    console.log('Err Booking Detail', error)
                    console.log('Booking Detail', data)
                    if (data && data.updated) {
                        let bookingDetail = data.updated.bookingInfo
                        if (!bookingDetail.isReadCorrespond && bookingDetail.notifyIdCorrespond) {
                            updateRead(xsession, bookingDetail.notifyIdCorrespond)
                        }
                        this.setState({bookingDetail: data.updated.bookingInfo})
                        return
                    } else {
                        setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
                        this.props.forwardTo('merchantOverview')
                        return
                    }
                }
            )
            // this.setState({ bookingDetail: bookingArr[0] })
        })
    }

    // componentWillBlur() {
    //     InteractionManager.runAfterInteractions(() => {
    //     })

    // }

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

    render() {
        console.log('Render Booking Detail')
        if (!this.state.bookingDetail) {
            return null
            // return (
            //     <View style={{
            //         backgroundColor: material.white500,
            //         flexDirection: 'column',
            //         alignItems: 'center',
            //         justifyContent: 'center',
            //         flex: 1
            //     }}>
            //         <Spinner />
            //     </View>
            // )
        }
        const {bookingDetail} = this.state
        let orderRow = null
        let totalQuantity = this.state.bookingDetail.orderRowList ? this.state.bookingDetail.orderRowList.map(x => x.quantity).reduce((a, b) => a + b, 0) : 0
        if (this.state.bookingDetail.orderRowList && this.state.bookingDetail.orderRowList.length > 0) {
            orderRow = this.state.bookingDetail.orderRowList.map(item => (
                <View style={styles.row} key={item.itemId}>
                    <Text style={{...styles.normalText, ...styles.leftText, ...styles.boldText}}>{item.itemName}:</Text>
                    <View style={styles.row}>
                        <Text style={{...styles.normalText}}>{I18n.t('number')}: </Text>
                        <Text
                            style={{...styles.normalText, ...styles.rightText, ...styles.boldText}}>{item.quantity}</Text>
                    </View>
                </View>
            ))
        }
        let minute = bookingDetail.deliveryMinute < 10 ? '0'.concat(bookingDetail.deliveryMinute) : bookingDetail.deliveryMinute
        let hourMinute = bookingDetail.deliveryHour + ':' + minute
        let bookTimeStr = hourMinute + ':00' + ' ' + moment(bookingDetail.bookDate * 1000).format(DEFAULT_TIME_FORMAT)
        let bookTime = moment(bookTimeStr, DEFAULT_TIME_FORMAT).unix()

        phoneNumberBlock = (<View style={styles.row}>
            <Icon name='phone' style={{ ...styles.icon, ...styles.phoneIcon }} />
            <Text medium
                  style={{...styles.rightText}}
                  onPress={this.onModalOpen.bind(this, chainParse(this.state.bookingDetail, ['userInfo', 'phoneNumber']))}
                  warning> {formatPhoneNumber(chainParse(this.state.bookingDetail, ['userInfo', 'phoneNumber']))}</Text>
        </View>)

        return (
            <Container>
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={this.onModalClose.bind(this)}
                    open={this.state.modalOpen} />

                <View style={styles.merchantAddress}>
                    <Text small white>{this.state.bookingDetail.placeInfo.address}</Text>
                </View>

                <View style={{backgroundColor: material.white500, height: '100%'}}>
                    <View style={styles.placeContainer}>
                        <View style={{...styles.rowPaddingTB, ...styles.center}}>
                            <Text
                                medium
                                grayDark>{moment(this.state.bookingDetail.clingmeCreatedTime * 1000).format(TIME_FORMAT_WITHOUT_SECOND_FULL_YEAR)}</Text>
                            
                            {this.state.bookingDetail.status == 'WAIT_CONFIRMED' && <View style={{right: 10, position: 'absolute'}}>
                                <CircleCountdown baseMinute={BASE_COUNTDOWN_BOOKING_MINUTE}
                                                 counting={true}
                                                 countTo={bookTime}
                                />
                            </View>}
                        </View>
                        <View>
                            <Border/>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Icon name='calendar' style={styles.icon}/>
                                    <Text medium grayDark
                                          style={styles.labelUnderImage}>{moment(this.state.bookingDetail.bookDate * 1000).format(DAY_WITHOUT_YEAR)}</Text>
                                </View>
                                <Border horizontal={false}/>
                                <View style={styles.column}>
                                    <Icon name='history' style={styles.icon}/>
                                    <Text medium grayDark style={styles.labelUnderImage}>{hourMinute}</Text>
                                </View>
                                <Border horizontal={false}/>
                                <View style={styles.column}>
                                    <Icon name='friend' style={styles.icon}/>
                                    <Text medium grayDark
                                          style={styles.labelUnderImage}>{this.state.bookingDetail.numberOfPeople}</Text>
                                </View>
                                <Border horizontal={false}/>
                                <View style={styles.column}>
                                    <Icon name='want-feed' style={styles.icon}/>
                                    <Text medium grayDark style={styles.labelUnderImage}>{totalQuantity}</Text>
                                </View>
                            </View>
                            <Border/>
                        </View>
                        <View style={styles.rowPaddingTB}>
                            <Text medium style={{...styles.normalText, ...styles.leftText}}>{I18n.t('booking_user')}:</Text>
                            <Text
                                medium
                                style={{...styles.normalText, ...styles.boldText, ...styles.rightText}}>{chainParse(this.state.bookingDetail, ['userInfo', 'memberName'])}</Text>
                        </View>
                        <View style={styles.rowPaddingTB}>
                            <Text medium style={{...styles.normalText, ...styles.leftText}}>{I18n.t('phone_number')}:</Text>
                            {phoneNumberBlock}
                        </View>
                        <View style={styles.block}>
                            <Text medium style={{...styles.normalText, ...styles.leftText}}>{I18n.t('require')}:</Text>
                            <Content>
                                <Text medium style={{...styles.normalText, ...styles.leftText}}>
                                    {this.state.bookingDetail.note}
                                </Text>
                            </Content>
                        </View>
                        <Border/>
                        <View style={styles.rowPaddingTB}>
                            <Text medium style={{...styles.normalText, ...styles.leftText, ...styles.boldText}}>{I18n.t('pre_order')}:</Text>
                            <View style={styles.row}>
                                <Text medium primary>{I18n.t('number')}: </Text>
                                <Text medium primary style={{...styles.rightText, ...styles.boldText}}>{totalQuantity}</Text>
                            </View>
                        </View>
                        <Content>
                            {orderRow}
                        </Content>
                    </View>
                    <View style={styles.codeContainer}>
                        <Text medium style={{...styles.normalText, ...styles.codeTitleText}}>{I18n.t('booking_code')}: </Text>
                        <Text largeLight primary bold style={{...styles.codeText}}>{chainParse(this.state, ['bookingDetail', 'bookingClmCode'])}</Text>
                    </View>
                </View>

            </Container>
        )
    }
}