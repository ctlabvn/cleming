import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Toggle from '~/ui/components/Toggle'

import moment from 'moment'

import styles from '../shared/styles'


export default class extends Component {

  renderItem({label, value, privacy}, formatFn){
    const displayValue = formatFn ? formatFn(value) : value
    return (
      <ListItem style={{...styles.itemBody, height: 30, borderBottomWidth:0}}>                                                      
        <Text note small>{label}</Text>
        {!!displayValue && 
          <Toggle style={styles.toggleSmall} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={displayValue} falseText={displayValue} checked={!privacy} />
        }
      </ListItem> 
    ) 
  }

  render(){
    const {vaultInfo} = this.props
    const {
      title, firstName, middleName, lastName, alias, 
      dob, gender, country, city,
    } = vaultInfo.value
    return (
      <View regit style={{
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 40,
      }}>

        <ListItem style={styles.itemHeaderLarge}>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconPush} name="cloud-upload" />
            </Button>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        
        {this.renderItem(title)}
        {this.renderItem(firstName)}
        {this.renderItem(middleName)}
        {this.renderItem(lastName)}
        {this.renderItem(alias)} 
        {this.renderItem(dob, value=>moment(value).format('DD MMMM YYYY'))}
        {this.renderItem(gender)}
        {this.renderItem({...country, value:'Singapore'})}
        {this.renderItem({...city, value:'Singapore'})}         
               
      </View>   
    )
  }
}