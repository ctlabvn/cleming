import React, { PureComponent } from 'react'
import material from '~/theme/variables/material'
import { View } from 'react-native'


export default class extends PureComponent{

  render(){
    const {color='red', size=2, padding=2} = this.props
    const num = material.deviceWidth / (size + padding * 2)
    
    const borders = []
    for(let i=0;i<num;i++){
      borders.push(<View key={i} style={{
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius:size/2,
        }}/>  
      )
    }

    return (
      <View style={{
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        {borders}
      </View>
    )
  }
} 

