import React, { PropTypes, Component } from 'react'
import { View, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native'
import { Text, Button } from 'native-base'
import { connect } from 'react-redux'
// for convenient, we can just import one
import { clearToast } from '~/store/actions/common'
import { getToast } from '~/store/selectors/common'

@connect(state => ({
  toast: getToast(state),
}), {clearToast})
export default class extends Component {

  componentWillMount(){
    clearTimeout(this.timer)
  }

  _closeToast=(duration)=>{
    clearTimeout(this.timer) 
    if (duration>0) {
      this.timer = setTimeout(()=> this.props.clearToast(), duration)
    }
  }
  _onPress=(duration)=>{
    const {toast} = this.props
    console.log('On Press Toast')
    toast.callback && toast.callback(toast.data)
    this._closeToast(100)
  }
  renderToastMessage(message, levelProps){
    return (
      <Button 
        full  
        iconRight            
        {...levelProps}
        onPress={() => this._onPress(100)}>
          <Text style={{color:'#fff'}}>{message}</Text>        
      </Button> 
    )
  }

  renderToastView(message){
    return (
      <TouchableOpacity style={{alignSelf:'center',backgroundColor:'transparent'}} onPress={() => this._onPress(100)}>
        <View>{message}</View>
      </TouchableOpacity>
    )
  }

  render(){
    // we can display close all or something
    // for this to show toast only when cross form, for update call Toast.show directly
    if(!this.props.toast)
      return false
    const {position, message, level, duration} = this.props.toast
    this._closeToast(duration)
    const levelProps = {[level]:true}
    if (Platform.OS == 'android'){
      return (
        <Modal
          animationType={(position=='bottom') ? "slide" : "fade"}
          transparent={true}        
          onRequestClose={() => this._closeToast(100)}>
          <TouchableWithoutFeedback onPress={()=>this._closeToast(100)}>
            <View style={{            
                flex: 1,
                justifyContent: (position==='top') ? 'flex-start' : (position==='bottom') ? 'flex-end' : (position==='center') ? 'center' : 'flex-start'
              }} >
                {typeof message === 'string' ? this.renderToastMessage(message, levelProps) : this.renderToastView(message)}      
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      )
    }
    return (
      <TouchableWithoutFeedback onPress={()=>this._closeToast(100)}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',      
            backgroundColor: 'transparent',    
          }}
          >
          <View style={{            
              flex: 1,
              justifyContent: (position==='top'||position==='topCenter') ? 'flex-start' : (position==='bottom') ? 'flex-end' : (position==='center') ? 'center' : 'flex-start',
              // top: position==='topCenter' ? 0 : 30
              // top: 30,
            }} >
              {typeof message === 'string' ? this.renderToastMessage(message, levelProps) : this.renderToastView(message)}      
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}


