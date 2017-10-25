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
// import * as commonActions from '~/store/actions/common'
import {formatPhoneNumber} from '~/ui/shared/utils'
import material from '~/theme/variables/material'

// @connect(state=>({
//
// }), {...commonActions })

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.open == true) {
  //     this.props.openModal()
  //   }
  // }

  onCallAccepted() {
    const {onCloseClick, phoneNumber} = this.props
    Communications.phonecall('+' + phoneNumber, true)
    // this.props.closeModal()
    onCloseClick()
  }

  render() {
    // const {open, title, onCloseClick, closeModal, phoneNumber} = this.props
      const {open, title, onCloseClick, phoneNumber} = this.props
    return(
      <Modal
        onCloseClick={() => {
          // closeModal()
          onCloseClick()
        }}
        title={title}
        open={open}>
        <View style={styles.container}>
          <Grid>
            <Row style={styles.headerContainer}>
              <Text medium bold white>Thông Báo</Text>
            </Row>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, minWidth: '80%'}}>
              <Text medium grayDark bold>Bạn có muốn gọi đến số</Text>
              <Text medium grayDark bold style={{marginTop: 5}}>{formatPhoneNumber(phoneNumber)}?</Text>
            </View>
            <Row style={{justifyContent: 'space-around', alignItems: 'center', height: 45, borderTopWidth: 1, borderColor: material.gray300}}>
              <Text medium gray onPress={()=> onCloseClick()}>Huỷ</Text>
              <Text medium bold primary onPress={() => this.onCallAccepted()}>Gọi</Text>
            </Row>

            {/*<Row>*/}
              {/*<Col style={{justifyContent: 'center'}}>*/}
                {/*<Button*/}
                  {/*onPress={() => {*/}
                    {/*onCloseClick()*/}
                  {/*}}*/}
                  {/*style={{...styles.button, ...styles.leftButton}}>*/}
                  {/*<View>*/}
                    {/*<Text white>Huỷ</Text>*/}
                  {/*</View>*/}
                {/*</Button>*/}
              {/*</Col>*/}
              {/*<Col style={{justifyContent: 'center', alignItems: 'center'}}>*/}
                {/*<Button*/}
                  {/*onPress={this.onCallAccepted.bind(this)}*/}
                  {/*style={{...styles.button, ...styles.rightButton}}>*/}
                  {/*<View><Text white>Gọi</Text></View>*/}
                {/*</Button>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          </Grid>
        </View>
      </Modal>
    )
  }
}
