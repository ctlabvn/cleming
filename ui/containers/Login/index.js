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
import { Field, reduxForm } from 'redux-form'
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
@connect(state=>({  
  initialValues:{
    email: 'thao@clingme.vn',
    password: 'clingme',
  },
  loginRequest: commonSelectors.getRequest(state, 'login'),
  pushToken: authSelectors.gePushToken(state)    
}), {...commonActions, ...authActions, ...accountActions})
@reduxForm({ form: 'LoginForm', validate})
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      showForgot: false,
      showPassword: false,
    }
  }

  _handleLogin = ({email, password}) => {
    const {pushToken} = this.props    
    let xDevice = Platform.OS.toUpperCase()+'_'+pushToken
    let xUniqueDevice = md5(Platform.OS+'_'+DeviceInfo.getUniqueID())
    this.props.login(email, password, xDevice, xUniqueDevice)
  }

  _handleForgot = ({phone})=>{
    this.props.resetPassword(phone, ()=>this.setState({showForgot: false}))
  }

  _handleShowForgot=(e)=>{
    this.setState({showForgot: true})
  }
  
  _handleShowLogin=(e)=>{
    this.setState({
      showPassword: false,
      showForgot: false
    })
  }
  
  _handleShowFirstTimeLogin=(e)=>{
    this.setState({
      showPassword: true
    })
  }

  renderPasswordForm(){
    return (
      <Form style={styles.formForgot}>
          <Text style={{...styles.label, marginTop: 50, marginBottom: 20}}>
            Đây là lần đầu đăng nhập của bạn{"\n"}
            Vui lòng tạo Mật khẩu riêng để bảo mật
          </Text>      
          <Field name="password" label="Mật khẩu hiện tại" secureTextEntry={true} component={InputField} />              
          <Field name="password" label="Mật khẩu mới" secureTextEntry={true} component={InputField} />              
          <Field name="password" label="Nhập lại Mật khẩu mới" secureTextEntry={true} component={InputField} />              
          <Grid>
            <Col style={{width: '34%'}}>
              <Button onPress={this._handleShowLogin}
                      style={{...styles.button, ...styles.cancelButton}}>
                <Text>Cancel</Text>
              </Button>
            </Col>
            <Col style={{width: '2%'}}/>
            <Col style={{width: '64%'}}>
              <Button onPress={e=>this.setState({showPassword:false})}
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
          <Field autoCapitalize="none" name="phone" label="Nhập số điện thoại để lấy lại mật khẩu" component={InputField} />
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
    return (
      <Form style={styles.form}>                
          <Field autoCapitalize="none" name="email" label="Email/ Số điện thoại" component={InputField} />
          <Field name="password" label="Mật khẩu" secureTextEntry={true} component={InputField} />              
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
    console.log('Playform', Platform.OS)  
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