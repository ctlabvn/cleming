import React, { PureComponent } from 'react'
import { View } from 'react-native'
import material from '~/theme/variables/material'

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
    // console.log(size)
    return (
      <View style={{        
        ...style,
        [material.platform === 'ios' ? 'zIndex' : 'elevation']: 1,
        overflow: 'hidden',
        [prop1]: size,
        [prop2]: '100%',
      }}>
        <View style={{
          borderStyle:'dotted',
          borderRadius: size,
          borderWidth: size,        
          borderColor: color, 
          [prop1]: 0,          
          flex: 1,
        }}/>
      </View>
    )

  }
}

