import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import {  } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Dash from 'react-native-dash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import styles from './styles'

export default class PlaceOrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  render() {
    return (
      <Container>
        <View style={styles.merchantAddress}>
          <Text small white>33 Nguyễn Chí Thanh, Ba Đình, Hà Nội</Text>
        </View>
        <Content style={{backgroundColor: 'white'}}>
          <Text>ABC</Text>
        </Content>
      </Container>
    )
  }
}