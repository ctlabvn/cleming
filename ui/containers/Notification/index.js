import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, List, Spinner,
    Text, Item, View, Input, Left, Body,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as notificationActions from '~/store/actions/notification'

import Icon from '~/ui/elements/Icon'
import TimeAgo from '~/ui/components/TimeAgo'
import * as commonSelectors from '~/store/selectors/common'
import * as authSelectors from '~/store/selectors/auth'
import * as notificationSelectors from '~/store/selectors/notification'
import options from './options'
import styles from './styles'
import material from '~/theme/variables/material'

import { getTextParts } from '~/ui/shared/utils'

const renderTextParts = text => {
  const parts = getTextParts(text)
  return (
    <Text small>
      {parts[0]}
      {parts[1] && <Text small bold>{parts[1]}</Text>}
      {parts[2]}
    </Text>  
  )
}

@connect(state=>({
  token: authSelectors.getToken(state),
  notifications: notificationSelectors.getNotification(state),
  notificationRequest: commonSelectors.getRequest(state, 'getNotification'),  
}), {...commonActions, ...notificationActions})
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,
    }    
  }

  componentWillFocus(){
    // make it like before    
    const {token, notifications, getNotification} = this.props
    if(!notifications.data.length) {
      getNotification(token)  
    } else {
      this.state.refreshing && this.setState({
        refreshing: false,
      })
    }
  }

  componentWillMount(){
    this.componentWillFocus()      
  }

  _onRefresh =() => {    
    this.setState({refreshing: true})        
    this.props.getNotification(this.props.token, 0, 10, ()=>this.setState({refreshing: false}))    
  }    

  _loadMore = ()=>{
    if(this.state.loading || this.state.refreshing)
      return
    
    const {token, notifications, getNotification} = this.props
    if(notifications.hasMore){
      this.setState({loading: true})          
      getNotification(token, notifications.start + notifications.take, notifications.take, ()=>this.setState({loading: false}))              
    }        
  }

  render() {
    // we store the page so we must not set removeClippedSubviews to true, sometime it is for tab too
    const {notifications, notificationRequest} = this.props    
    
    return (          
       
        <Container>
                    
            <Content               
              onEndReached={this._loadMore} onRefresh={this._onRefresh}             
              style={styles.container} refreshing={this.state.refreshing} 
            >              
              {notifications && 
                <List
                  removeClippedSubviews={false}                    
                  pageSize={notifications.take}                  
                  dataArray={notifications.data} renderRow={(item) =>
                    <ListItem noBorder style={styles.listItemContainer}>                    
                        <Icon name={options.iconMap[item.Type] || 'network'} style={styles.icon}/>                    
                        <Body>
                          {renderTextParts(
                            item.Title.replace(item.FromUserDisplayName, `#${item.FromUserDisplayName}#`)
                          )}                        
                          <TimeAgo note small time={item.DateTime} />
                        </Body>
                    </ListItem>  
                } />
              } 

              {this.state.loading && <Spinner/>}

            </Content>
            
            
        </Container>
      
    )
  }
}