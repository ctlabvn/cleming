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

import {
    InputField,
    CheckBoxField,
    DateField,
} from '~/ui/elements/Form'

import styles from './styles'

const formSelector = formValueSelector('CreateUserForm')
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
    
    render() {
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <Field
                        inputStyle={styles.inputField}
                        label="Type a name"
                        name="name"
                        component={InputField}
                        placeholderTextColor="#7e7e7e"/>
                    <Field
                        icon="home"
                        onPress={this.onJobPositionFocus.bind(this)}
                        editable={false}
                        inputStyle={styles.inputField}
                        label="Vị trí kinh doanh"
                        name="name"
                        component={InputField}
                        placeholderTextColor="#7e7e7e"/>
                </Content>
            </Container>
        )
    }
}