import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Text } from "native-base";
import { InteractionManager, View, Keyboard, Modal} from "react-native";
import styles from "./styles";
import * as commonAction from "~/store/actions/common";
import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import material from "~/theme/variables/material.js";
import { chainParse } from "~/ui/shared/utils"
import { GENERAL_ERROR_MESSAGE } from "~/store/constants/app"
import I18n from '~/ui/I18n'
export default class PreviewPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
          showing: false,
          data: {}
        }
    }

    show = (data)=>{
      this.setState({showing:true, data: data})
    }

    hide = ()=>{
      this.setState({showing:false, data: {}})
    }

    _handleOk = ()=>{
      console.log('Go _handleOk')
      this.props.onOk()
      this.hide()
    }

    render(){
      const {showing} = this.state
      return (
          <Modal
              animationType={"none"}
              transparent={true}
              visible={showing}
              onRequestClose={() => {hide()}}
          >
              <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                      <View style={styles.header}>
                          <Text bold white>{I18n.t('info')}</Text>
                      </View>
                      <View style={styles.textContanter}>
                          <Text style={styles.text}>Bạn có đồng ý với thông tin đã nhập?</Text>
                      </View>
                      <View style={styles.pd10}>

                        <View style={styles.rowInfo}>
                          <Text gray>{I18n.t('account_owner')}: </Text>
                          <Text bold black>{this.state.data.account_owner}</Text>
                        </View>

                        <View style={styles.rowInfo}>
                          <Text gray>{I18n.t('identity_card')}: </Text>
                          <Text bold black>{this.state.data.identity_card}</Text>
                        </View>

                        <View style={styles.rowInfo}>
                          <Text gray>{I18n.t('account_number')}: </Text>
                          <Text bold black>{this.state.data.account_number}</Text>
                        </View>

                        <View style={styles.rowInfo}>
                          <Text gray>{I18n.t('bank_name')}: </Text>
                          <Text bold black>{this.state.data.bank}</Text>
                        </View>

                        <View style={styles.rowInfo}>
                          <Text gray>{I18n.t('branch')}: </Text>
                          <Text bold black>{this.state.data.branch}</Text>
                        </View>



                      </View>
                      <View style={styles.confirmContainer}>
                        <Button transparent onPress={()=>this.hide()} style={styles.confirmBtn}>
                            <Text gray>{I18n.t('close')}</Text>
                        </Button>
                          <Button transparent onPress={this._handleOk} style={styles.confirmBtn}>
                              <Text primary>{I18n.t('ok')}</Text>
                          </Button>
                      </View>
                  </View>
              </View>
          </Modal>
      )
    }

}
