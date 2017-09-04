/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import { Image } from 'react-native'
import {
    Grid, Col, Row, Text
} from 'native-base'
import CacheableImage from '~/ui/components/CacheableImage'
import Icon from '~/ui/elements/Icon'
import styles from '../../styles'
import material from '~/theme/variables/material.js'

export default class OwnerCard extends Component {
    render() {
        let data = this.props.data
        return (
            <Grid>
                <Col style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                    {data.avatar ? <Image style={styles.avatar} source={{uri: data.avatar}}/>
                    : <Icon name="account" style={styles.icon} />}

                </Col>
                <Col style={{ width: '80%'}}>
                    <Row style={{ height: '50%', alignItems: 'flex-end'}}>
                        <Text medium style={styles.nameText}>{data.fullName}</Text>
                    </Row>
                    <Row style={{height: '50%'}}>
                        {(data.accTitle == 1 ? <Text small style={styles.subTitleText}>Owner</Text>
                            : <Text medium style={styles.nameText}>{data.phoneNumber}</Text>)}
                    </Row>
                </Col>
            </Grid>
        )
    }
}