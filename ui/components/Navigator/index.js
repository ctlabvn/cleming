import React, { Component, PropTypes } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import styles from './styles'

const deviceWidth = Dimensions.get('window').width

export default class Navigator extends Component {

  static propTypes = {       
    renderScene: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    initialRoute: PropTypes.object.isRequired,    
  }

  constructor(props) {
    super(props);
    // use scenes array because we will not cache too many
    this.scenes = [this._renderScene(props.initialRoute)];    
    this.routeStack = [props.initialRoute]    
    this.presentedIndex = 0
    this.blurIndex = -1    
    // should be private
    this._sceneRefs = new Map()
  }  

  componentDidUpdate(){    
    // must provide this one, after update we will move it smoothly    
    this.props.transition(this.blurIndex, this.presentedIndex, this)
  }

  shouldComponentUpdate(nextProps) {
    return false
  }

  getScene(index){
    const route = this.routeStack[index]
    return route ? this._sceneRefs.get(route.path) : null
  }

  enable(index, enabled = true){
    let scene = this.getScene(index)      
    scene && scene.setNativeProps({pointerEvents: enabled ? 'auto' : 'none'})
  }

  freeze(index, freezed = true){
    let scene = this.getScene(index)      
    scene && scene.setNativeProps({
      [Platform.OS === 'android' 
        ? 'renderToHardwareTextureAndroid' 
        : 'shouldRasterizeIOS'
      ]: freezed
    })
  }

  translate(index, translateX){
    let scene = this.getScene(index)      
    scene && scene.setNativeProps({
      style: {
        transform: [
          {translateX},
        ],     
      }
    })
  }

  transitionBetween(prevIndex, index, translateX, prefix = 1){
    this.translate(index, translateX)
    this.translate(prevIndex, translateX - prefix * deviceWidth)    
  }

  navigate(route) {        
    let destIndex = this.routeStack.findIndex(item => item.path === route.path)
    const oldRoute = this.routeStack[this.presentedIndex]    
    if(destIndex !== this.presentedIndex){
      this.blurIndex = this.presentedIndex
      let updated = 0
      if (destIndex === -1) {
        destIndex = this.routeStack.length          
        this.routeStack.push(route)
        this.scenes.push(this._renderScene(route));
        updated = 1
      }              

      if(oldRoute.disableCache){
        // remove route then re-get index        
        this.routeStack.splice(this.blurIndex, 1)    
        this._sceneRefs.delete(oldRoute.path) 
        this.scenes.splice(this.blurIndex, 1)       
        // delete so we can re-render it later
        // this._renderedSceneMap.delete(oldRoute.path)       
        this.blurIndex = -1
        this.presentedIndex = destIndex > this.presentedIndex ? destIndex - 1 : destIndex                    
        // remove then update, so no blur needed
        updated = 2 
      } else {          
        this.presentedIndex = destIndex    
        // blur as soon as possible    
        this.props.onBlur(oldRoute)
      }

      if(updated > 0){
        this.forceUpdate()
      } else {
        this.componentDidUpdate()
      }

      // after did update with transition, let focus only at second time
      updated !== 1 && this.props.onFocus(route)

    } else {
      // just re-focus this page
      this.props.onFocus(oldRoute)
    }
  }

  _renderScene(route) {
    return (
      <View
        collapsable={false}
        key={route.path}
        ref={scene => this._sceneRefs.set(route.path, scene)}
        style={styles.scene}>
        {this.props.renderScene(route)}  
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.container}>
        {this.scenes}
      </View>        
    );
  }
}

