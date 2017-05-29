/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox, Picker,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text, Dimensions, Clipboard } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector, stopSubmit, stopAsyncValidation, reset, startAsyncValidation } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Dash from 'react-native-dash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import md5 from 'md5'

import TopDropdown from '../../components/DropDownList'

import {
    InputField,
    CheckBoxField,
    DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'
import Modal from '~/ui/components/Modal'

import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'
import * as commonActions from '~/store/actions/common'

import { validateField, renderGroup } from './utils'
import styles from './styles'

const {height, width} = Dimensions.get('window');

const formSelector = formValueSelector('CreateUserForm')


@connect(state=>({
  session: authSelectors.getSession(state),
  listEmployee: accountSelectors.getListEmployee(state),
  place: state.place,
  generatedPassword: accountSelectors.getGeneratedPassword(state),
  formValues: formSelector(state, 'name', 'email', 'phone', 'permission'),
  formState: state.form
}), dispatch => ({
  actions: bindActionCreators({ ...accountActions, ...commonActions}, dispatch),
  destroyError: () => dispatch(stopSubmit('CreateUserForm', {})),
  resetForm: () => dispatch(reset('CreateUserForm')),
  startValidate: () => dispatch(stopAsyncValidation('CreateUserForm'))
}), (stateProps, dispatchProps, ownProps)=>{
    if (typeof ownProps.route.params.id == 'undefined') {        
      return ({
        enableReinitialize: true,
        persistentSubmitErrors: true,
        initialValues: {
          GroupAddress: stateProps.place.listPlace,
          name: '',
          email: '',
          phone: '',
          permission: {
            id: 1,
            name: "Nhân Viên"
          }
        },
        ...ownProps, ...stateProps, ...dispatchProps,
      })
    }
    let employeeDetail = stateProps.listEmployee[Number(ownProps.route.params.id)]
    let permission = null
    switch (employeeDetail.titleType) {
      case 1: permission = "Nhân Viên"
      break
    }

    return ({
      enableReinitialize: true,
      initialValues: {
        GroupAddress: stateProps.place.listPlace,
        name: employeeDetail.userName,
        email: employeeDetail.email,
        phone: employeeDetail.phoneNumber,
        permission: {
          id: employeeDetail.titleType,
          name: permission
        },
        fromTimeWork: employeeDetail.fromTimeWork,
        toTimeWork: employeeDetail.toTimeWork
      },
      ...ownProps, ...stateProps, ...dispatchProps,
    })
})
@reduxForm({ form: 'CreateUserForm', validate: validateField})
export default class CreateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          jobModalOpen: false,
          permissionModalOpen: false,
          fromTimeVisible: false,
          toTimeVisible: false,
          fromTime: props.initialValues.fromTimeWork || moment(new Date()).format("HH:mm"),
          toTime: props.initialValues.toTimeWork || moment(new Date()).format("HH:mm"),
          checkAll: false,
          employeeDetail: {},
          rowIDOfEmployee: 0,
          chosenListPlace: [],
          currentJob: props.formValues.permission,
          isLoading: false
        }
        
    }
  
    componentWillFocus(){
      if (typeof this.props.route.params.id != "undefined") {
        let employeeDetail = this.props.listEmployee[Number(this.props.route.params.id)]
        let permission = null
        switch (employeeDetail.titleType) {
          case 1: permission = "Nhân Viên"
        }
        this.props.change('GroupAddress', this.props.place.listPlace)
        this.props.change('name', employeeDetail.userName)
        this.props.change('email', employeeDetail.email)
        this.props.change('phone', employeeDetail.phoneNumber)
        this.setState({
          chosenListPlace: employeeDetail.listPlace,
          currentJob: {
            id: employeeDetail.titleType,
            name: permission
          }
        })
      } else {
        this.props.resetForm()
        this.props.change('GroupAddress', this.props.place.listPlace)
        this.props.change('name', '')
        this.props.change('email', '')
        this.props.change('phone', '')
        this.setState({
          chosenListPlace: [],
          currentJob: {
            id: 1,
            name: "Nhân Viên"
          },
          fromTime: "07:00",
          toTime: "20:00"
        })
      }
    }
    
    componentDidMount() {
      if (typeof this.props.route.params.id == "undefined") {
        this.setState({
          fromTime: "07:00",
          toTime: "20:00"
        })
      }
    }
    
    onFromTimeFocus() {
        this.setState({
            fromTimeVisible: true
        })
    }
    
    onFromTimeCancel() {
        this.setState({
            fromTimeVisible: false
        })
    }
    
    setFromTime(value) {
        this.setState({
            fromTimeVisible: false,
            fromTime: moment(value).format("HH:mm")
        })
    }
    
    onToTimeFocus() {
        this.setState({
            toTimeVisible: true
        })
    }
    
    onToTimeCancel() {
        this.setState({
            toTimeVisible: false
        })
    }
    
    setToTime(value) {
        this.setState({
            toTimeVisible: false,
            toTime: moment(value).format("HH:mm")
        })
    }
    
    onGeneratedPasswordPress() {
      this.props.actions.getGeneratedPassword(this.props.session)
    }
  
    _setClipboardContent = async () => {
      Clipboard.setString(this.props.generatedPassword);
      try {
        let content = await Clipboard.getString();
        console.log(content)
      } catch (e) {
        console.log(e.message)
      
      }
    }
    
    getListEmployeeAfterSuccess(error) {
      if (error.status > 399) {
        this.setState({
          isLoading: false
        })
      } else {
        this.props.actions.getListEmployee(this.props.session, () => {
          this.setState({
            isLoading: false
          }, () => {
            this.props.actions.goBack()
          })
        })
      }
    }
    
    onSubmitUser() {
      let userInfo = {}
      if (this.state.chosenListPlace.length == 0) {
        this.props.actions.setToast("Bạn cần chọn tối thiểu 1 địa chỉ", 'danger')
      } else if (this.props.generatedPassword.trim() == '') {
        this.props.actions.setToast("Hãy bấm nút Tạo mật khẩu đăng nhập", 'danger')
      } else if (this.props.formState.CreateUserForm.syncErrors) {
        this.props.actions.setToast("Phần thông tin nhân viên có lỗi sai, xin hãy kiểm tra lại", 'danger')
      } else {
        this.setState({
          isLoading: true
        })
        let listPlaceId = this.state.chosenListPlace.map(c=>c.placeId).join(";")
        userInfo.fullName = this.props.formValues.name
        userInfo.phoneNumber = this.props.formValues.phone
        userInfo.password = this.props.generatedPassword
        userInfo.email = this.props.formValues.email
        userInfo.titleType = this.state.currentJob.id
        userInfo.fromTimeWork = this.state.fromTime
        userInfo.toTimeWork = this.state.toTime
        userInfo.listPlaceId = listPlaceId
        if (typeof this.props.route.params.id == 'undefined') {
          this.props.actions.createEmployeeInfo(this.props.session, userInfo, (error, data) => {
            this.getListEmployeeAfterSuccess(error)
          })
        } else {
          userInfo.bizAccountId = this.props.listEmployee[Number(this.props.route.params.id)].bizAccountId
          this.props.actions.updateEmployeeInfo(this.props.session, userInfo, (error, data) => {
            this.getListEmployeeAfterSuccess(error)
          })
        }
      }
    }
    
    handleGetListPlaceFromArrayField(data) {
      this.setState({
        chosenListPlace: data
      })
    }
  
    handleChangePlace(item) {
      this.setState({
        currentJob: {
          id: item.id,
          name: item.name
        }
      })
    }
    
    renderMainContainer() {
      let fromTime = this.state.fromTime
      let toTime = this.state.toTime
      let listPlace = []
      if (typeof this.props.route.params.id == "undefined") {
        listPlace = this.state.chosenListPlace
      } else {
        listPlace = this.props.listEmployee[Number(this.props.route.params.id)].listPlace
      }
      let formState = null
      let nameError = null
      let errorNameStyle = null
      let errorLongNameStyle = null
      let phoneError = null
      let errorPhoneStyle = null
      let emailError = null
      let errorEmailStyle = null
      if (typeof this.props.route.params.id == 'undefined') {
        formState = this.props.formState.CreateUserForm
      } else {
        formState = this.props.formState.CreateUserForm
      }
      if (typeof formState != "undefined") {
        if (typeof formState.syncErrors != 'undefined') {
          let errors = formState.syncErrors
          if (errors.name) {
            errorNameStyle = {borderColor: 'red', borderWidth: 1}
            if (errors.name.length > 30) {
              errorLongNameStyle = {marginBottom: 30}
            }
            nameError = <Text style={{color: 'red', marginTop: 5}}>{errors.name}</Text>
          }
          if (errors.phone) {
            errorPhoneStyle = {borderColor: 'red', borderWidth: 1}
            phoneError = <Text style={{color: 'red', marginTop: 5}}>{errors.phone}</Text>
          }
          if (errors.email) {
            errorEmailStyle = {borderColor: 'red', borderWidth: 1}
            emailError = <Text style={{color: 'red', marginTop: 5}}>{errors.email}</Text>
          }
        }
      }
      return (
        <View style={{paddingLeft: 15, paddingRight: 15}}>
          <View style={{...styles.inputContainer, ...errorNameStyle, ...errorLongNameStyle}}>
            <Field
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="Họ và tên"
              name="name"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
            {nameError}
          </View>
          <View style={{...styles.inputContainer, ...errorEmailStyle}}>
            <Field
              inputStyle={styles.inputText}
              style={styles.inputField}
              label="Email *"
              name="email"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
            {emailError}
          </View>
          <View style={{...styles.inputContainer, ...errorPhoneStyle}}>
            <Field
              inputStyle={styles.inputText}
              style={styles.inputField}
              label="Số điện thoại"
              name="phone"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
            {phoneError}
          </View>
          <View style={{...styles.inputContainer, zIndex: 100}}>
            <TopDropdown
              ref='placeDropdown'
              dropdownValues={[
                                {id: 1, name: "Nhân Viên"},
                                //{id: 2, name: "Admin"}
                              ]}
              onSelect={this.handleChangePlace.bind(this)}
              selectedOption={this.state.currentJob || {id: 1, name: "Nhân Viên"}} />
          </View>
          <Dash
            dashLength={2}
            dashColor={'#a2a2a2'}
            dashThickness={1}
            style={{flex: 1, marginBottom: 10}}/>
          <View>
            <Grid>
              <Col style={{alignItems: 'center'}}>
                <Text style={styles.leftAddressTitleText}>Thời gian làm việc</Text>
              </Col>
              <Col/>
            </Grid>
          </View>
          <View>
            <Grid>
              <Col style={{alignItems: 'center'}}>
                <View style={{...styles.inputContainer, marginRight: 10}}>
                  <Field
                    onPress={this.onFromTimeFocus.bind(this)}
                    editable={false}
                    style={styles.inputField}
                    label={fromTime}
                    name="fromDate"
                    component={InputField}
                    placeholderTextColor="#7e7e7e"/>
                </View>
              </Col>
              <Col style={{alignItems: 'center'}}>
                <View style={{...styles.inputContainer, marginLeft: 10}}>
                  <Field
                    onPress={this.onToTimeFocus.bind(this)}
                    editable={false}
                    style={styles.inputField}
                    label={toTime}
                    name="toDate"
                    component={InputField}
                    placeholderTextColor="#7e7e7e"/>
                </View>
              </Col>
            </Grid>
          </View>
          <Dash
            dashLength={2}
            dashColor={'#a2a2a2'}
            dashThickness={1}
            style={{flex: 1, marginBottom: 10}}/>
          <FieldArray
            handleGetListPlaceFromArrayField={this.handleGetListPlaceFromArrayField.bind(this)}
            employeeListPlace={listPlace}
            name="GroupAddress"
            component={renderGroup}/>
        </View>
      )
    }
    
    renderIndicator() {
      return(
        <View style={{height: height-155, justifyContent: 'center'}}>
          <Spinner/>
        </View>
      )
    }
  
    render() {
        let mainContainer = null
        if (this.state.isLoading) {
          mainContainer = this.renderIndicator()
        } else {
          mainContainer = this.renderMainContainer()
        }
        
        let passwordText = null
        if (this.props.generatedPassword == '') {
          passwordText = <Text style={styles.passwordTextWarning}>{'Bạn cần tạo 1 mật khẩu'}</Text>
        } else {
          passwordText = <Text style={styles.passwordText}>{'*****'}</Text>
        }
        
        return (
            <Container>
              <Content style={{backgroundColor: 'white'}}>
                {mainContainer}
              </Content>
              <View style={styles.absoluteContainer}>
                <Grid>
                  <Row style={{justifyContent: 'center', height: 40}}>
                    <Button
                      onPress={this.onGeneratedPasswordPress.bind(this)}
                      style={styles.createPasswordButton}>
                      <Text style={styles.createPasswordButtonText}>Tạo mật khẩu đăng nhập</Text>
                    </Button>
                  </Row>
                  <Row style={{alignItems: 'center'}}>
                    <Col style={{width: '25%'}}/>
                    <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                      {passwordText}
                    </Col>
                    <Col style={{ justifyContent: 'center', flexDirection: 'row', width: '25%'}}>
                      <Col style={{alignItems: 'flex-end', width: '50%'}}>
                        <Icon
                          style={styles.copyIcon}
                          name="copy"/>
                      </Col>
                      <Col style={{justifyContent: 'center', width: '50%'}}>
                        <Text
                          onPress={this._setClipboardContent.bind(this)}
                          style={styles.copyText}>Copy</Text>
                      </Col>
                    </Col>
                  </Row>
                  <Row style={{height: '15%'}}>
                    <Text style={styles.subText}>* Email không bắt buộc </Text>
                  </Row>
                  <Row style={{justifyContent: 'flex-end', height: 40}}>
                    <Button
                      onPress={this.onSubmitUser.bind(this)}
                      style={{...styles.submitButton}}>
                      <Text style={styles.createPasswordButtonText}>OK</Text>
                    </Button>
                  </Row>
                </Grid>
              </View>
              <DateTimePicker
                mode="time"
                titleIOS="Chọn thời gian"
                confirmTextIOS="Ok"
                cancelTextIOS="Cancel"
                isVisible={this.state.fromTimeVisible}
                onConfirm={this.setFromTime.bind(this)}
                onCancel={this.onFromTimeCancel.bind(this)}
              />
              <DateTimePicker
                mode="time"
                titleIOS="Chọn thời gian"
                confirmTextIOS="Ok"
                cancelTextIOS="Cancel"
                isVisible={this.state.toTimeVisible}
                onConfirm={this.setToTime.bind(this)}
                onCancel={this.onToTimeCancel.bind(this)}
              />
            </Container>
        )
    }
}