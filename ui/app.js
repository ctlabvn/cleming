import React, { Component } from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'
import { BackHandler, NativeModules, InteractionManager, NetInfo, Animated, Easing } from 'react-native'
import { Drawer, StyleProvider, View, Text } from 'native-base'

// import URL from 'url-parse'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

// import Container from './components/Container'
import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
import ConnectionInfo from './components/ConnectionInfo'
import AfterInteractions from './components/AfterInteractions'
import PushNotification from 'react-native-push-notification'
import SideBar from './components/SideBar'
import Preload from './containers/Preload'
import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'
// import Popover from '~/ui/components/Popover'
import TopDropdown from '~/ui/components/TopDropdownSeperate'
import TopDropdownListValue from '~/ui/components/TopDropdownListValue'
import PopupInfo from '~/ui/components/PopupInfo'
import PopupConfirm from '~/ui/components/PopupConfirm'
import NotificationHandler from './containers/NotificationHandler'
// router => render component base on url
// history.push => location match => return component using navigator push
import { connect } from 'react-redux'

import { SENDER_ID } from '~/store/constants/api'
// should show error if not found
import { getDrawerState, getRouter } from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as placeActions from '~/store/actions/place'
import * as locationActions from '~/store/actions/location'
import * as notificationActions from '~/store/actions/notification'
import * as metaActions from "~/store/actions/meta"
import { getSession } from '~/store/selectors/auth'
import { getSelectedPlace } from '~/store/selectors/place'
import routes from './routes'
import DeviceInfo from 'react-native-device-info'
import md5 from 'md5'
import { 
  NOTIFY_TYPE, TRANSACTION_TYPE, DETECT_LOCATION_INTERVAL, SCREEN,
  initialAuthRouteName, initialRouteName,
} from '~/store/constants/app'
// console.log(DeviceInfo.getUniqueID(),DeviceInfo.getDeviceId()+'---'+md5('android_'+DeviceInfo.getUniqueID()))
import I18n from '~/ui/I18n'

const getPage = (route) => {
  let match = routes[route.routeName]
  // update routeName and params if found
  match && Object.assign(match, route)
  return match
}

const animatedOption = {
  toValue: 0,
  duration: 200,
  easing: Easing.bezier(0.075, 0.82, 0.165, 1),
  useNativeDriver: true, 
}

const UIManager = NativeModules.UIManager
// should check reference instead of real data
@connect(state => ({
  router: getRouter(state),
  drawerState: getDrawerState(state),
  place: state.place,
  location: state.location,
  selectedPlace: getSelectedPlace(state),
  xsession: getSession(state)
}), { ...commonActions, ...authActions, ...placeActions, ...locationActions, ...notificationActions, ...metaActions })
export default class App extends Component {

  constructor(props) {
    super(props)
    this.pageInstances = new Map()
    this.watchID = 0
    this.firstTime = true
    this.timer = null
    this.listPlace = []    
  }

  _transitionScene = (prevIndex, index, thisNavigator) => {   
    // animate for tab, other just show hide    
    const prevRoute = thisNavigator.routeStack[prevIndex]
    const route = thisNavigator.routeStack[index]
    // show current scene then wait for transition
    // disable prevScene, means that we can do any action on this view    
    thisNavigator.enable(prevIndex, false)
    // check animation type
    if(prevRoute && prevRoute.tabIndex !== undefined && route.tabIndex !== undefined){
      // animate like tab, 
      // show index first then prepare for animate
      // when complete animation, let pointerEvents = 'auto' other 'none'
      // if tabIndex > preTabIndex from right to left, else from left to right
      const prefix = route.tabIndex > prevRoute.tabIndex ? 1 : - 1
      let enter = new Animated.Value(40 * prefix)    
      const shouldAnamiteTopDropdown = route.showTopDropdown !== prevRoute.showTopDropdown
      // start freeze
      thisNavigator.freeze(prevIndex)
      thisNavigator.freeze(index)      

      const animatedListenerId = enter.addListener(({value})=>{     
        let translateX = Math.round(value)  
        // too small to animate         
        if(Math.abs(translateX) < 2) 
          translateX = 0 
        
        thisNavigator.transitionBetween(prevIndex, index, translateX, prefix)     
        // update top dropdown translateX, it is small and no need to freeze
        if(shouldAnamiteTopDropdown)
          this.topDropdown.translate(route.showTopDropdown ? translateX : translateX - prefix * material.deviceWidth)                  
        
        if(translateX === 0) {                    
          // now ready
          // stop freeze
          thisNavigator.freeze(prevIndex, false)
          thisNavigator.freeze(index, false)

          // then enable it
          thisNavigator.enable(index)
          enter.removeListener(animatedListenerId)
        }
      })

      // start animation
      Animated.timing(enter, animatedOption).start()

    } else {
      // make sure it can show/hide   
      thisNavigator.transitionBetween(prevIndex, index, 0)
      this.topDropdown.show(route.showTopDropdown)
      thisNavigator.enable(index)           
    }
    
  }

  // replace view from stack, hard code but have high performance
  componentWillReceiveProps({ router, drawerState }) {
    // process for route change only

    if (router.current.routeName !== this.props.router.current.routeName) {
      const route = getPage(router.current)
      if (route) {
        // show header and footer, and clear search string          
        this.navigator.navigate(route)
        this.header.show(route.headerType, route.title)        
        this.footer.show(route.footerType, route.routeName)

        // we will animate this for better transition
        // this.topDropdown.show(route.showTopDropdown)        
      } else {
        // no need to push to route
        this.props.setToast('Scene not found: ' + router.current.routeName, 'danger')
      }      
    }    

    // check drawer
    if (drawerState !== this.props.drawerState) {
      this.drawer._root[drawerState === 'opened' ? 'open' : 'close']()
    }
  }

  // we handle manually to gain performance
  shouldComponentUpdate(nextProps) {
    return false
  }


  handleFocusableComponent(ref, focus = true){
    // do not loop forever
    const method = focus ? 'componentWillFocus' : 'componentWillBlur'
    let whatdog = 10        
    while (ref && whatdog > 0) {
      if (ref[method]) {
        ref[method]()        
        // console.log(method, ref)
        // clearTimeout(this.timer)
        // this.timer = 
        // setTimeout(()=>ref[method](), 1000)
        break
      }
      ref = ref._reactInternalInstance._renderedComponent._instance
      whatdog--
    }
  }

  
  _handlePageWillBlur = ({routeName, cache}) => {    
    if(cache)
      this.handleFocusableComponent(this.pageInstances.get(routeName), false)      
    else
      this.pageInstances.delete(routeName)
  }


  _handlePageWillFocus = (route) => {   
    // should not re-render via params, let it - re-mount
    // let component = this.pageInstances.get(route.routeName)
    // if(component){       
    //   const propsChanged = !shallowEqual(route.params, component.props.route.params)
    //     || !shallowEqual(route.query, component.props.route.query)
    //   if (propsChanged) {
    //     // this page will re-render if route change
    //     Object.assign(component.props.route, route)        
    //     component.forceUpdate()
    //   }           
    // }
    
    this.handleFocusableComponent(this.pageInstances.get(route.routeName), true)
  }

  // we can use events to pass between header and footer and page via App container or store
  _renderPage = (route) => {    
    const component = (
      <AfterInteractions firstTime={this.firstTime} placeholder={route.Preload || <Preload />}>
        <View style={{ paddingTop: route.showTopDropdown ? 50 : 0, flex: 1 }}>
          <route.Page route={route} app={this} ref={ref=> this.pageInstances.set(route.routeName, ref)} />
        </View>
      </AfterInteractions>
    )

    this.firstTime = false
    return component    
  }

  _onLeftClick = (type) => {
    const { goBack } = this.props
    switch (type) {
      case 'none':
        return false
      default:
        return goBack()
    }
  }

  _onRightClick = (type) => {
    const { openDrawer } = this.props
    switch (type) {
      default:
        return openDrawer()
    }
  }

  _onTabClick = (type, routeName) => {
    if(routeName !== this.props.router.current.routeName){
      const { forwardTo } = this.props
      switch (type) {
        case 'none':
          return false
        default:
          // if not check, we can still forward without navigating, but takes a little time
          return forwardTo(routeName)
      }
    }
  }


  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  updatePlaceList(lat, long) {
    const { place, setSelectedOption, selectedPlace, getListPlace, xsession } = this.props

    if (!xsession) return
    getListPlace(xsession, lat, long,
      (err, data) => {
        if (data && data.updated && data.updated.data) {
          let selectedOption = {}
          selectedOption.id = data.updated.data[0].placeId
          selectedOption.name = data.updated.data[0].address
          setSelectedOption(selectedOption)
        }
      })
  }
  componentDidMount() {
    const { saveCurrentLocation, place, selectedPlace, location, alreadyGotLocation, setToast } = this.props
    // if (selectedPlace && Object.keys(selectedPlace).length > 0 && this.listPlace.length != place.listPlace.length) {
      this.listPlace = place.listPlace.map(item => ({
        id: item.placeId,
        name: item.address
      }))
      // this.topDropdown.updateDropdownValues(listPlace)      
      this.topDropdown.updateSelectedOption(selectedPlace)
      if (this.listPlace.length > 1){
        this.topDropdown.setIsMultiple(true)
      }else{
        this.topDropdown.setIsMultiple(false)
      }
      this.topDropdownListValue.updateDropdownValues(this.listPlace)
      this.topDropdownListValue.updateDefaultDropdownValues(this.listPlace)
      this.topDropdownListValue.updateSelectedOption(selectedPlace)
    // }


    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Position', position)
        if (!location || Object.keys(location).length == 0 || !location.alreadyGotLocation) {
          this.updatePlaceList(position.coords.latitude, position.coords.longitude)
          alreadyGotLocation()
        }
        saveCurrentLocation(position.coords)
      },
      (error) => {
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   console.log('Position Change', position)
    //   if (!location || Object.keys(location).length == 0 || !location.alreadyGotLocation) {
    //     this.updatePlaceList(position.coords.latitude, position.coords.longitude)
    //     alreadyGotLocation()
    //   }
    //   let now = new Date().getTime()
    //   // Save location when nerver detect location yet, or last detection longer than 2 minutes
    //   if (!location || Object.keys(location).length == 0 ||
    //     (location.lastDetect && (now - location.lastDetect > DETECT_LOCATION_INTERVAL))) {
    //     console.log('Saving Position')
    //     saveCurrentLocation(position.coords)
    //   }

    // })

    BackHandler.addEventListener('hardwareBackPress', this._handleBack)
  }

  _handleBack = () => {
     if (this.topDropdownListValue) this.topDropdownListValue.close();
     if (this.topDropdown) this.topDropdown.close();
    const { router, goBack, drawerState, closeDrawer } = this.props
      if (drawerState == 'opened'){
        closeDrawer()
        return true
      }
      if (router.current.routeName === initialRouteName || router.current.routeName === initialAuthRouteName) {
        this.popupConfirm.show(I18n.t('confirm_exit'))
        return true
      }
      // go back
      goBack()
      return true
  }

  componentWillUnmount() {
    const { drawerState, closeDrawer } = this.props
    if (drawerState == 'opened'){
      closeDrawer()
    }
    // navigator.geolocation.clearWatch(this.watchID)
    BackHandler.removeEventListener('hardwareBackPress', this._handleBack)    
  }

  

  _handleChangePlace = (item) => {
    const { setSelectedOption } = this.props
    this.topDropdown.updateSelectedOption(item)
    this.header.showOverlay(false)
    setSelectedOption(item)
  }
  _handlePressIcon = (openning) => {
    if (openning) {
      this.topDropdownListValue.close()
      this.header.showOverlay(false)
    } else {
      this.topDropdownListValue.open()
      this.header.showOverlay(true)
    }
  }
  _handlePressOverlay = () => {
    this.topDropdown.close()
    this.header.showOverlay(false)
  }
  _handlePressHeaderOverlay = () => {
    this.topDropdown.close()
    this.topDropdownListValue.close()
    this.header.showOverlay(false)
  }
  render() {
    const { drawerState, closeDrawer, place, selectedPlace, router } = this.props
    const route = getPage(router.current) || routes.notFound
    this.listPlace = place.listPlace.map(item => ({
      id: item.placeId,
      name: item.address
    }))
    return (
      <StyleProvider style={getTheme(material)}>
        <Drawer
          ref={ref => this.drawer = ref}
          open={drawerState === 'opened'}
          type="overlay"
          side="right"
          negotiatePan={true}
          useInteractionManager={true}
          tweenHandler={ratio => ({
            drawer: {
              top: 20,
              paddingBottom: 20,
            },
            main: {
              opacity: 1,
            },
            mainOverlay: {
              opacity: ratio / 2,
              backgroundColor: 'black',
            },
          })}
          openDrawerOffset={0.27}
          tweenDuration={300}
          tweenEasing="easeOutCubic"
          content={<SideBar />}
          onClose={closeDrawer}
        >
        
          <Header type={route.headerType} title={route.title} onLeftClick={this._onLeftClick} 
            onRightClick={this._onRightClick} onItemRef={ref => this.header = ref}
            app={this} onPressOverlay={this._handlePressHeaderOverlay}
          />

          <Navigator ref={ref => this.navigator = ref}
            // configureScene={this.constructor.configureScene}
            initialRoute={route}
            renderScene={this._renderPage}
            onFocus={this._handlePageWillFocus}
            onBlur={this._handlePageWillBlur}
            transition={this._transitionScene}
          />
          <Footer type={route.footerType} route={route.routeName} onTabClick={this._onTabClick} 
            onItemRef={ref => this.footer = ref} />          
          <TopDropdown
            app={this}
            ref={ref => this.topDropdown = ref}
            onPressIcon={this._handlePressIcon}
            selectedOption={selectedPlace}
            dropdownValues={this.listPlace}
            show={route.showTopDropdown}
          />
          <TopDropdownListValue
            onSelect={this._handleChangePlace}            
            onPressOverlay={this._handlePressOverlay}
            ref={ref => this.topDropdownListValue = ref}
            dropdownValues={this.listPlace}
          />
          <Toasts />
          <NotificationHandler />
          <ConnectionInfo />
          {
          // <Popover ref={ref => this.popover = ref} />
}
          <PopupInfo />
          <PopupConfirm ref={ref=>this.popupConfirm = ref} onOk={()=>BackHandler.exitApp()}/>
        </Drawer>
      </StyleProvider>
    )
  }
}

