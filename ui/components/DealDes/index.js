import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import styles from './styles'

import SpendingLevel from './SpendingLevel'

export default class extends Component {

    constructor(prop) {
        super(prop)
    }

    render() {
        const {deal} = this.props
        return (
            <View style={styles.dealContent}>
                <Image style={styles.dealImage} source = {{uri: deal.dealImage}} />
                <View style={styles.dealDes}>
                    <Text style={styles.dealTitle}>{deal.dealTitle}</Text>
                    <Text style={styles.placeName}>{deal.placeName}</Text>
                    <SpendingLevel numberSpl = {deal.spendingLevel} style={styles.spendingLevel}/>
                    <View style={styles.dealDesSub}>
                        <View></View>
                        <View style={styles.dealDetail}>
                            <Text style={styles.textTang}>Tặng</Text>
                            <View style={styles.view}></View>
                            <Text style={styles.salePercen}>{deal.salePercen}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}