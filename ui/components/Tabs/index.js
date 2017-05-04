import React, { Component } from 'react'
import {                 
    Tabs,
    DefaultTabBar,
} from 'native-base'


export default props => (                         
  <Tabs renderTabBar={props => <DefaultTabBar regit />} {...props} />      
)