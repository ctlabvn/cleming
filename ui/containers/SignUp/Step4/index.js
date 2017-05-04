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
import options from './options'
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

  renderQuestion(item) {
    return (
      <Field placeholder="Answer" name={item.name} key={item.name} addon={
        <SheetButton style={styles.actionSheet} iconStyle={styles.actionSheetIcon} items={item.items} 
          onSelected={value => this.setState({ [item.name]: value })}
        >
         {this.state[item.name]} 
        </SheetButton>
      } component={InputField} inputStyle={styles.inputStyle} style={styles.actionSheetContainer} />  
    )
  }

  render() {
    const {forwardTo, route} = this.props
    return (          
       
        <Container>            

            <Content padder>       
              <Form style={styles.form}>                    

                <Text active bold style={styles.labelHeader}>Security Questions</Text>                
                                
                
                <View style={styles.labelContainer}>                  
                  <Text style={styles.label}>
                    Just one more step for your own safety. Please enter your answers to three questions below. You will be prompted for these answers when we need to verify you in case of password recovery. 
                  </Text>
                </View>

                {options.questions.map(item=>this.renderQuestion(item))}                          

                <Button full block style={styles.signupButton} onPress={e=>forwardTo('signup5')}>
                    <Text>Submit</Text>
                </Button>                   
                

              </Form>
            </Content>
            
        </Container>
      
    )
  }
}