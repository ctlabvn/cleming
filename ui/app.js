import React, { Component } from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'
import { BackAndroid, NativeModules, Navigator, InteractionManager } from 'react-native'
import { Drawer, StyleProvider, View } from 'native-base'

import URL from 'url-parse'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

// import Container from './components/Container'
// import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
import AfterInteractions from './components/AfterInteractions'
import PushNotification from 'react-native-push-notification'
import SideBar from './components/SideBar'
import Preload from './containers/Preload'
import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'
import Popover from '~/ui/components/Popover'
import TopDropdown from '~/ui/components/TopDropdownSeperate'
import TopDropdownListValue from '~/ui/components/TopDropdownListValue'
// router => render component base on url
// history.push => location match => return component using navigator push
import { matchPath } from 'react-router'
import { connect } from 'react-redux'

import { SENDER_ID } from '~/store/constants/api'
// should show error if not found
import { getDrawerState, getRouter } from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as placeActions from '~/store/actions/place'
import * as locationActions from '~/store/actions/location'
import { getSession } from '~/store/selectors/auth'
import { getSelectedPlace } from '~/store/selectors/place'
import routes from './routes'

import DeviceInfo from 'react-native-device-info'
import md5 from 'md5'
import { NOTIFY_TYPE, TRANSACTION_TYPE, DETECT_LOCATION_INTERVAL } from '~/store/constants/app'
// console.log(DeviceInfo.getUniqueID(),DeviceInfo.getDeviceId()+'---'+md5('android_'+DeviceInfo.getUniqueID()))
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator'

const NoTransition = {
  opacity: {
    from: 1,
    to: 1,
    min: 1,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100,
  },
}

const getPage = (url) => {
  for (route in routes) {
    const pathname = url.split('?')[0]
    const match = matchPath(pathname, {
      path: route,
      exact: true,
      strict: false,
    })
    if (match) {
      // update query and pathname
      const { query } = new URL(url, null, true)
      return { ...routes[route], ...match, url, pathname, query }
    }
  }
}

const UIManager = NativeModules.UIManager

@connect(state => ({
  router: getRouter(state),
  drawerState: getDrawerState(state),
  place: state.place,
  location: state.location,
  selectedPlace: getSelectedPlace(state),
  xsession: getSession(state)
}), { ...commonActions, ...authActions, ...placeActions, ...locationActions })
export default class App extends Component {

  // static configureScene(route) {
  //   // const { animationType = material.platform === 'android' ? 'PushFromRight' : 'PushFromRight' } = routes[route.path] || {}
  //   const animationType = routes[route.path] || 'PushFromRight'
  //   // return Navigator.SceneConfigs[animationType]
  //   // Navigator.SceneConfigs[animationType]
  //   // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
  //   const sceneConfig = {
  //     ...Navigator.SceneConfigs[animationType],
  //     gestures: null,
  //     defaultTransitionVelocity: 20,
  //   }

  //   // if (material.platform === 'android') {
  //   //   sceneConfig.animationInterpolators = {
  //   //     into: buildStyleInterpolator(NoTransition),
  //   //     out: buildStyleInterpolator(NoTransition),
  //   //   }
  //   // }

  //   return sceneConfig
  // }

  static configureScene(route) {

    const {animationType = 'FloatFromLeft'} = routes[route.path] || {}

    // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
    return {
      ...Navigator.SceneConfigs[animationType],
      gestures: null,
      defaultTransitionVelocity: 20,
      animationInterpolators: {
        into: buildStyleInterpolator(NoTransition),
        out: buildStyleInterpolator(NoTransition),
      },
    }
    // return Navigator.SceneConfigs[animationType]
  }

  initPushNotification(options) {
    PushNotification.configure({
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
      // senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotification.requestPermissions() later
        */
      requestPermissions: true,

      ...options,
    })
  }

  showNotification(options) {
    // trigger local notification, like fetch from push server
    return PushNotification.localNotification(options)
  }

  constructor(props) {
    super(props)
    // default is not found page, render must show error
    this.page = getPage(props.router.route) || routes.notFound
    // this.prevPage = null
    this.pageInstances = {}
    this.watchID = 0
    this.firstTime = true
    this.timer = null
    this.initPushNotification({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        this.props.setPushToken(token.token)
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification)
        if (notification.userInteraction) {
          this._handleNoti(notification)
        } else {
          if (this.props.xsession) {
            let currentPlace = this.props.selectedPlace
            if (currentPlace && currentPlace.id) {
              this.props.getMerchantNews(this.props.xsession, currentPlace.id)
            }
            const title = notification.title ? notification.title + " " + notification.message : notification.alert
            this.props.setToast(title, 'warning', this._handleNoti, notification)
          }
        }
      },

      senderID: SENDER_ID,
    })
  }
  _handleNoti = (notification) => {
    console.log('Call handle Noti')
    let notificationData = notification.data
    switch (notificationData.type) {
      case NOTIFY_TYPE.TRANSACTION_DIRECT_WAITING:
      case NOTIFY_TYPE.TRANSACTION_FEEDBACK:
        this.props.forwardTo('transactionDetail/' + notificationData.param1 + '/' + TRANSACTION_TYPE.DIRECT)
        break
      case NOTIFY_TYPE.NEW_BOOKING:
        this.props.forwardTo('placeOrderDetail/' + notificationData.param1)
        break
      case NOTIFY_TYPE.NEW_ORDER:
        this.props.forwardTo('deliveryDetail/' + notificationData.param1)
        break
    }
  }
  // replace view from stack, hard code but have high performance
  componentWillReceiveProps({ router, drawerState }) {
    // process for route change only
    // console.log('Route will receive props', getPage(router.route))
    this.page = getPage(router.route)
    const { headerType, footerType, title, path, showTopDropdown } = this.page
    this.topDropdown.show(showTopDropdown)

    if (router.route !== this.props.router.route) {
      const oldComponent = this.pageInstances[this.page.path]
      if (this.page) {
        // show header and footer, and clear search string
        this.header.show(headerType, title)
        // this.header._search('')
        this.footer.show(footerType, router.route)

        // return console.warn('Not found: ' + router.route)
        // check if page is mounted
        const destIndex = this.navigator.state.routeStack
          .findIndex(route => route.path === this.page.path)

        // console.log(this.navigator.state)      
        if (destIndex !== -1) {
          // trigger will focus, the first time should be did mount
          this.handlePageWillFocus(path)
          oldComponent && this.handleFocusableComponent(oldComponent, false)
          this.navigator._jumpN(destIndex - this.navigator.state.presentedIndex)
        } else {
          this.navigator.state.presentedIndex = this.navigator.state.routeStack.length
          this.navigator.push({ title, path, showTopDropdown })
        }
      } else {
        // no need to push to route
        this.page = routes.notFound
        this.props.setToast('Route not found: ' + router.route, 'danger')
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

  // will assign visible props for page, and only render when it is visible
  initializePage(ref, route) {
    if (ref && route.path) {
      this.pageInstances[route.path] = ref

      ref.visible = true

      // ref.visible = true
      // const fn = ref.shouldComponentUpdate
      // ref.shouldComponentUpdate = (nextProps, nextState) => (fn ? fn.call(ref) : true) && ref.visible
    }
  }

  // render a component from current page, then pass the params to Page
  renderComponentFromPage(page) {
    const { Page, ...route } = page
    return (
      <View style={{ paddingTop: page.showTopDropdown ? 50 : 0, flex: 1 }}>
        <Page ref={ref => this.initializePage(ref, route)} route={route} app={this} />
      </View>
    )
  }

  // we can use events to pass between header and footer and page via App container or store
  _renderPage = (route) => {
    // if (this.page.path && route.path !== this.page.path) {
    //   // console.log('will focus')
    // } else {
    //   // we only pass this.page, route and navigator is for mapping or some event like will focus ...
    //   // first time not show please waiting
    //   // if (!this.navigator || this.page.Preload === false) {
    //   //   return this.renderComponentFromPage(this.page)
    //   // }
    // console.log('Page', route)
    // console.log('APJS Topdopdpwm', this.topDropdown)
    // if (this.topDropdown){
    //   if (route.showTopDropdown){
    //     this.topDropdown.show(true)
    //   }else{
    //     this.topDropdown.show(false)
    //   }
    // }

    const component = (
      <AfterInteractions firstTime={this.firstTime} placeholder={this.page.Preload || <Preload />}>
        {this.renderComponentFromPage(this.page)}
      </AfterInteractions>
    )

    this.firstTime = false
    return component
    // }
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

  _onTabClick = (type, route) => {
    const { forwardTo } = this.props
    switch (type) {
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
    const { saveCurrentLocation, place, selectedPlace, location, alreadyGotLocation, router } = this.props
    if (selectedPlace && Object.keys(selectedPlace).length > 0) {
      let listPlace = place.listPlace.map(item => ({
        id: item.placeId,
        name: item.address
      }))
      this.topDropdown.updateDropdownValues(listPlace)
      this.topDropdown.updateSelectedOption(selectedPlace)
      this.topDropdownListValue.updateDropdownValues(listPlace)
      this.topDropdownListValue.updateSelectedOption(selectedPlace)
    }

    this.page = getPage(router.route)
    const { showTopDropdown } = this.page
    this.topDropdown.show(showTopDropdown)

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
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log('Position Change', position)
      if (!location || Object.keys(location).length == 0 || !location.alreadyGotLocation) {
        this.updatePlaceList(position.coords.latitude, position.coords.longitude)
        alreadyGotLocation()
      }
      let now = new Date().getTime()
      // Save location when nerver detect location yet, or last detection longer than 2 minutes
      if (!location || Object.keys(location).length == 0 ||
        (location.lastDetect && (now - location.lastDetect > DETECT_LOCATION_INTERVAL))) {
        console.log('Saving Position')
        saveCurrentLocation(position.coords)
      }

    })

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { router, goBack } = this.props
      if (router.route === 'merchantOverview' || router.route === 'login') {
        return false
      }
      // go back
      goBack()
      return true
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  handleFocusableComponent(component, focus = true) {
    // do not loop forever
    const method = focus ? 'componentWillFocus' : 'componentWillBlur'
    let whatdog = 10
    let ref = component
    ref.visible = focus
    // maybe connect, check name of constructor is _class means it is a component :D
    while (ref && whatdog > 0) {
      // ref[method] && ref[method]()
      if (ref[method]) {
        // requestAnimationFrame(() => ref[method]())
        InteractionManager.runAfterInteractions(()=>{
          // clear previous focus or blur action
          clearTimeout(this.timer)
          // and only do the action after 3 seconds, if there is no interaction after animation
          this.timer = setTimeout(()=>ref[method](), 3000)
        })        
        break
      }
      ref = ref._reactInternalInstance._renderedComponent._instance
      whatdog--
    }
  }

  // we need didFocus, it is like componentDidMount for the second time
  handlePageWillFocus(path) {
    // currently we support only React.Component instead of check the existing method
    // when we extend the Component, it is still instanceof
    const component = this.pageInstances[path]

    // check method
    if (component) {
      const { Page, ...route } = this.page
      const propsChanged = !shallowEqual(route.params, component.props.route.params)
        || !shallowEqual(route.query, component.props.route.query)
      if (component.forceUpdate && propsChanged) {
        // only update prop value
        Object.assign(component.props.route, route)
        component.forceUpdate && component.forceUpdate()
      }

      // after update the content then focus on it, so we have new content
      this.handleFocusableComponent(component)
    }

  }

  _handleChangePlace = (item) => {
    const { setSelectedOption } = this.props
    console.log('Place change APPJS', item)
    this.topDropdown.updateSelectedOption(item)
    this.header.showOverlay(false)
    setSelectedOption(item)
  }
  _handlePressIcon = (openning) => {
    console.log('Handle Press Icon APPJS')
    if (openning) {
      this.topDropdownListValue.close()
      this.header.showOverlay(false)
    } else {
      this.topDropdownListValue.open()
      this.header.showOverlay(true)
    }
  }
  _handlePressOverlay = () => {
    console.log('Handle Press Overlay APPJS')
    this.topDropdown.close()
    this.header.showOverlay(false)
  }
  _handlePressHeaderOverlay = () => {
    console.log('Press header overlay')
    this.topDropdown.close()
    this.topDropdownListValue.close()
    this.header.showOverlay(false)
  }
  render() {
    const { router, drawerState, closeDrawer, place } = this.props
    const { title, path, headerType, footerType, showTopDropdown } = this.page
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
          tweenDuration={200}
          content={<SideBar />}
          onClose={closeDrawer}
        >
          {
            // each Page will overide StatusBar
            // <StatusBar hidden={ this.page.hiddenBar || (drawerState === 'opened' && material.platform === 'ios')} translucent />          
          }
          <Header type={headerType} title={title} onLeftClick={this._onLeftClick} onRightClick={this._onRightClick} onItemRef={ref => this.header = ref}
            app={this} onPressOverlay={this._handlePressHeaderOverlay}
          />

          <Navigator ref={ref => this.navigator = ref}
            configureScene={this.constructor.configureScene}
            initialRoute={{ title, path, showTopDropdown }}
            renderScene={this._renderPage}
          />
          <Footer type={footerType} route={router.route} onTabClick={this._onTabClick} ref={ref => this.footer = ref} />
          <Toasts />
          <Popover ref={ref => this.popover = ref} />
          <TopDropdown
            ref={ref => this.topDropdown = ref}
            onPressIcon={this._handlePressIcon}
          />
          <TopDropdownListValue
            onSelect={this._handleChangePlace}
            onPressOverlay={this._handlePressOverlay}
            ref={ref => this.topDropdownListValue = ref}
          />
        </Drawer>
      </StyleProvider>
    )
  }
}

