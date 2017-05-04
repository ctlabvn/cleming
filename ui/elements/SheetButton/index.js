import React, { Component } from 'react'
import {                 
    Button, ActionSheet, Text,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import styles from './styles'

// can use our Icon component with custom icon
export default class extends Component {
  render(){
    const {items, title, sheetTitle, children, icon="keyboard-arrow-down", style, textStyle, iconStyle, onSelected} = this.props
    return (
      <Button onPress={()=> ActionSheet.show({
          options: items,
          cancelButtonIndex: items.length-1,          
          title: sheetTitle || title,
        }, index => onSelected && onSelected(items[index], index))}

        transparent style={{...styles.container, ...style}}>
          {title && <Text style={styles.label}>{title}</Text>}
          <Text style={{...styles.value, ...textStyle}}>{children || items[0]}</Text>
          <Icon name={icon} style={{...styles.icon, ...iconStyle}} />
      </Button>
    )
  }
}

