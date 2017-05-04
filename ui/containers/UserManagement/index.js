/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import CacheableImage from '~/ui/components/CacheableImage'

import { Text } from 'react-native'

import styles from './styles'
import UserCard from './components/UserCard'
import OwnerCard from './components/OwnerCard'

const img = 'https://facebook.github.io/react/img/logo_og.png'
const data = []

for (let i = 0; i < 5; i++) {
    data.push({
        owner: {
            userName: 'User Name',
            img: img
        },
        employeeList: [
            { email: 'Email', phone: 'Phone Number', jobTitle: 'Manager', address: 'Hoang Quoc Viet', img: img},
            { email: 'Email', phone: 'Phone Number', jobTitle: 'Cashier', address: 'Hoang Quoc Viet', img: img},
            { email: 'Email', phone: 'Phone Number', jobTitle: 'Accountant', address: 'Hoang Quoc Viet', img: img}
        ]
    })
}

data.push({
    owner: {
        userName: 'User Name',
        img: img
    },
    employeeList: []
})

class UserManagement extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            
        }
    }
    
    componentDidMount() {
        
    }
    
    renderEmployeeRow(data, sectionID, rowID, highlightRow) {
        return (
            <ListItem style={styles.listEmployeeItem}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                            <Row style={styles.topLeftGrid}/>
                            <Row style={styles.bottomLeftGrid}/>
                        </Col>
                        <Col>
                            <Row style={[styles.topRightGrid, {borderBottomWidth: 1}]}/>
                            <Row style={[styles.bottomRightGrid, {borderTopWidth: 1}]}/>
                        </Col>
                    </Col>
                    <Col style={{width: '80%'}}>
                        <UserCard data={data}/>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
    
    renderBlueLineBelowOwner() {
        return (
            <View style={{height: 20}}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                            <Row style={styles.topLeftGrid}/>
                            <Row style={styles.bottomLeftGrid}/>
                        </Col>
                        <Col>
                            <Row style={styles.topRightGrid}/>
                            <Row style={styles.bottomRightGrid}/>
                        </Col>
                    </Col>
                    <Col style={{width: '80%'}}/>
                </Grid>
            </View>
        )
    }
    
    renderRow(data) {
        blueLineBelowOwner = null
        console.log()
        if (data.employeeList.length != 0) {
            blueLineBelowOwner = this.renderBlueLineBelowOwner()
        }
        return (
            <ListItem style={styles.listItem}>
                <Grid>
                    <Col>
                        <View style={{height: 40}}>
                            <OwnerCard data={data.owner}/>
                        </View>
                        {blueLineBelowOwner}
                        <List
                            dataArray={data.employeeList}
                            renderRow={this.renderEmployeeRow.bind(this)}/>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
    
    render() {
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <List
                        style={{marginBottom: 50, marginTop: 20}}
                        dataArray={data}
                        renderRow={this.renderRow.bind(this)}/>
                </Content>
                <Button style={styles.addUserButton}>
                    <Text style={styles.addUserText}>Add User</Text>
                </Button>
            </Container>
        )
    }
}

export default UserManagement