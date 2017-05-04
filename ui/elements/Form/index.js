import React, { Component } from 'react'

import { 
  Item, Input, Text, Label,    
  View, CheckBox,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Switch from '~/ui/elements/Switch'

import DatePicker from '~/ui/components/DatePicker'
import Dropdown from '~/ui/components/Dropdown'
import Toggle from '~/ui/components/Toggle'
import material from '~/theme/variables/material'
import styles from './styles'

export const InputField = ({ input, label, meta: { touched, error, warning }, icon, addon, onPress, style, inputStyle, ...custom }) => (  
  <Item style={{...styles.item, ...style}} error={touched && !!error} onPress={onPress} >  
    {addon}
    <Input   
      placeholder={label}    
      {...input}                   
      {...custom}      
      placeholderTextColor={material.inputColorPlaceholder} 
      style={{...styles.input, ...inputStyle}}     
    />    
    {icon && <Icon
      style={styles.inputIcon}
      name={icon}
    />}
  </Item>
)

export const CheckBoxField = ({ input, label, meta: { touched, error, warning }, style, checkboxStyle, labelStyle, ...custom }) => (  
  <View style={{...styles.checkboxContainer, ...style}} >      
    <CheckBox
      checked={!!input.value}
      {...custom}      
      style={{...styles.checkbox, ...checkboxStyle}}     
      onPress={e=>input.onChange(!input.value)}
    />    
    {label && <Text textSmall={custom.large===undefined} style={{
      ...styles.label, 
      fontSize:material.fontSizeBase * (custom.large ? 0.9 : 0.7), 
      lineHeight: Math.round(material.lineHeight * (custom.large ? 0.7 : 0.6)),
      marginLeft: custom.large ? 20 : 15,
      ...labelStyle
    }}>{label}</Text>}
  </View>
)

export const SwitchField = ({ input, meta: { touched, error, warning }, ...custom }) => (
  <Switch         
    value={!!input.value}
    width={45}
    circleColor={material.activeTab}    
    backgroundActive={material.tabBarActiveTextColor}
    backgroundInactive="#898989"
    onSyncPress={input.onChange}
    {...custom}    
  />
)

export const DateField = ({ input, label, meta: { touched, error, warning }, style, inputStyle, iconStyle, format="MM/DD/YYYY", ...custom }) => (
  <DatePicker    
    date={input.value}
    mode="date"
    placeholder={label}    
    onDateChange={(date) => input.onChange(date)}
    customStyles={{
      dateTouch: {...styles.item, ...style},
      dateInput: {...styles.input, ...inputStyle},
      dateIcon: iconStyle,
    }}
    format={format}
    {...custom}    
  />
)

export const LockField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
  <Toggle    
    checked={input.value}    
    title={label} 
    onToggle={(value) => input.onChange(value)}
    {...custom}    
  />
)

export const DropdownField = ({ input, label, meta: { touched, error, warning }, onSelected, ...custom }) => (
  <Dropdown error={touched && !!error}    
    selected={input.value}    
    header={label} 
    onChange={(value) => {
      onSelected && onSelected(value)
      input.onChange(value)
    }}
    style={styles.item}
    inputStyle={styles.input}
    inputIconStyle={styles.inputIcon}
    {...custom}    
  />
)