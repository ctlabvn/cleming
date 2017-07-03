import React, { Component } from 'react'
import { Animated } from 'react-native'
import { Container, Spinner, Text } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
// import AnimatedImplementation from 'AnimatedImplementation'

export default class extends Component {
  
  render(){
    const {message=''} = this.props
    return (
      <Container style={styles.container}>
        <Text>{message}</Text>
        <Spinner color={material.tabBarActiveTextColor} />
      </Container>
    )
  }
}

// import Svg,{
//     LinearGradient,
//     Rect,
//     Defs,
//     Stop
// } from 'react-native-svg'

// export default class extends Component {

//   constructor(props) {
//      super(props);
//      this.state = {
//        pan: new Animated.Value(0), // inits to zero
//      };

//      this.state.pan.addListener(({value}) => {
//         console.log(this.linear)
//      })
//    }

//   componentDidMount(){
//     Animated.spring(
//        this.state.pan,         // Auto-multiplexed
//        {toValue: 1} // Back to zero
//      ).start();
//   }

//   render(){

//     console.log(this.state.pan)
//     return (

//       <Svg style={styles.container}>
//           <Defs>
//               <LinearGradient ref={ref=>this.linear=ref} id="grad" x1="0%" y1="0%" x2="100%" y2="0">            
//                   <Stop offset="0%" stopColor="#ff0000" stopOpacity="1"/>
//                   <Stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>              
//               </LinearGradient>
//           </Defs>          
//           <Rect width="100%" height="100%" fill="url(#grad)"/>
//       </Svg>
//     )

//   }

// }