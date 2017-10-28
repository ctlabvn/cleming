import React, {Component} from 'react'

import styles from './styles'
import {View, ScrollView, Linking, TouchableHighlight} from 'react-native'
import {Text, Button} from 'native-base'

import Icon from '~/ui/elements/Icon'
import {MODE} from '~/store/constants/api'

import {connect} from 'react-redux'
import * as commonActions from '~/store/actions/common'
import VersionNumber from 'react-native-version-number'
import CallModal from '~/ui/components/CallModal'
import {formatPhoneNumber} from '~/ui/shared/utils'

import material from '~/theme/variables/material'

@connect(null, commonActions)

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            phoneNumber: '02432121837'
        }
    }

    componentWillMount() {
        console.log('about again')
    }

    _openCallModal() {
        this.setState({
            modalOpen: true,
        })
    }

    _closeCallModal() {
        this.setState({
            modalOpen: false,
        })
    }

    _openFanPage() {
        Linking.openURL('https://www.facebook.com/app.clingme');
    }

    render() {
        return (
            <View style={styles.container}>
                <CallModal
                    phoneNumber={this.state.phoneNumber}
                    onCloseClick={() => this._closeCallModal()}
                    open={this.state.modalOpen}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Icon name="logo" style={styles.logoIcon}/>
                    <Text largeLight style={{...styles.textTitle, marginTop: 15}}>
                        Giới thiệu
                    </Text>
                    <Text medium style={styles.textContent}>
                        <Text strong bold style={styles.textRed}>Clingme</Text> – Đi Gần, Chọn Đúng; thấu hiểu hành
                        vi người dùng để gợi ý, tư vấn những cửa hàng xung
                        quanh phù hợp, thuận tiện.
                        Qua đó, Clingme cũng mang lại những khách hàng mới và trung thành tới cho quý đối tác.
                    </Text>
                    <Text medium style={styles.textContent}>
                        Ứng dụng <Text><Text strong bold style={styles.textBlueDark}>"Clingme - Đối
                        tác"</Text></Text> được
                        Clingme xây dựng dành riêng cho các đối tác hợp
                        tác bán hàng trên Clingme.
                        Với ứng dụng này, đối tác có thể:
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Icon name="coin_mark" style={{...styles.indicatorIcon, color: material.orange500}}/>
                            <Icon name="shiping-bike2" style={styles.indicatorIcon}/>
                        </View>
                        <Text medium style={styles.textSubContent}>
                            Theo dõi kết quả kinh doanh bất cứ lúc nào, tại bất cứ đâu, ngay trên điện thoại
                            của mình: các giao dịch tại nhà hàng, giao hàng hoặc đặt chỗ.
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Icon name="checked" style={{...styles.indicatorIcon, color: material.orange500}}/>
                            <Icon name="report2" style={styles.indicatorIcon}/>
                            <Icon name="like_s" style={{...styles.indicatorIcon, color: material.red500}}/>
                        </View>
                        <Text medium style={styles.textSubContent}>
                            Theo dõi và quản lý mức độ nổi tiếng cửa hàng của mình qua thông tin về các
                            tương
                            tác của khách hàng như số lượt xem, lượt đánh dấu, theo dõi, đăng ký nhận
                            khuyến
                            mại … theo thời gian thực. Đối tác cũng có thể xem các nhận xét, câu hỏi của
                            khách
                            hàng để trả lời ngay trên điện thoại.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Icon name="nearby" style={{...styles.indicatorIcon, color: material.blue500}}/>
                        </View>
                        <Text medium style={styles.textSubContent}>
                            Xem thông tin khách hàng tiềm năng Clingme xung quanh cửa hàng của mình để có
                            những
                            kế hoạch bán hàng hiệu quả.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Icon name="gift_point" style={{...styles.indicatorIcon, color: material.orange500}}/>
                            <Icon name="pin_location" style={{...styles.indicatorIcon, color: material.green400}}/>
                        </View>
                        <Text medium style={styles.textSubContent}>
                            Đặc biệt hơn, Ứng dụng <Text><Text strong bold style={styles.textBlueDark}>"Clingme -
                            Đối tác"</Text></Text> còn cho phép đối tác tự tạo chương
                            trình
                            ưu đãi và ngay lập tức tiếp cận tới hàng trăm ngàn người dùng Clingme.
                        </Text>
                    </View>

                    <Text largeLight style={styles.textTitle}>
                        Phiên bản
                    </Text>
                    <Text medium style={styles.textContent}>
                        {VersionNumber.appVersion}{MODE == 'DEV' && <Text><Text small error>-PRE</Text></Text>}
                    </Text>

                    <Text largeLight style={styles.textTitle}>
                        Liên hệ
                    </Text>
                    <Text medium style={{...styles.textContent}}>
                        Công ty Cổ phần Gigatum Việt Nam{'\n'}
                        Hà Nội: Unit 8 tầng 8, Toà nhà TNR, 54A Nguyễn Chí Thanh, Đống Đa, Hà Nội.{'\n'}
                        TP. Hồ Chí Minh: Tầng 5, tòa nhà GB Building, 78-80 Cách Mạng Tháng 8, Phường 6, Quận 3, TP. Hồ
                        Chí Minh, Việt Nam.
                    </Text>
                    <View style={styles.viewContent}>
                        <Text medium grayDark>Hotline: </Text>
                        <TouchableHighlight onPress={()=>this._openCallModal()}>
                            <Text medium red>{formatPhoneNumber(this.state.phoneNumber)}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.viewContent}>
                        <Text medium grayDark>Email: </Text>
                        <Text medium blue>support@gigatum.com</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <Text medium grayDark>Fanpage: </Text>
                        <TouchableHighlight underlayColor={material.white500} onPress={() => this._openFanPage()}>
                            <Text blue underline>www.facebook.com/app.clingme</Text>
                        </TouchableHighlight>
                        {/*<Text style={{...styles.textBlue, ...styles.textUnderline}}>www.facebook.com/app.clingme</Text>*/}
                    </View>

                    <Text medium style={styles.textContent}>
                        Clingme được thành lập từ 2013 với mục tiêu đem đến cho các nhà bán hàng kênh bán hàng hiệu quả
                        và nhanh chóng.
                    </Text>
                    <Icon name="logo" style={styles.logoIconDeep}/>
                </ScrollView>
            </View>
        )
    }
}