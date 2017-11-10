import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Text} from "native-base";
import {ActivityIndicator, Image, TouchableOpacity, View, TouchableWithoutFeedback} from "react-native";
import styles from "./styles";
import * as commonActions from "~/store/actions/common";
import * as placeAction from "~/store/actions/place";
import * as locationAction from "~/store/actions/location";
import {InputField} from "~/ui/elements/Form";
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import {storeFilled, storeTransparent} from "~/assets";
import {formatNumber} from "~/ui/shared/utils";
// import LinearGradient from 'react-native-linear-gradient'
import GradientBackground from "~/ui/elements/GradientBackground";

import Content from "~/ui/components/Content";
import {getSession, getUser} from "~/store/selectors/auth";
import {getSelectedPlace} from "~/store/selectors/place";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
@connect(state => ({
    xsession: getSession(state),
    user: getUser(state),
    selectedPlace: getSelectedPlace(state),
    place: state.place,
    location: state.location
}), {...commonActions, ...placeAction, ...locationAction})
export default class MerchantOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    _load(showLoading = false) {
        console.log('Call _load merchantOverview')
        const {user, app, place, location, setSelectedOption, selectedPlace, getListPlace, getMerchantNews, xsession, alreadyGotLocation} = this.props
        // if (user) {
        //     this.props.app.header.show('home', user.chainName, user.avatar)
        // }
        showLoading && this.setState({loading: true})
        let lat = 0, long = 0
        if (location && Object.keys(location).length > 1) {
            lat = location.latitude
            long = location.longitude
        }

        app.topDropdown.showLoadingPlace();
        getListPlace(xsession, lat, long,
            (err, data) => {
                let toTime = moment(new Date())
                if (data && data.updated && data.updated.data) {

                    /* prevent null object */
                    if (!data.updated.data || data.updated.data.length <= 0) {
                        app.topDropdown.showNullPlace();
                        return;
                    }
                    /***/

                    let listPlace = data.updated.data.map(item => ({
                        id: item.placeId,
                        name: item.address
                    }))

                    // app.topDropdown.updateDropdownValues(listPlace)
                    app.topDropdownListValue.updateDropdownValues(listPlace)
                    app.topDropdownListValue.updateDefaultDropdownValues(listPlace)

                    // app.setCachePlaceCurrentPage(listPlace[0]);
                    // const hotSelectedPlace = listPlace[0];

                    const hotSelectedPlace = app.setCachePlaceCurrentPage(listPlace[0], data.updated.data);

                    if (!selectedPlace || Object.keys(selectedPlace).length == 0) {
                        // let selectedOption = {}
                        //
                        // selectedOption.id = data.updated.data[0].placeId
                        // selectedOption.name = data.updated.data[0].address

                        const selectedOption = hotSelectedPlace;

                        setSelectedOption(selectedOption)
                        app.topDropdown.updateSelectedOption(selectedOption)
                        app.topDropdownListValue.updateSelectedOption(selectedOption, true)

                    } else if ((lat != 0 || long != 0) && !location.alreadyGotLocation) {
                        let selectedOption = {}
                        selectedOption.id = data.updated.data[0].placeId
                        selectedOption.name = data.updated.data[0].address
                        setSelectedOption(selectedOption)
                        app.topDropdown.updateSelectedOption(selectedOption)
                        app.topDropdownListValue.updateSelectedOption(selectedOption, true)
                        alreadyGotLocation()
                    }

                    if (listPlace.length > 1){
                        app.topDropdown.setIsMultiple(true)
                    }else{
                        app.topDropdown.setIsMultiple(false)
                    }

                    if (!hotSelectedPlace && (!selectedPlace || Object.keys(selectedPlace).length == 0)) {
                        getMerchantNews(xsession, data.updated.data[0].placeId,
                            this.setState({loading: false})
                        )
                    } else {
                        getMerchantNews(xsession, hotSelectedPlace.id,
                            this.setState({loading: false})
                        )

                        // hide code time: 15/09/2017: for cachePlace
                        // getMerchantNews(xsession, selectedPlace.id,
                        //     this.setState({loading: false})
                        // )
                    }
                }else{
                    this.setState({ loading: false })
                }
            }
        )

    }

    _onRefresh = () => {
        console.log('Refreshing...')
        this._load(true)
    }

    componentDidMount() {
      const {app} = this.props
      app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
      this._load()
    }

    componentWillFocus() {
        const {app, place, user} = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
        if (!place.listPlace || place.listPlace.length == 0) {
            console.log('Place List will focus', place.listPlace)
            this._load()
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.loading != nextState.loading) {
    //         console.log('Should update MerchantOverview')
    //         return true
    //     }

    //     const { place } = this.props
    //     if (place && place.news && nextProps.place && nextProps.place.news
    //         && (
    //             place.news.bookingNews != nextProps.place.news.bookingNews ||
    //             place.news.orderNews != nextProps.place.news.orderNews ||
    //             place.news.transactionNews != nextProps.place.news.transactionNews
    //         )
    //     ) {
    //         console.log('Should update MerchantOverview')
    //         return true
    //     }
    //     console.log('Not render')
    //     return false
    // }

    _handleChangePlace = (item) => {
        console.log('Call callback handle place change', item)
        const {place, setSelectedOption} = this.props
        this.setState({loading: true})
        this.props.getMerchantNews(this.props.xsession, item.id,
            () => {
                this.setState({loading: false})
            }
        )
    }

    renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color={material.primaryColor}
                />
                <Text style={{color: material.primaryColor, marginTop: 10}}>Đang tải dữ liệu ...</Text>
            </View>
        )
    }

    renderTextCount(number) {
        const fontSize = +number > 99 ? 11 : 12
        return (
            <Text style={{...styles.numberRight, fontSize}}>{number}</Text>
        )
    }

    navigate(route){
        // if (route == 'transactionList'){
        //     this.props.replaceFooterRoute(1, route)
        // }
        this.props.forwardTo(route)
    }

    renderMainContainer() {

        const {handleSubmit, submitting, place, user} = this.props

        return (
            // <Content style={{ width: '100%', height: '100%' }}>
            <View style={styles.menuContainer}>
                <Text strong style={styles.funnyToday}>{moment().format('DD/MM/YYYY')}</Text>

                    {(place && place.news && place.news.transactionNews > -1) &&
                    <TouchableOpacity style={styles.menuItem}
                            onPress={() => this.navigate('transactionList')}>

                            <View style={styles.leftBlock}>
                                <Icon name='transaction' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>{I18n.t('transaction')}</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.badgeContainer}>
                                    <Text small style={styles.numberRight}>{this.renderTextCount(place.news.transactionNews)}</Text></View>
                                <Icon name='chevron-right' style={styles.rightIcon}/>
                            </View>
                    </TouchableOpacity>}

                    {(place && place.news && place.news.transactionNews == -1) &&
                    <TouchableWithoutFeedback>
                        <View style={styles.menuItemGray}>
                            <View style={styles.leftBlock}>
                                <Icon name='transaction' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>{I18n.t('transaction')}</Text>
                            </View>
                          </View>
                    </TouchableWithoutFeedback>}

                    {(place && place.news && place.news.bookingNews > -1) &&
                    <TouchableOpacity style={styles.menuItem} onPress={() => this.navigate('placeOrderList')}>
                            <View style={styles.leftBlock}>
                                <Icon name='calendar-checked' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>{I18n.t('booking')}</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.badgeContainer}><Text small
                                                                          style={styles.numberRight}>{this.renderTextCount(place.news.bookingNews)}</Text></View>
                                <Icon name='chevron-right' style={styles.rightIcon}/>
                            </View>
                    </TouchableOpacity>}

                    {(place && place.news && place.news.bookingNews == -1) &&
                    <TouchableWithoutFeedback>
                          <View style={styles.menuItemGray}>
                            <View style={styles.leftBlock}>
                                <Icon name='calendar-checked' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>{I18n.t('booking')}</Text>
                            </View>
                          </View>
                    </TouchableWithoutFeedback>}

                    {(place && place.news && place.news.orderNews > -1) &&
                    <TouchableOpacity style={styles.menuItem} onPress={() => this.navigate('deliveryList')}>
                            <View style={styles.leftBlock}>
                                <Icon name='shiping-bike2' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>{I18n.t('order')}</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.badgeContainer}><Text small
                                                                          style={styles.numberRight}>{this.renderTextCount(place.news.orderNews)}</Text></View>
                                <Icon name='chevron-right' style={styles.rightIcon}/>
                            </View>
                    </TouchableOpacity>}

                    {(place && place.news && place.news.orderNews == -1) &&
                    <TouchableWithoutFeedback>
                        <View style={styles.menuItemGray}>
                            <View style={styles.leftBlock}>
                                <Icon name='shiping-bike2' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>{I18n.t('order')}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>}

                    {(true || user.accTitle != 1) && <TouchableWithoutFeedback onPress={()=>this.navigate('qrForm')}>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='shiping-bike2' style={styles.icon}/>
                                <Text strong style={{...styles.textLabelRightImage}}>QR</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>}

            </View>
            // </Content>
        )
    }
    _renderImage(){
        const {user} = this.props
        if (user.chainAvatar){
            return (
                <View style={{...styles.contentContainer}}>
                    <Image source={{uri: user.chainAvatar}} style={{resizeMode: 'cover', width: material.deviceWidth, height: 200}}/>
                </View>
            )

        }else{
            return (
                <View style={styles.contentContainer}>
                    <GradientBackground colors={[material.blue400, material.blue600]}/>
                    <Image source={storeTransparent} style={{resizeMode: 'contain', height: 120}}/>
                </View>
            )
        }
    }
    render() {
        console.log('Rendering MerchantOverview')
        const {handleSubmit, submitting, place, selectedPlace, user} = this.props

        let mainContainer = null
        if (place && place.listPlace) {
            mainContainer = this.renderMainContainer()
        } else {
            mainContainer = this.renderLoading()
        }
        return (
            <Container style={styles.container}>
                {this._renderImage()}
                <Content onRefresh={this._onRefresh} refreshing={this.state.loading}>
                    {mainContainer}
                </Content>
            </Container>
        )
    }
}
