import React, { Component } from 'react'
import { 
  View, 
  Text,
} from 'native-base'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

export default ({message, icon='copied', color='#39b54a', size=20, style, ...props}) => (
  <View noPadder transparent style={{...styles.container, ...style}} {...props}>
    <Icon style={{color, fontSize: size * 2}} name={icon}/>
    <Text style={{color, fontSize: size}}>{message}</Text>
  </View>
)