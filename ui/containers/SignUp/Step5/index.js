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

                <Text active bold style={styles.labelHeader}>Almost Done</Text>                
                                
                
                            
                  <Text bold style={{...styles.label, letterSpacing:0, textAlign:'center'}}>
                    Only one more step. {"\n"}
                    A confirmation email has been sent to your address. {"\n"}
                    Please check and click the link in email to activate your account.{"\n"}                    
                  </Text>
                      
                
                <Button full block style={{...styles.signupButton,marginTop:30}} onPress={e=>forwardTo('signup6')}>
                    <Text>Continue to Sign in</Text>
                </Button>                   
                

              </Form>
            </Content>
            
        </Container>
      
    )
  }
}