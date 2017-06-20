import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Button, Spinner } from 'native-base'
import { Dimensions, View, InteractionManager } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import * as commonActions from '~/store/actions/common'
import * as reportActions from '~/store/actions/report'
import * as placeActions from '~/store/actions/place'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import Content from '~/ui/components/Content'
import geoViewport from '@mapbox/geo-viewport'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getSession } from '~/store/selectors/auth'
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    booking: state.booking,
    report: state.report
}), { ...commonActions, ...reportActions, ...placeActions })
export default class Report extends Component {

    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 21.0461027,
                longitude: 105.7955732,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        }
        this.isLoadingPlace = false
        this.showMap = false
        this.mapWidth = 0
        this.mapHeight = 0
    }
    _requestMapData(placeIds, fromTime, toTime, callback) {
        const { xsession, getMapReport } = this.props
        let minLa = this.state.region.latitude - this.state.region.latitudeDelta
        let minLo = this.state.region.longitude - this.state.region.longitudeDelta
        let maxLa = this.state.region.latitude + this.state.region.latitudeDelta
        let maxLo = this.state.region.longitude + this.state.region.longitudeDelta
        const { height, width } = Dimensions.get('window')
        const bounds = [
            minLo,
            minLa,
            maxLo,
            maxLa
        ]
        // let zoomLevel = geoViewport.viewport(bounds, [height, width]).zoom
        // console.log('Geo View Port', zoomLevel)
        // console.log('Map Width Height', this.mapWidth+'---'+this.mapHeight)
        let zoomLevel = geoViewport.viewport(bounds, [this.mapHeight, this.mapWidth]).zoom
        zoomLevel += 1
        console.log('New Geo Viewport', zoomLevel)
        if (callback) {
            getMapReport(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel, fromTime, toTime, callback)
        } else {
            getMapReport(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel, fromTime, toTime)
        }
    }
    _loadAndFocus(placeId, fromTime, toTime) {
        this._requestMapData(placeId, fromTime, toTime,
            (err, data) => {
                if (data && data.updated && data.updated.data && data.updated.data.listPlaceLocationDtos) {
                    let focusMechant = data.updated.data.listPlaceLocationDtos[0]
                    console.log('Focus Merchant', focusMechant)
                    this.setState({
                        region: {
                            latitude: focusMechant.latitude,
                            longitude: focusMechant.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }
                    })
                }
            }
        )
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { app } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleTopDropdown)
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            let selectedPlace = app.topDropdown.getValue()
            console.log('Select Place Did Mount report', selectedPlace)
            if (!selectedPlace || Object.keys(selectedPlace).length == 0) {
                this.isLoadingPlace = true
                return
            }
            setTimeout(() => {
                this._loadAndFocus(selectedPlace.id, dateFilterData.from, dateFilterData.to)
            }, 500)

        })
    }

    componentWillFocus() {
        InteractionManager.runAfterInteractions(() => {
            const { app } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleTopDropdown)
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            let selectedPlace = app.topDropdown.getValue()
            if (!selectedPlace || Object.keys(selectedPlace).length == 0) {
                this.isLoadingPlace = true
                return
            }
            setTimeout(()=>{
                this._loadAndFocus(selectedPlace.id, dateFilterData.from, dateFilterData.to)
            }, 500)
        })
    }
    _regionChange = (region) => {
        this.setState({ region },
            () => {
                const { app } = this.props
                let placeData = app.topDropdown.getValue()
                let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
                this._requestMapData(placeData.id, dateFilterData.from, dateFilterData.to)
            }
        )
    }

    onRegionChangeComplete = (region) => {
        // when load first time at componentDidMount map show at Equator longitude: 0, latitude: 0 (may be a bug)
        // This tricky solution to skip that case
        if (region.longitude == 0 && region.longitude == 0) return
        this._regionChange(region)
    }

    _handleTopDropdown = (item) => {
        console.log('Report dropdown change', item)
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this._requestMapData(item.id, dateFilterData.from, dateFilterData.to,
            (err, data) => {
                if (data && data.updated && data.updated.data && data.updated.data.listPlaceLocationDtos) {
                    let focusMechant = data.updated.data.listPlaceLocationDtos[0]
                    this.setState({
                        region: {
                            latitude: focusMechant.latitude,
                            longitude: focusMechant.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }
                    })
                }
            }
        )
    }
    _handleOnLayoutMap = e => {
        const { width, height } = e.nativeEvent.layout
        this.mapWidth = width
        this.mapHeight = height
    }

    _handlePressFilter = (item) => {
        const { app } = this.props
        let placeData = app.topDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        this._requestMapData(placeData.id, dateFilterData.from, dateFilterData.to)
    }

    _sum(arr) {
        return arr.reduce((x1, x2) => x1 + x2, 0)
    }

    render() {
        const { report, place } = this.props
        // let dropdownValues = place.listPlace.map(item => ({
        //     id: item.placeId,
        //     name: item.address
        // }))

        return (
            <Container style={styles.container}>
                <View style={{ height: '100%' }} >
                    <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter' defaultFilter='week' type='lite' />
                    <MapView
                        region={this.state.region}
                        provider={PROVIDER_GOOGLE}
                        style={{ width: '100%', height: '100%' }}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        moveOnMarkerPress={false}
                        onLayout={this._handleOnLayoutMap}
                    >
                        {report && report.map && report.map.locationDtos.map((marker, idx) => {
                            return (
                                <MapView.Marker key={idx}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                >
                                    <View style={styles.markerCustomer}>
                                        <Text style={styles.markerCustomerText}>{marker.number}</Text>
                                    </View>
                                </MapView.Marker>
                            )
                        })}
                        {report && report.map && report.map.listPlaceLocationDtos.map((marker, idx) => {
                            return (
                                <MapView.Marker key={idx}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                >
                                    <View style={styles.markerMerchant}>
                                    </View>
                                </MapView.Marker>
                            )

                        })}
                    </MapView>

                </View>
            </Container>
        )
    }
}