/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row, Text
} from 'native-base'
import { Dimensions, Clipboard, Keyboard, ScrollView } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector, reset } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import TopDropdown from '../../components/DropDownList'
import Border from '~/ui/elements/Border'
import { getToastMessage } from '~/ui/shared/utils'
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
import { validateField, RenderGroup, RenderTextField } from './utils'
import styles from './styles'
import md5 from 'md5'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
const { height, width } = Dimensions.get('window');

const formSelector = formValueSelector('CreateUserForm')


@connect(state => ({
  session: authSelectors.getSession(state),  
  employeeDetail: accountSelectors.getCurrentEmployee(state),
  initialValues: accountSelectors.getCurrentEmployeeValues(state),
  generatedPassword: accountSelectors.getGeneratedPassword(state),  
  selectedPlace: getSelectedPlace(state)
}), dispatch => ({
  actions: bindActionCreators({ ...accountActions, ...commonActions, resetForm: reset }, dispatch)
}))
@reduxForm({
  form: 'CreateUserForm',
  enableReinitialize: true,
  // fields: ['name', 'email', 'phone'],
  // validate: validateField
})
export default class CreateUserContainer extends Component {
  constructor(props) {
    console.log('step', 'constructor');
    // let selectedPlaceId = props.selectedPlace.id
    super(props)

    const { employeeDetail } = props;

    let fromTime = props.employeeDetail ? props.employeeDetail.fromTimeWork : '07:00';
    let toTime = props.employeeDetail ? props.employeeDetail.toTimeWork : '20:00';

    let currentJob = {
      id: 1,
      name: I18n.t('employee')
    }
    
    this.state = {
      jobModalOpen: false,
      permissionModalOpen: false,
      fromTimeVisible: false,
      toTimeVisible: false,
      fromTime: fromTime,
      toTime: toTime,
      checkAll: false,
      employeeDetail: {},
      rowIDOfEmployee: 0,
      // chosenListPlace: [],
      currentJob,
      isLoading: false,
      firstTimeResetPassword: false,
      selectedPlaceId: props.selectedPlace.id,
    }
  }

  // componentWillBlur() {
  //   // console.log('step', 'componentWillBlur');    
  //   this.props.actions.resetForm('CreateUserForm')
  //   this._scrollPageUp()
  // }


  // componentWillFocus() {

  //   if (typeof this.props.route.params.id != "undefined") {
  //     let employeeDetail = this.props.employeeDetail

  //     this.placeDropdown.handleCheck(employeeDetail.listPlace[0] || { placeId: this.state.selectedPlaceId })

  //     let permission = null
  //     switch (employeeDetail.titleType) {
  //       case 1:
  //         permission = I18n.t('employee')
  //     }
  //     this.setState({
  //       // chosenListPlace: employeeDetail.listPlace,
  //       currentJob: {
  //         id: employeeDetail.titleType,
  //         name: permission
  //       },
  //       firstTimeResetPassword: false,

  //     })

  //   } else {
  //     this.props.actions.deleteGeneratedPassword()
  //     this.placeDropdown.handleCheck({ placeId: this.state.selectedPlaceId })
  //     this.setState({
  //       // chosenListPlace: [],
  //       currentJob: {
  //         id: 1,
  //         name: I18n.t('employee')
  //       },
  //       fromTime: "07:00",
  //       toTime: "20:00"
  //     })
  //   }

  // }

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
    this.props.actions.setToast(getToastMessage(I18n.t('is_processing')), 'info', null, null, 3000, 'top')
    this.props.actions.getGeneratedPassword(this.props.session, () => {
      this.setState({
        firstTimeResetPassword: true,
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

  onSubmitUser = (data) => {
    // console.log(data)
    const { employeeDetail } = this.props;
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
      // this.props.actions.setToast(getToastMessage(I18n.t('err_employee_info_invalid')), 'info', null, null, 3000, 'top')
      this._scrollPageUp()
      // return;
    } else if (!this.state.selectedPlaceId) {
      this.props.actions.setToast(getToastMessage(I18n.t('err_need_address')), 'info', null, null, 3000, 'top')
    } else if (this.props.generatedPassword.trim() == '' && !employeeDetail) {
      // this.props.actions.setToast(getToastMessage(I18n.t('err_need_create_password')), 'info', null, null, 3000, 'top')
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


        const {employeeDetail} = this.props;
      // if ((this.props.route.params && this.props.route.params.id)) {
          if (!employeeDetail) {
        userInfo.password = this.props.generatedPassword
        this.props.actions.createEmployeeInfo(this.props.session, userInfo, (error, data) => {
            this.getListEmployeeAfterSuccess(error)
            this.setState({isLoading: false})
        })
      } else {
        if (this.props.generatedPassword) {
          userInfo.password = md5(this.props.generatedPassword)
        }
        userInfo.bizAccountId = this.props.employeeDetail.bizAccountId
        this.props.actions.updateEmployeeInfo(this.props.session, userInfo, (error, data) => {
            this.getListEmployeeAfterSuccess(error)
            this.setState({isLoading: false})
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
            errorNameStyle.marginBottom = 5
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

      const { employeeDetail } = this.props;

      if (this.state.firstTimeResetPassword) {
          passwordText = <Text style={styles.passwordText}>{this.props.generatedPassword}</Text>
      } else if (employeeDetail) {
          passwordText = <Text style={styles.passwordText}>{'*****'}</Text>
      } else {
          passwordText = <Text medium warning>{I18n.t('need_create_password')}</Text>
      }

    // if (this.props.route.params && this.props.route.params.id) {
    //   if (this.props.generatedPassword == '') {
    //     passwordText = <Text style={styles.passwordTextWarning}>{I18n.t('need_create_password')}</Text>
    //   } else {
    //     passwordText = <Text style={styles.passwordText}>{this.props.generatedPassword}</Text>
    //   }
    // } else if (this.state.firstTimeResetPassword) {
    //   passwordText = <Text style={styles.passwordText}>{this.props.generatedPassword}</Text>
    // } else {
    //   passwordText = <Text style={styles.passwordText}>{'*****'}</Text>
    // }

    this.passwordText = passwordText;
    const firstItem = (
      <View>      
        <RenderTextField label={I18n.t('full_name')} name="name" errorStyle={errorNameStyle} />
        {nameTouched && nameError}

        <RenderTextField label={I18n.t('phone_number')} name="phone" errorStyle={errorPhoneStyle} keyboardType="numeric" />
        {phoneTouched && phoneError}

        <RenderTextField label={I18n.t('email')} name="email" errorStyle={errorEmailStyle} />
        {emailTouched && emailError}

        <View style={{ ...styles.inputContainer, zIndex: 100, marginBottom: 10, overflow: null }}>
          <TopDropdown
            // ref='placeDropdown'
            dropdownValues={[
              { id: 1, name: I18n.t('employee') },
              //{id: 2, name: "Admin"}
            ]}
            onSelect={this.handleChangePlace.bind(this)}
            selectedOption={this.state.currentJob || { id: 1, name: I18n.t('employee') }} />
        </View>
        <Border/>
        
        <Text style={styles.leftAddressTitleText}>{I18n.t('work_time')}</Text>        
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
        <Border/>

        <Text style={styles.leftAddressTitleText}>{I18n.t('list_place')}</Text>
      </View>
    )

    const lastItem = (
      <View style={styles.createPassBlock}>
          <Border/>
          <Grid>
            <Row style={{ justifyContent: 'center', height: 40, paddingBottom: 15, marginTop: 25 }}>
              <Button
                onPress={this.onGeneratedPasswordPress.bind(this)}
                style={styles.createPasswordButton}>
                <Text style={styles.createPasswordButtonText}>{I18n.t('create_password')}</Text>
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
                    style={styles.copyText}>{I18n.t('copy')}</Text>
                </Col>
              </Col>
            </Row>
          </Grid>
      </View>
    )

    return (
        <RenderGroup
          firstItem={firstItem}
          onReady={ref => this.placeDropdown = ref}
          selectedPlaceId={this.state.selectedPlaceId}
          lastItem={lastItem}
        />
    )
  }

  _scrollPageUp() {
    this.placeDropdown.scrollToTop()
  }

  _scrollPageDown() {
    this.placeDropdown.scrollToEnd()
  }

  render() {
    // console.warn('render');    
    const { handleSubmit } = this.props;
    const [hour, minute] = this.state.fromTime.split(":")
    const [hour1, minute1] = this.state.toTime.split(":")

    return (
      <Container style={styles.container}>              
        {this.renderMainContainer()}
        <Button
          onPress={handleSubmit(this.onSubmitUser)}
          style={{ ...styles.submitButton }}>
          <Text style={styles.createPasswordButtonText}>OK</Text>
        </Button>
        <DateTimePicker
          mode="time"
          titleIOS={I18n.t('choose_time')}
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.fromTimeVisible}
          onConfirm={this.setFromTime.bind(this)}
          onCancel={this.onFromTimeCancel.bind(this)}
          date={new Date(2000, 1, 1, +hour, +minute)}
        />
        <DateTimePicker
          mode="time"
          titleIOS={I18n.t('choose_time')}
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.toTimeVisible}
          onConfirm={this.setToTime.bind(this)}
          onCancel={this.onToTimeCancel.bind(this)}
          date={new Date(2000, 1, 1, +hour1, +minute1)}
        />

        <Modal
          onCloseClick={() => { }}
          open={this.state.isLoading}>
          <Spinner/>
          {/*<View style={styles.preload}>*/}
            {/*<Text>Đang xử lý...</Text>*/}
          {/*</View>*/}
        </Modal>

      </Container>
    )
  }
}