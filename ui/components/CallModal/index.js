/**
 * Created by vjtc0n on 5/23/17.
 */
import React, { Component } from 'react'
import {
  Linking,
  Platform
} from 'react-native'
import {
  Container, Text, View, Grid, Row, Col, Button
} from 'native-base'
import Communications from 'react-native-communications';
import { connect } from 'react-redux'

import Modal from '~/ui/components/Modal'
import styles from './styles'

import * as commonActions from '~/store/actions/common'

@connect(state=>({
  
}), {...commonActions })

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.open == true) {
      this.props.openModal()
    }
  }
  
  onCallAccepted() {
    const {onCloseClick, phoneNumber} = this.props
    Communications.phonecall('+' + phoneNumber, true)
    this.props.closeModal()
    onCloseClick()
  }
  
  render() {
    const {open, title, onCloseClick, closeModal} = this.props
    return(
      <Modal
        onCloseClick={() => {
          closeModal()
          onCloseClick()
        }}
        title={title}
        open={open}>
        <View style={styles.container}>
          <Grid>
            <Row style={styles.headerContainer}>
              <Text style={{color: 'white'}}>Thông Báo</Text>
            </Row>
            <Row style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
              <Text style={{color: 'black'}}>Bạn có chắc chắn muốn thực hiện cuộc gọi?</Text>
            </Row>
            <Row style={{height: '40%'}}>
              <Col style={{justifyContent: 'center'}}>
                <Button
                  onPress={() => {
                    closeModal()
                    onCloseClick()
                  }}
                  style={{...styles.button, ...styles.leftButton}}>
                  <Text>Huỷ</Text>
                </Button>
              </Col>
              <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  onPress={this.onCallAccepted.bind(this)}
                  style={{...styles.button, ...styles.rightButton}}>
                  <Text>Đồng ý</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </View>
      </Modal>
    )
  }
}