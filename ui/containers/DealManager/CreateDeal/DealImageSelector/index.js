import React, {Component} from 'react'
import {View, ScrollView, Linking, TouchableWithoutFeedback, Form, TextInput} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { DateField, InputFieldWithErr, MultiLineInputFieldWithErr } from "~/ui/elements/Form"
import ImagePicker from 'react-native-image-picker'
import ImagePickerMultiple from 'react-native-image-crop-picker'
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
}
@connect(null, {forwardTo})
@reduxForm({ form: 'CreateDeal'})
export default class DealImageSelector extends Component {
    constructor(props) {
      super(props)
    }

    _handleImagePickerOpen = (e) => {
      const {onCancel, onError, onCustomButton, onSuccess} = this.props
      ImagePicker.showImagePicker(options, (response) => {
        console.log('ImagePicker Response', response);
        if (response.didCancel) {
          onCancel && onCancel()
        }
        else if (response.error) {
          onError && onError(response.error)
        }
        else if (response.customButton) {
          onCustomButton && onCustomButton(response.customButton)
        }
        else {
          onSuccess && onSuccess(response)
        }
      })

    }

    _handleMultiplePicker = () => {
      ImagePickerMultiple.openPicker({
        width: 300,
        height: 400,
        multiple: true,
        mediaType: 'photo',
        showsSelectedCount: true,
        minFiles: 1
      }).then(image => {
        console.log(image);
      }).catch(e => {
        console.log(e);
      });
    }
    _openCamera = () => {
      ImagePickerMultiple.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        console.log(image);
      });
    }
    componentDidMount(){

    }

    _open = () => {
      this.setState({})
    }
    render() {
      const {forwardTo} = this.props
      return (
        <View>
          <Modal
              animationType={"none"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => this._close()}
          >

          </Modal>

          <Button onPress={this._handleImagePickerOpen}>
            <Icon name="photo-camera" />
          </Button>
          <Button onPress={this._handleMultiplePicker}>
            <Icon name="photo-camera" />
          </Button>
          <Button onPress={this._openCamera}>
            <Icon name="photo-camera" />
          </Button>
        </View>
      )
    }
}
