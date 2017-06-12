import React, { Component } from 'react'
import Icon from '~/ui/elements/Icon'
import { mapPropsToStyleNames, connectStyle, Button } from 'native-base'
import material from '~/theme/variables/material'

@connectStyle('NativeBase.CheckBox', {}, mapPropsToStyleNames)
export default class CheckBox extends Component {
  render() {
    const {type='checkbox', ...props} = this.props    
    return (
      <Button transparent {...props}>
        <Icon
          style={{            
            fontSize: material.CheckboxFontSize,
            lineHeight: material.CheckboxIconSize,
            marginLeft: 0,
            marginRight: 0,
          }}
          name={
            this.props.checked 
              ? (type === 'checkbox' ? 'checked' : 'option_check')
              : 'option_uncheck'
          }
        />
      </Button>
    )
  }
}