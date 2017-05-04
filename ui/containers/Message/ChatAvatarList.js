import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import {ScrollView, Image, Animated, PanResponder} from 'react-native'
import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import Content from '~/ui/components/Content'

import { connect } from 'react-redux'

import * as commonActions from '~/store/actions/common'

import styles from './styles'
import material from '~/theme/variables/material'

const copiedMessage = (
  <IconMessage size={30} message="Copied   " />
)

var IMGS = [
  1,2,3,4,5,6,7,8,9
]

@connect(null, commonActions)
export default class extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      scrollValue: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.childIndex = 0
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: ()=>true,
      onMoveShouldSetPanResponder: ()=>true,            
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  _handlePanResponderEnd=(e, gestureState) => {    
    const dx = gestureState.dx
    const step = Math.round(dx/30)    
    const offsetX = step * 70    + this.state.scrollValue._value    
    Animated.spring(this.state.scrollValue, {
     toValue: offsetX,
     velocity: step,
    }).start()    
  }

  _onCopy = (e)=>{
    this.props.setToast(copiedMessage, 'info', 500, 'center')
  }

  renderSearchResult(){
    const {setToast} = this.props    
    return (
      <View regit style={{
        marginTop: 10,
      }}>
        <ListItem style={styles.itemHeader}>
            <Text bold note style={styles.itemHeaderText}>
              Home phone
            </Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        <ListItem style={styles.itemBody}>                                                
          <Text small>+61 90187400</Text>  
          <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
            <IconMessage size={9} color={material.grayColor} icon="copy" message="Copy" />
          </Button>
        </ListItem>  
        <ListItem style={styles.itemBody} last>                                                
          <Text small>+61 90187400</Text>  
          <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
            <IconMessage size={9} color={material.tabBarActiveTextColor} icon="copy" message="Copy" />
          </Button>
        </ListItem>            
      </View>   
    )
  }

  renderSearchResultAddress(){
    const {setToast} = this.props    
    return (
      <View regit style={{
        marginTop: 10,
      }}>
        <ListItem style={styles.itemHeader}>
            <Text bold note style={styles.itemHeaderText}>
              Current Address
            </Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>    
        <ListItem style={{...styles.itemBody,height:null}} last>    
          <View>                                            
            <Text bold small>My Sweet Home</Text>  
            <Text small>Empire Building</Text>  
            <Text small>Middel Road</Text>  
            <Text small>Singapore</Text>  
          </View>
          <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
            <IconMessage size={9} color={material.grayColor} icon="copy" message="Copy" />
          </Button>
        </ListItem>            
      </View>   
    )
  }

  render() {

    // var translateX = this.state.scrollValue.interpolate({
    //   inputRange: [0, 1], 
    //   outputRange: [0, -70]
    // });
       
    return (                 
        <Container>                    
            <Content padder>

               <View style={{
                flex:1,                
               }}>
              <Animated.View style={[{
                width: IMGS.length * 70,
                justifyContent:'space-around',                
                flexDirection: 'row',
              }, {transform: [{translateX:this.state.scrollValue}]}]}
                  {...this._panResponder.panHandlers}>          
        
                {IMGS.map((c, key)=>
                  <View key={key}
                  style={{
                    width:50,
                    height:50,    
                    backgroundColor:'#222',
                    justifyContent:'center',
                    alignItems:'center',                
                  }}
                   >
                   <Text style={{color:'white'}}>
                   {c}
                   </Text>
                   </View>
                )}
                </Animated.View>
               </View>             

               {this.renderSearchResult()}
               {this.renderSearchResultAddress()}
            </Content>                   
        </Container>      
    )
  }
}