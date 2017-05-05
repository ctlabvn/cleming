import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import {
    List,
    ListItem
} from 'native-base'
import styles from './styles'

export default class extends Component {

    constructor(prop) {
        super(prop)
    }

    render() {
        const {chartData} = this.props
        const calulatedChart = this.calulateChart(chartData)
        // console.log(calulatedChart);
        return (
            <View style={styles.container}>
                {calulatedChart.map((value, key) => {
                    return (
                        <View key={key} style={styles.mainContainer}>
                            <Text style={styles.title}>{value.title}</Text>
                            <View style={styles.number}>
                                <Text style={styles.numberAbove}>{value.currentNumber}</Text>
                                <Text style={{...styles.numberUnder,
                                    color: value.currentBackgroundColor}}>{value.growth}</Text>
                            </View>
                            <View style={styles.view}>
                                <View style={{...styles.viewAbove,
                                    backgroundColor: value.currentBackgroundColor,
                                    width: value.widthCurrent}}></View>
                                <View style={{...styles.viewUnder,
                                    width: value.widthPast}}></View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
    
    calulateChart(chartData) {
        var mapValues1 = chartData.map(value=>value.currentNumber);
        var mapValues2 = chartData.map(value=>value.pastNumber);
        var tong = [...mapValues1, ... mapValues2];
        var max = Math.max(...tong);
        
        chartData.forEach((value, key) => {
            value['widthCurrent'] = Math.ceil(value.currentNumber/max * 150);
            value['widthPast'] = Math.ceil(value.pastNumber/max * 150);
            var growth = value.currentNumber - value.pastNumber;
            if (growth > 0) {
                value['currentBackgroundColor'] = '#38A049';
            } else {
                value['currentBackgroundColor'] = '#DE5B47';
            }
            
            value['growth'] = Math.abs(growth);
        })

        return chartData
    }
}