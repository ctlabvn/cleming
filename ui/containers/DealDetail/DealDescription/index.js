import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native'
import styles from './styles'

export default class extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.dealTitle}>Deal Title</Text>
                <View style={styles.dealTimeContainer}>
                    <Text style={styles.dealTime}>fromTime to toTime: </Text>
                    <Text style={styles.dealExprie}>Số ngày còn lại</Text>
                </View>
                <View style={styles.dealBriefContainer}>
                    <View style={styles.dealBriefTitleParent}>
                    <Text style={styles.dealBriefTitle}>Tặng</Text>
                    </View>
                    <View style={styles.dealPercentParent}>
                    <Text style={styles.dealPercent}>-25%</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.dealDes}>
                        HLV Ronald Koeman của Everton khẳng định, ông sẽ không bao giờ dẫn dắt Real Madrid. Bên cạnh đó, cựu danh thủ này còn khẳng định ước mơ được cầm quân ở ĐT Hà Lan và CLB cũ Barcelona.
                        HLV Eduardo Berizzo của Celta Vigo cho biết, ông cùng các học trò luôn dành sự tôn trọng cho M.U  nhưng điều đó không có nghĩa là họ sợ đối thủ này ở trận bán kết lượt đi Europa League.
                        Tiền đạo 20 tuổi Calvert-Lewin vừa được Everton mời ký hợp đồng mới kéo dài cho tới năm 2022. Calvert-Lewin chuyển tới khoác áo Everton hồi tháng 8 năm ngoái với giá 1,5 triệu bảng.
                    </Text>
                </ScrollView>
            </View>
        )
    }
}