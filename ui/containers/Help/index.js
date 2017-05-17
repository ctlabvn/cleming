import React, { Component } from 'react'
import {                 
    Button,         
    Icon,     
    Container,
    Text,    
    Item,
    View,
    Input,
} from 'native-base'

import Content from '~/ui/components/Content'

import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'


export default class extends Component {

  
  render() {
    const { activeCampaign } = this.props
    // 10 items
    return (          
       
        <Container>
                    
            <Content >             
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                  width: '100%',
                  height: 400,
                }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />             
            </Content>            
            
        </Container>
      
    )
  }
}