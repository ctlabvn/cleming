/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import {
    Grid, Col, Row
} from 'native-base'
import CacheableImage from '~/ui/components/CacheableImage'

import { Text } from 'react-native'

import styles from '../../styles'

export default class UserCard extends Component {
    render() {
        let data = this.props.data
        return (
            <Grid>
                <Col style={{ width: '20%', justifyContent: 'center'}}>
                    <CacheableImage style={styles.avatar} source={{uri: data.img}} />
                </Col>
                <Col style={{width: '80%'}}>
                    <Row style={{ height: '50%', alignItems: 'flex-end'}}>
                        <Text style={styles.nameText}>{data.email} / {data.phone}</Text>
                    </Row>
                    <Row style={{ height: '50%'}}>
                        <Text style={styles.subTitleText}>{data.jobTitle} - {data.address}</Text>
                    </Row>
                </Col>
            </Grid>
        )
    }
}