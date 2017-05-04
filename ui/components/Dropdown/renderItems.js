import React, { Component } from 'react'
import {   
  Picker,
} from 'native-base'

const renderItems = (items) => {  
  const pickerItems = []
  for(let key in items){
    pickerItems.push(
      <Picker.Item key={key} label={items[key]} value={key} />
    )
  }
  return pickerItems
}

export default renderItems