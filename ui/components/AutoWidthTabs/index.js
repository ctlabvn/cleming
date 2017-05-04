import React, { Component } from 'react'
import {                 
    Tabs, ScrollableTab, TabHeading, Text,
} from 'native-base'
import styles from './styles'


export default class extends Component {
  render() {
    const {children, ...props} = this.props   
    const autoWidthChildren = children.map((child, key)=>{
      const tabStyle = {flex:child.props.heading.length}
      return React.cloneElement(child, {tabStyle, activeTabStyle:tabStyle, key})
    })
    return (                         
      <Tabs {...props} renderTabBar={props => <ScrollableTab style={styles.tab} tabsContainerStyle={styles.tabContainer} />}>
        {autoWidthChildren}
      </Tabs>      
    )
  }
}