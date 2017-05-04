import React, { Component } from 'react'
import {                 
    Button, Text, Label, Container,
    ListItem, Item, View, Input, CheckBox, Left,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as delegationSelectors from '~/store/selectors/delegation'

import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'

import { 
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import { validate, renderGroupPermission } from './utils'

import Icon from '~/ui/elements/Icon'

import options from './options'
import styles from './styles'

const formSelector = formValueSelector('DelegationForm')

// base on id will select the initialValue, 
// and we should create a group permission component
// we can use SubmissionError for validate before submit
@connect(state=>({  
  delegation: delegationSelectors.getDelegation(state),
  roles: formSelector(state, ...options.roles.map(c=>c.name)),
  dateIndefinite: formSelector(state, ...options.dateIndefinite.map(c=>c.name))
}), {...commonActions}, (stateProps, dispatchProps, ownProps)=>({
  initialValues: stateProps.delegation[ownProps.route.query.direction].Listitems[ownProps.route.params.id],
  ...ownProps, ...stateProps, ...dispatchProps,
}))
@reduxForm({ form: 'DelegationForm', validate})
export default class extends Component {

  _handleInvite = (data)=>{
    console.log(data)
  }

  render() {
    const {route, goBack, roles, dateIndefinite, handleSubmit} = this.props       
  
    return (          
       
        <Container>        

            <Content padder>       

              <Field label="Type a name" name="name" component={InputField} />

              <View padder style={styles.mt5} row>
                <Text>Set a role</Text>
                <Icon style={styles.iconLabel} name="question" />
              </View>

              <View regit>                  

                {options.roles.map((item, index) =>
                <ListItem style={styles.listItemFull} key={index} active={roles[item.name]}>                                                                                                 
                  <Field label={item.title} large name={item.name} component={CheckBoxField}/>                    
                </ListItem>
                )}
                <FieldArray name="GroupVaultsPermission" component={renderGroupPermission}/>                  
              </View>

              <View regit style={styles.mt15} full row>
                <Text style={styles.dateLabel}>Effective date</Text>
                <Field 
                  inputStyle={styles.dateInput}
                  iconStyle={styles.dateIcon}
                  style={styles.dateContainer} name="effectDate" 
                  displayFormat="DD MMM YYYY" component={DateField} icon="keyboard-arrow-down" />
              </View>


              <View regit style={styles.mt15}>
                {options.dateIndefinite.map((item, index) =>
                  <ListItem style={styles.listItemFull} key={index} active={dateIndefinite[item.name]}>                                                                                                 
                    <Field label={item.title} large name={item.name} component={CheckBoxField}/>                    
                  </ListItem>
                )}
                
                <View full row>
                  <Text style={styles.dateLabel}>End date</Text>
                  <Field 
                  inputStyle={styles.dateInput}
                  iconStyle={styles.dateIcon}
                  style={styles.dateContainer} name="endDate" displayFormat="DD MMM YYYY" component={DateField} icon="keyboard-arrow-down" />
                </View>
              </View>


              <Field label="Type a message" name="message" inputStyle={styles.textarea} style={styles.textareaContainer}
               multiline autoCorrect={false} component={InputField} />    

              <View padder>
                <Field label={
                  <Text style={styles.label}>I understand the risk of delegation and agree to the 
                    <Text style={styles.label} active> Terms & Conditions</Text>
                  </Text>
                } large name="agree" component={CheckBoxField}/>    
              </View>

              <Button onPress={handleSubmit(this._handleInvite)} style={styles.button} block>
                <Text>Invite</Text>
              </Button>  


            </Content>

            
            
        </Container>
      
    )
  }
}