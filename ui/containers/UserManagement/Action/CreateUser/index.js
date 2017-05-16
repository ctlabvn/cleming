/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox, Picker,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import Dash from 'react-native-dash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
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

import { validate, renderGroup } from './utils'
import styles from './styles'

const formSelector = formValueSelector('CreateUserForm')


@connect(state=>({
  session: authSelectors.getSession(state),
  listEmployee: accountSelectors.getListEmployee(state),
  place: state.place,
  generatedPassword: accountSelectors.getGeneratedPassword(state),
  formValues: formSelector(state, 'name', 'email', 'phone', 'permission')
}), { ...accountActions }, (stateProps, dispatchProps, ownProps)=>{
    let employeeDetail = stateProps.listEmployee[Number(ownProps.route.params.id)]
    

    if (typeof ownProps.route.params.id == 'undefined') {        
      return ({
        enableReinitialize: true,
        initialValues: {
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
        }
      },
      ...ownProps, ...stateProps, ...dispatchProps,
    })
})
@reduxForm({ form: 'CreateUserForm'})
export default class CreateUserContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          jobModalOpen: false,
          permissionModalOpen: false,
          fromTimeVisible: false,
          toTimeVisible: false,
          fromTime: new Date(),
          toTime: new Date(),
          checkAll: false,
          employeeDetail: {},
          rowIDOfEmployee: 0,
          chosenListPlaceID: [],
          currentJob: props.formValues.permission
        }
        
    }
  
    componentWillFocus(){
      if (typeof this.props.route.params.id != "undefined") {
        let employeeDetail = this.props.listEmployee[Number(this.props.route.params.id)]
        let permission = null
        let listPlaceID = []
        switch (employeeDetail.titleType) {
          case 1: permission = "Nhân Viên"
        }
        this.props.change('GroupAddress', this.props.place.listPlace)
        this.props.change('name', employeeDetail.userName)
        this.props.change('email', employeeDetail.email)
        this.props.change('phone', employeeDetail.phoneNumber)
        employeeDetail.listPlace.map((place, index) => {
          listPlaceID.push(place.placeId)
        })
        this.setState({
          chosenListPlaceID: listPlaceID,
          currentJob: {
            id: employeeDetail.titleType,
            name: permission
          }
        })
      } else {
        this.props.change('GroupAddress', this.props.place.listPlace)
        this.props.change('name', '')
        this.props.change('email', '')
        this.props.change('phone', '')
        this.setState({
          chosenListPlaceID: [],
          currentJob: {
            id: 1,
            name: "Nhân Viên"
          }
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
            fromTime: value
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
            toTime: value
        })
    }
    
    onGeneratedPasswordPress() {
      this.props.getGeneratedPassword(this.props.session)
    }
    
    onSubmitUser() {
      let fromTime = moment(this.state.fromTime).format("HH:mm")
      let toTime = moment(this.state.toTime).format("HH:mm")
      console.log(this.props.formValues)
    }
    
    handleGetListPlaceFromArrayField(data) {
      this.setState({
        chosenListPlaceID: data
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
  
    render() {
        let fromTime = moment(this.state.fromTime).format("HH:mm")
        let toTime = moment(this.state.toTime).format("HH:mm")
        let listPlace = null
        if (typeof this.props.route.params.id == "undefined") {
          listPlace = []
        } else {
          listPlace = this.props.listEmployee[Number(this.props.route.params.id)].listPlace
        }
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={styles.inputText}
                                style={styles.inputField}
                                label="Họ và tên"
                                name="name"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={styles.inputText}
                                style={styles.inputField}
                                label="Email"
                                name="email"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={styles.inputText}
                                style={styles.inputField}
                                label="Phone number"
                                name="phone"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={{...styles.inputContainer, zIndex: 100}}>
                            <TopDropdown
                              ref='placeDropdown'
                              dropdownValues={[
                                {id: 1, name: "Nhân Viên"},
                                {id: 2, name: "Admin"}
                              ]}
                              onSelect={this.handleChangePlace.bind(this)}
                              selectedOption={this.state.currentJob} />
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
                        <View style={{marginTop: 15}}>
                            <Grid>
                                <Col>
                                    <Button
                                      onPress={this.onGeneratedPasswordPress.bind(this)}
                                      style={styles.createPasswordButton}>
                                        <Text style={styles.createPasswordButtonText}>Tạo mật khẩu đăng nhập</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                        <View style={{marginTop: 40}}>
                            <Grid>
                                <Col/>
                                <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={styles.passwordText}>{this.props.generatedPassword}</Text>
                                </Col>
                                <Col style={{ justifyContent: 'center', flexDirection: 'row'}}>
                                    <Col style={{alignItems: 'flex-end', width: '70%'}}>
                                        <Icon
                                            style={styles.copyIcon}
                                            name="copy"/>
                                    </Col>
                                    <Col style={{justifyContent: 'center', width: '30%'}}>
                                        <Text style={styles.copyText}>Copy</Text>
                                    </Col>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Grid>
                            <Col>
                                <Button
                                  onPress={this.onSubmitUser.bind(this)}
                                  style={styles.submitButton}>
                                    <Text style={styles.createPasswordButtonText}>OK</Text>
                                </Button>
                            </Col>
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
                </Content>
            </Container>
        )
    }
}