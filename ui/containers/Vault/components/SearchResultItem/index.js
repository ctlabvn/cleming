import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import { API_BASE } from '~/store/constants/api'

import options from './options'
import styles from '../shared/styles'
import material from '~/theme/variables/material'

const copiedMessage = (
  <IconMessage size={30} message="Copied   " />
)

export default class extends Component {

  _onCopy = (e)=>{
    this.props.setToast(copiedMessage, 'info', 500, 'center')
  }

  renderItem(type, value){
    switch(type){
      case 'phone':
        return (
          <Text small>+61 90187400</Text>
        )
      case 'address':
        return (
          <View>                                            
            <Text bold small>My Sweet Home</Text>  
            <Text small>Empire Building</Text>  
            <Text small>Middel Road</Text>  
            <Text small>Singapore</Text>  
          </View>
        )
    }                                            
        
  }

  render(){
    const {data} = this.props
    return (
      <View regit style={{
        marginTop: 10,
      }}>

        <ListItem style={styles.itemHeader}>
            <Text bold note style={styles.itemHeaderText}>
              {data.title}
            </Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        {data.values.map((value, index)=>
          <ListItem key={index} style={{...styles.itemBody, height: options.heightMap[data.type] || null}}>                                                
            {this.renderItem(data.type, value)}
            <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
              <IconMessage size={9} color={material.grayColor} icon="copy" message="Copy" />
            </Button>
          </ListItem>           
        )}                  
      </View>   
    )
  }
  
}