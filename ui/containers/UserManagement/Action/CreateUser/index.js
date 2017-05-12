/**
 * Created by vjtc0n on 5/5/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox, Picker,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Dash from 'react-native-dash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
    InputField,
    CheckBoxField,
    DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'
import Modal from '~/ui/components/Modal'

import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'

import { validate, renderGroupAddress } from './utils'
import styles from './styles'

const data = []
for (let i = 0; i < 5; i++) {
    data.push({
        address: 'Hoang Quoc Viet'
    })
}

const formSelector = formValueSelector('CreateUserForm')
@connect(state=>({
  listEmployee: accountSelectors.getListEmployee(state)
}), {}, (stateProps, dispatchProps, ownProps)=>({
  initialValues: {
    GroupAddress: data
  },
  ...ownProps, ...stateProps, ...dispatchProps,
}))
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
          rowIDOfEmployee: 0
        }
    }
  
    componentWillFocus(){
      console.log('Will Focus detail')
    }
    
    componentDidMount() {
      let rowIDOfEmployee = Number(this.props.route.params.id)
      console.log(rowIDOfEmployee)
      console.log(this.props.listEmployee[rowIDOfEmployee])
      this.setState({
        employeeDetail: this.props.listEmployee[rowIDOfEmployee],
        rowIDOfEmployee: rowIDOfEmployee
      })
    }
  
    componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      let rowIDOfEmployee = Number(nextProps.route.params.id)
      console.log(rowIDOfEmployee)
      console.log(nextProps.listEmployee[rowIDOfEmployee])
      this.setState({
        employeeDetail: nextProps.listEmployee[rowIDOfEmployee],
        rowIDOfEmployee: rowIDOfEmployee
      })
    }
    
    onJobPositionFocus() {
        this.setState({
            jobModalOpen: true
        })
    }
    
    onPermissionFocus() {
        this.setState({
            permissionModalOpen: true
        })
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
    
    onCheckAllPress(fields) {
      fields.map((address, index) => {
        this.setState({
          checkAll: !this.state.checkAll
        }, () => {
          this.props.change(`${address}.ad`, this.state.checkAll)
        })
      })
    }
    
    renderJobModal() {
        return(
            <View style={styles.modalContainer}>
                <Text>ABC</Text>
            </View>
        )
    }
    
    renderPermissionModal() {
        return(
            <View style={styles.modalContainer}>
                <Text>ABC</Text>
            </View>
        )
    }
    
    render() {
        
        let fromTime = moment(this.state.fromTime).format("HH:mm")
        let toTime = moment(this.state.toTime).format("HH:mm")
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.inputContainer}>
                            <Field
                                style={styles.inputField}
                                label="Họ và tên"
                                name="name"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                style={styles.inputField}
                                label="Email"
                                name="email"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                style={styles.inputField}
                                label="Phone number"
                                name="phone"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={{}}
                                iconStyle={styles.inputIcon}
                                icon="foward"
                                onPress={this.onJobPositionFocus.bind(this)}
                                editable={false}
                                style={styles.inputField}
                                label="Vị trí kinh doanh"
                                name="position"
                                component={InputField}
                                placeholderTextColor="#7e7e7e">
                            </Field>
                        </View>
                        <View style={styles.inputContainer}>
                            <Field
                                inputStyle={{}}
                                iconStyle={styles.inputIcon}
                                icon="foward"
                                onPress={this.onPermissionFocus.bind(this)}
                                editable={false}
                                style={styles.inputField}
                                label="Phân quyền"
                                name="permission"
                                component={InputField}
                                placeholderTextColor="#7e7e7e"/>
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
                          checkAll={this.onCheckAllPress.bind(this)}
                          name="GroupAddress"
                          component={renderGroupAddress}/>
                        <View style={{marginTop: 15}}>
                            <Grid>
                                <Col>
                                    <Button style={styles.createPasswordButton}>
                                        <Text style={styles.createPasswordButtonText}>Tạo mật khẩu đăng nhập</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                        <View style={{marginTop: 40}}>
                            <Grid>
                                <Col/>
                                <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={styles.passwordText}>ABC123</Text>
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
                                <Button style={styles.submitButton}>
                                    <Text style={styles.createPasswordButtonText}>OK</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                    <Modal onCloseClick={e=>this.setState({jobModalOpen:false})} open={this.state.jobModalOpen}>
                        {this.renderJobModal()}
                    </Modal>
                    <Modal onCloseClick={e=>this.setState({permissionModalOpen:false})} open={this.state.permissionModalOpen}>
                        {this.renderPermissionModal()}
                    </Modal>
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