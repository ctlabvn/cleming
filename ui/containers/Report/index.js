import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Button, Spinner } from 'native-base'
import { Dimensions, View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
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
import {getSelectedPlace} from '~/store/selectors/place'
@connect(state => ({
    xsession: getSession(state),
    selectedPlace: getSelectedPlace(state),
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
    }
    _requestMapData(placeIds, fromTime, toTime, callback) {
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
        let zoomLevel = geoViewport.viewport(bounds, [height, width]).zoom
        console.log('Geo View Port', zoomLevel)
        if (callback) {
            this.props.getMapReport(this.props.xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel, fromTime, toTime, callback)
        } else {
            this.props.getMapReport(this.props.xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel, fromTime, toTime)
        }
    }
    componentDidMount() {
        this.counter = 0
        let placeData = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value

        this.props.getCustomerReport(this.props.xsession, placeData.id, dateFilterData.from, dateFilterData.to)
        // getMapStatistic(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel=5, fromTime=1448038800, toTime=1448038800)
        this._requestMapData(placeData.id, dateFilterData.from, dateFilterData.to,
            (err, data) => {
                if (data && data.updated && data.updated.data && data.updated.data.listPlaceLocationDtos) {
                    let focusMechant = data.updated.data.listPlaceLocationDtos[0]
                    console.log('Did mount focusMerchant', focusMechant)
                    this.setState({
                        region: {
                            latitude: focusMechant.latitude,
                            longitude: focusMechant.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }
                    }, () => {
                        console.log('Set State Did Mount', this.state.region)
                        this.counter++
                    })
                }
            }
        )
    }

    componentWillFocus() {
        console.log('Will focus map')
        let placeData = this.refs.placeDropdown.getValue()
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value

        this.props.getCustomerReport(this.props.xsession, placeData.id, dateFilterData.from, dateFilterData.to)
        // getMapStatistic(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel=5, fromTime=1448038800, toTime=1448038800)
        this._requestMapData(placeData.id, dateFilterData.from, dateFilterData.to,
            (err, data) => {
                if (data && data.updated && data.updated.data && data.updated.data.listPlaceLocationDtos) {
                    let focusMechant = data.updated.data.listPlaceLocationDtos[0]
                    console.log('Will focus focusMerchant', focusMechant)
                    this.setState({
                        region: {
                            latitude: focusMechant.latitude,
                            longitude: focusMechant.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }
                    }, () => {
                        console.log('Set State Did Mount', this.state.region)
                        this.counter++
                    })
                }
            }
        )
    }
    componentWillBlur() {
        this.counter = 0
    }
    _regionChange = (region) => {
        this.setState({ region },
            () => {
                let placeData = this.refs.placeDropdown.getValue()
                let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
                this._requestMapData(placeData.id, dateFilterData.from, dateFilterData.to)
            }
        )
    }

    onRegionChange = (region) => {
        console.log('Region change xxx', this.counter)
        if (this.counter == 0){
            this._regionChange(region)
        }
    }

    onRegionChangeComplete = (region) => {
        console.log('Region change complete', this.counter)
        if (this.counter > 0){
            this._regionChange(region)
        }
    }

    _handleTopDrowpdown = (item) => {
        const { setSelectedOption } = this.props
        setSelectedOption(item)
        let dateFilterData = this.refs.dateFilter.getData().currentSelectValue.value
        this.props.getCustomerReport(this.props.xsession, item.id, dateFilterData.from, dateFilterData.to)
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

    _handlePressFilter = (item) => {
        let placeData = this.refs.placeDropdown.getValue()
        let dateFilterData = item.currentSelectValue.value
        this.props.getCustomerReport(this.props.xsession, placeData.id, dateFilterData.from, dateFilterData.to)
        this._requestMapData(placeData.id, dateFilterData.from, dateFilterData.to)
    }

    _sum(arr) {
        return arr.reduce((x1, x2) => x1 + x2, 0)
    }
    _renderCustomerStatistic() {
        const { report } = this.props
        if (!report || !report.customer) {
            return <Text>Loading statistic...</Text>
        }
        const userInfo = report.customer.userInfo
        const baseLength = 250

        //Caculate gender visual
        let femaleRate = 0.5
        if (userInfo.total != 0) {
            femaleRate = parseInt(userInfo.femaleNumber) / (parseInt(userInfo.femaleNumber) + parseInt(userInfo.maleNumber))
        }
        const femalePercent = Math.floor(femaleRate * 100)
        const malePercent = 100 - femalePercent
        const femaleBarLength = Math.floor(femaleRate * baseLength)
        const maleBarLength = baseLength - femaleBarLength


        // Caculate IncomeLevel visual
        const totalIncomeLevel = this._sum(userInfo.incomeLevels)
        let incomeLevel1Rate = 0.33, incomeLevel2Rate = 0.33
        if (totalIncomeLevel != 0) {
            incomeLevel1Rate = userInfo.incomeLevels[0] / totalIncomeLevel
            incomeLevel2Rate = userInfo.incomeLevels[1] / totalIncomeLevel
        }
        const incomeLevel1Percent = Math.floor(incomeLevel1Rate * 100)
        const incomeLevel2Percent = Math.floor(incomeLevel2Rate * 100)
        const incomeLevel3Percent = 100 - incomeLevel1Percent - incomeLevel2Percent
        const incomeLevel1Length = Math.floor(incomeLevel1Rate * baseLength)
        const incomeLevel2Length = Math.floor(incomeLevel2Rate * baseLength)
        const incomeLevel3Length = baseLength - incomeLevel1Length - incomeLevel2Length


        // Caculate distance visual
        const totalDistanceLevel = this._sum(userInfo.distanceLevels)
        let distanceLevel1Rate = 0.33, distanceLevel2Rate = 0.33
        if (totalDistanceLevel != 0) {
            distanceLevel1Rate = userInfo.distanceLevels[0] / totalDistanceLevel
            distanceLevel2Rate = userInfo.distanceLevels[1] / totalDistanceLevel
        }
        const distanceLevel1Percent = Math.floor(distanceLevel1Rate * 100)
        const distanceLevel2Percent = Math.floor(distanceLevel2Rate * 100)
        const distanceLevel3Percent = 100 - distanceLevel1Percent - distanceLevel2Percent
        const distanceLevel1Length = Math.floor(distanceLevel1Rate * baseLength)
        const distanceLevel2Length = Math.floor(distanceLevel2Rate * baseLength)
        const distanceLevel3Length = baseLength - distanceLevel1Length - distanceLevel2Length

        // Caculate visual view time linbe
        let viewFrom16to17Length
        let viewFrom8to10Length
        let viewRemainLength
        let viewFrom16to17Percent
        let viewFrom8to10Percent
        let viewRemainPercent
        let viewFrom16to17
        let viewFrom8to10
        let viewRemain
        let totalTimeView = userInfo.timeView ? this._sum(userInfo.timeView) : 0
        if (totalTimeView == 0) {
            viewFrom16to17Length = 0.33 * baseLength
            viewFrom8to10Length = 0.33 * baseLength
            viewRemainLength = baseLength - viewFrom16to17Length - viewFrom8to10Length
            viewFrom16to17Percent = 33
            viewFrom8to10Percent = 33
            viewRemainPercent = 33
        } else {
            viewFrom16to17 = this._sum(userInfo.timeView.slice(16, 18))
            viewFrom8to10 = this._sum(userInfo.timeView.slice(8, 11))
            viewRemain = this._sum(userInfo.timeView) - viewFrom16to17 - viewFrom8to10
            viewFrom16to17Length = Math.floor(viewFrom16to17 / totalTimeView * baseLength)
            viewFrom8to10Length = Math.floor(viewFrom8to10 / totalTimeView * baseLength)
            viewRemainLength = baseLength - viewFrom16to17Length - viewFrom8to10Length
            viewFrom16to17Percent = Math.floor(viewFrom16to17 / totalTimeView * 100)
            viewFrom8to10Percent = Math.floor(viewFrom8to10 / totalTimeView * 100)
            viewRemainPercent = 100 - viewFrom16to17Length - viewFrom8to10Percent
        }



        return (
            <View style={styles.graphBlock}>
                <View style={styles.graphRow}>
                    <Text small style={styles.graphLabel}>Khách hàng</Text>
                    <View style={styles.graphDraw}>
                        <View>
                            <View style={styles.row}>
                                <Text small style={{ ...styles.textCenter, width: femaleBarLength }}>{femalePercent}% Nữ</Text>
                                <Text small style={{ ...styles.textCenter, width: maleBarLength }}>{malePercent}% Nam</Text>
                            </View>
                            <View style={styles.graphDraw}>
                                <View style={{ ...styles.bar, ...styles.backgroundBlue, width: femaleBarLength }}></View>
                                <View style={{ ...styles.bar, ...styles.backgroundPrimary, width: maleBarLength }}></View>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.graphRow}>
                    <Text small style={styles.graphLabel}>Chi tiêu</Text>
                    <View>
                        <View style={styles.row}>
                            <Text small style={{ ...styles.textCenterBottom, width: incomeLevel1Length }}>{incomeLevel1Percent}%</Text>
                            <Text small style={{ ...styles.textCenterBottom, width: incomeLevel2Length }}>{incomeLevel2Percent}%</Text>
                            <Text small style={{ ...styles.textCenterBottom, width: incomeLevel3Length }}>{incomeLevel3Percent}%</Text>
                        </View>
                        <View style={styles.graphDraw}>
                            <View style={{ ...styles.bar, ...styles.backgroundBlue, width: incomeLevel1Length }}></View>
                            <View style={{ ...styles.bar, ...styles.backgroundPrimary, width: incomeLevel2Length }}></View>
                            <View style={{ ...styles.bar, ...styles.backgroundGrey, width: incomeLevel3Length }}></View>
                        </View>
                        <View style={styles.row}>
                            <Text small primary style={{ ...styles.rightText, width: incomeLevel1Length }}>&lt;2tr</Text>
                            <Text small primary style={{ ...styles.rightText, width: incomeLevel2Length }}>&lt;5tr</Text>
                            <Text small transparent style={{ ...styles.rightText, width: incomeLevel3Length }}>''</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.graphRow}>
                    <Text small style={styles.graphLabel}>Thời gian xem KM</Text>
                    <View>
                        <View style={styles.row}>
                            <Text small style={{ ...styles.textCenter, width: viewFrom16to17Length }}>{viewFrom16to17Percent}%</Text>
                            <Text small style={{ ...styles.textCenter, width: viewFrom8to10Length }}>{viewFrom8to10Percent}%</Text>
                            <Text small style={{ ...styles.textCenter, width: viewRemainLength }}>{viewRemainPercent}%</Text>
                        </View>
                        <View style={styles.graphDraw}>
                            <View style={{ ...styles.bar, ...styles.backgroundBlue, width: viewFrom16to17Length }}></View>
                            <View style={{ ...styles.bar, ...styles.backgroundPrimary, width: viewFrom8to10Length }}></View>
                            <View style={{ ...styles.bar, ...styles.backgroundGrey, width: viewRemainLength }}></View>
                        </View>
                        <View style={styles.row}>
                            <Text small primary style={{ ...styles.textCenter, width: viewFrom16to17Length }}>16h-17h</Text>
                            <Text small primary style={{ ...styles.textCenter, width: viewFrom8to10Length }}>8h-10h</Text>
                            <Text small transparent style={{ ...styles.textCenter, width: viewRemainLength }}>''</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.graphRow}>
                    <Text small style={styles.graphLabel}>Khoảng cách</Text>
                    <View>
                        <View style={styles.row}>
                            <Text small style={{ ...styles.textCenter, width: distanceLevel1Length }}>{distanceLevel1Percent}%</Text>
                            <Text small style={{ ...styles.textCenter, width: distanceLevel2Length }}>{distanceLevel2Percent}%</Text>
                            <Text small style={{ ...styles.textCenter, width: distanceLevel3Length }}>{distanceLevel3Percent}%</Text>
                        </View>
                        <View style={styles.graphDraw}>
                            <View style={{ ...styles.bar, ...styles.backgroundBlue, width: distanceLevel1Length }}></View>
                            <View style={{ ...styles.bar, ...styles.backgroundPrimary, width: distanceLevel2Length }}></View>
                            <View style={{ ...styles.bar, ...styles.backgroundGrey, width: distanceLevel3Length }}></View>
                        </View>
                        <View style={styles.row}>
                            <Text small primary style={{ ...styles.rightText, width: distanceLevel1Length }}>&lt;2km</Text>
                            <Text small primary style={{ ...styles.rightText, width: distanceLevel2Length }}>&lt;   5km</Text>
                            <Text small transparent style={{ ...styles.rightText, width: distanceLevel3Length }}></Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
    render() {
        const { report, place, selectedPlace } = this.props
        let dropdownValues = place.listPlace.map(item => ({
            id: item.placeId,
            name: item.address
        }))

        return (
            <Container style={styles.container}>
                <TopDropdown ref='placeDropdown' dropdownValues={dropdownValues} 
                    onSelect={this._handleTopDrowpdown}
                    selectedOption={selectedPlace}
                />
                <View style={{ marginTop: 50, height: '100%' }}>
                    <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter' defaultFilter='week' />
                    {/*<Content>*/}
                    <MapView
                        region={this.state.region}
                        provider={PROVIDER_GOOGLE}
                        style={{ width: '100%', height: '100%' }}
                        onRegionChange={this.onRegionChange}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        moveOnMarkerPress={false}
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
                    {/*{this._renderCustomerStatistic()}*/}
                    {/*</Content>*/}
                </View>
            </Container>
        )
    }
}