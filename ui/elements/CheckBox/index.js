import React, { Component } from 'react'
import Icon from '~/ui/elements/Icon'
import { TouchableOpacity } from 'react-native'
import { mapPropsToStyleNames, connectStyle } from 'native-base'
import material from '~/theme/variables/material'

// do not connect to Button to remove redundant connected style
@connectStyle('NativeBase.CheckBox', {}, mapPropsToStyleNames)
export default class CheckBox extends Component {
  render() {
    const {type='checkbox', ...props} = this.props    
    return (
      <TouchableOpacity {...props}>
        <Icon
          name={
            this.props.checked 
              ? (type === 'checkbox' ? 'checked' : 'option_check')
              : 'option_uncheck'
          }
        />
      </TouchableOpacity>
    )
  }
}