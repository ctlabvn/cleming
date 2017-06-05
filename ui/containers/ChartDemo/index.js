import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'
import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import options from './options'
import material from '~/theme/variables/material'

import { StockLine } from '~/ui/components/Chart'

import Svg, {
    Line,
    Polyline,
    Polygon,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    Ellipse,
    Circle,    
    Rect,
    G
} from 'react-native-svg'

export default class extends Component {

  render() {
    const {route} = this.props       
    return (      
      <Container>    

      <StockLine data={options.data}
          options={options.chart} 
           xKey='x' yKey='y' />

        
      </Container>                               
    )
  }
}