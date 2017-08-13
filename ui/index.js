import React, { Component } from 'react'
import App from './app'
import { Provider } from 'react-redux'
import configureStore from '~/store/config'
import { forwardTo, closeDrawer } from '~/store/actions/common'
import Preload from './containers/Preload'
import {View, Platform} from 'react-native'
import material from '~/theme/variables/material'
import Icon from "~/ui/elements/Icon"
import { initialRouteName, initialAuthRouteName } from '~/store/constants/app'
export default class extends Component {

  constructor(props) {
    super(props)
    this.store = null              
  }

  componentDidMount(){
    configureStore(store=> {
      store.dispatch(closeDrawer())
      if(!__DEV__){
        const firstRoute = store.getState().auth.loggedIn ? initialAuthRouteName : initialRouteName
        store.dispatch(forwardTo(firstRoute, true))
      }
      this.store = store
      this.forceUpdate()
    })  
  }

  shouldComponentUpdate(){
    return false
  }

  render() {        
    // should have a pre-load page
    if(!this.store){
      if (Platform.OS =='ios'){
        return ( <Preload message=""/> )
      }else{
        return (
          <View style={{
            flexDirection: 'column', 
            backgroundColor: material.primaryColor, 
            alignItems: 'center', 
            justifyContent: 'center',
            flex: 1
          }}>
            <Icon name="logo" style={{
                color: material.white500,
                fontSize: 60,
            }}/>
          </View>
        )
      }
      
    }
      

    return (
      <Provider store={this.store}>
        <App/>        
      </Provider>
    )
  }
} 