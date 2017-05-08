import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import {  } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import moment from 'moment';

import Border from '~/ui/elements/Border'
import Icon from '~/ui/elements/Icon'

import styles from './styles'

const longText = "When the scroll view is disabled, this defines how far your touch may move off of the button," +
"before deactivating the button. Once deactivated, try moving it back and youll see that the button is once again "+
  "reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a "+
  "constant to reduce memory allocations."

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
        <View style={{backgroundColor: 'white', height: '100%'}}>
          <View style={styles.placeContainer}>
            <Grid>
              <Row style={{height: '7%'}}>
                <Col style={{alignItems: 'flex-end'}}>
                  <Text style={{...styles.normalText}}>8:12:53</Text>
                </Col>
                <Col style={{width: '5%'}}/>
                <Col>
                  <Text style={{...styles.normalText}}>10/03/17</Text>
                </Col>
              </Row>
              <Row style={{flexDirection: 'column', height: '15%'}}>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Icon name='calendar' style={styles.icon} />
                    <Text style={{color: 'black'}}>14/2</Text>
                  </View>
                  <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                  <View style={styles.column}>
                    <Icon name='history' style={styles.icon} />
                    <Text style={{color: 'black'}}>11:30</Text>
                  </View>
                  <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                  <View style={styles.column}>
                    <Icon name='friend' style={styles.icon} />
                    <Text style={{color: 'black'}}>2</Text>
                  </View>
                  <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                  <View style={styles.column}>
                    <Icon name='want-feed' style={styles.icon} />
                    <Text style={{color: 'black'}}>2</Text>
                  </View>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
              </Row>
              <Row style={{height: '10%'}}>
                <Left>
                  <Text style={{...styles.normalText, ...styles.leftText}}>Người đặt chỗ:</Text>
                </Left>
                <Right>
                  <Text style={{...styles.normalText, ...styles.boldText, ...styles.rightText}}>Username</Text>
                </Right>
              </Row>
              <Row style={{height: '10%'}}>
                <Left>
                  <Text style={{...styles.normalText, ...styles.leftText}}>Số điện thoại:</Text>
                </Left>
                <Right>
                  <Text style={{...styles.normalText, ...styles.boldText, ...styles.rightText}}>091 345 6789</Text>
                </Right>
              </Row>
              <Row style={{height: '10%'}}>
                <Left>
                  <Text style={{...styles.normalText, ...styles.leftText}}>Yêu cầu riêng:</Text>
                </Left>
              </Row>
              <Row style={{height: '25%'}}>
                <Left>
                  <Content>
                    <Text style={{...styles.normalText, ...styles.leftText}}>
                      {longText}
                    </Text>
                  </Content>
                </Left>
              </Row>
              <Row style={{flexDirection: 'column', height: '2%', marginTop: 10}}>
                <Border color='rgba(0,0,0,0.5)' size={1} />
              </Row>
              <Row style={{}}>
                <Left>
                  <Text style={{...styles.normalText, ...styles.leftText, ...styles.boldText}}>Đặt trước:</Text>
                </Left>
                <Right style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text primary style={{}}>SL: </Text>
                  <Text primary style={{...styles.rightText, ...styles.boldText}}>2</Text>
                </Right>
              </Row>
              <Row style={{}}>
                <Left>
                  <Text style={{...styles.normalText, ...styles.leftText, ...styles.boldText}}>Name of product:</Text>
                </Left>
                <Right style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={{...styles.normalText}}>SL: </Text>
                  <Text style={{...styles.normalText, ...styles.rightText, ...styles.boldText}}>2</Text>
                </Right>
              </Row>
              <Row style={{}}>
                <Left>
                  <Text style={{...styles.normalText, ...styles.leftText, ...styles.boldText}}>Name of product:</Text>
                </Left>
                <Right style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={{...styles.normalText}}>SL: </Text>
                  <Text style={{...styles.normalText, ...styles.rightText, ...styles.boldText}}>2</Text>
                </Right>
              </Row>
            </Grid>
          </View>
          <View style={styles.submitContainer}>
            <Grid>
              <Col>
                <Button style={{...styles.submitButton, ...styles.declineButton}}>
                  <Text style={{...styles.declineText, ...styles.boldText}}>Từ chối</Text>
                </Button>
              </Col>
              <Col>
                <Button style={{...styles.submitButton, ...styles.acceptButton}}>
                  <Text style={{...styles.boldText}}>Nhận đặt chỗ</Text>
                </Button>
              </Col>
            </Grid>
          </View>
          <View style={styles.codeContainer}>
            <Grid>
              <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{...styles.normalText, ...styles.codeTitleText}}>Mã đặt chỗ:</Text>
              </Col>
              <Col style={{justifyContent: 'center'}}>
                <Text primary bold style={{...styles.codeText}}>#DC123456</Text>
              </Col>
            </Grid>
          </View>
        </View>
      </Container>
    )
  }
}