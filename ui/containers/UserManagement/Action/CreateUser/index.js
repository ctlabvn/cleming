/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text, Dimensions, Clipboard, Keyboard, ScrollView } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector, reset } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Dash from 'react-native-dash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import TopDropdown from '../../components/DropDownList'
import Border from '~/ui/elements/Border'

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
import { getSelectedPlace } from '~/store/selectors/place'
import { validateField, RenderGroup } from './utils'
import styles from './styles'
import md5 from 'md5'
import material from '~/theme/variables/material'

const { height, width } = Dimensions.get('window');

const formSelector = formValueSelector('CreateUserForm')


@connect(state => ({
  session: authSelectors.getSession(state),
  // listEmployee: accountSelectors.getListEmployee(state),
  employeeDetail: accountSelectors.getCurrentEmployee(state),
  place: state.place,
  generatedPassword: accountSelectors.getGeneratedPassword(state),
  // formValues: formSelector(state, 'name', 'email', 'phone', 'permission'),
  // formState: state.form,
  selectedPlace: getSelectedPlace(state)
}), dispatch => ({
  actions: bindActionCreators({ ...accountActions, ...commonActions, resetForm: reset }, dispatch)
}), (stateProps, dispatchProps, ownProps) => {

  let employeeDetail = stateProps.employeeDetail || {
    // console.log('@connect employeeDetail.fromTime : toTime ' + employeeDetail.fromTimeWork + ' : ' + employeeDetail.toTimeWork);
    userName: '',
    email: '',
    phoneNumber: '',
    titleType: 1,
    fromTimeWork: "07:00",
    toTimeWork: "20:00",
  }
  // console.warn(JSON.stringify(stateProps.listEmployee, null, 2));
  let permission = null
      switch (employeeDetail.titleType) {
          case 1:
              permission = "Nhân Viên"
              break
          default:
              permission = "Nhân Viên"
              break
      }

  return ({
    enableReinitialize: true,
    initialValues: {
      // GroupAddress: stateProps.place.listPlace,
      name: employeeDetail.userName,
      email: employeeDetail.email,
      phone: employeeDetail.phoneNumber ? '0' + employeeDetail.phoneNumber : '',      
    },
    // permission: {
    //   id: employeeDetail.titleType,
    //   name: permission
    // },
    fromTimeWork: employeeDetail.fromTimeWork,
    toTimeWork: employeeDetail.toTimeWork,
    ...ownProps, ...stateProps, ...dispatchProps,
  })
})
@reduxForm({
    form: 'CreateUserForm',
    // fields: ['name', 'email', 'phone'],
  // validate: validateField
})
export default class CreateUserContainer extends Component {
  constructor(props) {

      console.log('step', 'constructor');
      // let selectedPlaceId = props.selectedPlace.id
    super(props)
    let currentJob = {
      id: 1,
      name: "Nhân Viên"
    }

    this.state = {
      jobModalOpen: false,
      permissionModalOpen: false,
      fromTimeVisible: false,
      toTimeVisible: false,
      fromTime: props.fromTimeWork,
      toTime: props.toTimeWork,
      checkAll: false,
      employeeDetail: {},
      rowIDOfEmployee: 0,
      // chosenListPlace: [],
      currentJob: currentJob,
      isLoading: false,
      firstTimeResetPassword: false,      
      selectedPlaceId: props.selectedPlace.id,
    }

  }

  componentWillBlur() {
    console.log('step', 'componentWillBlur');
    this.props.actions.resetForm('CreateUserForm')

  }


  componentWillFocus() {

      if (typeof this.props.route.params.id != "undefined") {
          let employeeDetail = this.props.employeeDetail

          this.placeDropdown.handleCheck(employeeDetail.listPlace[0] || {placeId:this.state.selectedPlaceId})

          let permission = null
          switch (employeeDetail.titleType) {
              case 1:
                  permission = "Nhân Viên"
          }
          this.setState({
              // chosenListPlace: employeeDetail.listPlace,
              currentJob: {
                  id: employeeDetail.titleType,
                  name: permission
              },
              firstTimeResetPassword: false,

          })

      } else {
          this.props.actions.deleteGeneratedPassword()
          this.placeDropdown.handleCheck({placeId:this.state.selectedPlaceId})
          this.setState({
              // chosenListPlace: [],
              currentJob: {
                  id: 1,
                  name: "Nhân Viên"
              },
              fromTime: "07:00",
              toTime: "20:00"
          })
      }

  }

  _repairDefaultPlace() {
      if (this.props.selectedPlace.id != this.state.selectedPlaceId) {
          this.setState({
              selectedPlaceId: this.props.selectedPlace.id,
          });
      }
  }

  componentDidUpdate(prevProps, prevState) {
     this._repairDefaultPlace();
  }

  componentWillMount() {
    this.props.actions.deleteGeneratedPassword();
  }

  componentDidMount() {
  }

  onFromTimeFocus() {
    Keyboard.dismiss();
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
    Keyboard.dismiss();
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
    this.props.actions.getGeneratedPassword(this.props.session, () => {
      this.setState({
        firstTimeResetPassword: true
      })
    })
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
    if (error != null && error.status > 399) {
      this.setState({
        isLoading: false
      })
    } else {
      console.log('Selected Place Create User', this.props.selectedPlace)
      this.props.actions.getListEmployee(this.props.session, this.props.selectedPlace.id, () => {
        this.setState({
          isLoading: false
        }, () => {
          this.props.actions.goBack()
          this.props.actions.setToast('Successfully!');
        })
      })
    }
  }

  onSubmitUser = (data) => {
    // console.log(data)
        const errRet = validateField(data)
        this.setState({
            errorForm: errRet,            
        })
      // console.warn(JSON.stringify(errRet))

      let userInfo = {}
    // if (this.state.chosenListPlace.length == 0) {
      // console.log(this.state.selectedPlaceId)

      // if (this.props.formState.CreateUserForm.syncErrors) {
      if (errRet.name || errRet.phone || errRet.email) {
          this.props.actions.setToast("Phần thông tin nhân viên có lỗi sai, xin hãy kiểm tra lại", 'danger')
          this._scrollPageUp()
          // return;
      } else if(!this.state.selectedPlaceId){
        this.props.actions.setToast("Bạn cần chọn tối thiểu 1 địa chỉ", 'danger');

    } else if (this.props.generatedPassword.trim() == '' && typeof this.props.route.params.id == 'undefined') {          
        this.props.actions.setToast("Hãy bấm nút Tạo mật khẩu đăng nhập", 'danger')
        this._scrollPageDown();        
    } else {
      
      // let listPlaceId = this.state.chosenListPlace.map(c => c.placeId).join(";")
      userInfo.fullName = data.name
      userInfo.phoneNumber = data.phone

      userInfo.email = data.email
      userInfo.typeTitle = this.state.currentJob.id
      userInfo.fromTimeWork = this.state.fromTime
      userInfo.toTimeWork = this.state.toTime
      userInfo.listPlaceId = this.placeDropdown.selectedPlaceId // this.state.selectedPlaceId.toString()//listPlaceId

      this.setState({
        isLoading: true,
      })

      if (typeof this.props.route.params.id == 'undefined') {
        userInfo.password = this.props.generatedPassword
        this.props.actions.createEmployeeInfo(this.props.session, userInfo, (error, data) => {
          this.getListEmployeeAfterSuccess(error)
        })
      } else {
        if(this.props.generatedPassword){
          userInfo.password = md5(this.props.generatedPassword)
        } 
        userInfo.bizAccountId = this.props.employeeDetail.bizAccountId
        this.props.actions.updateEmployeeInfo(this.props.session, userInfo, (error, data) => {
          this.getListEmployeeAfterSuccess(error)
        })
      }
    }
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
    // console.log('renderMainContainer catch state time :: props time', fromTime + " - " + toTime + " :: " + this.props.initialValues.fromTimeWork + " - " + this.props.initialValues.toTimeWork);
    // this.setDefaultTimeWork();

    let fromTime = this.state.fromTime
    let toTime = this.state.toTime    
    let listPlace = this.props.employeeDetail ? this.props.employeeDetail.listPlace : []
    let formState = null
    let nameError = null
    let nameTouched = false
    let errorNameStyle = null
    let errorLongNameStyle = null
    let phoneError = null
    let phoneTouched = false
    let errorPhoneStyle = null
    let emailError = null
    let errorEmailStyle = null
    let emailTouched = false
    let fields = null

    let errorForm = this.state.errorForm;

    if (typeof errorForm != "undefined") {
      
      if (typeof errorForm != 'undefined' && typeof fields != "undefined") {
        // let errors = formState.syncErrors
        if (errorForm.name) {
          nameTouched = true
          errorNameStyle = { borderColor: material.red500, borderWidth: 1 }
          if (errorForm.name.length > 30) {
            errorLongNameStyle = { marginBottom: 5 }
          }
          nameError = <Text style={{ color: material.red500 }}>{errorForm.name}</Text>
        }
        if (errorForm.phone) {
          phoneTouched = true
          errorPhoneStyle = { borderColor: material.red500, borderWidth: 1 }
          phoneError = <Text style={{ color: material.red500 }}>{errorForm.phone}</Text>
        }
        if (errorForm.email) {
          emailTouched = true
          errorEmailStyle = { borderColor: material.red500, borderWidth: 1 }
          emailError = <Text style={{ color: material.red500 }}>{errorForm.email}</Text>
        }
      }
    }

    let passwordText = null
    if (typeof this.props.route.params.id == 'undefined') {
      if (this.props.generatedPassword == '') {
        passwordText = <Text style={styles.passwordTextWarning}>{'Bạn cần tạo 1 mật khẩu'}</Text>
      } else {
        passwordText = <Text style={styles.passwordText}>{this.props.generatedPassword}</Text>
      }
    } else if (this.state.firstTimeResetPassword) {
      passwordText = <Text style={styles.passwordText}>{this.props.generatedPassword}</Text>
    } else {
      passwordText = <Text style={styles.passwordText}>{'*****'}</Text>
    }

    return (
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <View style={{ ...styles.inputContainer, ...errorNameStyle, ...errorLongNameStyle }}>
          <Field
            iconStyle={styles.closeIcon}
            icon={(input, active) => input.value && active ? 'close' : false}
            onIconPress={input => input.onChange('')}
            inputStyle={styles.inputText}
            style={{ ...styles.inputField }}
            label="Họ và tên"
            name="name"
            component={InputField}
            placeholderTextColor= {material.gray500} />
        </View>
        {nameTouched && nameError}

        <View style={{ ...styles.inputContainer, ...errorPhoneStyle }}>
          <Field
            iconStyle={styles.closeIcon}
            icon={input => input.value ? 'close' : false}
            onIconPress={input => input.onChange('')}
            inputStyle={styles.inputText}
            keyboardType="numeric"
            style={styles.inputField}
            label="Số điện thoại"
            name="phone"
            component={InputField}
            placeholderTextColor={material.gray500} />
        </View>
        {phoneTouched && phoneError}

        <View style={{ ...styles.inputContainer, ...errorEmailStyle }}>
          <Field
            iconStyle={styles.closeIcon}
            icon={input => input.value ? 'close' : false}
            onIconPress={input => input.onChange('')}
            inputStyle={styles.inputText}
            style={styles.inputField}
            label="Email"
            name="email"
            component={InputField}
            placeholderTextColor={material.gray500} />
        </View>
        {emailTouched && emailError}

        <View style={{ ...styles.inputContainer, zIndex: 100, marginBottom: 10, overflow: null }}>
          <TopDropdown
            ref='placeDropdown'
            dropdownValues={[
              { id: 1, name: "Nhân Viên" },
              //{id: 2, name: "Admin"}
            ]}
            onSelect={this.handleChangePlace.bind(this)}
            selectedOption={this.state.currentJob || { id: 1, name: "Nhân Viên" }} />
        </View>
        <Border color='rgba(0,0,0,0.5)' size={2} />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text style={styles.leftAddressTitleText}>Thời gian làm việc</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Grid>
            <Col style={{ alignItems: 'center' }}>
              <View style={{ ...styles.inputContainer, marginRight: 10 }}>
                <Field
                  onPress={this.onFromTimeFocus.bind(this)}
                  editable={false}
                  style={styles.inputField}
                  label={fromTime}
                  name="fromDate"
                  component={InputField}
                  placeholderTextColor={material.gray500} />
              </View>
            </Col>
            <Col style={{ alignItems: 'center' }}>
              <View style={{ ...styles.inputContainer, marginLeft: 10 }}>
                <Field
                  onPress={this.onToTimeFocus.bind(this)}
                  editable={false}
                  style={styles.inputField}
                  label={toTime}
                  name="toDate"
                  component={InputField}
                  placeholderTextColor={material.gray500} />
              </View>
            </Col>
          </Grid>
        </View>
        <Border color='rgba(0,0,0,0.5)' size={2} />
        <RenderGroup                            
          onReady={ref => this.placeDropdown = ref}
          selectedPlaceId = {this.state.selectedPlaceId}
        />
        <View style={styles.createPassBlock}>
          <Border color='rgba(0,0,0,0.5)' size={2} />
          <Grid>
            <Row style={{ justifyContent: 'center', height: 40, paddingBottom: 15, marginTop: 25 }}>
              <Button
                onPress={this.onGeneratedPasswordPress.bind(this)}
                style={styles.createPasswordButton}>
                <Text style={styles.createPasswordButtonText}>Tạo mật khẩu đăng nhập</Text>
              </Button>
            </Row>
            <Row style={{ alignItems: 'center', paddingBottom: 10 }}>
              <Col style={{ width: '25%' }} />
              <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                {passwordText}
              </Col>
              <Col style={{ justifyContent: 'center', flexDirection: 'row', width: '25%' }}>
                <Col style={{ alignItems: 'flex-end', width: '50%' }}>
                  <Icon
                    style={styles.copyIcon}
                    name="copy" />
                </Col>
                <Col style={{ justifyContent: 'center', width: '50%' }}>
                  <Text
                    onPress={this._setClipboardContent.bind(this)}
                    style={styles.copyText}>Copy</Text>
                </Col>
              </Col>
            </Row>
          </Grid>
        </View>
      </View>
    )
  }

  _scrollPageUp(){
      this.refs.myContent.scrollTo({x: 0, y: 0, animated: true});
  }

  _scrollPageDown(){
      this.refs.myContent.scrollToEnd();
  }

  render() {
      // console.warn('render');    
    const { handleSubmit } = this.props;    
    const [hour, minute] = this.state.fromTime.split(":")
    const [hour1, minute1] = this.state.toTime.split(":")

    return (
      <Container style={styles.container}>
        <ScrollView style={{ backgroundColor: material.white500 }} keyboardShouldPersistTaps={'handled'} ref='myContent'>
            {this.renderMainContainer()}
        </ScrollView>
        <Button
          onPress={handleSubmit(this.onSubmitUser)}
          style={{ ...styles.submitButton }}>
          <Text style={styles.createPasswordButtonText}>OK</Text>
        </Button>
        <DateTimePicker
          mode="time"
          titleIOS="Chọn thời gian"
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.fromTimeVisible}
          onConfirm={this.setFromTime.bind(this)}
          onCancel={this.onFromTimeCancel.bind(this)}
          date={new Date(2000, 1, 1, +hour, +minute)}
        />
        <DateTimePicker
          mode="time"
          titleIOS="Chọn thời gian"
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.toTimeVisible}
          onConfirm={this.setToTime.bind(this)}
          onCancel={this.onToTimeCancel.bind(this)}
          date={new Date(2000, 1, 1, +hour1, +minute1)}
        />

        <Modal open={this.state.isLoading}>
            <View style={{
              height: 50,
              width: 200,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              overflow: 'hidden',              
            }}>
              <Text>Please waiting...</Text>
            </View>
        </Modal>

      </Container>
    )
  }
}