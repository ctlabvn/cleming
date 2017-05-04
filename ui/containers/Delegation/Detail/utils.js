import React from 'react'
import { Field, FieldArray } from 'redux-form'
import {
  ListItem, Text, View,
} from 'native-base'

import { 
  // InputField,
  CheckBoxField,
  // DateField,
} from '~/ui/elements/Form'

import styles from './styles'

// if long then seperate
export const validate = (values) => {
  const errors = {}
  if(!values) return errors
  return errors
}

export const renderGroupPermission = ({ fields}) => (
  <View>
    {fields.map((permission, index) =>
      <ListItem key={index} last={index===fields.length-1} style={styles.listItem}>                                                
        <Text small style={styles.left}>{fields.get(index).name}</Text>             
        <View style={styles.right}>
          <Field label="Read" name={`${permission}.read`} component={CheckBoxField}/>
          <Field label="Write" name={`${permission}.write`} component={CheckBoxField}/>
        </View>                      
      </ListItem>
    )}
  </View>
)