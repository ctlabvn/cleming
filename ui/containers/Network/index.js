import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading, Thumbnail, DefaultTabBar,
    Text, Item, View, Input, Left, Body, Tab, Right,
} from 'native-base'


import { connect } from 'react-redux'
import * as networkActions from '~/store/actions/network'

import * as authSelectors from '~/store/selectors/auth'
import * as networkSelectors from '~/store/selectors/network'

import Tabs from '~/ui/components/Tabs'
import PendingTab from './components/PendingTab'
import NormalTab from './components/NormalTab'
import TrustedTab from './components/TrustedTab'
import BusinessTab from './components/BusinessTab'
import styles from './styles'

// import { API_BASE } from '~/store/constants/api'
// if we send token from app.token, it will make the dependency
@connect(state=>({
  token: authSelectors.getToken(state),
  networks: networkSelectors.getNetworks(state),
}), {...networkActions})
export default class extends Component {  

  componentWillMount(){
    this.componentWillFocus()
  }

  componentWillFocus(){
    const {token, networks, getNetworks, getNetwork, getBusinessNetwork} = this.props
    // later we have the network
    if(!networks['Business Network']){
      getNetworks(token, data=>{        
        data.forEach(({Id, Name})=>getNetwork(token, Id, Name))
        getBusinessNetwork(token)
      })      
    }    
  }  

  render() {

    const {app, networks} = this.props        
    return (          
       
        <Container>         

            <Tabs>
                <Tab style={styles.container} heading="PENDING">                  
                  <PendingTab/>
                </Tab>
                <Tab style={styles.container} heading="NORMAL">
                  <NormalTab network={networks['Normal Network']} app={app}/>
                </Tab>
                <Tab style={styles.container} heading="TRUSTED">
                  <TrustedTab network={networks['Trusted Network']} app={app}/>
                </Tab>
                <Tab style={styles.container} heading="BUSINESS">
                  <BusinessTab token={this.props.token} network={networks['Business Network']} app={app}/>
                </Tab>
            </Tabs>   
            
        </Container>
      
    )
  }
}