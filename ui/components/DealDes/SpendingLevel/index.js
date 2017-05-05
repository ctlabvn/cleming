import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native'
import {
    List,
    ListItem
} from 'native-base'
import styles from './styles'
import Icon from '~/ui/elements/Icon'

export default class extends Component {
    constructor(prop) {
        super(prop)
    }

    render() {
        const {numberSpl} = this.props
        switch (numberSpl) {
            case 1:
                return(
                    <View style={styles.container}>
                        <Icon name='coin_mark' style={styles.icon}/>
                    </View>
                )
            case 2:
                return(
                    <View style={styles.container}>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                    </View>
                )
            case 3:
                return(
                    <View style={styles.container}>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                    </View>
                )
            case 4:
                return(
                    <View style={styles.container}>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                    </View>
                )
            case 5:
                return(
                    <View style={styles.container}>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                        <Icon name='coin_mark' style={styles.icon}/>
                    </View>
                )
            default:
                return(
                        <View style={styles.container}>
                        </View>
                    )
        }
    }
}