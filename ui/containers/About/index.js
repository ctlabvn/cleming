import React, {Component} from 'react'

import styles from './styles'
import {View, Text, ScrollView} from 'react-native'

import Icon from '~/ui/elements/Icon'

import {connect} from 'react-redux'
import * as commonActions from '~/store/actions/common'

@connect(null, commonActions)

export default class extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Icon name="logo" style={styles.logoIcon}/>
                    <Text style={{...styles.textTitle, marginTop: 15}}>
                        Giới thiệu
                    </Text>
                    <Text style={styles.textContent}>
                        Ứng dụng "Đối tác Clingme" giúp cho các nhà bán hàng trên Clingme theo dõi các giao dịch của
                        khách
                        hàng với cửa hàng của mình thông qua chiếc smartphone của mình.
                        Các nhà bán hàng có thể kiểm tra nhanh khách hàng tiềm năng, hiệu quả bán hàng, doanh thu cũng
                        như
                        tình trạng các đơn hàng.
                    </Text>
                    <Text style={styles.textTitle}>
                        Phiên bản
                    </Text>
                    <Text style={styles.textContent}>
                        1.x
                    </Text>
                    <Text style={styles.textTitle}>
                        Liên hệ
                    </Text>
                    <Text style={{...styles.textContent, ...styles.textBlue}}>
                        support@gigatum.com
                    </Text>
                    <Text style={styles.textContent}>
                        Clingme được thành lập từ 2013 với mục tiêu đem đến cho các nhà bán hàng kênh bán hàng hiệu quả
                        và nhanh chóng.
                    </Text>
                    <Icon name="logo" style={styles.logoIconDeep}/>
                </ScrollView>
            </View>
        )
    }
}