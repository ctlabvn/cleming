import React, { Component } from "react";
import { InteractionManager, Keyboard, Platform, View } from "react-native";
import { Button, Col, Container, Form, Grid, Text, Thumbnail, Toast } from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import Icon from "~/ui/elements/Icon";
// import LinearGradient from 'react-native-linear-gradient'
import material from "~/theme/variables/material.js";
// this way help copy and paste faster
import * as commonActions from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import * as accountActions from "~/store/actions/account";
import * as commonSelectors from "~/store/selectors/common";
import * as authSelectors from "~/store/selectors/auth";
import Content from "~/ui/components/Content";
import Preload from "~/ui/containers/Preload";
import { InputField } from "~/ui/elements/Form";
import { validate } from "./utils";
import { logoSource, storeTransparent } from "~/assets";
import md5 from "md5";
import DeviceInfo from "react-native-device-info";

import GradientBackground from "~/ui/elements/GradientBackground";
import I18n from '~/ui/I18n'
import { getToastMessage } from '~/ui/shared/utils'
const formSelector = formValueSelector('LoginForm')

@connect(state => ({
  initialValues: {
    email: '',
    password: '',
  },

  currentValues: formSelector(state, 'email', 'password', 'forgotEmail'),
  onSubmitFail: (errors, dispatch) => {
    for (let k in errors) {
      // setToast(getToastMessage(I18n.t('err_need_current_password')), 'info', null, null, 3000, 'top')
      return dispatch(commonActions.setToast(getToastMessage(errors[k]), 'info', null, null, 3000, 'top'))
    }
  },
  session: authSelectors.getSession(state),
  loginRequest: commonSelectors.getRequest(state, 'login'),
  pushToken: authSelectors.gePushToken(state),
  user: authSelectors.getUser(state)
}), { ...commonActions, ...authActions, ...accountActions })
@reduxForm({ form: 'LoginForm', validate })
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showForgot: false,
      showPassword: false,
      emailFocus: false,
      // emailForgotFocus: false,
      passwordFocus: false,
      emailSelection: { start: 0, end: 0 },
      passwordSelection: { start: 0, end: 0 },
      loading: false
    }


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.firstLogin == 1) {
      this._handleShowFirstTimeLogin()
    }
  }

  _handleLogin = ({ email, password }) => {
    const { pushToken } = this.props
    let xDevice = Platform.OS.toUpperCase() + '_' + pushToken
    let xUniqueDevice = md5(Platform.OS + '_' + DeviceInfo.getUniqueID())
    this.setState({ emailFocus: false, passwordFocus: false })
    Keyboard.dismiss()
    this.setState({ loading: true })
    this.props.login(email, password, xDevice, xUniqueDevice,
      (err, data) => {
        this.setState({ loading: false })
        if (!err) {
          this.props.change('password', '')
        }
      }
    )
  }

  _handleForgot = ({ forgotEmail }) => {
    Keyboard.dismiss()
    this.props.resetPassword(forgotEmail, (err, data) => {
      if (!err) {
        this.setState({ showForgot: false, passwordFocus: true })
      }
    })
  }

  _handleShowForgot = (e) => {
    this.props.change('forgotEmail', this.props.currentValues.email)
    this.setState({
      showForgot: true,
    })
  }

  _handleShowHome = (e) => {
    this._resetFirstTimeChangePasswordForm()
    this._handleShowLogin(e)
    this.setState({ emailFocus: false, passwordFocus: false })
    Keyboard.dismiss()
    setTimeout(() => this.props.forwardTo('merchantOverview', true), 500)
  }

  _handleShowLogin = (e) => {
    console.log('Call handle show login')
    const length = this.props.currentValues.email.length
    this.setState({
      showPassword: false,
      showForgot: false,
      emailFocus: true,
      emailSelection: { start: length, end: length }
    })
  }

  _handleShowLoginWithoutFocus = (e) => {
    console.log('Call handle show login without focus')
    const length = this.props.currentValues.email.length
    this.setState({
      showPassword: false,
      showForgot: false,
      emailFocus: false,
      emailSelection: { start: length, end: length }
    })
  }

  _handleShowFirstTimeLogin = (e) => {
    this.setState({
      showPassword: true
    })
  }
  _checkChangePassword(oldPassword, newPassword, reNewPassword) {
    const { setToast } = this.props
    const { toastModal } = this.props.app

    
    if (!oldPassword) {
      setToast(getToastMessage(I18n.t('err_need_current_password')), 'info', null, null, 3000, 'top')
      return false
    }
    if (!newPassword) {
      setToast(getToastMessage(I18n.t('err_need_new_password')), 'info', null, null, 3000, 'top')
      return false
    }
    if (newPassword != reNewPassword) {
      setToast(getToastMessage(I18n.t('err_password_not_match')), 'info', null, null, 3000, 'top')
      return false
    }
    if (oldPassword == newPassword) {
      setToast(getToastMessage(I18n.t('err_new_password')), 'info', null, null, 3000, 'top')
      return false
    }
    // New password must 4-12 characters
    if (!newPassword.match(/^(\S){4,12}$/)) {
      setToast(getToastMessage('err_password_length'), 'info', null, null, 3000, 'top')
      return false
    }
    return true
  }
  _resetFirstTimeChangePasswordForm = () => {
    this.props.change('oldPassword', '')
    this.props.change('newPassword', '')
    this.props.change('reNewPassword', '')
  }
  _handleChangePassword = ({ oldPassword, newPassword, reNewPassword }) => {
    const { setToast, updateFirstTimeLogin, forwardTo } = this.props
    if (!this._checkChangePassword(oldPassword, newPassword, reNewPassword)) return
    let data = {
      oldPassword: md5(oldPassword),
      password: md5(newPassword)
    }
    Keyboard.dismiss()
    this.props.changePassword(this.props.session, data,
      (err, dataR) => {
        if (dataR && dataR.updated && dataR.updated.isSent) {
          updateFirstTimeLogin()
          this._handleShowLoginWithoutFocus()
          this._resetFirstTimeChangePasswordForm()
          console.log('Process Change Password')
          setTimeout(() => forwardTo('merchantOverview', true), 500)
        }
      }
    )
  }
  componentWillFocus() {
    const { app } = this.props
    // this._handleShowLogin()
    const length = this.props.currentValues.email.length
    this.setState({
      showPassword: false,
      showForgot: false,
      emailFocus: false,
      passwordFocus: true,
      emailSelection: { start: length, end: length }
    })
    // this.setState({ passwordFocus: true })
  }
  componentWillMount() {
    const { app } = this.props
  }
  renderPasswordForm() {
    const { handleSubmit } = this.props
    return (
      <Form style={styles.formForgot}>
        <Text style={{ ...styles.label, marginTop: 50, marginBottom: 20 }}>
          {I18n.t('first_login_hint')}
        </Text>
        <Field name="oldPassword" label={I18n.t('current_password')} secureTextEntry={true} component={InputField} />
        <Field name="newPassword" label={I18n.t('new_password')} secureTextEntry={true} component={InputField} />
        <Field name="reNewPassword" label={I18n.t('re_new_password')} secureTextEntry={true} component={InputField} />
        <Grid>
          <Col style={{ width: '34%' }}>
            <Button onPress={this._handleShowHome}
              style={{ ...styles.button, ...styles.cancelButton }}>
              <Text>Cancel</Text>
            </Button>
          </Col>
          <Col style={{ width: '2%' }} />
          <Col style={{ width: '64%' }}>
            <Button onPress={handleSubmit(this._handleChangePassword)}
              style={styles.button}>
              <Text>{I18n.t('update')}</Text>
            </Button>
          </Col>
        </Grid>

      </Form>
    )
  }
  _isDisableSend(){
    const {forgotEmail} = this.props.currentValues
    return (!forgotEmail || forgotEmail.trim()=='')
  }
  renderForgotForm() {
    const { handleSubmit } = this.props
    // const { emailForgotFocus, emailSelection } = this.state
    return (
      <Form style={styles.formForgot}>
        <Text style={styles.labelForgot}>{I18n.t('get_password')}</Text>
        <Field autoCapitalize="none" name="forgotEmail"
          icon={(input, active) => input.value && active ? 'close' : false}
          iconStyle={{ color: material.black500 }}
          onIconPress={input => input.onChange('')}
          secureTextEntry={false}
          label={I18n.t('get_password_hint')}
          component={InputField} />
        <Grid>
          <Col style={{ width: '34%' }}>
            <Button onPress={this._handleShowLogin}
              style={{ ...styles.button, ...styles.cancelButton }}>
              <Text>Cancel</Text>
            </Button>
          </Col>
          <Col style={{ width: '2%' }} />
          <Col style={{ width: '64%' }}>
            <Button 
              disabled={(this._isDisableSend())}
              onPress={handleSubmit(this._handleForgot)}
              style={styles.button}>
              <Text grayDisable={(this._isDisableSend())}>{I18n.t('send')}</Text>
            </Button>
          </Col>
        </Grid>

      </Form>
    )
  }
  _isDisableLogin(){
    const {email, password} = this.props.currentValues
    return (!email || !password || email.trim()=='' || password.trim()=='')
  }
  renderLoginForm() {
    const { handleSubmit } = this.props
    const { passwordFocus, passwordSelection, emailFocus, emailSelection } = this.state
    return (
      <Form style={styles.form}>
        <Field autoCapitalize="none" name="email"
          autoFocus={emailFocus}
          initialSelection={emailSelection}
          icon={(input, active) => input.value && active ? 'close' : false}
          iconStyle={{ color: material.black500 }}
          onIconPress={input => input.onChange('')}
          label={I18n.t('email_phone')} component={InputField} />
        <Field name="password"
          autoFocus={passwordFocus}
          icon={(input, active) => input.value && active ? 'close' : false}
          iconStyle={{ color: material.black500 }}
          onIconPress={input => input.onChange('')}
          initialSelection={passwordSelection} label={I18n.t('password')} secureTextEntry={true} component={InputField} />
        <Button
          disabled={(this._isDisableLogin())}
          onPress={handleSubmit(this._handleLogin)}
          style={styles.button}>
          <Text grayDisable={(this._isDisableLogin())}>{I18n.t('login')}</Text>
        </Button>

        <Button onPress={this._handleShowForgot} transparent>
          <Text style={styles.label}>{I18n.t('forgot_password')}</Text>
        </Button>

      </Form>
    )
  }

  render() {
    const { forwardTo, loginRequest, pushToken } = this.props
    // if (loginRequest.status === 'pending') {
    //   return (
    //     <Preload />
    //   )
    // }
    if (this.state.loading) {
      return (<Preload />)
    }
    return (
      <Container style={styles.container}>
        <GradientBackground colors={['#14b3dd', styles.container.backgroundColor]} />
        <Content>

          {!this.state.showPassword &&
            <Icon name="logo" style={styles.logoIcon} />
          }

          {this.state.showPassword
            ? this.renderPasswordForm()
            : (this.state.showForgot ? this.renderForgotForm() : this.renderLoginForm())
          }

          <Thumbnail square style={styles.logo} source={storeTransparent} />
          <Text style={styles.logoText}>FOR BUSINESS</Text>

        </Content>



      </Container>
    )
  }
}