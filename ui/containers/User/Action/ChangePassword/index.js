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
@reduxForm({ form: 'ChangePasswordForm', validate})
export default class extends Component {

  _handleSave = (data) => {
    console.log(data)
  }

  render() {
    const {goBack, route, handleSubmit} = this.props
    return (          
       
        <Container>        

            <Content padder>       
              <Form style={styles.form}>        
                <Text note bold style={styles.label}>CHANGE LOGIN PASSWORD</Text>
                <Field secureTextEntry={true} placeholder="Old password" name="password" component={InputField} />
                <Field style={styles.inputFirst} secureTextEntry={true} placeholder="New password" name="DisplayName" component={InputField} />
                <Field style={styles.inputLast} secureTextEntry={true} placeholder="Re-enter new password" name="DisplayName" component={InputField} />

                <View style={styles.buttonContainer}>
                  <Button onPress={goBack} block style={styles.cancelButton}>
                      <Text>Cancel</Text>
                  </Button>
                  <Button onPress={handleSubmit(this._handleSave)} block style={styles.okButton}>
                      <Text>Change</Text>
                  </Button>
                </View>
              </Form>
            </Content>
            
        </Container>
      
    )
  }
}