import React, { Component } from 'react'
import { BackAndroid, NativeModules, Navigator } from 'react-native'
import { Drawer, StyleProvider } from 'native-base'

import URL from 'url-parse'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

// import Container from './components/Container'
// import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
import AfterInteractions from './components/AfterInteractions'
import SideBar from './components/SideBar'
import Preload from './containers/Preload'
import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'
import Popover from '~/ui/components/Popover'

// router => render component base on url
// history.push => location match => return component using navigator push
import { matchPath } from 'react-router'
import { connect } from 'react-redux'

// should show error if not found
import { getDrawerState, getRouter } from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'
import routes from './routes'

const getPage = (url) => {  
  for(route in routes) {
    const pathname = url.split('?')[0]
    const match = matchPath(pathname, {
      path:route,
      exact: true,
      strict: false,
    })
    if(match) {      
      // update query and pathname
      const {query} = new URL(url, null, true)      
      return {...routes[route], ...match, url, pathname, query}
    }
  }  
}

const UIManager = NativeModules.UIManager

@connect(state=>({
  router: getRouter(state),
  drawerState: getDrawerState(state),
}), commonActions)
export default class App extends Component {    

  static configureScene(route) {
      const {animationType = 'PushFromRight'} = routes[route.path] || {}
      // return Navigator.SceneConfigs[animationType]
      // Navigator.SceneConfigs[animationType]
      // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
      return {
        ...Navigator.SceneConfigs[animationType], 
        gestures: null,
        defaultTransitionVelocity: 20,
      }
  }

  constructor(props) {
    super(props)
    // default is not found page, render must show error
    this.page = getPage(props.router.route) || routes.notFound      
    this.pageInstances = {}      
  }

  // replace view from stack, hard code but have high performance
  componentWillReceiveProps({router, drawerState}){
    // process for route change only
    if(router.route !== this.props.router.route){
      this.page = getPage(router.route)
      if(this.page){
        const {headerType, footerType, title, path} = this.page
        // show header and footer, and clear search string
        this.header.show(headerType, title)
        this.header._search('')
        this.footer.show(footerType, router.route)

        // return console.warn('Not found: ' + router.route)
        // check if page is mounted
        const destIndex = this.navigator.state.routeStack
          .findIndex(route => route.path === this.page.path)

        // console.log(this.navigator.state)      
        if(destIndex !==-1){          
          // trigger will focus, the first time should be did mount
          this.handlePageWillFocus(path)
          this.navigator._jumpN(destIndex - this.navigator.state.presentedIndex)          
        } else {                            
          this.navigator.state.presentedIndex = this.navigator.state.routeStack.length
          this.navigator.push({title, path})                    
        }  
      } else {
        // no need to push to route
        this.page = routes.notFound
        this.props.setToast('Route not found: ' + router.route, 'danger')
      }
    }

    // check drawer
    if(drawerState !== this.props.drawerState){
      this.drawer._root[drawerState === 'opened' ? 'open' : 'close']()
    }
  }

  // we handle manually to gain performance
  shouldComponentUpdate(nextProps){
    return false
  }

  // render a component from current page, then pass the params to Page
  renderComponentFromPage(page){
    const {Page, ...route} = page
    return (
      <Page ref={ref=>route.path && (this.pageInstances[route.path]=this.getPageInstance(ref))} route={route} app={this}/>
    )
  }

  // we can use events to pass between header and footer and page via App container or store
  _renderPage = (route) => {   
    if(this.page.path && route.path !== this.page.path) {
      // console.log('will focus')
    }  else {                
      // we only pass this.page, route and navigator is for mapping or some event like will focus ...
      // first time not show please waiting
      if(!this.navigator) {
        return this.renderComponentFromPage(this.page)
      }
      return (                                           
        <AfterInteractions placeholder={this.page.Preload || <Preload/>}>             
          {this.renderComponentFromPage(this.page)}
        </AfterInteractions>            
      )
    }
  }

  _onLeftClick=(type)=>{
    const {openDrawer, goBack} = this.props
    switch(type){
      case 'none':      
        return false
      case 'back':
      case 'searchBack':
        return goBack()
      default:
        return openDrawer()
    }      
  }

  _onTabClick=(type, route)=>{    
    const {forwardTo} = this.props
    switch(type){
      case 'none':      
        return false
      default:
        return forwardTo(route)
    }    
  }


  componentWillMount() {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)        
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const {router, goBack} = this.props
      if (router.route === 'home') {
        return false
      }
      // go back
      goBack()
      return true
    })
  }

  getPageInstance(ref){
    let whatdog = 10
    let component = ref
    // maybe connect, check name of constructor is _class means it is a component :D
    if(component && component.constructor.name.substr(0,6) !== '_class'){
      component = component._reactInternalInstance._renderedComponent
      while(component._instance && component._instance.constructor.name.substr(0,6) !== '_class' && whatdog > 0){
        component = component._renderedComponent
        whatdog--
      }
      component = component._instance
    }
    return component
  }

  // we need didFocus, it is like componentDidMount for the second time
  handlePageWillFocus(path){    
    // currently we support only React.Component instead of check the existing method
    // when we extend the Component, it is still instanceof
    let component = this.pageInstances[path]  
    
    // check method
    component && component.componentWillFocus && component.componentWillFocus()    

  }

  render() {    
    const {router, drawerState, closeDrawer} = this.props   
    const {title, path, headerType, footerType} = this.page 
    return (            
      <StyleProvider style={getTheme(material)}>  
        <Drawer
          ref={ref => this.drawer = ref}
          open={drawerState === 'opened'}
          type="displace"             
          tweenDuration={200}
          content={<SideBar/>}
          onClose={closeDrawer}
        >           
          {
            // each Page will overide StatusBar
            // <StatusBar hidden={ this.page.hiddenBar || (drawerState === 'opened' && material.platform === 'ios')} translucent />          
          }
          <Header type={headerType} title={title} onLeftClick={this._onLeftClick} onItemRef={ref=>this.header=ref} />
          <Navigator ref={ref=>this.navigator=ref}
              configureScene={this.constructor.configureScene}
              initialRoute={{title, path}}
              renderScene={this._renderPage}                           
          />
          <Footer type={footerType} route={router.route} onTabClick={this._onTabClick} ref={ref=>this.footer=ref} />
          <Toasts/>
          <Popover ref={ref=>this.popover=ref}/>
        </Drawer>   
      </StyleProvider>          
    )
  }
}

