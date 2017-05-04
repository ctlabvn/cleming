import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  Easing
} from 'react-native'

import material from '~/theme/variables/material'
import {Point, Size, Rect} from './utils'

const styles = StyleSheet.create(require('./styles').default)
const noop = () => {}
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')
const DEFAULT_ARROW_SIZE = new Size(10, 5)

export default class extends Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    isVisible: false,
    displayArea: new Rect(0, material.toolbarHeight, SCREEN_WIDTH, SCREEN_HEIGHT - material.toolbarHeight - material.footerHeight),
    arrowSize: DEFAULT_ARROW_SIZE,
    placement: 'auto',
    onClose: noop,    
    padding: 10,
  }

  constructor(props) {
    super(props)
  
    this.state = {
      contentSize: {},
      anchorPoint: {},
      popoverOrigin: {},
      translateOrigin: {},
      fromRect: {},      
      isTransitioning: false,
      defaultAnimatedValues: {
        scale: new Animated.Value(0),
        translate: new Animated.ValueXY(),
        fade: new Animated.Value(0),
      },
      // full state, event we can pass onClose as option to know when popover is close
      // because we use it only one
      ...props,
      // arrowSize: props.arrowSize,
      // placement: props.placement,
      // children: props.children,
      // displayArea: props.displayArea,
      // isVisible: props.isVisible,

      // overide style when displaying
      contentStyle:{},
      backgroundStyle:{},
      arrowStyle:{},
    }    
  }

  getPlacement(){
    // real placement, by default is state.placement
    return this.currentPlacement || this.state.placement
  }

  
  _measureContent = (x) => {
    const {width, height} = x.nativeEvent.layout    
    const contentSize = {width, height}
    const geom = this.computeGeometry({contentSize})

    const isAwaitingShow = this.state.isAwaitingShow
    this.setState({
      ...geom,
      contentSize, 
      isAwaitingShow: undefined,
    }, () => {
      // Once state is set, call the showHandler so it can access all the geometry
      // from the state
      isAwaitingShow && this._startAnimation(true)
    })
  }

  computeGeometry({contentSize, placement}) {
    placement = placement || this.state.placement

    const options = {
      displayArea: this.state.displayArea,
      fromRect: this.state.fromRect,
      arrowSize: this.getArrowSize(placement),
      contentSize,
    }

    switch (placement) {
      case 'top':
        return this.computeTopGeometry(options)
      case 'bottom':
        return this.computeBottomGeometry(options)
      case 'left':
        return this.computeLeftGeometry(options)
      case 'right':
        return this.computeRightGeometry(options)
      default:
        return this.computeAutoGeometry(options)
    }
  }

  computeTopGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    const popoverOrigin = new Point(
      Math.min(displayArea.x + displayArea.width - contentSize.width,
        Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
      fromRect.y - contentSize.height - arrowSize.height)
    const anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y)

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'top',
    }
  }

  computeBottomGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    const popoverOrigin = new Point(
      Math.min(displayArea.x + displayArea.width - contentSize.width,
        Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
      fromRect.y + fromRect.height + arrowSize.height)
    const anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height)

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'bottom',
    }
  }

  computeLeftGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    const popoverOrigin = new Point(fromRect.x - contentSize.width - arrowSize.width,
      Math.min(displayArea.y + displayArea.height - contentSize.height,
        Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)))
    const anchorPoint = new Point(fromRect.x, fromRect.y + fromRect.height / 2.0)

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'left',
    }
  }

  computeRightGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    const popoverOrigin = new Point(fromRect.x + fromRect.width + arrowSize.width,
      Math.min(displayArea.y + displayArea.height - contentSize.height,
        Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)))
    const anchorPoint = new Point(fromRect.x + fromRect.width, fromRect.y + fromRect.height / 2.0)

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'right',
    }
  }

  computeAutoGeometry({displayArea, contentSize}) {
    const placementsToTry = ['left', 'right', 'bottom', 'top']

    for (let placement of placementsToTry) {      
      const geom = this.computeGeometry({contentSize, placement})
      const {popoverOrigin} = geom

      if (popoverOrigin.x >= displayArea.x
          && popoverOrigin.x <= displayArea.x + displayArea.width - contentSize.width
          && popoverOrigin.y >= displayArea.y
          && popoverOrigin.y <= displayArea.y + displayArea.height - contentSize.height) {   

          this.currentPlacement = placement     
        return geom
      }
    }    
  }

  getArrowSize(placement) {
    const size = this.state.arrowSize
    switch(placement) {
      case 'left':
      case 'right':
        return new Size(size.height, size.width)
      default:
        return size
    }
  }

  getArrowColorStyle(color) {
    return { borderTopColor: color }
  }

  getArrowRotation(placement) {
    switch (placement) {
      case 'bottom':
        return '180deg'
      case 'left':
        return '-90deg'
      case 'right':
        return '90deg'
      default:
        return '0deg'
    }
  }

  getArrowDynamicStyle() {
    const {anchorPoint, popoverOrigin, padding} = this.state
    const arrowSize = this.state.arrowSize

    // Create the arrow from a rectangle with the appropriate borderXWidth set
    // A rotation is then applied dependending on the placement
    // Also make it slightly bigger
    // to fix a visual artifact when the popover is animated with a scale
    const width = arrowSize.width + 2
    const height = arrowSize.height * 2 + 2

    // paddingBottom:20,  bottom
    // paddingTop:10, + 10, top
    // console.warn(this.getPlacement())

    return {
      left: anchorPoint.x - popoverOrigin.x - width / 2,
      top: anchorPoint.y - popoverOrigin.y - height / 2
            + (this.getPlacement() === 'bottom' && material.platform === 'android' ? padding : 0),
      width,
      height,
      borderTopWidth: height / 2,
      borderRightWidth: width / 2,
      borderBottomWidth: height / 2,
      borderLeftWidth: width / 2,      
    }
  }

  getTranslateOrigin() {
    const {contentSize, popoverOrigin, anchorPoint} = this.state
    const popoverCenter = new Point(popoverOrigin.x + contentSize.width / 2,
      popoverOrigin.y + contentSize.height / 2)
    return new Point(anchorPoint.x - popoverCenter.x, anchorPoint.y - popoverCenter.y)
  }

  _startAnimation(show) {
    const handler = this.props.startCustomAnimation || this._startDefaultAnimation
    handler.call(this, show, () => this.setState({isTransitioning: false}))
    this.setState({isTransitioning: true})
  }

  _startDefaultAnimation(show, doneCallback) {
    const animDuration = show ? 300 : 200
    const values = this.state.defaultAnimatedValues
    const translateOrigin = {...this.getTranslateOrigin(), ...this.state.translateOrigin}
    // console.log(translateOrigin)
    if (show) {
      values.translate.setValue(translateOrigin)
    }

    const commonConfig = {
      duration: animDuration,
      easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
    }

    Animated.parallel([
      Animated.timing(values.fade, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      }),
      Animated.timing(values.translate, {
        toValue: show ? new Point(0, 0) : translateOrigin,
        ...commonConfig,
      }),
      Animated.timing(values.scale, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      })
    ]).start(doneCallback)
  }

  _getDefaultAnimatedStyles() {
    // If there's a custom animation handler,
    // we don't return the default animated styles
    if (typeof this.props.startCustomAnimation !== 'undefined') {
      return null
    }

    const animatedValues = this.state.defaultAnimatedValues

    return {
      backgroundStyle: {
        opacity: animatedValues.fade,
      },
      arrowStyle: {
        transform: [
          {
            scale: animatedValues.scale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }
        ],
      },
      contentStyle: {
        transform: [
          {translateX: animatedValues.translate.x},
          {translateY: animatedValues.translate.y},
          {scale: animatedValues.scale},
        ],
      }
    }
  }

  _getExtendedStyles() {
    const background = []
    const popover = []
    const arrow = []
    const content = []
    const items = [this._getDefaultAnimatedStyles(), this.state]    
    items.forEach((source) => {
      if (source) {
        background.push(source.backgroundStyle)
        popover.push(source.popoverStyle)
        arrow.push(source.arrowStyle)
        content.push(source.contentStyle)
      }
    })
  
    return {
      background,
      popover,
      arrow,
      content,
    }
  }

  show(children, options){

    const {onClose, padding} = this.state

    if (children) {
      // We want to start the show animation only when contentSize is known
      // so that we can have some logic depending on the geometry
      const {fromRect, ...leftOptions} = options      

      this.setState({
        ...leftOptions,
        fromRect: {
          x: fromRect.x,
          y: fromRect.y + padding,
          width: fromRect.width,
          height: fromRect.height - 2*padding
        },
        isVisible: true,
        children,
        contentSize: {}, 
        isAwaitingShow: true
      })
    } else {

      this.setState({
        isVisible: false,
      }, ()=> {
        this._startAnimation(false)
        onClose && onClose()
      })
      
    }  
  }


  render() {
    
    const {isTransitioning, popoverOrigin, placement, isVisible, children, padding} = this.state
    if (!isVisible && !isTransitioning) {
        return null
    }    
    
    const extendedStyles = this._getExtendedStyles()

    const contentStyle = [styles.content, ...extendedStyles.content]
    const arrowColor = StyleSheet.flatten(contentStyle).backgroundColor
    const arrowColorStyle = this.getArrowColorStyle(arrowColor)
    const arrowDynamicStyle = this.getArrowDynamicStyle()
    const contentSizeAvailable = this.state.contentSize.width

    // Special case, force the arrow rotation even if it was overriden
    const arrowStyle = [styles.arrow, arrowDynamicStyle, arrowColorStyle, ...extendedStyles.arrow]
    const arrowTransform = (StyleSheet.flatten(arrowStyle).transform || []).slice(0)
    arrowTransform.unshift({rotate: this.getArrowRotation(placement)})   
    const paddingOptions = {}
    if(material.platform === 'android'){
      const currentPlacement = this.getPlacement()
      if(currentPlacement === 'top'){
        paddingOptions.paddingBottom = 2 * padding
      } else if(currentPlacement === 'bottom'){
        paddingOptions.paddingTop = padding
        paddingOptions.marginTop = -padding
      }
    }     
    return (
      <TouchableWithoutFeedback onPress={e=>this.show(false)}>
        <View style={[styles.container, contentSizeAvailable && styles.containerVisible ]}>  
          <Animated.View style={[styles.background, ...extendedStyles.background]}/>        
          <Animated.View style={[styles.popover, {
            top: popoverOrigin.y,
            left: popoverOrigin.x,            
          }, paddingOptions, ...extendedStyles.popover]}>
            <Animated.View style={[...arrowStyle, {transform: arrowTransform}]}/>
            <Animated.View onLayout={this._measureContent} style={contentStyle}>
              {children}
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}



