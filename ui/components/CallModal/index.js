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

import Modal from '~/ui/components/Modal'
import styles from './styles'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  onCallAccepted() {
    const {onCloseClick, phoneNumber} = this.props
    Communications.phonecall('+' + phoneNumber, true)
    onCloseClick()
  }
  
  render() {
    const {open, title, onCloseClick} = this.props
    return(
      <Modal
        onCloseClick={onCloseClick}
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
                  onPress={onCloseClick}
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