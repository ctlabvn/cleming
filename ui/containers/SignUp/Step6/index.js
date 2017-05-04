import React, { Component } from 'react'
import {                 
    Button, Icon, Form, ActionSheet,
    Container, Text, Item, View, Input,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

import SheetButton from '~/ui/elements/SheetButton'

import styles from '../shared/styles'


// import styles from './styles'
@connect(null, {...commonActions })
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }

  render() {
    const {forwardTo, route} = this.props
    return (          
       
        <Container>            

            <Content padder>       
              <Form style={styles.form}>                    

                <Text active bold style={styles.labelHeader}>Verify Email</Text>                
                                
                
                                 
                  <Text bold style={{...styles.label, letterSpacing:0, textAlign:'center'}}>                    
                    Please check your inbox for verification email.{"\n"}
                    If you don’t see it, check your spam folder.{"\n"}
                    {"\n\n"}
                    Still have trouble?{"\n"}                  
                  </Text>
                       
                
                <Button bordered  style={{
                  alignSelf:'center',
                  borderRadius: 4,
                  borderColor: '#448ccb'
                }} onPress={e=>forwardTo('login')}>
                    <Text style={{color: '#448ccb'}}>Send Link again</Text>
                </Button>                   
                

              </Form>
            </Content>
            
        </Container>
      
    )
  }
}