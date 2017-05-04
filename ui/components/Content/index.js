import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import {         
    Content, 
    View,    
} from 'native-base'

// assume we not try to rotate it
export default class extends Component {   

  constructor(props) {
    super(props)  
    this.offsetY = 0
  }

  static defaultProps = {
    onEndReachedThreshold: 10,
  }

  render() {
    const {children, refreshing, onRefresh, onScroll, padder, onEndReached, onEndReachedThreshold, ...props} = this.props    
    // show refresh control
    if(onRefresh){
      props.refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
    }
    
    return (                             
      <Content
        onScroll={(e)=>{    
          const offsetY = e.nativeEvent.contentOffset.y     
          const contentHeight= e.nativeEvent.contentSize.height
          const height = e.nativeEvent.layoutMeasurement.height
          if(offsetY > this.offsetY && offsetY + height + onEndReachedThreshold > contentHeight){
            // prevent repeating          
            this.offsetY = offsetY
            onEndReached && onEndReached(offsetY, contentHeight)                      
          }                            
          return onScroll && onScroll(e)
        }}        
       {...props} >
        <View padder={padder}>
          {children}
        </View>
      </Content>    
    )
  }
}



