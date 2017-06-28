import React, { PureComponent } from 'react'
import Icon from '~/ui/elements/Icon'
import { TouchableOpacity } from 'react-native'
import { mapPropsToStyleNames, connectStyle } from 'native-base'
import material from '~/theme/variables/material'

// do not connect to Button to remove redundant connected style
@connectStyle('NativeBase.CheckBox', {}, mapPropsToStyleNames)
export default class CheckBox extends PureComponent {

  constructor(props) {
    super(props)
  
    this.state = {
      checked: !!props.checked
    }
  }

  componentWillReceiveProps({checked}){
    this.setState({checked})
  }

  render() {    
    const {type='checkbox', checked, ...props} = this.props    
    return (
      <TouchableOpacity checked={this.state.checked} {...props}>
        <Icon          
          name={
            this.state.checked 
              ? (type === 'checkbox' ? 'checked' : 'option_check')
              : 'option_uncheck'
          }
          style={{
            color:this.state.checked ? material.blue400 : material.gray400
          }}
        />
      </TouchableOpacity>
    )
  }
}