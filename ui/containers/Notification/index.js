import React, { Component } from 'react'
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

  renderNotificationContent(item){
    const type = options.iconMap[item.Type] || 'network'
    switch(type){
      case 'calendar':
        return (
          <Body>
            <View style={styles.listItemRow}>                                         
              <View>
                <Text small>Yêu cầu đặt chỗ chờ xác nhận</Text>
                <Text bold style={{
                  color: '#08a7ce'
                }}>#DC123456</Text>
              </View>
              <Text note style={{
                alignSelf: 'flex-end'
              }}>
                2 khách
              </Text>                        
            </View>

            <View style={styles.listItemRow}>                        
              
              <Text note small>Có yêu cầu gọi món</Text>                        
              <Text note small style={{
                alignSelf: 'flex-end'
              }}>{moment(item.DateTime).format('hh:mm     DD/M/YY')}</Text>
            </View>
            <Border style={{
              marginLeft: 15,
              marginTop: 10,
            }} color='rgba(0,0,0,0.5)' size={1} />
          </Body>
        )

      case 'clingme-wallet':
        return (
          <Body>
            <View style={styles.listItemRow}>                                         
              <View>
                <Text small>Giao dịch thành công</Text>
                <Text bold style={{
                  color: '#838383'
                }}>#CL123456</Text>
              </View>
              <Text note small style={{
                alignSelf: 'flex-end'
              }}>
                Số hóa đơn: <Text small bold style={{
                  color: '#08a7ce',
                }}>00456</Text>
              </Text>                        
            </View>

            <View style={styles.listItemRow}>                        
              
              <Text note small>Khách hàng: <Text small bold style={{
                color: '#838383'
              }}>Username</Text></Text>                        
              <Text note small style={{
                alignSelf: 'flex-end'
              }}>{moment(item.DateTime).format('hh:mm     DD/M/YY')}</Text>                          
            </View>
              
              <Text style={{
                alignSelf: 'flex-end',
                marginRight: 0,
                color: '#0388b5',
              }}>
                <Text style={{
                fontWeight: '900',
                color: '#0388b5',
                fontSize: 20,
              }}>560.000</Text>đ
              </Text>
            
            <Border style={{
              marginLeft: 15,
              marginTop: 10,
            }} color='rgba(0,0,0,0.5)' size={1} />
          </Body>
        )

      default:
        return (
          <Body>
            <View style={styles.listItemRow}>                                         
              <View>
                <Text small>Giao dịch mới chờ xử lý</Text>
                <Text bold style={{
                  color: '#f7ae3b'
                }}>#CL123456</Text>
              </View>
              <Text note style={{
                alignSelf: 'flex-end'
              }}>
                <Text style={{
                  color: '#838383',
                }} bold>400.000</Text>đ
              </Text>                        
            </View>

            <View style={styles.listItemRow}>                        
              
              <Text note small>Khách hàng: <Text small bold style={{
                color: '#838383'
              }}>Username</Text></Text>                        
              <Text note small style={{
                alignSelf: 'flex-end'
              }}>{moment(item.DateTime).format('hh:mm     DD/M/YY')}</Text>
            </View>
            <Border style={{
              marginLeft: 15,
              marginTop: 10,
            }} color='rgba(0,0,0,0.5)' size={1} />
          </Body>
        )

        
                      
    }
  }

  render() {
    // we store the page so we must not set removeClippedSubviews to true, sometime it is for tab too
    const {notifications, notificationRequest} = this.props    
    
    return (          
       
        <Container>

            <Text active small style={{
              alignSelf:'flex-end',
              marginVertical: 10,
              marginRight: 10,
            }}>Đánh dấu tất cả đã đọc</Text>
                    
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
                      <View style={{
                        justifyContent: 'space-between',   
                        alignSelf:'flex-start',
                        height: 47,                     
                      }}>
                        <Icon name={options.iconMap[item.Type] || 'network'} style={styles.icon}/>                    
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