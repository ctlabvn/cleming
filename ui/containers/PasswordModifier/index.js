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
import { Field, reduxForm, reset } from 'redux-form'
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
import I18n from '~/ui/I18n'

@connect(state=>({
  session: authSelectors.getSession(state),
  initialValues:{
    email: '',
    password: '',
  },
  onSubmitFail: (errors, dispatch)=>{
    for(let k in errors){
      return dispatch(commonActions.setToast(errors[k], 'warning'))
    }
  },
  loginRequest: commonSelectors.getRequest(state, 'login'),
  pushToken: authSelectors.gePushToken(state)
}), {...commonActions, ...authActions, ...accountActions, resetForm:reset})
@reduxForm({ form: 'ModifyPasswordForm', validate})
export default class extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      showForgot: false,
      showPassword: true,
    }
  }

  componentWillBlur(){
    this.props.resetForm('ModifyPasswordForm')
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
          {I18n.t('password_modifier_hint')}
        </Text>
        <Field name="oldPassword" label={I18n.t('current_password')} secureTextEntry={true} component={InputField} />
        <Field name="newPassword" label={I18n.t('new_password')} secureTextEntry={true} component={InputField} />
        <Field name="reNewPassword" label={I18n.t('re_new_password')} secureTextEntry={true} component={InputField} />
        <Button onPress={handleSubmit(this._handleChangePassword)}
                style={styles.button}>
          <Text>{I18n.t('update')}</Text>
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