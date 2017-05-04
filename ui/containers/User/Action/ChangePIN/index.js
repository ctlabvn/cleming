import React, { Component } from 'react'
import {                 
    Button, Icon, Form, 
    Container, Text, Item, View, Input,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
} from '~/ui/elements/Form'

import { validate } from './utils'
import styles from '../shared/styles'

// import styles from './styles'
@connect(state=>({  
  initialValues: {},
}), {...commonActions })
@reduxForm({ form: 'ChangePinForm', validate})
export default class extends Component {

  render() {
    const {goBack, route} = this.props
    return (          
       
        <Container>                  

            <Content padder>       
              <Form style={styles.form}>        
                <Text note bold style={styles.label}>CHANGE PIN CODE</Text>                
                
                <Field style={styles.inputFirst} placeholder="New PIN code" name="DisplayName" component={InputField} />
                <Field style={styles.inputLast} placeholder="Re-enter new PIN code" name="DisplayName" component={InputField} />

                <View style={styles.buttonContainer}>
                  <Button block style={styles.cancelButton}>
                      <Text>Cancel</Text>
                  </Button>
                  <Button block style={styles.okButton}>
                      <Text>Change</Text>
                  </Button>
                </View>
              </Form>
            </Content>
            
        </Container>
      
    )
  }
}