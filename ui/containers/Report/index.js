import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Text} from "native-base";
import {Dimensions, InteractionManager, View} from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonActions from "~/store/actions/common";
import * as reportActions from "~/store/actions/report";
import * as placeActions from "~/store/actions/place";
import {InputField} from "~/ui/elements/Form";
import geoViewport from "@mapbox/geo-viewport";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {getSession} from "~/store/selectors/auth";
import {DEFAULT_MAP_DELTA} from "~/store/constants/app";
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
                latitudeDelta: DEFAULT_MAP_DELTA.LAT,
                longitudeDelta: DEFAULT_MAP_DELTA.LONG,
            },
            focusMerchant: {}
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
        zoomLevel += 1 // ??? correct with zoomLevel of server side
        console.log('New Geo Viewport', zoomLevel)
        if (callback) {
            getMapReport(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel, fromTime, toTime, callback)
        } else {
            getMapReport(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel, fromTime, toTime)
        }
    }
    _loadAndFocus(placeId, fromTime, toTime) {
        const { place } = this.props
        if (place && place.listPlace && place.listPlace.length > 0) {
            let focusMerchant = place.listPlace.filter(item => item.placeId == placeId)[0]
            console.log('Focus Merchant', focusMerchant)
            this.setState({
                region: {
                    latitude: focusMerchant.latitude,
                    longitude: focusMerchant.longitude,
                    latitudeDelta: DEFAULT_MAP_DELTA.LAT,
                    longitudeDelta: DEFAULT_MAP_DELTA.LONG,
                },
                focusMerchant: focusMerchant
            })
        }

        this._requestMapData(placeId, fromTime, toTime)
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { app } = this.props
            app.topDropdown.setCallbackPlaceChange(this._handleTopDropdown)
            let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
            let selectedPlace = app.topDropdown.getValue()
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
        // InteractionManager.runAfterInteractions(() => {
        //     const { app } = this.props
        //     app.topDropdown.setCallbackPlaceChange(this._handleTopDropdown)
        //     let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        //     let selectedPlace = app.topDropdown.getValue()
        //     if (!selectedPlace || Object.keys(selectedPlace).length == 0) {
        //         this.isLoadingPlace = true
        //         return
        //     }
        //     setTimeout(() => {
        //         this._loadAndFocus(selectedPlace.id, dateFilterData.from, dateFilterData.to)
        //     }, 500)
        // })
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
        this._loadAndFocus(item.id, dateFilterData.from, dateFilterData.to)
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
        // console.log('Focus Merchant Render', report.map)
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
                            const key = marker.latitude.toFixed(8) + '.' + marker.longitude.toFixed(8)
                            return (
                                <MapView.Marker key={key}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                >
                                    <View style={styles.markerCustomer}>
                                        <Text style={styles.markerCustomerText}>{marker.number}</Text>
                                    </View>
                                </MapView.Marker>
                            )
                        })}
                        {(Object.keys(this.state.focusMerchant).length > 0) &&
                            <MapView.Marker
                                coordinate={{ latitude: this.state.focusMerchant.latitude, longitude: this.state.focusMerchant.longitude }}
                            >
                                <View style={styles.markerMerchant}>
                                </View>
                            </MapView.Marker>
                        }
                        {/*{report && report.map && report.map.listPlaceLocationDtos.map((marker, idx) => {
                            return (
                                <MapView.Marker key={idx}
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                >
                                    <View style={styles.markerMerchant}>
                                    </View>
                                </MapView.Marker>
                            )

                        })}*/}
                    </MapView>

                </View>
            </Container>
        )
    }
}