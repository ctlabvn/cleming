/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import {
    Grid, Col, Row, Text
} from 'native-base'
import CacheableImage from '~/ui/components/CacheableImage'

import styles from '../../styles'

export default class UserCard extends Component {
    render() {
        let data = this.props.data
        let jobTitle = null
        switch (data.titleType) {
          case 1: {
            jobTitle = "Nhân Viên"
          }
        }
        return (
            <Grid>
                <Col style={{ width: '20%', justifyContent: 'center'}}>
                    <CacheableImage style={styles.avatar} source={{uri: data.avatar}} />
                </Col>
                <Col style={{width: '80%'}}>
                    <Row style={{ height: '50%', alignItems: 'flex-start'}}>
                        <Text medium numberOfLines={1} style={styles.nameText}>{data.userName}</Text>
                    </Row>
                    <Row style={{ height: '50%', alignItems: 'flex-end'}}>
                        <Text medium style={styles.nameText}>{data.phoneNumber}</Text>
                    </Row>
                </Col>
            </Grid>
        )
    }
}