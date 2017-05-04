import React, { Component } from 'react'

import { 
  Icon, 
  View,
} from 'native-base'

import ImagePicker from 'react-native-image-picker'

import options from './options'
import styles from './styles'

export default class extends Component {

  _handleImagePickerOpen = (e) => {
    const {onCancel, onError, onCustomButton, onSuccess} = this.props
    ImagePicker.showImagePicker(options, (response) => {      

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

  render() {
    const {style} = this.props
    return (
      <View style={{...styles.container, ...style}}>
        <Icon name="photo-camera" style={styles.photoIcon} onPress={this._handleImagePickerOpen} />
      </View>
    )
  }
}

