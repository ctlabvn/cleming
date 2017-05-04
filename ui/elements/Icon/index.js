import React, { Component, PropTypes } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Icon as IconNB } from 'native-base'
import Svg from 'react-native-svg'
import svgs from './svgs'

export default class extends Component {

  static propTypes = {               
      name: PropTypes.string.isRequired,                   
      stroke: PropTypes.string,
      strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])   
  }

  renderIcon(){
    const {style={}, name, onPress, ...props} = this.props    
    // fallback to material?
    const svg = svgs[name]
    if (!svg) 
        return <IconNB {...this.props} />

    const {
      fontSize=24,       
      color='#FFF', stroke, strokeWidth, 
      ...iconStyle
    } = style

    const {svg:svgEl, viewBox = '0 0 100 100'} = svg    
    // by default height is fontSize, min-x, min-y, width, height
    const viewBoxCoords = viewBox.split(' ')
    let width = iconStyle.width
    let height = fontSize
    if(width){
      height = width * (viewBoxCoords[3] / viewBoxCoords[2])
    } else {
      width = height * (viewBoxCoords[2] / viewBoxCoords[3])
    }
    
    return (
      <View style={iconStyle} {...props}>        
        <Svg height={height} width={width} viewBox={viewBox}>
            {React.cloneElement(svgEl, {
                fill: color,
                stroke,
                strokeWidth,
            })}
        </Svg>
      </View>
    )
  }

  render(){
    const {onPress} = this.props   
    // if do not have onPress, should make clickable from parent 
    return (onPress
      ? <TouchableWithoutFeedback onPress={onPress} >
          {this.renderIcon()}
        </TouchableWithoutFeedback>
      : this.renderIcon()
    )
  }
} 

