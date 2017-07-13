import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { Content,Text, List, ListItem, 
  Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables,
  Spinner, Thumbnail,
} from 'native-base'

import CacheableImage from '~/ui/components/CacheableImage'

import * as authActions from '~/store/actions/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'


import options from './options'
import routes from '~/ui/routes'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import DeviceInfo from 'react-native-device-info'
import md5 from 'md5'
import {  
  API_BASE
} from '~/store/constants/api'
import I18n from '~/ui/I18n'

@connect(state=>({
  session: authSelectors.getSession(state),
  profile: accountSelectors.getProfile(state),
  user: authSelectors.getUser(state),
  pushToken: authSelectors.gePushToken(state),
}), {...authActions, ...commonActions})
export default class extends Component {  

  _handleLogout = (e) => {    

    const { closeDrawer, setAuthState, forwardTo, removeLoggedUser, session, logout } = this.props
    closeDrawer()
    removeLoggedUser()
    setAuthState(false)        
    forwardTo('login', true)
     const { pushToken } = this.props
    let xDevice = Platform.OS.toUpperCase() + '_' + pushToken
    let xUniqueDevice = md5(Platform.OS + '_' + DeviceInfo.getUniqueID())
    console.log('Logout', xDevice+'---'+xUniqueDevice)
    logout(session, xDevice, xUniqueDevice)       
  }

  navigateTo(route) {
    const {forwardTo, closeDrawer, user} = this.props
    // if (user.accTitle != 1 && route == 'userManagement') {
    //   closeDrawer()
    //   forwardTo('userManagement/action/updateUser')
    // } else {
    //   closeDrawer()
    //   forwardTo(route)
    // }

      closeDrawer()
      forwardTo(route)
  }

  render() {
    const {profile, forwardTo, closeDrawer} = this.props    
    // if(!profile)
    //   return (<Spinner color="green" />)
    // // by default it is flex, so do not set flex portion
    // // render profile
    // const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (      
        <Content
          bounces={false}
          style={styles.container}
        >          
          <View row style={styles.drawerCover}>                        
            <Text bold style={styles.text}>Menu</Text>
          </View>
          <Button onPress={closeDrawer} transparent style={styles.buttonClose}>
            <Icon name="close" style={styles.buttonIconClose} />
          </Button>
          {options.listItems.map((item, index) =>
          <ListItem style={styles.listItemContainer} key={index} button noBorder onPress={e => this.navigateTo(item.route)} >
            <Left>  
              <Icon name={item.icon} style={styles.icon} />                
              <Text style={styles.iconText}>{item.name}</Text>
            </Left>                
          </ListItem>
          )}
          
          <ListItem noBorder style={styles.listItemContainer} button onPress={this._handleLogout} >
            <Left>    
              <Icon name='sign_out' style={styles.icon} />              
              <Text style={styles.iconText}>{I18n.t('logout')}</Text>
            </Left>                
          </ListItem>
        </Content>
      
    );
  }
}