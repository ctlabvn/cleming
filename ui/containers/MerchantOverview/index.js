import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Container } from 'native-base'
import { View, Modal, TouchableOpacity, Image, ActivityIndicator, InteractionManager } from 'react-native'
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
import moment from 'moment'
import { storeTransparent, storeFilled } from '~/assets'
import { formatNumber } from '~/ui/shared/utils'
// import LinearGradient from 'react-native-linear-gradient'
import GradientBackground from '~/ui/elements/GradientBackground'

import Content from '~/ui/components/Content'
import { getSession, getUser } from '~/store/selectors/auth'
import { getSelectedPlace } from '~/store/selectors/place'
import material from '~/theme/variables/material.js'
@connect(state => ({
    xsession: getSession(state),
    user: getUser(state),
    selectedPlace: getSelectedPlace(state),
    place: state.place,
    location: state.location
}), { ...commonActions, ...placeAction })
export default class MerchantOverview extends Component {

    constructor(props) {
        super(props)
    }

    _load() {
        const { user, app, place, location, setSelectedOption, selectedPlace, getListPlace, getMerchantNews, xsession } = this.props
        if (user) {
            this.props.app.header.show('home', user.fullName, user.avatar)
        }
        let lat = 0, long = 0
        if (location && Object.keys(location).length > 1) {
            lat = location.latitude
            long = location.longitude
        }
        getListPlace(this.props.xsession, lat, long,
            (err, data) => {
                let toTime = moment(new Date())
                if (data && data.updated && data.updated.data) {


                    // updateDropdownValues(dropdownValues)
                    // updateSelectedOption(selectedOption)
                    let listPLace = data.updated.value.map(item => ({
                        id: item.placeId,
                        name: item.address
                    }))
                    app.topDropdown.updateDropdownValues(listPLace)
                    
                    if (!selectedPlace || Object.keys(selectedPlace).length == 0) {
                        let selectedOption = {}
                        selectedOption.id = data.updated.data[0].placeId
                        selectedOption.name = data.updated.data[0].address
                        setSelectedOption(selectedOption)
                    }
                    // let currentPlace = this.refs.placeDropdown.getValue()

                    if (!selectedPlace || Object.keys(selectedPlace).length == 0) {
                        getMerchantNews(xsession, currentPlace.id)
                    } else {
                        getMerchantNews(xsession, data.updated.data[0].placeId)
                    }

                }
            })

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._load()
        })
    }

    componentWillFocus() {
        InteractionManager.runAfterInteractions(() => {
            this._load()
        })
    }

    _handleChangePlace(item) {
        const { place, setSelectedOption } = this.props
        // let dateFilterData = this.refs.dateFilter.getData()
        // this.props.getPlaceStatistic(this.props.xsession, item.id, dateFilterData.currentSelectValue.value.from, dateFilterData.currentSelectValue.value.to)
        setSelectedOption(item)
        this.props.getMerchantNews(this.props.xsession, item.id)
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
                    color={material.primaryColor}
                />
                <Text style={{ color: material.primaryColor, marginTop: 10 }}>Đang tải dữ liệu ...</Text>
            </View>
        )
    }

    renderMainContainer() {
        const { handleSubmit, submitting, forwardTo, place } = this.props
        return (
            // <Content style={{ width: '100%', height: '100%' }}>
            <View style={styles.menuContainer}>
                <Text style={styles.funnyToday}>{moment().format('DD/MM/YYYY')}</Text>
                <View style={styles.menuContainer}>
                    {/*<Text style={styles.timeInteval}>{moment(parseInt(place.statistic.fromTime * 1000)).format('DD/MM/YYYY')} đến {moment(parseInt(place.statistic.toTime) * 1000).format('DD/MM/YYYY')}</Text>
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
                    </View>*/}
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
            </View>
            // </Content>
        )
    }

    render() {
        console.log('Rendering MerchantOverview')
        const { handleSubmit, submitting, forwardTo, place, selectedPlace } = this.props
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))

        let mainContainer = null
        let topDropdown = null // fix break ui first time load
        topDropdown = (
            <TopDropdown
                ref='placeDropdown'
                dropdownValues={dropdownValues}
                selectedOption={selectedPlace}
                onSelect={this._handleChangePlace.bind(this)} />
        )
        if (place && place.listPlace) {
            mainContainer = this.renderMainContainer()
        } else {
            mainContainer = this.renderLoading()
        }
        return (
            <Container style={styles.container}>
                {/*{topDropdown}*/}
                <View style={styles.contentContainer}>
                    <GradientBackground colors={[material.blue400, material.blue600]} />
                    <Image source={storeTransparent} style={{ resizeMode: 'contain', height: 120 }} />
                    {/*<Image source={storeFilled} style={{ resizeMode: 'cover', width: '100%', height: 120 }} />*/}
                    {/*<DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />*/}
                </View>
                {mainContainer}

            </Container>
        )
    }
}