import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Input, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import Content from '~/ui/components/Content'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import * as commonActions from '~/store/actions/common'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
@connect(null, commonActions)
@reduxForm({ form: 'TestForm' })
export default class MerchantOverview extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { handleSubmit, submitting, forwardTo } = this.props
        var dropdownValues = [
            {
                id: 0,
                name: "Tất cả địa điểm"
            },
            {
                id: 2,
                name: "33 Nguyễn Chí Thanh, Ba Đình, HN"
            },
            {
                id: 3,
                name: "105 Láng Hạ, Đống Đa, HN"
            },
            {
                id: 4,
                name: "98 Hoàng Quốc Việt, Cầu Giấy, HN",
            },
            {
                id: 5,
                name: "5 Đinh Tiên Hoàng, Hoàn Kiếm, HN"
            },
            {
                id: 6,
                name: "69 Bạch Mai, Hai Bà Trưng, HN"
            }
        ]
        var defaultSelected = {
            id: 0,
            name: "Tất cả địa điểm"
        }
        return (
            <View style={styles.container}>
                <TopDropdown dropdownValues={dropdownValues} onSelect={this._handleTopDrowpdown} selectedOption={defaultSelected} />
                <View style={styles.contentContainer}>
                    {/*<View style={{width: '100%', height: 200, backgroundColor: 'lightblue'}}></View>*/}
                    <Image source={require('~/assets/images/store_with_background.jpg')} style={{ width: '100%', height: 150 }} />
                    <Text style={styles.timeInteval}>13/4/2017 đến 20/4/2017</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemBorderRight}>
                            <Text style={styles.infoItemNumber}>64.419</Text>
                            <Text style={styles.infoItemLabel}>Tiếp cận</Text>
                        </View>
                        <View style={styles.infoItemBorderRight}>
                            <Text style={styles.infoItemNumber}>4.267</Text>
                            <Text style={styles.infoItemLabel}>Xem</Text>
                        </View>
                        <View style={styles.infoItemBorderRight}>
                            <Text style={styles.infoItemNumber}>1.606</Text>
                            <Text style={styles.infoItemLabel}>Tìm hiểu</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={{ ...styles.infoItemNumber, color: 'green' }}>45</Text>
                            <Text style={styles.infoItemLabel}>Mua</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>forwardTo('transactionList')}>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='transaction' style={styles.icon} />
                                <Text>Giao dịch</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <Text style={styles.numberRight}>6</Text>
                                <Icon name='chevron-right' style={styles.rightIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='calendar-checked' style={styles.icon} />
                                <Text>Đặt chỗ</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <Text style={styles.numberRight}>6</Text>
                                <Icon name='chevron-right' style={styles.rightIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.menuItem}>
                            <View style={styles.leftBlock}>
                                <Icon name='shiping-bike2' style={styles.icon} />
                                <Text>Đặt giao hàng</Text>
                            </View>
                            <View style={styles.rightBlock}>
                                <Text style={styles.numberRight}>6</Text>
                                <Icon name='chevron-right' style={styles.rightIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>

                </View>
            </View>
        )
    }
}