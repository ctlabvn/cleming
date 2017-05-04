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
  
  _handleValueChange = value => {    
    const {onChange} = this.props    
    this.setState({selected: value})        
    onChange && onChange(value)
  }

  render() {

    // by default index should be a key
    const {items, style, inputStyle, inputIconStyle, error, header} = this.props
    const { selected=this.props.selected } = this.state
    return (
      <Item style={style} error={error}>
        <Input disabled value={items[selected] || header} />            
        <Icon name="keyboard-arrow-down" style={inputIconStyle} />
        <Picker style={{position: 'absolute', top: 0, left:0, width:1000, height:1000}}              
            mode="dropdown"           
            selectedValue={selected}
            onValueChange={this._handleValueChange}
        >          
          {renderItems(items)}
        </Picker>
      </Item>
    )
  }
}