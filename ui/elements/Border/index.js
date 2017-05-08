import React, { PureComponent } from 'react'
import material from '~/theme/variables/material'
import { View } from 'react-native'


export default class extends PureComponent {

  render() {
    const { color = 'red', size = 2, padding = 2, orientation = 'horizontal', num=20} = this.props
    if (orientation == 'horizontal') {
      const num = material.deviceWidth / (size + padding * 2)
      const borders = []
      for (let i = 0; i < num; i++) {
        borders.push(<View key={i} style={{
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        }} />
        )
      }

      return (
        <View style={{
          overflow: 'hidden',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
        >
          {borders}
        </View>
      )
    }else{
      const borders = []
      for (let i = 0; i < num; i++) {
        borders.push(<View key={i} style={{
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
          marginBottom: padding
        }} />
        )
      }
      return (
        <View style={{
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
          onLayout={(event) => {
            console.log('vertical case')
            console.log('Height', event.nativeEvent.layout.height)
            console.log('Width', event.nativeEvent.layout.width)
          }}
        >
          {borders}
        </View>
      )
    }

  }
}

