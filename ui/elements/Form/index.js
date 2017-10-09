import React, { Component } from 'react'

import {
  Item, Input, Text, Label,
  View,
} from 'native-base'
import {TextInput} from 'react-native'
import Icon from '~/ui/elements/Icon'
import Switch from '~/ui/elements/Switch'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"
import DatePicker from '~/ui/components/DatePicker'
import Dropdown from '~/ui/components/Dropdown'
import Toggle from '~/ui/components/Toggle'
import material from '~/theme/variables/material'
import CheckBox from '~/ui/elements/CheckBox'
import MultipleLineTextInput from '~/ui/components/MultipleLineTextInput'
import MoneyMaskInput from '~/ui/components/MoneyMaskInput'
import styles from './styles'

export const InputField = ({ input, label, meta: { active, touched, error, warning }, icon, onIconPress, addon, onPress, style, inputStyle, iconStyle, ...custom }) => {
  const iconName = (typeof icon === 'function' ? icon(input, active) : icon)
  return (
    <Item style={{...styles.item, ...style}} error={touched && !!error} onPress={onPress} >
      {addon}
      <Input
        placeholder={label}
        {...input}
        placeholderTextColor={material.inputColorPlaceholder}
        {...custom}
        style={{...styles.input, ...inputStyle}}
      />
      {iconName && <Icon
        onPress={e=>onIconPress && onIconPress(input, active)}
        style={{...styles.inputIcon, ...iconStyle}}
        name={iconName}
      />}
    </Item>
  )
}

export const InputFieldWithErr = ({ input, label, meta: { active, touched, error, warning }, icon, onIconPress, addon, onPress, style, inputStyle, iconStyle, ...custom }) => {
  const iconName = (typeof icon === 'function' ? icon(input, active) : icon)
  {/*<View style={{...style}}>
       <Item style={{...styles.item2}} error={touched && !!error} onPress={onPress} > */}
  return (
    <View>
      <Item style={{...styles.item, ...style}} error={touched && !!error} onPress={onPress} >
        {addon}
        <Input
          placeholder={label}
          {...input}
          placeholderTextColor={material.inputColorPlaceholder}
          {...custom}
          style={{...styles.inputWithErr, ...inputStyle}}
        />
        {iconName && <Icon
          onPress={e=>onIconPress && onIconPress(input, active)}
          style={{...styles.inputIcon, ...iconStyle}}
          name={iconName}
        />}
      </Item>
      <View>
        {touched && error && <Text small error>{error}</Text>}
      </View>
    </View>
  )
}

export const InputFieldWithErr2 = ({ input, label, meta: { active, touched, error, warning }, icon, onIconPress, addon, onPress, style, inputStyle, iconStyle, ...custom }) => {
  const iconName = (typeof icon === 'function' ? icon(input, active) : icon)
  return (
    <View style={{...style}}>
       <Item style={{...styles.item2}} error={touched && !!error} onPress={onPress} >
        {addon}
        <Input
          placeholder={label}
          {...input}
          placeholderTextColor={material.inputColorPlaceholder}
          {...custom}
          style={{...styles.inputWithErr, ...inputStyle}}
        />
        {iconName && <Icon
          onPress={e=>onIconPress && onIconPress(input, active)}
          style={{...styles.inputIcon, ...iconStyle}}
          name={iconName}
        />}
      </Item>
      <View>
        {touched && error && <Text small error>{error}</Text>}
      </View>
    </View>
  )
}

export const MoneyInputField = ({ input, label, meta: { active, touched, error, warning }, icon, onIconPress, addon, onPress, style, inputStyle, iconStyle, ...custom }) => {
  return (
    <View style={{...style}}>
      <Item style={{...styles.item2}} error={touched && !!error} onPress={onPress} >
        <MoneyMaskInput
          style={{...styles.inputWithErr, paddingLeft: 5, flex: 1}}
          {...input}
        />
      </Item>
      <View>
        {touched && error && <Text small error>{error}</Text>}
      </View>
    </View>
  )
}

export const MultiLineInputFieldWithErr = ({ input, label, meta: { active, touched, error, warning }, style, inputStyle, placeholder}) => {
  // console.log('Input', input)
  return (
    <View style={style}>
      {/*<TextInput
        placeholder={placeholder}
        {...input}
        placeholderTextColor={material.inputColorPlaceholder}
        style={{...styles.textInput, ...inputStyle, textAlignVertical: 'top'}}
        numberOfLines={5}
        multiline={true}
        underlineColorAndroid={'transparent'}
        blurOnSubmit={false}
      />*/}
      <MultipleLineTextInput 
        placeholder={placeholder}
        style={{...styles.textInput, ...inputStyle, textAlignVertical: 'top'}}
        {...input}
      />
      <View>
        {touched && error && <Text small error>{error}</Text>}
      </View>
    </View>
  )
}

export const CheckBoxField = ({ input, label, meta: { touched, error, warning }, style, checkboxStyle, labelStyle, ...custom }) => (
  <View style={{...styles.checkboxContainer, ...style}} >
    <CheckBox
      color="transparent"
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

export const DateField = ({ input, label, meta: { active, touched, error, warning }, outerStyle, style,inputStyle, iconStyle, format="MM/DD/YYYY", ...custom }) => (
<View style={{...outerStyle}}>
  <View style={{...style}}>
    <DatePicker
      date={input.value}
      mode="date"
      placeholder={label}
      onDateChange={(date) => input.onChange(date)}
      customStyles={{
        dateTouch: {borderBottomWidth: 0, borderBottomColor: 'transparent'},
        dateInput: {...styles.input, ...inputStyle},
        dateIcon: iconStyle,
      }}
      format={format}
      {...custom}
    />
  </View>
    <View>
      {touched && error && <Text small error>{error}</Text>}
    </View>
  </View>
)

export const LockField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
  <Toggle
    checked={input.value}
    title={label}
    onToggle={(value) => input.onChange(value)}
    {...custom}
  />
)

export const DropdownField = ({ input, label, meta: { active, touched, error, warning }, onSelected, style, ...custom }) => {
  return (
    <View>
      <Dropdown error={touched && !!error}
      selected={input.value}
      header={label}
      onChange={(value) => {
        onSelected && onSelected(value)
        input.onChange(value)
      }}
      style={{...styles.item2, ...style}}
      inputStyle={styles.input}
      inputIconStyle={styles.inputIcon}
      {...custom}
    />
    <View>
      {touched && error && <Text small error>{error}</Text>}
    </View>
  </View>)
}
