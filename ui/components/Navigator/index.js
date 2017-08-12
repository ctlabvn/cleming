import React, { Component, PropTypes } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import styles from './styles'

const deviceWidth = Dimensions.get('window').width

export default class Navigator extends Component {

  static propTypes = {       
    renderScene: PropTypes.func.isRequired,
    initialRoute: PropTypes.object,    
  }

  constructor(props) {
    super(props);
    
    this._renderedSceneMap = new Map();
  
    this.routeStack = [props.initialRoute]    
    this.presentedIndex = 0
    this.blurIndex = -1    
    this._sceneRefs = []
  }  

  componentDidUpdate(){    
    // must provide this one, after update we will move it smoothly    
    this.props.transition(this.blurIndex, this.presentedIndex, this)
  }

  shouldComponentUpdate(nextProps) {
    return false
  }

  enable(index, enabled = true){
    let scene = this._sceneRefs[index]      
    scene && scene.setNativeProps({pointerEvents: enabled ? 'auto' : 'none'})
  }

  freeze(index, freezed = true){
    let scene = this._sceneRefs[index]      
    scene && scene.setNativeProps({
      [Platform.OS === 'android' 
        ? 'renderToHardwareTextureAndroid' 
        : 'shouldRasterizeIOS'
      ]: freezed
    })
  }

  translate(index, translateX){
    let scene = this._sceneRefs[index]
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
        updated = 1
      }              

      if(oldRoute.disableCache){
        // remove route then re-get index        
        this.routeStack.splice(this.blurIndex, 1)    
        this._sceneRefs.splice(this.blurIndex, 1)        
        // delete so we can re-render it later
        this._renderedSceneMap.delete(oldRoute.path)       
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

  _renderScene(route, i) {
    return (
      <View
        collapsable={false}
        key={route.path}
        ref={(scene) => {
          if(!this._sceneRefs[i])
            this._sceneRefs[i] = scene;
        }}
        style={styles.scene}>
        {this.props.renderScene(i)}  
      </View>
    );
  }

  render() {
    // console.log('vai')
    // const newRenderedSceneMap = new Map();
    const scenes = this.routeStack.map((route, index) => {
      let renderedScene;
      if (this._renderedSceneMap.has(route.path)){
        renderedScene = this._renderedSceneMap.get(route.path);
      } else {
        renderedScene = this._renderScene(route, index);
        this._renderedSceneMap.set(route.path, renderedScene);
      }      
      return renderedScene;
    });
    // update scene map
    return (
      <View
        style={styles.container}>
        {scenes}
      </View>        
    );
  }
}

