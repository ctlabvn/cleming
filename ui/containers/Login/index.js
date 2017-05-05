import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
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
import LinearGradient from 'react-native-linear-gradient'

import routes from '~/ui/routes'

// this way help copy and paste faster
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as commonSelectors from '~/store/selectors/common'

import Content from '~/ui/components/Content'
import Preload from '~/ui/containers/Preload'
import { InputField } from '~/ui/elements/Form'
import { validate } from './utils'
import { logoSource, storeTransparent } from '~/assets'

@connect(state=>({  
  loginRequest: commonSelectors.getRequest(state, 'login'),  
}), {...commonActions, ...authActions})
@reduxForm({ form: 'LoginForm', validate})
export default class extends Component {

  _handleLogin = ({email, password}) => {    
    this.props.login(email, password)
  }

  render() {    
    const { handleSubmit, submitting, forwardTo, loginRequest } = this.props          
    if(loginRequest.status === 'pending'){
      return (
        <Preload/>
      )
    }          

    return (
      <Container style={styles.container}>
        <LinearGradient colors={['#14b3dd', '#019ecb', '#007dad']}>    
          <Content>                 
                     
            <Icon name="logo" style={styles.logoIcon} />
            
            <Form style={styles.form}>
                
                <Field autoCapitalize="none" name="email" label="Email/ Số điện thoại" component={InputField} />
                <Field name="password" label="Mật khẩu" secureTextEntry={true} component={InputField} />              
                <Button onPress={handleSubmit(this._handleLogin)} 
                  style={styles.button}>
                  <Text>Đăng nhập</Text>
                </Button>
                
                <Button transparent>
                  <Text style={styles.label}>Quên mật khẩu?</Text>
                </Button>
                         

            </Form>

            <Thumbnail square style={styles.logo} source={storeTransparent} />
            <Text style={styles.logoText}>FOR BUSINESS</Text>

          </Content>
        </LinearGradient>
      </Container>
    )
  }
}