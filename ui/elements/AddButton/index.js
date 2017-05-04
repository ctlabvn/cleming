import React, { Component } from 'react'
import { 
  Button,
} from 'native-base'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

export default ({style, ...props}) => (
  <Button noPadder style={{...styles.container, ...style}} {...props}>
    <Icon style={{color:'#fff'}} name="add" />                            
  </Button>
)