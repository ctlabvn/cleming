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
    const {goBack, route} = this.props
    return (          
       
        <Container>

            <Content padder>       
              <Form style={styles.form}>        
                <Text note bold style={styles.label}>CHANGE PHONE NUMBER FOR OTP</Text>
                <Text note bold style={styles.label}>Your current number: +61********123</Text>
                
                <Field name="DisplayName" addon={
                  <SheetButton items={options.phoneSG} title="SG"
                    onSelected={phoneSG => this.setState({ phoneSG })}
                  >
                   {this.state.phoneSG} 
                  </SheetButton>
                } component={InputField} />                

                <View style={{...styles.buttonContainer, marginTop: 60}}>
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