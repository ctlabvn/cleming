import React, { Component } from 'react'
import {             
    Button, Icon, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Content from '~/ui/components/Content'

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import * as commonActions from '~/store/actions/common'

import { 
  SwitchField,
} from '~/ui/elements/Form'
import { validate } from './utils'
import options from './options'
import styles from './styles'

@connect(state=>({  
  initialValues: {
    interaction: true,
  },
}), {...commonActions})
@reduxForm({ form: 'SettingForm', validate})
export default class extends Component {

  renderOption(option, key){
    const {forwardTo} = this.props
    return (
      <View style={styles.container} key={key}>
        {option.title && 
          <ListItem noBorder style={styles.itemHeader}>
              <Text style={styles.itemHeaderText}>{option.title}</Text>
          </ListItem>
        }

        <View regit>
          {option.items.map((item, index) =>
            <ListItem key={index} onPress={e=>forwardTo(item.route)} last={index===option.items.length-1}>                                                
              <Text>{item.title}</Text>             
              {item.type === 'toggle' 
              ? <Field name={item.name} component={SwitchField} />           
              : <Icon gray style={styles.iconRight} name="keyboard-arrow-right" />                
              }
            </ListItem>
          )}          
        </View>
      </View>
    )
  }

  render() {
    const {route, forwardTo} = this.props       
    return (                 
        <Container>                    
            <Content padder>
                {options.listItems.map((item, index)=>this.renderOption(item, index))}
            </Content>                   
        </Container>      
    )
  }
}