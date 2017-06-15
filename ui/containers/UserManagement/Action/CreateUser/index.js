/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text, Dimensions, Clipboard, Keyboard } from 'react-native'
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

import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'
import * as commonActions from '~/store/actions/common'
import { getSelectedPlace } from '~/store/selectors/place'
import { validateField, renderGroup } from './utils'
import styles from './styles'
import md5 from 'md5'
import material from '~/theme/variables/material'

const { height, width } = Dimensions.get('window');

const formSelector = formValueSelector('CreateUserForm')


@connect(state => ({
  session: authSelectors.getSession(state),
  listEmployee: accountSelectors.getListEmployee(state),
  place: state.place,
  generatedPassword: accountSelectors.getGeneratedPassword(state),
  formValues: formSelector(state, 'name', 'email', 'phone', 'permission'),
  formState: state.form,
  selectedPlace: getSelectedPlace(state)
}), dispatch => ({
  actions: bindActionCreators({ ...accountActions, ...commonActions, resetForm: reset }, dispatch)
}), (stateProps, dispatchProps, ownProps) => {
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
    console.log('@connect employeeDetail.fromTime : toTime ' + employeeDetail.fromTimeWork + ' : ' + employeeDetail.toTimeWork);

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
@reduxForm({ form: 'CreateUserForm', fields: ['name', 'email', 'phone'], validate: validateField })
export default class CreateUserContainer extends Component {
  constructor(props) {
      console.log('step', 'constructor');
      // let selectedPlaceId = props.selectedPlace.id
    super(props)
    let currentJob = {
      id: 1,
      name: "Nhân Viên"
    }
    if (props.formValues && Object.keys(props.formValues) > 1 && props.formValues.permission) {
      currentJob = props.formValues.permission
    }

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
      // chosenListPlace: [],
      currentJob: currentJob,
      isLoading: false,
      firstTimeResetPassword: false,      
      selectedPlaceId: props.selectedPlace.id,
    }

    this.firstTimeResetTime = true

  }

  componentWillBlur() {
      console.log('step', 'componentWillBlur');
    this.props.actions.resetForm('CreateUserForm')
      // this. resetProps();
    // console.log(this.props.initialValues.GroupAddress)
    this.placeDropdown.clearAll()

  }

  resetProps() {
      // this.props.change('GroupAddress', this.props.place.listPlace)
      this.props.change('name', '')
      this.props.change('email', '')
      this.props.change('phone', '')
  }

  componentWillFocus() {
      // console.warn(JSON.stringify(
      //     {thisPropsSelectedPlace: this.props.selectedPlace,
      //         thisStateSelectedPlaceId: this.state.selectedPlaceId,
      //     }, null, 2));

      // console.warn('props: ' + JSON.stringify(this.props.formValues, null, 2));
      // console.warn('state: ' + JSON.stringify(this.state, null, 2));

      this.firstTimeResetTime = true

      if (typeof this.props.route.params.id != "undefined") {
          let employeeDetail = this.props.listEmployee[Number(this.props.route.params.id)]
          let permission = null
          switch (employeeDetail.titleType) {
              case 1:
                  permission = "Nhân Viên"
          }
          this.props.change('GroupAddress', this.props.place.listPlace)
          this.props.change('name', employeeDetail.userName)
          this.props.change('email', employeeDetail.email)
          this.props.change('phone', employeeDetail.phoneNumber)

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
          // this.props.change('GroupAddress', this.props.place.listPlace)
          // this.props.change('name', '')
          // this.props.change('email', '')
          // this.props.change('phone', '')
          this.resetProps();

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

      // this.setState({
      //     firstTimeResetTime: true,
      // });
      this.setDefaultTimeWork();
      this.setDefaultPlace();

      if (this.props.selectedPlace.id != this.state.selectedPlaceId) {
        this.setState({
            selectedPlaceId: this.props.selectedPlace.id,
        }, () => {
          this.setDefaultPlace()
        });
      }
  }



  componentWillMount() {
    this.props.actions.deleteGeneratedPassword();
  }

  componentDidMount() {
    if (typeof this.props.route.params.id == "undefined") {
      this.setState({
        fromTime: "07:00",
        toTime: "20:00",
        firstTimeResetPassword: false
      })
    }
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
        })
      })
    }
  }

  onSubmitUser = () => {

    let userInfo = {}
    // if (this.state.chosenListPlace.length == 0) {
      console.log(this.state.selectedPlaceId)

      if (this.props.formState.CreateUserForm.syncErrors) {
          this.props.actions.setToast("Phần thông tin nhân viên có lỗi sai, xin hãy kiểm tra lại", 'danger')
          return;
      } else if(!this.state.selectedPlaceId){
      this.props.actions.setToast("Bạn cần chọn tối thiểu 1 địa chỉ", 'danger')
    } else if (this.props.generatedPassword.trim() == '' && typeof this.props.route.params.id == 'undefined') {
      this.props.actions.setToast("Hãy bấm nút Tạo mật khẩu đăng nhập", 'danger')
    } else {
      this.setState({
        isLoading: true
      })
      // let listPlaceId = this.state.chosenListPlace.map(c => c.placeId).join(";")
      userInfo.fullName = this.props.formValues.name
      userInfo.phoneNumber = this.props.formValues.phone
      userInfo.password = this.props.generatedPassword
      // If edit create account, not encrypt password; if editing, encrypt password
      if (typeof this.props.route.params.id != 'undefined') {
        userInfo.password = md5(this.props.generatedPassword)
      }
      userInfo.email = this.props.formValues.email
      userInfo.typeTitle = this.state.currentJob.id
      userInfo.fromTimeWork = this.state.fromTime
      userInfo.toTimeWork = this.state.toTime
      userInfo.listPlaceId = this.state.selectedPlaceId.toString()//listPlaceId
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
    // this.setState({
    //   // chosenListPlace: data
    //   selectedPlaceId: data.length ? data[0].placeId : 0,
    // })
  }

  handleChangePlace(item) {
    this.setState({
      currentJob: {
        id: item.id,
        name: item.name
      }
    })
  }

  setDefaultTimeWork() {
      // alert('setDefaultTime ' + this.props.initialValues.fromTimeWork + " : " + this.props.initialValues.toTimeWork);
      if (typeof this.props.initialValues.fromTimeWork != "undefined" && typeof  this.props.initialValues.toTimeWork != "undefined")
          if (this.state.fromTime != this.props.initialValues.fromTimeWork
              && this.state.toTime != this.props.initialValues.toTimeWork
              && this.firstTimeResetTime) {
              // this.setState({
              //     fromTime: this.props.initialValues.fromTimeWork,
              //     toTime: this.props.initialValues.toTimeWork,
              //     firstTimeResetTime: false,
              // })
              // update without re-rendering, tricky way
              this.state.fromTime = this.props.initialValues.fromTimeWork
              this.state.toTime = this.props.initialValues.toTimeWork
              this.firstTimeResetTime = false
          }
  }



  setDefaultPlace() {
    // console.warn(JSON.stringify(this.props.selectedPlace, null, 2));
    // this.placeDropdown.setDefaultChecked(this.props.selectedPlace.id);
      this.placeDropdown.setDefaultChecked();
  }

  renderMainContainer() {
    // console.log('renderMainContainer catch state time :: props time', fromTime + " - " + toTime + " :: " + this.props.initialValues.fromTimeWork + " - " + this.props.initialValues.toTimeWork);
    this.setDefaultTimeWork();

    let fromTime = this.state.fromTime
    let toTime = this.state.toTime
    const item = this.props.listEmployee[+this.props.route.params.id]
    let listPlace = item ? item.listPlace : []
    // if (typeof this.props.route.params.id == "undefined") {
    //   listPlace = this.state.chosenListPlace
    // } else {
    //   listPlace = this.props.listEmployee[Number(this.props.route.params.id)].listPlace
    // }
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
    if (typeof this.props.route.params.id == 'undefined') {
      formState = this.props.formState.CreateUserForm
    } else {
      formState = this.props.formState.CreateUserForm
    }
    if (typeof formState != "undefined") {
      fields = formState.fields
      if (typeof formState.syncErrors != 'undefined' && typeof fields != "undefined") {
        let errors = formState.syncErrors
        if (errors.name && typeof fields.name != 'undefined' && fields.name.touched) {
          nameTouched = true
          errorNameStyle = { borderColor: material.red500, borderWidth: 1 }
          if (errors.name.length > 30) {
            errorLongNameStyle = { marginBottom: 5 }
          }
          nameError = <Text style={{ color: material.red500 }}>{errors.name}</Text>
        }
        if (errors.phone && typeof fields.phone != 'undefined' && fields.phone.touched) {
          phoneTouched = true
          errorPhoneStyle = { borderColor: material.red500, borderWidth: 1 }
          phoneError = <Text style={{ color: material.red500 }}>{errors.phone}</Text>
        }
        if (errors.email && typeof fields.email != 'undefined' && fields.email.touched) {
          emailTouched = true
          errorEmailStyle = { borderColor: material.red500, borderWidth: 1 }
          emailError = <Text style={{ color: material.red500 }}>{errors.email}</Text>
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
        <FieldArray
          handleGetListPlaceFromArrayField={this.handleGetListPlaceFromArrayField.bind(this)}
          employeeListPlace={listPlace}
          name="GroupAddress"
          onReady={ref => this.placeDropdown = ref}
          selectedPlaceId = {this.state.selectedPlaceId}
          component={renderGroup} />
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

  renderIndicator() {
    return (
      <View style={{ height: height - 100, justifyContent: 'center' }}>
        <Spinner />
      </View>
    )
  }

  render() {
    // console.log("render props fromtime:totime", this.props.initialValues.fromTimeWork + " : " + this.props.initialValues.toTimeWork);
    //   console.log("render state fromtime:totime", this.state.fromTime + " : " + this.state.toTime);
    const { handleSubmit } = this.props;
    let mainContainer = null
    if (this.state.isLoading) {
      mainContainer = this.renderIndicator()
        // console.log("state.isLoading: ", "renderIndiCator");
    } else {
      mainContainer = this.renderMainContainer()
        // console.log("state.isLoading: ", "renderMainContainer");
    }

    const [hour, minute] = this.state.fromTime.split(":")
    const [hour1, minute1] = this.state.toTime.split(":")

    return (
      <Container style={styles.container}>
        <Content style={{ backgroundColor: material.white500 }} keyboardShouldPersistTaps={'handled'}>
          {mainContainer}

          {/*style={styles.absoluteContainer}*/}
        </Content>
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
      </Container>
    )
  }
}