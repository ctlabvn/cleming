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

                <Text active bold style={styles.labelHeader}>Static PIN</Text>                
                                
                
                <View style={styles.labelContainer}>                  
                  <Text style={styles.label}>
                    Also create a permanent PIN to authenticate you with critical operations like accessing the information vault.
                  </Text>
                </View>

                <View style={styles.labelContainer}>                  
                  <Text style={styles.label}>
                    Enter 4 to 6 digits. If you forget later, you can reset it in your account settings.
                  </Text>
                </View>       

                <View style={{                  
                  width: 200,
                  alignSelf: 'center',                  
                }}>
                  <Field inputStyle={styles.pinCodeInputSmall} style={styles.inputMargin} placeholder="Enter PIN" name="DisplayName" component={InputField} />
                  <Field inputStyle={styles.pinCodeInputSmall} placeholder="Re-enter PIN" name="DisplayName" component={InputField} />
                  
                  <Button full block style={{...styles.signupButton,marginTop:30}} onPress={e=>forwardTo('signup4')}>
                      <Text>Set PIN</Text>
                  </Button>                   
                </View>

              </Form>
            </Content>
            
        </Container>
      
    )
  }
}