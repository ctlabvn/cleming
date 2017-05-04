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

  renderItem({description, addressLine, country, city, zipCode, startDate, endDate, note, privacy, _default}, index, last=false){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} key={index} last={last}>                                                
        
        <View>
          {_default &&
          <Button transparent bordered textSmall style={{...styles.buttonSmall, marginLeft:0}}>
            <Text active>DEFAULT</Text>
          </Button>
          } 
          <Text>
            {description &&
              <Text small><Text small bold>Description:</Text> {description}{"\n"}</Text>
            }
            {country &&
              <Text small><Text small bold>Country:</Text> {country}{"\n"}</Text>
            }
            {city &&
              <Text small><Text small bold>City:</Text> {city}{"\n"}</Text>
            }
            {zipCode &&
              <Text small><Text small bold>ZIP/Postal Code:</Text> {zipCode}{"\n"}</Text>
            }
            {startDate &&
              <Text small><Text small bold>From date:</Text> {moment(startDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
            }
            {endDate &&
              <Text small><Text small bold>To date:</Text> {moment(endDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
            }
            {note &&
              <Text small><Text small bold>Note:</Text> {note}{"\n"}</Text>
            }           
          </Text>                              
        </View>        
        
        <Toggle style={{...styles.toggleSmall, alignSelf:'flex-start',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy} />
        
      </ListItem> 
    ) 
  }

  renderAddress({label, value}){
    // do not return 0, other wise must be wrapped in Text
    return (!!value.length &&
      <View regit style={{
        marginTop: 10,
        marginBottom: 10,        
      }}>

        <ListItem style={styles.itemHeaderLarge}>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconPush} name="cloud-upload" />
            </Button>
            <Text style={{textAlign:'center'}}>{label}</Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        
        {value.map((item, index)=>
          this.renderItem(item, index, index === value.length - 1)
        )}   
               
      </View>  
    )
  }

  render(){
    const {vaultInfo} = this.props
    const {
      currentAddress, deliveryAddress,
      billingAddress, mailingAddress,
    } = vaultInfo.value
    return (
      <View>
      {this.renderAddress(currentAddress)}
      {this.renderAddress(deliveryAddress)}
      {this.renderAddress(billingAddress)}
      {this.renderAddress(mailingAddress)}
      </View>
      
    )
  }
}