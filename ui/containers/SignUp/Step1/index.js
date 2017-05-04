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

import options from './options'
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

                <Text active bold style={styles.labelHeader}>Create new Regit account for Individual</Text>                
                
                <Field placeholder="First name" name="DisplayName" component={InputField} />
                <Field placeholder="Last name" name="DisplayName" component={InputField} />

                <Field style={styles.inputMargin} placeholder="Email" name="DisplayName" component={InputField} />
                <Field placeholder="Confirm email" name="DisplayName" component={InputField} />

                <Field style={styles.inputMargin} name="DisplayName" addon={
                  <SheetButton textStyle={styles.input} items={options.phoneSG} title="SG"
                    onSelected={phoneSG => this.setState({ phoneSG })}
                  >
                   {this.state.phoneSG}
                  </SheetButton>
                } component={InputField} />     

                <Field secureTextEntry={true} placeholder="Password" name="DisplayName" component={InputField} />
                <Field secureTextEntry={true} placeholder="Confirm password" name="DisplayName" component={InputField} />
                
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>i.</Text>
                  <Text style={styles.label}>
                    As an additional layer of security to protect your information, 
                    we require your phone number to authenticate you in cases of 
                    password resets or other changes to your account.
                  </Text>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>ii.</Text>
                  <Text style={styles.label}>
                    Note that we will never ask you for your password, or sell your 
                    personal information.
                  </Text>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>iii.</Text>
                  <Text style={styles.label}>
                    By Signing Up, you agree to our
                    <Text style={styles.label} active> Terms & Conditions</Text>
                  </Text>
                </View>
                
                <Button full block style={styles.signupButton} onPress={e=>forwardTo('signup2')}>
                    <Text>Sign up</Text>
                </Button>                  
                
              </Form>
            </Content>
            
        </Container>
      
    )
  }
}