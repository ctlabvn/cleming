import React, { Component } from 'react'
import Svg,{
    LinearGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg'

import styles from './styles'

export default ({style, colors, ...props}) => (

  <Svg {...props} style={styles.container}>
      <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            {colors && colors.map((color, index)=>
              <Stop offset={`${Math.round((index/colors.length)*100)}%`} key={index} stopColor={color} stopOpacity="1"/>
            )}              
          </LinearGradient>
      </Defs>          
      <Rect width="100%" height="100%" fill="url(#grad)"/>
  </Svg>
)