/**
 * Created by vjtc0n on 5/19/17.
 */
import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  Thumbnail,
  Label,
} from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Icon from '~/ui/elements/Icon'
// import LinearGradient from 'react-native-linear-gradient'
import GradientBackground from '~/ui/elements/GradientBackground'

import routes from '~/ui/routes'

// this way help copy and paste faster
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as accountActions from '~/store/actions/account'
import * as commonSelectors from '~/store/selectors/common'
import * as authSelectors from '~/store/selectors/auth'
import Content from '~/ui/components/Content'
import Preload from '~/ui/containers/Preload'
import { InputField } from '~/ui/elements/Form'
import { logoSource, storeTransparent } from '~/assets'
import md5 from 'md5'
// import DeviceInfo from 'react-native-device-info'

import { validate } from './utils'

@connect(state=>({
  session: authSelectors.getSession(state),
  initialValues:{
    email: 'thao@clingme.vn',
    password: 'clingme',
  },
  onSubmitFail: (errors, dispatch)=>{
    for(let k in errors){
      return dispatch(commonActions.setToast(errors[k], 'warning'))
    }
  },
  loginRequest: commonSelectors.getRequest(state, 'login'),
  pushToken: authSelectors.gePushToken(state)
}), {...commonActions, ...authActions, ...accountActions})
@reduxForm({ form: 'ModifyPasswordForm', validate})
export default class extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      showForgot: false,
      showPassword: true,
    }
  }
  
  _handleChangePassword = ({oldPassword, newPassword}) => {
    
    const data = {
      oldPassword: md5(oldPassword),
      password: md5(newPassword)
    }
    this.props.changePassword(this.props.session, data, (err, dataR) => {
      if(!err){
        this.props.goBack()
      }
    })
    
  }
  
  renderPasswordForm(){
    const {handleSubmit} = this.props
    return (
      <Form style={styles.formForgot}>
        <Text style={{...styles.label, marginTop: 50, marginBottom: 20}}>
          Đây là mục đổi mật khẩu cá nhân{"\n"}
          Bạn có thể thay đổi mật khẩu riêng để bảo mật
        </Text>
        <Field name="oldPassword" label="Mật khẩu hiện tại" secureTextEntry={true} component={InputField} />
        <Field name="newPassword" label="Mật khẩu mới" secureTextEntry={true} component={InputField} />
        <Field name="reNewPassword" label="Nhập lại Mật khẩu mới" secureTextEntry={true} component={InputField} />
        <Button onPress={handleSubmit(this._handleChangePassword)}
                style={styles.button}>
          <Text>Cập nhật</Text>
        </Button>
      
      </Form>
    )
  }
  
  renderForgotForm(){
    
  }
  
  renderLoginForm(){
    
  }
  
  render() {
    const {forwardTo, loginRequest, pushToken} = this.props
    console.log('Playform', Platform.OS)
    if(loginRequest.status === 'pending'){
      return (
        <Preload/>
      )
    }
    
    return (
      <Container style={styles.container}>
        
        <GradientBackground colors={['#14b3dd', '#019ecb', '#007dad']} />                    
          <Content>
            
            {!this.state.showPassword &&
            <Icon onPress={e=>this.setState({showPassword:true})} name="logo" style={styles.logoIcon} />
            }
            
            { this.state.showPassword
              ? this.renderPasswordForm ()
              : (this.state.showForgot ? this.renderForgotForm() : this.renderLoginForm())
            }
            
            <Thumbnail square style={styles.logo} source={storeTransparent} />
            <Text style={styles.logoText}>FOR BUSINESS</Text>
          
          </Content>
        
      </Container>
    )
  }
}