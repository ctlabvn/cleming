import React, { Component } from 'react'
import { Image } from 'react-native'
import { 
  Button, 
  Text,
} from 'native-base'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

export default class extends Component {
  render(){
    const {style, children, ...props} = this.props
    return (
      <Button transparent style={{...styles.container, ...style}} block danger {...props}>
        <Icon name="warning" style={styles.icon} />                   
        <Text bold>{children}</Text>
      </Button>
    )
  }
}