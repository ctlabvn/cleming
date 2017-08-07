import React, { Component } from 'react'
import { RefreshControl, ScrollView, KeyboardAvoidingView } from 'react-native'
import {         
    Content, 
    View,    
} from 'native-base'

// assume we not try to rotate it
export default class extends Component {   

  static defaultProps = {
    onEndReachedThreshold: 10,
    keyboardShouldPersistTaps: 'always',
  }

  scrollToTop=()=>{
    this.content.scrollTo({x:0,y:0})
    // console.log('content' ,this.content._root, this.content.wrappedInstance._root)
      // this.refs.content._root.scrollToPosition(0, 0, false)
      // this.content && this.content.wrappedInstance && this.content.wrappedInstance._root && this.content.wrappedInstance._root.scrollToPosition(0, 0, false)
  }

  render() {
    const {children, refreshing, onRefresh, onScroll, padder, onEndReached, onEndReachedThreshold, ...props} = this.props    
    // show refresh control
    if(onRefresh){
      props.refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
    }
    
    return (                             
      <ScrollView
          ref={ref=>this.content = ref}
        onScroll={(e)=>{    
          const offsetY = e.nativeEvent.contentOffset.y     
          const contentHeight= e.nativeEvent.contentSize.height
          const height = e.nativeEvent.layoutMeasurement.height
          if(offsetY + height + onEndReachedThreshold > contentHeight){            
            onEndReached && onEndReached(offsetY, contentHeight)                      
          }                            
          return onScroll && onScroll(e)
        }}        
       {...props} >
        <View padder={padder}>
        <KeyboardAvoidingView>
          {children}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>    
    )
  }
}



