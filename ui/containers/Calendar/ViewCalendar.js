import React, { Component } from 'react'
import {
  View,
  Text,
} from 'native-base'

import Calendar from '~/ui/components/Calendar'
import options from './options'

export default class extends Component {

  shouldComponentUpdate(){
    return false
  }

  render(){
    return (
      <View>
          <View style={{
            marginTop: 10,
            flex:1,            
            borderBottomWidth:0.5,
            borderColor: '#ccc',
          }}>
            <Text style={{
              fontSize: 25,
              color: '#777'
            }}>{options.calendar.year}</Text>
          </View>

          {options.calendar.months.map((monthRow, index)=>
            <View key={index} style={{
              flexDirection:'row',
              justifyContent:'space-around',              
            }}>     
              {monthRow.map(month=>
                <Calendar  
                  width={options.calendarStyles.monthContainer.width}
                  disabled
                  key={month}            
                  customStyle={options.calendarStyles}                                                     
                  showDayHeadings={false}        
                  startDate={`${options.calendar.year}-${month}-01`}       
                  titleFormat={'MMM'}                       
                />
              )}                        
            </View>
          )} 
      </View>
    )
  }
}

 