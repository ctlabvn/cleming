import React, { Component } from 'react'
import { Image } from 'react-native'
import {                 
    Content, Text, View, Button,
} from 'native-base'
import CacheableImage from '~/ui/components/CacheableImage'

import styles from '../shared/styles'


export default class extends Component {

  constructor(props) {
    super(props)
  }

  handleOption(selectedKey){    
    this.props.onOptionSelect && this.props.onOptionSelect(selectedKey)
  }

  render() {
    const {selected, options} = this.props
    return (                 
        <Content horizontal={true} showsHorizontalScrollIndicator={false}>
          {options.map(({key, icon, title, type}, index)=>
          <View key={key}>
            <Button onPress={e=>this.handleOption(index)} noPadder transparent style={
              index === selected 
              ? styles.headerIconContainerActive 
              : styles.headerIconContainer
            }>
              {type === 'avatar'
                ? <CacheableImage style={styles.headerAvatar} source={icon} />
                : <Image source={icon} style={styles.headerIcon} />
              }            
            </Button>
            <Text style={styles.headerText}>{title}</Text>
          </View>
          )}
        </Content>  
    )
  }
}