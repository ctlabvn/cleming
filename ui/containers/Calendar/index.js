import React, { Component } from 'react'
import {                 
    Button,              
    Container,
    Text,    
    Item,    
    Fab,
    View,
    Input,    
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as commonSelectors from '~/store/selectors/common'
import material from '~/theme/variables/material'
import AddButton from '~/ui/elements/AddButton'
import ViewCalendar from './ViewCalendar'
import options from './options'


const getPopoverOptions = (popoverWidth, fromRect, arrowPadding=-5) => ({
  fromRect,
  // from center
  translateOrigin: {x:popoverWidth/2-20},
  placement: 'top',
  contentStyle:{
    width:popoverWidth,
    padding:0,    
    backgroundColor: 'transparent',       
  },
  popoverStyle:{
    right: 0,    
    shadowColor: 'transparent',
  },
  backgroundStyle:{
    backgroundColor:'rgba(255,255,255,0.8)'
  },
  arrowStyle:{
    borderTopColor:'transparent'    
  },
})

const fabStyle = {
  padding:0, 
  width: '100%',
  paddingRight:18,
  justifyContent: 'flex-end',
  alignItems: 'center', // vertical - opposite content  
}

@connect(null, commonActions)
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      active: false,
    }

    this.popMenu = (
      <View>
        <Button transparent style={fabStyle}>            
            <Text style={{color:'#222',fontSize:14,fontWeight:'400'}}>Poll</Text> 
            <View style={{                
                backgroundColor: '#00a99d',
                alignItems:'center',    
                justifyContent: 'center',  
                marginLeft: 10,
                width: 30,
                height: 30,
                borderRadius: 15,
              }}>
              <Icon style={{
                fontSize: 17,
              }} name="poll" />
            </View>
        </Button>

        <Button transparent style={fabStyle}>            
            <Text style={{color:'#222',fontSize:14}}>Event</Text> 
            <View style={{                
                backgroundColor: '#f26522',
                alignItems:'center',    
                justifyContent: 'center',  
                marginLeft: 10,
                width: 30,
                height: 30,
                borderRadius: 15,
              }}>
              <Icon style={{
                fontSize: 14,
              }} name="event" />
            </View>
        </Button>

        <Button transparent style={fabStyle}>                  
            <Text style={{color:'#222',fontSize:14}}>Reminder</Text> 
            <View style={{                
                backgroundColor: '#5674b9',
                alignItems:'center',    
                justifyContent: 'center',  
                marginLeft: 10,
                width: 30,
                height: 30,
                borderRadius: 15,
              }}>
              <Icon style={{
                fontSize: 17,
              }} name="reminder" />
            </View>
        </Button>        

        <Button noPadder style={{ 
            backgroundColor: '#00aeef',
            height:45,
            width:45,                               
            borderRadius: 22.5,
            alignSelf:'flex-end',
            marginRight: 10,
            marginTop: 10,
            justifyContent: 'center',
          }}
              onPress={() => this.props.app.popover.show(false)}
          >
            
              <Icon style={{color:'#fff'}} name="close" />                            
              
              
          </Button>
        
      </View>
    )
  }

  showPopover(){
    const popoverOptions = getPopoverOptions(150, {
      x:material.deviceWidth - 150, 
      y:material.deviceHeight-(material.platform === 'android' ? 105 : 80), 
      width:material.deviceWidth,       
    })
    this.props.app.popover.show(this.popMenu, popoverOptions)    
  }

  render() {

    return (          
       
        <Container>   
          <Content padder style={{backgroundColor:'#fff'}}>  

           <ViewCalendar/>                   

          </Content>

          <AddButton onPress={() => this.showPopover()} />
        </Container>
      
    )
  }
}