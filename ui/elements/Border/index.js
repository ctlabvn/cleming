import React, { PureComponent } from 'react'
import { View } from 'react-native'

export default class Border extends PureComponent {

  static defaultProps = {
    color: 'rgba(0,0,0,0.5)',
    horizontal: true,
    size: 1,
  }

  render() {
    const { color, size, horizontal, style} = this.props
    let prop1 = 'height', prop2 = 'width'
    if(!horizontal){
     prop1 = 'width'
     prop2 = 'height'
    }
    console.log(prop1,prop2)
    return (
      <View style={{
        ...style,
        overflow: 'hidden',
        [prop1]: size,
        [prop2]: '100%',
      }}>
        <View style={{
          borderStyle:'dotted',
          borderWidth: size,        
          borderColor: color, 
          [prop1]: 0,          
          flex: 1,
        }}/>
      </View>
    )

  }
}

