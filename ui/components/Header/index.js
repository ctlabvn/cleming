import React, { Component } from 'react'
import { connect } from 'react-redux'
import {         
    Header, Left, Right, Body,           
    Text, Title, Button, Item, Input,
    Thumbnail, View
} from 'native-base'

import * as commonSelectors from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'

import Icon from '~/ui/elements/Icon'
import styles from './styles'
import { storeTransparent, storeFilled } from '~/assets'

import {Keyboard, TouchableWithoutFeedback} from 'react-native'

@connect(state=>({
  searchString: commonSelectors.getSearchString(state),
}), commonActions)
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      type: props.type,
      title: props.title,
      icon: props.icon,
      showOverlay: false
    }
  }

  componentDidMount(){
    this.props.onItemRef && this.props.onItemRef(this)
  }

  show(type, title, icon){
    this.setState({type, title: title || this.state.title, icon})
  } 
  showOverlay(showStatus){
    this.setState({showOverlay: showStatus})
  }
  _leftClick = (e)=>{
    const {onLeftClick} = this.props
    onLeftClick && onLeftClick(this.state.type)
    Keyboard.dismiss()
  }

  _search = (value, force=false)=>{
    if((this.props.searchString !== value) || force) {
      this.props.search(value)
    } 
  }
  
  _rightClick = (e)=>{
    const {onRightClick} = this.props
    onRightClick && onRightClick(this.state.type)
  }

  renderHeaderBack(title){    
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon name="keyboard-arrow-left"/>
      </Button>
    )
    const center = (
      <Title bold full>{title}</Title>
    )
    return this.renderHeader(left, center)    
  }

  // public data not event
  renderHeaderSearch(iconName="menu"){    
    const center = (
      <Item style={styles.searchContainer}>
          <Icon name="search" style={styles.searchIcon} />
          <Input value={this.props.searchString} 
            autoCorrect={false} onChangeText={this._search} 
            placeholderTextColor="#a7e7ff" style={styles.searchInput} 
            placeholder="Regit Search" />                        
      </Item>
    )
    return this.renderHeaderTitle(center, "cloud-upload")    
  }

  renderHeaderHome(title, leftIcon='~/assests/images/store_without_background.png'){
    /*const left = (
      <Button noPadder transparent style={styles.circleButton} onPress={this._leftClick}>
        <Icon style={styles.circleIcon} name={leftIcon}/>
      </Button>
    )*/
    const left = (
      <Thumbnail source={{uri: leftIcon}} style={{width: 40, height: 40, borderRadius: 20}}/>
    )
    return this.renderHeaderTitle(title, left)
  }

  renderHeaderTitle(title, leftIcon="back", rightIcon="menu"){
    const left = (typeof leftIcon === "string" 
      ? <Button transparent onPress={this._leftClick}>
          <Icon style={styles.leftIcon} name={leftIcon}/>
        </Button>    
      : leftIcon  
    )
    const center = (
      typeof title ==="string" ? <Title full>{title}</Title> : title
    )
    const right = (rightIcon &&
      <Button transparent onPress={this._rightClick}>
        <Icon style={styles.menuIcon} name={rightIcon}/>
      </Button>
    )
    return this.renderHeader(left, center, right) 
  }
  _handlePressOverlay = ()=>{
    this.props.onPressOverlay && this.props.onPressOverlay()
  }
  renderHeader(left, center, right, props) {      
    return (                             
      <Header noShadow {...props} style={styles.container}>          
        <Left>{left}</Left>
        <Body>{center}</Body>
        <Right>{right}</Right>
        {this.state.showOverlay && 
          <TouchableWithoutFeedback onPress={()=>this._handlePressOverlay()}>
            <View style={styles.overlay}/>
          </TouchableWithoutFeedback>
        }
      </Header>     
    )
  }

  render(){
    // events will be 
    const {type, title, icon} = this.state    
    // event will be invoke via pageInstance
    switch(type){
      case 'none':      
        return false
      case 'back':
        return this.renderHeaderBack(title)
      case 'searchBack':
        return this.renderHeaderSearch('keyboard-arrow-left')
      case 'home':
        return this.renderHeaderHome(title, icon)  
      case 'noBack':
        this.renderHeaderTitle(title, null)    
      default:
        return this.renderHeaderTitle(title)
    } 
  }
}

