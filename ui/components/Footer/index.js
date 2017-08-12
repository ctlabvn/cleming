import React, { Component } from 'react'
import { connect } from 'react-redux'
import {         
    Footer, FooterTab, Button,         
    Text, Badge, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import options from './options'
import styles from './styles'

@connect(state=>({
  footerRoutes: state.footerRoutes, 
}))
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      type: props.type,
      route: props.route,
    }
  }

  componentDidMount(){
    this.props.onItemRef && this.props.onItemRef(this)
  }

  tabClick(route){    
    const {onTabClick} = this.props
    onTabClick && onTabClick(this.state.type, route)
  }

  show(type, route){
    this.setState({type, route})
  } 

  renderFooterTabs(route){
    return (                                     
        <Footer>
            <FooterTab style={styles.container}>
              {this.props.footerRoutes.map((item, index) =>
                <Button onPress={e=>this.tabClick(item)} textSmall key={item}>                        
                    <Icon name={options.footerIcons[index]} style={
                      item === route  ? styles.footerIconActive : styles.footerIcon
                    } />                    
                </Button>
              )}
            </FooterTab>
        </Footer>            
      )
  }

  render() {
      const {type, route} = this.state
      // event will be invoke via pageInstance
      switch(type){
        case 'none':      
          return false        
        default:
          return this.renderFooterTabs(route)
      }       
  }
}