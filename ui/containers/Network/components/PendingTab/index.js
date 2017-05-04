import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import options from './options'
import styles from '../shared/styles'
import { getTextParts } from '~/ui/shared/utils'

const renderTextParts = text => {
  const parts = getTextParts(text)
  return (
    <Text small style={styles.left}>
      {parts[0]}
      {parts[1] && <Text small bold link>{parts[1]}</Text>}
      {parts[2]}
    </Text>  
  )
}

export default class extends Component {

  renderOption(option, key){    
    return (
      <View key={key}>
        {option.title && <Text bold note style={styles.itemHeaderText}>{option.title}</Text>}
        <View regit style={styles.container} key={key}>        
          {option.items.map((item, index) =>
            <ListItem key={index} style={styles.itemBody} last={index===option.items.length-1}>                                                
              
              {renderTextParts(item.title)}             
                          
              <View style={styles.right}>                
                {!option.title &&
                  <Button transparent>
                    <Icon style={option.title ? styles.iconGray : styles.iconOk} name="ok" />                        
                  </Button>              
                }
                <Button transparent>
                  <Icon style={option.title ? styles.iconGray : styles.iconCancel} name="cancel" />                        
                </Button>
              </View>
            </ListItem>
          )}          
        </View>
      </View>
    )
  }

  render() {
    const {route} = this.props       
    return (      
      <Content style={styles.container} padder>        
        {options.listItems.map((item, index)=>this.renderOption(item, index))}
      </Content>                               
    )
  }
}