import React, { Component } from 'react'
import { 
  Icon, 
  Item,
  Input, 
  Picker,
} from 'native-base'

import renderItems from './renderItems'

export default class extends Component {

  state = {

  }

  getText(text){
    if(text)
      return text
    const {header, items} = this.props
    for(let i in items)
      return i
    return header
  }

  _renderButton = (onPress, text, picker, selected)=> {
    const {style, inputStyle, inputIconStyle, error, header} = this.props
    return (
      <Item style={style} onPress={onPress} error={error} >
        <Input disabled value={this.getText(text)} style={inputStyle} />            
        <Icon name="keyboard-arrow-down" style={inputIconStyle} />
      </Item>            
    )
  }

  _handleValueChange = value => {
    const {onChange} = this.props    
    this.setState({selected: value})        
    onChange && onChange(value)
  }

  render() {
    const {items, header} = this.props
    const { selected=this.props.selected } = this.state
    return (
      <Picker renderButton={this._renderButton}                 
          iosHeader={header}                        
          selectedValue={selected}
          onValueChange={this._handleValueChange}
      >
        {renderItems(items)}
      </Picker>
    )
  }
}

