import React, {Component} from 'react'
import {
    Button,
    Icon,
    Container,
    Text,
    Item,
    View,
    Input,
} from 'native-base'
import BadgeSelector from '~/ui/components/BadgeSelector'
import styles from './styles'


export default class Setting extends Component {
    constructor(){
        super()
        this.listValue = [
            {
                id: 1,
                name: '0 giờ'
            },
            {
                id: 2,
                name: '6 giờ'
            },
            {
                id: 3,
                name: '12 giờ'
            },

        ]
        this.selectValue = {
            id: 2,
            name: '6 giờ'
        }
    }

    render() {
        return (

            <Container style={styles.container}>  
                <View style={styles.underlineItem}>
                    <Text style={styles.row}>Thời gian duyệt Cashback</Text>
                    <View style={styles.row}>
                        <BadgeSelector listValues={this.listValue} selectedValue={this.selectValue}/>
                    </View>
                </View>
            </Container>

        )
    }
}