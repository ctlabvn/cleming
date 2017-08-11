import React, { Component, PropTypes } from 'react'
import { InteractionManager, View, LayoutAnimation } from 'react-native'
import shallowEqual from 'fbjs/lib/shallowEqual'
import styles from './styles'

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
    // this.blurIndex = -1
    this._sceneRefs = [];
    // this._pageRefs = [];
  }

  show(index, isShown){
    let wrapper = this._sceneRefs[index]        
    wrapper && wrapper.setNativeProps({
      style: {
        opacity: isShown ? 1 : 0,
        zIndex: isShown ? 1 : 0,        
      }
    })
  }

  componentDidUpdate(){
    // console.log(this.presentedIndex, this.blurIndex)
    // this.setFocus(this.presentedIndex, true)
    this.show(this.presentedIndex, true)
    // this.show(this.blurIndex, false)
    // for sure
    for(let i=0; i < this._sceneRefs.length; i++){      
      if(i !== this.presentedIndex){        
        this.show(i, false)
      } 
    }
  }

  // handleFocusableComponent(index, focus = true) {
  //   // do not loop forever
  //   // const method = focus ? 'componentWillFocus' : 'componentWillBlur'
  //   // let whatdog = 10    
  //   let ref = this._sceneRefs[index].props.children
  //   this.props.handleFocusableComponent(ref)
  // }

  // getSceneComponent(index){
  //   return this._sceneRefs[index].props.children
  // }

  navigate(route) {        
    const destIndex = this.routeStack.findIndex(item => item.path === route.path)
    if(destIndex !== this.presentedIndex){
      if (destIndex !== -1) {        
        const oldRoute = this.routeStack[this.presentedIndex]
        // console.log(oldRoute)
        if(oldRoute.disableCache){
          // remove route then re-get index        
          this.routeStack.splice(this.presentedIndex)    
          this._sceneRefs.splice(this.presentedIndex)          
          // this._pageRefs.splice(this.presentedIndex)   
          this.presentedIndex = destIndex > this.presentedIndex ? destIndex - 1 : destIndex                    
          this.forceUpdate() 
        } else {
          // this.blurIndex = this.presentedIndex
          this.presentedIndex = destIndex    
          this.componentDidUpdate()    
        }              

        // blur old one then focus new one
        this.props.onBlur && this.props.onBlur(oldRoute)
        this.props.onFocus && this.props.onFocus(route)

      } else {
        this.presentedIndex = this.routeStack.length          
        this.routeStack.push(route)
        this.forceUpdate() 
      }        
         
    }
  }

  _renderScene(route, i) {
    return (
      <View
        collapsable={false}
        key={i}
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
    const newRenderedSceneMap = new Map();
    const scenes = this.routeStack.map((route, index) => {
      let renderedScene;
      if (this._renderedSceneMap.has(route.path)) 
        // && index !== this.presentedIndex) 
      {
        renderedScene = this._renderedSceneMap.get(route.path);
      } else {
        renderedScene = this._renderScene(route, index);
      }
      newRenderedSceneMap.set(route.path, renderedScene);
      return renderedScene;
    });

    this._renderedSceneMap = newRenderedSceneMap;
    return (
      <View
        style={styles.container}>
        {scenes}
      </View>        
    );
  }
}

