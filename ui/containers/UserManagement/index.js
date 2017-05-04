/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'

import { Text } from 'react-native'

import styles from './styles'

const img = 'http://wordsmith.org/words/images/avatar2_large.png'
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

class UserCard extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.userName}</Text>
            </View>
        )
    }
}


class UserManagement extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            
        }
    }
    
    renderEmployeeRow(data) {
        return (
            <ListItem style={styles.listEmployeeItem}>
                <Grid>
                    <Col style={{backgroundColor: 'red', width: '30%'}}>
                        <Text>Avatar</Text>
                    </Col>
                    <Col style={{backgroundColor: 'blue', width: '70%'}}>
                        <Row style={{backgroundColor: 'blue', height: '50%'}}>
                            <Text>Name</Text>
                        </Row>
                        <Row style={{backgroundColor: 'green', height: '50%'}}>
                            <Text>Sub</Text>
                        </Row>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
    
    renderRow(data) {
        return (
            <ListItem style={styles.listItem}>
                <UserCard userName={data.owner.userName}/>
                <List
                    dataArray={data.employeeList}
                    renderRow={this.renderEmployeeRow.bind(this)}/>
            </ListItem>
        )
    }
    
    render() {
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <List
                        dataArray={data}
                        renderRow={this.renderRow.bind(this)}/>
                </Content>
            </Container>
        )
    }
}

export default UserManagement