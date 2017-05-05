/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text } from 'react-native'
import { connect } from 'react-redux'

export default class UpdateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <Text>ABC</Text>
                </Content>
            </Container>
        )
    }
}