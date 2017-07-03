/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox, Thumbnail,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text, Platform } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
// var RNUploader = require('react-native-uploader');

// var RNUploader = NativeModules.RNUploader

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
import * as commonActions from '~/store/actions/common'

import styles from './styles'
// const img = 'https://facebook.github.io/react/img/logo_og.png'

import {profileCoverSource} from '~/assets'

import material from '~/theme/variables/material.js'

const formSelector = formValueSelector('UpdateUserForm')
@connect(state=>({
  session: authSelectors.getSession(state),
  user: authSelectors.getUser(state),
  formValues: formSelector(state, 'name', 'email', 'phone')
}), { ...accountActions, ...commonActions }, (stateProps, dispatchProps, ownProps)=>{
  return ({
    initialValues: {
      enableReinitialize: true,
      name: stateProps.user.fullName || '',
      email: stateProps.user.email,
      phone: stateProps.user.phoneNumber
    },
    ...ownProps, ...stateProps, ...dispatchProps,
  })
})
@reduxForm({ form: 'UpdateUserForm'})

export default class UpdateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        
    }

    componentDidMount() {
        this.componentWillFocus();
    }

    componentWillFocus() {
        // console.warn(JSON.stringify(this.props.initialValues, null, 2));
        // console.warn(JSON.stringify(this.props.user, null, 2));
        this.props.change('name', this.props.initialValues.name);
        this.props.change('email', this.props.initialValues.email);
        this.props.change('phone', this.props.initialValues.phone);
    }
    
    handleChoosePhoto = (response)=>{
      console.log(response)
      
      /*formData.append('avatarFile', uri.replace('file://', ''))
      this.props.updateOwnerAvatar(this.props.session, formData)*/
      /*let files = [
        {
          name: response.fileName,
          filename: 'image1.png',
          filepath: response.origURL,
          filetype: 'image/jpeg',
        },
        // {
        //   name: 'file[]',
        //   filename: 'image2.gif',
        //   filepath: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
        //   filetype: 'image/gif',
        // },
      ];
    
      let opts = {
        url:
          'http://localhost:86/php/clingme.php',
         // 'http://dev.clingme.net:9099/edit/avatar',
        files: files,
        method: 'POST',                             // optional: POST or PUT
        headers: //{ 'Accept': 'application/json' },  // optional
        {
            'Accept': 'application/json',
            // 'Content-Type': undefined,// 'multipart/form-data',
            'X-VERSION': 1,
            'X-SESSION': this.props.session,
            'X-AUTH': '',
            'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
            'X-DATA-VERSION': 1
          }
        // params: { 'user_id': 1 },                   // optional
      };
    
      RNUploader.upload( opts, (err, response) => {
        if( err ){
          console.log(err);
          return;
        }
      
        let status = response.status;
        let responseString = response.data;
        let json = JSON.parse( responseString );
    
        console.log('upload complete with status ' + status, json);
      });*/
  
      let source = {
          name: 'image[]',
          filename: `image_${(new Date()).getTime()}`,
          data: RNFetchBlob.wrap(response.uri)
        };

      let imageFiles = [source]
  
      RNFetchBlob.fetch('POST', 'http://dev.clingme.net:9099/edit/avatar', {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'X-VERSION': 1,
        'X-SESSION': this.props.session,
        'X-AUTH': '',
        'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
        'X-DATA-VERSION': 1
      }, imageFiles)
      // listen to upload progress event
        .uploadProgress((written, total) => {
          console.log('uploaded', written / total)
        })
        // listen to download progress event
        .progress((received, total) => {
          console.log('progress', received / total)
        })
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => {
          // ...
          console.log(err)
        })
      

    }
    
    onSubmitUserInfo() {
      console.log(this.props.formValues)
      let data = {
        fullName: this.props.formValues.name || '',
        email: this.props.formValues.email,
        phoneNumber: this.props.formValues.phone
      }
      this.props.updateProfile(this.props.session, data)
    }
    
    changePasswordPress() {
      const { forwardTo } = this.props
      forwardTo('changePassword')
    }
    
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: material.white500}}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.avatarContainer}>
                            <CacheableImage
                              style={styles.avatar}
                              placeholder={<Icon name="image" style={{width: 120, height: 120}} />}
                              source={{uri: this.props.user.avatar}} />
                            {
                            // <PhotoChooser style={styles.photoIcon} onSuccess={this.handleChoosePhoto}/>  
                            }
                            
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                iconStyle={styles.inputIcon}
                                icon="edit_personal"
                                style={styles.inputField}
                                label="Họ và tên"
                                name="name"
                                component={InputField}
                                placeholderTextColor={material.gray500}/>
                            <Field
                                iconStyle={styles.inputIcon}
                                icon="edit_personal"
                                style={styles.inputField}
                                label="Email"
                                name="email"
                                component={InputField}
                                placeholderTextColor={material.gray500}/>
                            <Field
                                editable={false}
                                iconStyle={styles.inputIcon}
                                style={styles.inputField}
                                inputStyle={{
                                    color: material.gray500
                                }}
                                keyboardType="numeric"
                                label="Số điện thoại"
                                name="phone"
                                component={InputField}
                                placeholderTextColor={material.gray500}/>
                        </View>
                        <View style={{marginTop: 40}}>
                          <Grid>
                            <Col style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                              <Icon
                                style={styles.changePasswordText}
                                name="pass_word"/>
                              <View style={{width: 10}}/>
                              <Text
                                onPress={this.changePasswordPress.bind(this)}
                                style={styles.changePasswordText}>Thay đổi mật khẩu</Text>
                            </Col>
                          </Grid>
                        </View>
                    </View>
                </Content>
                <Button
                  onPress={this.onSubmitUserInfo.bind(this)}
                  style={styles.updatePasswordButton}>
                  <Text style={styles.updatePasswordButtonText}>Đồng ý</Text>
                </Button>
            </Container>
        )
    }
}