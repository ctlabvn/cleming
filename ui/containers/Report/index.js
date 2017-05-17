import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, ListItem, Text, Button, Spinner } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import * as commonActions from '~/store/actions/common'
import * as reportActions from '~/store/actions/report'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import Content from '~/ui/components/Content'
// import MapView from 'react-native-maps'
@connect(state => ({
    user: state.auth.user,
    place: state.place,
    booking: state.booking,
    report: state.report
}), { ...commonActions, ...reportActions })
export default class Report extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let allPlace = this.props.place.listPlace.map(item => item.placeId).join(';')
        console.log('All place report', allPlace)
        this.props.getCustomerReport(this.props.user.xsession, allPlace)
    }
    _sum(arr) {
        return arr.reduce((x1, x2) => x1 + x2, 0)
    }
    _renderCusterStatistic() {
        const { report } = this.props
        if (!report) {
            return <Text>Loading statistic...</Text>
        }
        const userInfo = report.customer.userInfo
        const baseLength = 250

        //Caculate gender visual
        const femaleRate = parseInt(userInfo.femaleNumber) / (parseInt(userInfo.femaleNumber) + parseInt(userInfo.maleNumber))
        const femalePercent = Math.floor(femaleRate * 100)
        const malePercent = 100 - femalePercent
        const femaleBarLength = Math.floor(femaleRate * baseLength)
        const maleBarLength = baseLength - femaleBarLength

        // Caculate IncomeLevel visual
        const totalIncomeLevel = this._sum(userInfo.incomeLevels)
        const incomeLevel1Rate = userInfo.incomeLevels[0] / totalIncomeLevel
        const incomeLevel2Rate = userInfo.incomeLevels[1] / totalIncomeLevel
        const incomeLevel1Percent = Math.floor(incomeLevel1Rate * 100)
        const incomeLevel2Percent = Math.floor(incomeLevel2Rate * 100)
        const incomeLevel3Percent = 100 - incomeLevel1Percent - incomeLevel2Percent
        const incomeLevel1Length = Math.floor(incomeLevel1Rate * baseLength)
        const incomeLevel2Length = Math.floor(incomeLevel2Rate * baseLength)
        const incomeLevel3Length = baseLength - incomeLevel1Length - incomeLevel2Length

        // Caculate distance visual
        const totalDistanceLevel = this._sum(userInfo.distanceLevels)
        const distanceLevel1Rate = userInfo.distanceLevels[0] / totalDistanceLevel
        const distanceLevel2Rate = userInfo.distanceLevels[1] / totalDistanceLevel
        const distanceLevel1Percent = Math.floor(distanceLevel1Rate * 100)
        const distanceLevel2Percent = Math.floor(distanceLevel2Rate * 100)
        const distanceLevel3Percent = 100 - distanceLevel1Percent - distanceLevel2Percent
        const distanceLevel1Length = Math.floor(distanceLevel1Rate * baseLength)
        const distanceLevel2Length = Math.floor(distanceLevel2Rate * baseLength)
        const distanceLevel3Length = baseLength - distanceLevel1Length - distanceLevel2Length

        let viewFrom16to17Length
        let viewFrom8to10Length
        let viewRemainLength
        let viewFrom16to17Percent
        let viewFrom8to10Percent
        let viewRemainPercent
        let viewFrom16to17
        let viewFrom8to10
        let viewRemain
        let totalTimeView = this._sum(userInfo.timeView)
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
                                <Text small style={{ ...styles.textCenter, width: femaleBarLength }}>{femalePercent}%</Text>
                                <Text small style={{ ...styles.textCenter, width: maleBarLength }}>{malePercent}%</Text>
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
                            <Text small primary style={{ ...styles.rightText, width: incomeLevel1Length }}>2tr</Text>
                            <Text small primary style={{ ...styles.rightText, width: incomeLevel2Length }}>5tr</Text>
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


                    {/*<View style={styles.graphDraw}>
                        <View style={{ ...styles.graphDrawPart, width: viewFrom16to17Length }}>
                            <Text small>{viewFrom16to17Percent}%</Text>
                            <View style={{ ...styles.bar, ...styles.backgroundBlue }}></View>
                            <Text small primary>16h-17h</Text>
                        </View>
                        <View style={{ ...styles.graphDrawPart, width: viewFrom8to10Length }}>
                            <Text small>{viewFrom8to10Percent}%</Text>
                            <View style={{ ...styles.bar, ...styles.backgroundPrimary }}></View>
                            <Text small primary>8h-10h</Text>
                        </View>
                        <View style={{ ...styles.graphDrawPart, width: viewRemainLength }}>
                            <Text small>{viewRemainPercent}%</Text>
                            <View style={{ ...styles.bar, ...styles.backgroundGrey }}></View>
                            <Text small transparent>""</Text>
                        </View>
                    </View>*/}
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
                            <Text small primary style={{ ...styles.rightText, width: distanceLevel1Length }}>2km</Text>
                            <Text small primary style={{ ...styles.rightText, width: distanceLevel2Length }}>5km</Text>
                            <Text small transparent style={{ ...styles.rightText, width: distanceLevel3Length }}></Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
    render() {
        {/*<MapView
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />*/}
        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.mapPlaceholder}></View>
                    {this._renderCusterStatistic()}
                </Content>
            </Container>
        )
    }
}