import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import {                 
    Button, Container, ListItem, List, Spinner,
    Text, Item, View, Input, Left, Right, Body,
} from 'native-base'

import moment from 'moment'

import Content from '~/ui/components/Content'
import Border from '~/ui/elements/Border'
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

import { NOTIFY_TYPE } from '~/store/constants/api'

import { formatNumber } from '~/ui/shared/utils'


@connect(state=>({
  session: authSelectors.getSession(state),
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
    const {session, notifications, getNotification} = this.props
    if(!notifications.data.length) {
      getNotification(session, 1, ()=>getNotification(session, 2))  
    } 

    this.setState({
      refreshing: false,
    })
    
  }

  componentWillMount(){
    this.componentWillFocus()      
  }

  _onRefresh =() => {    
    const {session, getNotification} = this.props
    this.setState({refreshing: true})        
    getNotification(session, 1, ()=>getNotification(session, 2, ()=>this.setState({refreshing: false})))    
  }    

  _loadMore = ()=>{
    if(this.state.loading || this.state.refreshing)
      return
    // console.log('load more')
    const {session, notifications, getNotification} = this.props
    if(notifications.hasMore){
      this.setState({loading: true})          
      getNotification(session, notifications.page + 1, ()=>this.setState({loading: false}))              
    }        
  }

  _handleNotiRead = (e) => {    
    this.props.app.showNotification({
      title: "My Push Token", 
      message: this.props.app.pushToken,
    })
  }

  renderNotificationIcon({notifyType}){
    switch(notifyType){      
      case NOTIFY_TYPE.WAITING:
        return <Icon name="order-history" style={{...styles.icon,color:'#f7ae3b'}}/>
      case NOTIFY_TYPE.BOOKING:
        return <Icon name="calendar" style={styles.icon}/>
      case NOTIFY_TYPE.SUCCESS:
        return <Icon name="clingme-wallet" style={styles.icon}/>
    }
  }

  renderNotificationContent({title, notifyType, paramLong2, content, paramDouble1}){    
    const border = <Border style={{
              marginLeft: 15,
              marginTop: 10,
            }} color='rgba(0,0,0,0.5)' size={1} />

    switch(notifyType){      

      case NOTIFY_TYPE.BOOKING:
        const minutesRemain = Math.round((paramLong2 - Date.now()/1000)/60)
        return (
          <Body>
            <View style={styles.listItemRow}>                                         
              <View style={styles.titleContainer}>                
                <Text note>{title} </Text>                                
                <Text bold style={styles.textGray}>{content}                  
                </Text>
              </View>
              
              {minutesRemain > 0 && <Text small style={{
                  color: '#e36356',
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  top:0,
                  right:0,
                }}>Còn {minutesRemain}'</Text>
              }

              <Text note small style={{
                alignSelf: 'flex-end'
              }}>{moment(paramLong2*1000).format('hh:mm     DD/M/YY')}</Text>                      
            </View>
            
            {border}

          </Body>
        )

      case NOTIFY_TYPE.SUCCESS:
        return (
          <Body>
            <View style={styles.listItemRow}>                                         
              <View style={styles.titleContainer}>
                <Text note>{title}</Text>
                <Text bold style={styles.textGray}>{content}                  
                </Text>
              </View>                      

              <Text style={{
                    alignSelf: 'flex-end',
                    marginRight: 0,
                    color: '#0388b5',
                  }}>
                    <Text style={{
                    fontWeight: '900',
                    color: '#0388b5',
                    fontSize: 22,
                  }}>{formatNumber(paramDouble1)}</Text>đ
                  </Text>

            </View>
              {border}
          </Body>
        )

        // case NOTIFY_TYPE.WAITING:
      default:
        return (
          <Body>
            <View style={styles.listItemRow}>                                         
              <View style={styles.titleContainer}>
                <Text note>{title}</Text>
                <Text bold style={styles.textGray}>{content}</Text>
              </View>
              <Text note style={{
                alignSelf: 'flex-end'
              }}>
                <Text style={{
                  color: '#838383',
                }} bold>{formatNumber(paramDouble1)}</Text>đ
              </Text>                        
            </View>

            
            {border}
          </Body>
        )  
            
                      
    }
  }

  handleNotiClick(notification){
    const {notifyType, paramLong3} = notification
    // console.log(type, notification)
    switch(notifyType){
      case NOTIFY_TYPE.WAITING:
        this.props.forwardTo('transactionDetail/' + paramLong3)
        break
      case NOTIFY_TYPE.BOOKING:
        this.props.forwardTo('placeOrderDetail/' + paramLong3)
        break
      case NOTIFY_TYPE.SUCCESS:
        this.props.forwardTo('deliveryDetail/'+paramLong3)
        break
      default:
        break
    }
  }

  render() {

    // const { notificationRequest} = this.props    
    // const data= []
    // for(let i=1;i<100;i++){
    //   data.push({title: 'title'+i,notifyType:1})
    // }
    // const notifications = {
    //   data,
    // }

    // we store the page so we must not set removeClippedSubviews to true, sometime it is for tab too
    const {notifications, notificationRequest} = this.props    
    
    return (          
       
        <Container>
          {
            // <Button onPress={this._handleNotiRead} noPadder style={{
            //   alignSelf:'flex-end',              
            //   marginRight: 10,              
            // }} transparent><Text active small>Đánh dấu tất cả đã đọc</Text>
            // </Button>
          }
                    
            <Content               
              onEndReached={this._loadMore} onRefresh={this._onRefresh}             
              style={styles.container} refreshing={this.state.refreshing} 
            >              
              {notifications &&
                <List
                  removeClippedSubviews={false}       
                  pageSize={10}                                           
                  dataArray={notifications.data} renderRow={(item) =>
                    <ListItem noBorder style={styles.listItemContainer} onPress={()=>this.handleNotiClick(item)}>   
                      <View style={{
                        justifyContent: 'space-between',   
                        alignSelf:'flex-start',                                             
                      }}>                          
                        {this.renderNotificationIcon(item)}                  
                        <View style={styles.circle}/>
                      </View>                      
                      {this.renderNotificationContent(item)}

                    </ListItem>  
                } />
              } 

              {this.state.loading && <Spinner/>}

            </Content>
            
            
        </Container>
      
    )
  }
}