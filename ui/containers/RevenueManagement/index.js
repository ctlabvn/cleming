import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'
import styles from './styles'

export default class extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Text medium primary>
                    Quản lý doanh thu
                </Text>
            </Container>
        )
    }
}