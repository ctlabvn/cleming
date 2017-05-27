import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Container } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonActions from '~/store/actions/common'
import * as placeAction from '~/store/actions/place'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import { PRIMARY_COLOR } from '~/ui/shared/constants'
import moment from 'moment'
import { storeTransparent, storeFilled } from '~/assets'
import { formatNumber } from '~/ui/shared/utils'
import LinearGradient from 'react-native-linear-gradient'
import Content from '~/ui/components/Content'
import { getSession } from '~/store/selectors/auth'
@connect(state => ({
    xsession: getSession(state),
    place: state.place
}), { ...commonActions, ...placeAction })
export default class MerchantOverview extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let dateFilterData = this.refs.dateFilter.getData()
        this.props.getListPlace(this.props.xsession, (err, data) => {
            let toTime = moment(new Date())
            // console.warn('Place Data', data)
            if (data && data.updated && data.updated.listPlace) {
                var allPlace = data.updated.listPlace.map(item => item.placeId).join(';')
                this.props.getPlaceStatistic(
                    this.props.xsession,
                    allPlace,
                    dateFilterData.currentSelectValue.value.from,
                    dateFilterData.currentSelectValue.value.to)
                this.props.getMerchantNews(
                    this.props.xsession,
                    allPlace,
                    dateFilterData.currentSelectValue.value.from,
                    dateFilterData.currentSelectValue.value.to)
            }
        })
    }

    componentWillFocus() {
        console.log('focus')
    }

    componentWillBlur() {
        console.log('blur')
    }

    _handleChangePlace(item) {
        const { place } = this.props
        let dateFilterData = this.refs.dateFilter.getData()
        this.props.getPlaceStatistic(this.props.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to)
        this.props.getMerchantNews(this.props.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to)
    }

    _handlePressFilter(item) {
        // this.setState({ loading: true })
        let currentPlace = this.refs.placeDropdown.getValue()
        this.props.getPlaceStatistic(
            this.props.xsession,
            currentPlace.id,
            item.currentSelectValue.value.from,
            item.currentSelectValue.value.to)
        this.props.getMerchantNews(
            this.props.xsession,
            currentPlace.id,
            item.currentSelectValue.value.from,
            item.currentSelectValue.value.to)
    }

    renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color={PRIMARY_COLOR}
                />
                <Text style={{ color: PRIMARY_COLOR, marginTop: 10 }}>Đang tải dữ liệu ...</Text>
            </View>
        )
    }

    renderMainContainer() {
        const { handleSubmit, submitting, forwardTo, place } = this.props
        return (
            <Content style={{ width: '100%', height: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.timeInteval}>{moment(parseInt(place.statistic.fromTime * 1000)).format('DD/MM/YYYY')} đến {moment(parseInt(place.statistic.toTime) * 1000).format('DD/MM/YYYY')}</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemBorderRight}>
                            <Text style={styles.infoItemNumber}>{formatNumber(place.statistic.placeReach)}</Text>
                            <Text style={styles.infoItemLabel}>Tiếp cận</Text>
                        </View>
                        <View style={styles.infoItemBorderRight}>
                            <Text style={styles.infoItemNumber}>{formatNumber(place.statistic.placeView)}</Text>
                            <Text style={styles.infoItemLabel}>Xem</Text>
                        </View>
                        <View style={styles.infoItemBorderRight}>
                            <Text style={styles.infoItemNumber}>{formatNumber(place.statistic.placeInteract)}</Text>
                            <Text style={styles.infoItemLabel}>Tìm hiểu</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={{ ...styles.infoItemNumber, ...styles.success }}>{formatNumber(place.statistic.placeBought)}</Text>
                            <Text style={styles.infoItemLabel}>Mua</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => forwardTo('transactionList')}>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='transaction' style={styles.icon} />
                                <Text style={{ ...styles.textLabelRightImage }}>Giao dịch</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.badgeContainer}><Text small style={styles.numberRight}>{place.news.transactionNews}</Text></View>
                                <Icon name='chevron-right' style={styles.rightIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => forwardTo('placeOrderList')}>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='calendar-checked' style={styles.icon} />
                                <Text style={{ ...styles.textLabelRightImage }}>Đặt chỗ</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.badgeContainer}><Text small style={styles.numberRight}>{place.news.bookingNews}</Text></View>
                                <Icon name='chevron-right' style={styles.rightIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => forwardTo('deliveryList')}>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='shiping-bike2' style={styles.icon} />
                                <Text style={{ ...styles.textLabelRightImage }}>Đặt giao hàng</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.badgeContainer}><Text small style={styles.numberRight}>{place.news.orderNews}</Text></View>
                                <Icon name='chevron-right' style={styles.rightIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Content>
        )
    }

    render() {
        const { handleSubmit, submitting, forwardTo, place } = this.props
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))
        if (dropdownValues.length > 1) {
            let allPlaceId = place.listPlace.map(item => item.placeId).join(';')
            let allPlaceOption = {
                id: allPlaceId,
                name: "Tất cả địa điểm"
            }
            dropdownValues = [allPlaceOption, ...dropdownValues]
        }

        let mainContainer = null
        let topDropdown = null // fix break ui first time load
        topDropdown = (
            <TopDropdown
                ref='placeDropdown'
                dropdownValues={dropdownValues}
                onSelect={this._handleChangePlace.bind(this)} />
        )
        if (place && place.listPlace && place.statistic) {
            mainContainer = this.renderMainContainer()
        } else {
            mainContainer = this.renderLoading()
        }
        return (
            <Container style={styles.container}>
                {topDropdown}
                <View style={styles.contentContainer}>
                    <LinearGradient style={{ paddingTop: 15 }} colors={['#00a9d4', '#007dad']}>
                        <Image source={storeTransparent} style={{ resizeMode: 'contain', height: 120 }} />
                    </LinearGradient>
                    {/*<Image source={storeFilled} style={{ resizeMode: 'cover', width: '100%', height: 120 }} />*/}
                    <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                </View>
                {mainContainer}

            </Container>
        )
    }
}