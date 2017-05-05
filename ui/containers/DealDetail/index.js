import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import styles from './styles'

import DealDescription from './DealDescription'

export default class extends Component {

    render() {
        return(
        <View style={styles.mainContainer}>
            <View style={styles.placeAddress}>
                <Text style={styles.placeAddressSub}>33 Nguyễn Chí Thanh, Ba Đình, HN</Text>
            </View>
            <View style={styles.listDealImage}>
                <Text>List deal image</Text>
            </View>
            <View style={styles.dealDes}>
                <DealDescription />
            </View>
            <View style={{width: '100%', height: '10%', flexDirection: 'row'}}>
                <TouchableOpacity style={{backgroundColor: '#00a9d4', width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: '#ffffff'}}>Tạo KM tương tự</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#fbb03b', width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: '#ffffff'}}>Tạo KM mới</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}