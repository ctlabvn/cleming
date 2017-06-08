import React, { Component } from 'react'
import { Container, Spinner, Text } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

// export default class extends Component {
  
//   render(){
//     const {message='Please waiting...'} = this.props
//     return (
//       <Container style={styles.container}>
//         <Text>{message}</Text>
//         <Spinner color={material.tabBarActiveTextColor} />
//       </Container>
//     )
//   }
// }

import Svg,{
    LinearGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg'

export default ({style, ...props}) => (

  <Svg {...props} style={styles.container}>
      <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0">            
              <Stop offset="0%" stopColor="#ff0000" stopOpacity="1"/>
              <Stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>              
          </LinearGradient>
      </Defs>          
      <Rect width="100%" height="100%" fill="url(#grad)"/>
  </Svg>
)