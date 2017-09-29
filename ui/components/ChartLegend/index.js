import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
export default class ChartLegend extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <View style={styles.row}>
                {this.props.data.map((item, index)=>(
                    <View style={styles.inline} key={item.name}>
                        <View style={{...styles.square, backgroundColor: item.color}} />
                        <Text>{item.name}</Text>
                    </View>
                ))}
            </View>
        )
    }
}