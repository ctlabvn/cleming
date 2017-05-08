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

import {
    InputField,
    CheckBoxField,
    DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'
import PhotoChooser from '~/ui/components/PhotoChooser'

import styles from './styles'

const formSelector = formValueSelector('UpdateUserForm')
@connect(state=>({
    
}), {}, (stateProps, dispatchProps, ownProps)=>({
    initialValues: {
        
    },
    ...ownProps, ...stateProps, ...dispatchProps,
}))
@reduxForm({ form: 'UpdateUserForm'})

export default class UpdateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    handleChoosePhoto = ({uri, data})=>{
        // update 'data:image/jpeg;base64,' + data
        this.setState({avatar:{uri}})
    }
    
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.avatarContainer}>
                            <View style={{width: 120, height: 120, backgroundColor: '#d9d9d9', borderRadius: 60}}/>
                            <PhotoChooser style={styles.photoIcon} onSuccess={this.handleChoosePhoto}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                iconStyle={styles.inputIcon}
                                icon="edit_personal"
                                style={styles.inputField}
                                label="Nguyen Thi Bee"
                                name="name"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                            <Field
                                iconStyle={styles.inputIcon}
                                icon="edit_personal"
                                style={styles.inputField}
                                label="bee@company.com"
                                name="email"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                            <Field
                                iconStyle={styles.inputIcon}
                                icon="edit_personal"
                                style={styles.inputField}
                                label="1234556789"
                                name="phone"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Grid>
                                <Col>
                                    <Button style={styles.updatePasswordButton}>
                                        <Icon name="pass_word"/>
                                        <Text style={styles.updatePasswordButtonText}>Thay đổi mật khẩu</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}