import React, {Component} from 'react'
import {Container, Text} from 'native-base'

import styles from './styles'

export default class extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Text medium bold warning>
                    chi tiết quản lý doanh thu
                </Text>
            </Container>
        )
    }
}