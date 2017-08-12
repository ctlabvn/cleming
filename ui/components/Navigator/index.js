import React, { Component, PropTypes } from 'react'
import { InteractionManager, View } from 'react-native'
import shallowEqual from 'fbjs/lib/shallowEqual'
import styles from './styles'
import material from '~/theme/variables/material'

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
    this.props.transition(this.blurIndex, this.presentedIndex)
    // this.show(this.presentedIndex, true)
    // this.show(this.blurIndex, false)
    // for sure
    // for(let i=0; i < this._sceneRefs.length; i++){      
    //   if(i !== this.presentedIndex){        
    //     this.show(i, false)
    //   } 
    // }    

    // this.enter.setValue(40)

    // Animated.timing(this.enter, {
    //   toValue: 0,
    //   duration: 200,
    //   useNativeDriver: true, // <-- Add this
    // }).start();

  }

  enable(index, enabled = true){
    let scene = this._sceneRefs[index]      
    scene && scene.setNativeProps({pointerEvents: enabled ? 'auto' : 'none'})
  }

  show(index, isShown){
    let scene = this._sceneRefs[index]    

    scene && scene.setNativeProps({
      style: {
        opacity: isShown ? 1 : 0,
        zIndex: isShown ? 1 : 0,        
      }
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

  transitionBetween(prevIndex, index, translateX, prefix){
    this.translate(index, translateX)
    this.translate(prevIndex, translateX - prefix * material.deviceWidth)    
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
    // this._renderedSceneMap = newRenderedSceneMap;
    return (
      <View
        style={styles.container}>
        {scenes}
      </View>        
    );
  }
}

