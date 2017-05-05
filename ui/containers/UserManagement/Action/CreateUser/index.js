/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Dash from 'react-native-dash';

import {
    InputField,
    CheckBoxField,
    DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'

import { validate, renderGroupAddress } from './utils'
import styles from './styles'

const data = []
for (let i = 0; i < 5; i++) {
    data.push({
        address: 'Hoang Quoc Viet'
    })
}

const formSelector = formValueSelector('CreateUserForm')
@connect(state=>({
    
}), {}, (stateProps, dispatchProps, ownProps)=>({
    initialValues: {
        GroupAddress: data
    },
    ...ownProps, ...stateProps, ...dispatchProps,
}))
@reduxForm({ form: 'CreateUserForm'})

export default class CreateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    onJobPositionFocus() {
        console.log("OKKKK")
    }
    
    onPermissionFocus() {
        console.log("OKKKK")
    }
    
    onMarkAllPress() {
        this.setState({
            markedAll: !this.state.markedAll
        })
    }
    
    render() {
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.inputContainer}>
                            <Field
                                style={styles.inputField}
                                label="Họ và tên"
                                name="name"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                style={styles.inputField}
                                label="Email"
                                name="email"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                style={styles.inputField}
                                label="Phone number"
                                name="phone"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={{}}
                                iconStyle={styles.inputIcon}
                                icon="foward"
                                onPress={this.onJobPositionFocus.bind(this)}
                                editable={false}
                                style={styles.inputField}
                                label="Vị trí kinh doanh"
                                name="position"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={{}}
                                iconStyle={styles.inputIcon}
                                icon="foward"
                                onPress={this.onPermissionFocus.bind(this)}
                                editable={false}
                                style={styles.inputField}
                                label="Phân quyền"
                                name="permission"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <Dash
                            dashLength={2}
                            dashColor={'#a2a2a2'}
                            dashThickness={1}
                            style={{flex: 1, marginBottom: 10}}/>
                        <View>
                            <Grid>
                                <Col style={{alignItems: 'center'}}>
                                    <Text style={styles.leftAddressTitleText}>Thời gian làm việc</Text>
                                </Col>
                                <Col/>
                            </Grid>
                        </View>
                        <View>
                            <Grid>
                                <Col style={{alignItems: 'center'}}>
                                    <View style={{...styles.inputContainer, marginRight: 10}}>
                                        <Field
                                            style={styles.inputField}
                                            label="7:00"
                                            name="fromDate"
                                            component={InputField}
                                            placeholderTextColor="#7e7e7e"/>
                                    </View>
                                </Col>
                                <Col style={{alignItems: 'center'}}>
                                    <View style={{...styles.inputContainer, marginLeft: 10}}>
                                        <Field
                                            style={styles.inputField}
                                            label="21:00"
                                            name="toDate"
                                            component={InputField}
                                            placeholderTextColor="#7e7e7e"/>
                                    </View>
                                </Col>
                            </Grid>
                        </View>
                        <Dash
                            dashLength={2}
                            dashColor={'#a2a2a2'}
                            dashThickness={1}
                            style={{flex: 1, marginBottom: 10}}/>
                        <FieldArray name="GroupAddress" component={renderGroupAddress}/>
                        <View style={{marginTop: 15}}>
                            <Grid>
                                <Col>
                                    <Button style={styles.createPasswordButton}>
                                        <Text style={styles.createPasswordButtonText}>Tạo mật khẩu đăng nhập</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                        <View style={{marginTop: 40}}>
                            <Grid>
                                <Col/>
                                <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={styles.passwordText}>ABC123</Text>
                                </Col>
                                <Col style={{ justifyContent: 'center', flexDirection: 'row'}}>
                                    <Col style={{alignItems: 'flex-end', width: '70%'}}>
                                        <Icon
                                            style={styles.copyIcon}
                                            name="menu"/>
                                    </Col>
                                    <Col style={{justifyContent: 'center', width: '30%'}}>
                                        <Text style={styles.copyText}>Copy</Text>
                                    </Col>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Grid>
                            <Col>
                                <Button style={styles.submitButton}>
                                    <Text style={styles.createPasswordButtonText}>OK</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                </Content>
            </Container>
        )
    }
}