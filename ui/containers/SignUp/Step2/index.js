import React, { Component } from 'react'
import {                 
    Button, Icon, Form, ActionSheet,
    Container, Text, Item, View, Input,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
} from '~/ui/elements/Form'

import SheetButton from '~/ui/elements/SheetButton'

import { validate } from './utils'
import styles from '../shared/styles'


// import styles from './styles'
@connect(state=>({  
  initialValues: {},
}), {...commonActions })
@reduxForm({ form: 'ChangePhoneForm', validate})
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

                <Text active bold style={styles.labelHeader}>SMS Authentication</Text>                
                                
                
                <View style={styles.labelContainer}>                  
                  <Text style={styles.label}>
                    A temporary PIN has been sent to your phone. It may take a few moments to arrive.
                  </Text>
                </View>

                <View style={styles.labelContainer}>                  
                  <Text style={styles.label}>
                    Enter the PIN below to authenticate your account.
                  </Text>
                </View>       

                <Field style={styles.pinCodeContainer} inputStyle={styles.pinCodeInput} maxLength={4} keyboardType="phone-pad" placeholder="_ _ _ _" name="DisplayName" component={InputField} />         
                
                <Button onPress={e=>forwardTo('signup3')} transparent block style={{
                  flexDirection: 'column'
                }}>
                    <Text note>Don't recieve?</Text>
                    <Text note active>Re-send PIN</Text>
                </Button>                  
                
              </Form>
            </Content>
            
        </Container>
      
    )
  }
}