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

  renderItem({label, value, privacy, default:defaultValue}, last=false){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} last={last}>                                                
        <View>
          <Text note small>{label}</Text>
          {value.map(item=>
          <View row key={item.id}>
            <Text small>{item.value}</Text>
            {item.value === defaultValue &&
            <Button transparent bordered textSmall style={styles.buttonSmall}>
              <Text active>DEFAULT</Text>
            </Button>
            }                     
          </View>
          )}
        </View>
        
        <Toggle style={{...styles.toggleSmall, alignSelf:'flex-start',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy} />
        
      </ListItem> 
    ) 
  }

  render(){
    const {vaultInfo} = this.props
    const {
      mobile, home, office, fax,
      email, officeEmail,
    } = vaultInfo.value
    return (
      <View regit style={{
        marginTop: 10,
        marginBottom: 10,        
      }}>

        <ListItem style={styles.itemHeaderLarge}>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconPush} name="cloud-upload" />
            </Button>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        
        {this.renderItem({...mobile, label: 'Mobile phone'})}
        {this.renderItem(home)}
        {this.renderItem({...office, label: 'Office phone'})}
        {this.renderItem(fax)}
        {this.renderItem({...email, label: 'Personal email'})}         
        {this.renderItem(officeEmail, true)}              
               
      </View>   
    )
  }
}