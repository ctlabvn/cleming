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
import CacheableImage from '~/ui/components/CacheableImage'

import * as authSelectors from '~/store/selectors/auth'
import * as accountActions from '~/store/actions/account'

import styles from './styles'
const img = 'https://facebook.github.io/react/img/logo_og.png'

const formSelector = formValueSelector('UpdateUserForm')
@connect(state=>({
  session: authSelectors.getSession(state),
  user: authSelectors.getUser(state)
}), { ...accountActions }, (stateProps, dispatchProps, ownProps)=>({
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
    
    handleChoosePhoto = (response)=>{
      console.log(response)
      let formData = new FormData()
      formData.append("avatarFile", response.uri)
      //formData.append('Content-Type', 'image/jpeg');
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('POST', 'http://dev.clingme.net:9099/edit/avatar');
      xhr.setRequestHeader('X-SESSION', this.props.session)
      xhr.setRequestHeader('X-VERSION', 1)
      xhr.setRequestHeader('X-AUTH', '')
      xhr.setRequestHeader('X-DATA-VERSION', 1)
      xhr.setRequestHeader('X-TIMESTAMP', Math.floor((new Date().getTime()) / 1000))
      xhr.setRequestHeader('Content-Type', 'multipart/form-data')
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.addEventListener("readystatechange", function () {
        console.log(xhr)
      });
  
      xhr.send(formData);
      /*formData.append('avatarFile', uri.replace('file://', ''))
      this.props.updateOwnerAvatar(this.props.session, formData)*/
    }
    
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.avatarContainer}>
                            <CacheableImage
                              style={styles.avatar}
                              source={{uri: this.props.user.avatar || img}} />
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