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
  Grid,
  Row,
  Col
} from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Icon from '~/ui/elements/Icon'
import LinearGradient from 'react-native-linear-gradient'

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
import { validate } from './utils'
import { logoSource, storeTransparent } from '~/assets'
import md5 from 'md5'
import DeviceInfo from 'react-native-device-info'

const formSelector = formValueSelector('LoginForm')

@connect(state=>({  
  initialValues:{
    email: 'thao@clingme.vn',
    password: 'clingme',
  },

  currentValues: formSelector(state, 'email', 'password'),
  onSubmitFail: (errors, dispatch)=>{
    for(let k in errors){
      return dispatch(commonActions.setToast(errors[k], 'warning'))
    }
  },
  session: authSelectors.getSession(state),
  loginRequest: commonSelectors.getRequest(state, 'login'),
  pushToken: authSelectors.gePushToken(state),
  user: authSelectors.getUser(state)
}), {...commonActions, ...authActions, ...accountActions})
@reduxForm({ form: 'LoginForm', validate})
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      showForgot: false,
      showPassword: false,
      emailFocus: false,
      passwordFocus: false,
      emailSelection: {start:0,end:0},
      passwordSelection: {start:0, end:0},
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.firstLogin == 1) {
      this._handleShowFirstTimeLogin()
    }
  }

  _handleLogin = ({email, password}) => {
    const {pushToken} = this.props    
    let xDevice = Platform.OS.toUpperCase()+'_'+pushToken
    let xUniqueDevice = md5(Platform.OS+'_'+DeviceInfo.getUniqueID())
    this.props.login(email, password, xDevice, xUniqueDevice)
  }

  _handleForgot = ({email})=>{
    this.props.resetPassword(email, (err, data)=>{
      if(!err) {        
        this.setState({showForgot: false, passwordFocus: true})
      } 
    })
  }

  _handleShowForgot=(e)=>{
    this.setState({showForgot: true})
  }
  
  _handleShowHome=(e)=>{
    this.props.forwardTo('merchantOverview', true)
  }

  _handleShowLogin=(e)=>{
    const length = this.props.currentValues.email.length
    this.setState({
      showPassword: false,
      showForgot: false,
      emailFocus: true,
      emailSelection: {start:length, end:length}
    })
  }
  
  _handleShowFirstTimeLogin=(e)=>{
    this.setState({
      showPassword: true
    })
  }
  
  _handleChangePassword = ({oldPassword, newPassword}) => {
    if (oldPassword && newPassword) {
      let data = {
        oldPassword: md5(oldPassword),
        password: md5(newPassword)
      }
      this.props.changePassword(this.props.session, data, () => {
        this._handleShowHome()
      })
    }
  }

  renderPasswordForm(){
    return (
      <Form style={styles.formForgot}>
          <Text style={{...styles.label, marginTop: 50, marginBottom: 20}}>
            Bạn đang đăng nhập bằng mật khẩu tự động{"\n"}
            Vui lòng tạo Mật khẩu riêng để bảo mật
          </Text>      
          <Field name="oldPassword" label="Mật khẩu hiện tại" secureTextEntry={true} component={InputField} />
          <Field name="newPassword" label="Mật khẩu mới" secureTextEntry={true} component={InputField} />
          <Field name="reNewPassword" label="Nhập lại Mật khẩu mới" secureTextEntry={true} component={InputField} />
          <Grid>
            <Col style={{width: '34%'}}>
              <Button onPress={this._handleShowHome}
                      style={{...styles.button, ...styles.cancelButton}}>
                <Text>Cancel</Text>
              </Button>
            </Col>
            <Col style={{width: '2%'}}/>
            <Col style={{width: '64%'}}>
              <Button onPress={this._handleChangePassword.bind(this)}
                      style={styles.button}>
                <Text>Cập nhật</Text>
              </Button>
            </Col>
          </Grid>
                   
      </Form>
    )
  }

  renderForgotForm(){
    const {handleSubmit} = this.props
    return (
      <Form style={styles.formForgot}>
          <Text style={styles.labelForgot}>Lấy lại mật khẩu?</Text>      
          <Field autoCapitalize="none" name="email" label="Nhập số điện thoại để lấy lại mật khẩu" component={InputField} />
          <Grid>
            <Col style={{width: '34%'}}>
              <Button onPress={this._handleShowLogin}
                      style={{...styles.button, ...styles.cancelButton}}>
                <Text>Cancel</Text>
              </Button>
            </Col>
            <Col style={{width: '2%'}}/>
            <Col style={{width: '64%'}}>
              <Button onPress={handleSubmit(this._handleForgot)}
                      style={styles.button}>
                <Text>Gửi</Text>
              </Button>
            </Col>
          </Grid>
                   
      </Form>
    )
  }

  renderLoginForm(){
    const {handleSubmit} = this.props
    const {passwordFocus, passwordSelection, emailFocus, emailSelection} = this.state
    return (
      <Form style={styles.form}>                
          <Field autoCapitalize="none" name="email" 
            autoFocus={emailFocus} 
            initialSelection={emailSelection} 
            label="Email/ Số điện thoại" component={InputField} />
          <Field name="password" 
            autoFocus={passwordFocus} 
            initialSelection={passwordSelection} label="Mật khẩu" secureTextEntry={true} component={InputField} />              
          <Button onPress={handleSubmit(this._handleLogin)} 
            style={styles.button}>
            <Text>Đăng nhập</Text>
          </Button>
          
          <Button onPress={this._handleShowForgot} transparent>
            <Text style={styles.label}>Quên mật khẩu?</Text>
          </Button>
                   
      </Form>
    )
  }

  render() {    
    const {forwardTo, loginRequest, pushToken} = this.props
    if(loginRequest.status === 'pending'){
      return (
        <Preload/>
      )
    }          

    return (
      <Container style={styles.container}>
        <LinearGradient colors={['#14b3dd', '#019ecb', '#007dad']}>    
          <Content>                 
                     
            {!this.state.showPassword &&
              <Icon onPress={this._handleShowFirstTimeLogin} name="logo" style={styles.logoIcon} />
            }
            
            { this.state.showPassword 
              ? this.renderPasswordForm ()
              : (this.state.showForgot ? this.renderForgotForm() : this.renderLoginForm())
            }

            <Thumbnail square style={styles.logo} source={storeTransparent} />
            <Text style={styles.logoText}>FOR BUSINESS</Text>

          </Content>
        </LinearGradient>
      </Container>
    )
  }
}