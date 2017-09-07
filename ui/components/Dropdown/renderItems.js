import React, { Component } from 'react'
import {
  Picker,
} from 'native-base'

const renderItems = (items) => {
  const pickerItems = []
  for(let key in items){
    pickerItems.push(
      <Picker.Item key={items[key].key} label={items[key].label} value={items[key]} />
    )
  }
  return pickerItems
}

export default renderItems
