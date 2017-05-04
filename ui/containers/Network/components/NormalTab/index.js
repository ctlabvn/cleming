import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading,
    Text, Item, View, Input, Left, Body, Tab, Right,
} from 'native-base'

import CacheableImage from '~/ui/components/CacheableImage'
import Content from '~/ui/components/Content'
// import { connect } from 'react-redux'
// import * as commonActions from '~/store/actions/common'
// import * as accountSelectors from '~/store/selectors/account'

import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'
import options from './options'
import { getPopoverOptions } from '~/ui/shared/utils'
import styles from '../shared/styles'

import { API_BASE } from '~/store/constants/api'
// should use margin not padding to tap
export default class extends Component {  

  constructor(props) {
    super(props)

    this.listItems = []

    this.popMenu = (
      <View regit style={{padding:0}}>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Move to Trusted</Text>
          </Button>
        </ListItem>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Message</Text>
          </Button>
        </ListItem>
        <ListItem last style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Remove</Text>
          </Button>
        </ListItem>
      </View>
    )
  }

  handleAction(action){
    this.props.app.popover.show(false)
  }

  showPopover(index){
    this.listItems[index]._root.measure((ox, oy, width, height, x, y) => {      
      const popoverOptions = getPopoverOptions(200, {x, y, width, height})
      this.props.app.popover.show(this.popMenu, popoverOptions)
    })
  }

  renderList(friends){    
    return (
      <View rounded style={styles.content} >
        {friends.map((item, index) =>
          <ListItem ref={ref=>this.listItems[index]=ref} last={index===friends.length-1} 
            key={item.Id} avatar noBorder style={styles.listItemContainer}>
              <Left>
                  <CacheableImage square style={styles.thumb} source={{uri: API_BASE + item.Avatar}}/>
              </Left>
              <Body style={{marginLeft:10}}>
                  <Text small>{item.DisplayName}</Text>                                          
              </Body>
              <Right style={styles.rightContainer}>                
                <Button onPress={e=>this.showPopover(index)} iconRight noPadder transparent>
                  <Icon style={styles.iconGrayLarge} name="edit" /> 
                </Button>
              </Right>
          </ListItem>   
        )} 
      </View>
    )
  }

  // flex means 100%
  render() {    
    const {network} = this.props
    if(!network.Friends.length) {
      return (
        <Text>
          You have no one in your normal network. Add your normal network.
        </Text>
      )
    }

    return (     
      <View style={{flex:1}}>            
        <Item style={styles.item}>            
            <Input placeholderTextColor={material.inputColorPlaceholder} style={styles.input} placeholder="Type a name" />
            <Button style={styles.buttonSearch}>
              <Text>Invite</Text>
            </Button>
          </Item>                      
        <Content>                       
          {this.renderList(network.Friends)}                                
        </Content>   
      </View>  
    )
  }
}