import React, { Component } from 'react'
import { View } from 'react-native'

export default class extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
      width: props.width,
    }
  }

  onLayout(event) {    
    const {width} = event.nativeEvent.layout    
    this.setState({width})
  }

  render(){
    const {color='red', size=2, padding=2} = this.props
    const num = this.state.width / (size + padding * 2)
    
    const borders = []
    for(let i=0;i<num;i++){
      borders.push(<View key={i} style={{
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius:size/2,
        }}/>  
      )
    }

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }} onLayout={(event) => this.onLayout(event)}>
        {borders}
      </View>
    )
  }
} 

