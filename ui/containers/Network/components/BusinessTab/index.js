import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading,
    Text, Item, View, Input, Left, Body, Tab, Right, Form,
} from 'native-base'

import Modal from '~/ui/components/Modal'
import CacheableImage from '~/ui/components/CacheableImage'
import Content from '~/ui/components/Content'
import moment from 'moment'
import { connect } from 'react-redux'
import * as networkActions from '~/store/actions/network'
// import * as accountSelectors from '~/store/selectors/account'

import Icon from '~/ui/elements/Icon'

import options from './options'
// import { getTextParts } from '~/ui/shared/utils'
import styles from '../shared/styles'

import { API_BASE } from '~/store/constants/api'

// should use margin not padding to tap
@connect(null, networkActions)
export default class extends Component {  

  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      choosenFriend: {},
      followTransactions: null,
    }
  }


  showInfo(index, friend){
    const {token, getFollowTransactions} = this.props
    this.setState({
      followTransactions: null,
      choosenFriend: friend,
      modalOpen:true,
    })    
    getFollowTransactions(token, friend.Id, followTransactions=>this.setState({followTransactions}))    
  }

  renderList(items){    
    return (
      <View rounded style={styles.content} >
        {items.map((item,index) =>
          <ListItem last={index===items.length-1} 
            key={index} avatar noBorder style={styles.listItemContainer}>
              <Left>
                  <CacheableImage square style={styles.thumb} source={{uri:API_BASE + item.PhotoUrl}}/>
              </Left>
              <Body style={{marginLeft:10}}>
                  <Text small>{item.DisplayName}</Text>                                          
              </Body>
              <Right style={styles.rightButtonContainer}>                
                <Button style={styles.buttonSmall} onPress={e=>this.showInfo(index, item)} iconLeft bordered>
                  <Icon style={styles.iconGraySmall} name="follow" />
                  <Text note style={styles.textSmall}>Following</Text> 
                </Button>
                <Button style={styles.buttonSmall} onPress={e=>this.showInfo(index, item)} iconLeft bordered>
                  <Icon style={styles.iconGraySmall} name="activity-small" />
                  <Text note style={styles.textSmall}>Logs</Text> 
                </Button>
              </Right>
          </ListItem>   
        )} 
      </View>
    )
  }

  // padding for radius not overlapsed
  renderModal(){
    const {followTransactions, choosenFriend} = this.state
    return (
      <View regit style={styles.businessModalContainer}>
        <ListItem style={styles.itemHeader}>
            <Text style={styles.itemHeaderTextModal}>
              Interaction History with {choosenFriend.DisplayName}
            </Text>
            <Button onPress={e=>this.setState({modalOpen:false})} style={{alignSelf:'center'}} transparent noPadder>
              <Icon style={styles.iconGray} name="close" />
            </Button>
        </ListItem>
        <Content>
          <View regit>
            { followTransactions 
              ? followTransactions.Transactions.map((item, index) =>
                  <ListItem key={index} style={styles.itemBodyModal}>                                                
                    <Text style={styles.labelTime} small>{moment(item.Date).format('DD MMM YYYY')}</Text>  
                    <View row style={{      
                      justifyContent: 'flex-end',
                    }}>          
                      <Text small>{item.Description}</Text>
                    </View>
                  </ListItem>
                )
              : <Text>Loading...</Text>
            }   
          </View>
        </Content>
      </View>      
    )
  }

  // flex means 100%
  render() {    
    const {network} = this.props
    if(!network.Data.length) {
      return (
        <Text>
          You have no one in your business network. Add someone you trust from your normal network.
        </Text>
      )
    }

    return (     
      <View style={{flex:1}}>  
        <Modal onCloseClick={e=>this.setState({modalOpen:false})} open={this.state.modalOpen}>          
            {this.renderModal()}          
        </Modal>                                      
        <Content>                       
          {this.renderList(network.Data)}                                
        </Content>   
      </View>  
    )
  }
}