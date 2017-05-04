import React, { Component } from 'react'
import { Image } from 'react-native'
import { 
  Button, 
  Text,
} from 'native-base'
import { regitIcon } from '~/assets'
import styles from './styles'

export default class extends Component {
  render(){
    const {style, children, ...props} = this.props
    return (
      <Button style={{...styles.container, ...style}} rounded {...props}>
        <Image source={regitIcon} style={styles.image} />                     
          <Text style={styles.text}>{children}</Text>
      </Button>
    )
  }
}