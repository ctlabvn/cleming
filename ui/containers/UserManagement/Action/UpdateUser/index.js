/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text, Platform } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
var RNUploader = require('react-native-uploader');

// var RNUploader = NativeModules.RNUploader

import RNFetchBlob from 'react-native-fetch-blob'

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

import {profileCoverSource} from '~/assets'

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
  
      // let source = {};
  
      // if (Platform.OS === 'ios') {
      //   source = {
      //     name: 'image[]',
      //     filename: `image_${(new Date()).getTime()}`,
      //     data: RNFetchBlob.wrap(response.origURL)
      //   };
      // } else {
      //   source = {
      //     name: 'image[]',
      //     filename: `image_${(new Date()).getTime()}`,
      //     data: RNFetchBlob.wrap(response.uri)
      //   };
      // }
  
      // let imageFiles = [source]
      console.log(response)
  
  //    RNFetchBlob.fetch('POST', 'http://localhost:86/php/clingme.php', {
  //   // Authorization : "Bearer access-token",
  //   // otherHeader : "foo",
  //   'Content-Type' : 'multipart/form-data',
  // }, [
  //   // element with property `filename` will be transformed into `file` in form data    
  //   // custom content type
  //   // { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
  //   // part file from storage
  //   { 
  //     name : response.fileName, 
  //     filename : response.fileName, 
  //     type: 'image/jpeg', 
  //     data: 'RNFetchBlob-file://' + response.uri
  // },
  //   ,
  // ])
  // .catch((err) => {
  //   // ...
  //   console.log(err)
  // })
      
      /*formData.append('avatarFile', uri.replace('file://', ''))
      this.props.updateOwnerAvatar(this.props.session, formData)*/


          
            // // Create the form data object
            // var data = new FormData();
            // data.append('picture', profileCoverSource);

            // // Create the config object for the POST
            // // You typically have an OAuth2 token that you use for authentication
            // const config = {
            //  method: 'POST',
            //  headers: {
            //    'Accept': 'application/json',
            //    // 'Content-Type': 'application/octet-stream',
            //    // 'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
            //  },
            //  body: data,
            // }

            // fetch("http://localhost:86/php/clingme.php", config)
            //   .then(res=>res.json())
            //  .then((responseData) => {
            //      // Log the response form the server
            //      // Here we get what we sent to Postman back
            //      console.log(responseData);
            //  })
            //  .catch(err => {
            //    console.log(err);
            //  })
      
      let files = [
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
    url: 'http://dev.clingme.net:9099/edit/avatar',
    files: files, 
    method: 'POST',                             // optional: POST or PUT
    headers: //{ 'Accept': 'application/json' },  // optional
    {
        'Accept': 'application/json',
        'Content-Type': undefined,// 'multipart/form-data',
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
  });
      

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