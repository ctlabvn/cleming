import React, {Component} from 'react'
import {
  Modal,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated
} from 'react-native'
import styles from './styles'
import Moment from 'moment'

import {Icon, View, Text, Button, Item, Input} from 'native-base'

import material from '~/theme/variables/material'

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm',  
}

const SUPPORTED_ORIENTATIONS = [
  'portrait', 
  'portrait-upside-down', 
  'landscape', 
  'landscape-left', 
  'landscape-right',
]

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0)
    }

    this.datePicked = this.datePicked.bind(this)
    this.onPressDate = this.onPressDate.bind(this)
    this.onPressCancel = this.onPressCancel.bind(this)
    this.onPressConfirm = this.onPressConfirm.bind(this)
    this.onDatePicked = this.onDatePicked.bind(this)
    this.onTimePicked = this.onTimePicked.bind(this)
    this.onDatetimePicked = this.onDatetimePicked.bind(this)
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  componentWillMount() {
    // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
    console.ignoredYellowBox = [
      'Warning: Failed propType'
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({date: this.getDate(nextProps.date)})
    }
  }

  setModalVisible(visible) {
    const {height, duration} = this.props

    // slide animation
    if (visible) {
      this.setState({modalVisible: visible})
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: height,
          duration: duration
        }
      ).start()
    } else {
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: 0,
          duration: duration
        }
      ).start(() => {
        this.setState({modalVisible: visible})
      })
    }
  }

  onStartShouldSetResponder(e) {
    return true
  }

  onMoveShouldSetResponder(e) {
    return true
  }

  onPressCancel() {
    this.setModalVisible(false)

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal()
    }
  }

  onPressConfirm() {
    this.datePicked()
    this.setModalVisible(false)

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal()
    }
  }

  getDate(date = this.props.date) {
    const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props

    // date
    if (!date) {
      let now = new Date()
      if (minDate) {
        let _minDate = this.getDate(minDate)

        if (now < _minDate) {
          return _minDate
        }
      }

      if (maxDate) {
        let _maxDate = this.getDate(maxDate)

        if (now > _maxDate) {
          return _maxDate
        }
      }

      return now
    }

    if (date instanceof Date) {
      return date
    }

    return Moment(date, format).toDate()
  }

  getDateStr(date = this.props.date, displayMode=true) {
    const {mode} = this.props
    const displayFormat = this.props[displayMode ? 'displayFormat' : 'format'] || FORMATS[mode]
    if (date instanceof Date) {
      return Moment(date).format(displayFormat)
    } else {
      return date ? Moment(this.getDate(date)).format(displayFormat) : null
    }
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      // console.log(this.getDateStr(this.state.date, false))
      this.props.onDateChange(this.getDateStr(this.state.date, false), this.state.date)
    }
  }

  onDatePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      })
      this.datePicked()
    }
  }

  onTimePicked({action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      })
      this.datePicked()
    }
  }

  onDatetimePicked({action, year, month, day}) {
    const {mode, format = FORMATS[mode], is24Hour = !format.match(/h|a/)} = this.props

    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date)

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: is24Hour
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day))
    }
  }

  onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      })
      this.datePicked()
    }
  }

  onPressDate() {
    if (this.props.disabled) {
      return true
    }

    // reset state
    this.setState({
      date: this.getDate()
    })

    if (Platform.OS === 'ios') {
      this.setModalVisible(true)
    } else {

      const {mode, format = FORMATS[mode], minDate, maxDate, is24Hour = !format.match(/h|a/)} = this.props
      
      if (mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate)
        }).then(this.onDatePicked)
      } else if (mode === 'time') {        
        let timeMoment = Moment(this.state.date)

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: is24Hour
        }).then(this.onTimePicked)
      } else if (mode === 'datetime') {        
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate)
        }).then(this.onDatetimePicked)
      }
    }

    if (typeof this.props.onOpenModal === 'function') {
      this.props.onOpenModal()
    }
  }

  render() {
    const {
      mode,
      style,
      customStyles,
      disabled,
      icon,
      iconSource,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      cancelBtnText,
      placeholder,
      confirmBtnText
    } = this.props

    const dateInputStyle = {
      ...styles.dateInput, 
      ...customStyles.dateInput
    }

    disabled && Object.assign(dateInputStyle, styles.disabled, customStyles.disabled)
      
    return (
      <Item
        style={{...styles.dateTouch, ...customStyles.dateTouch}}        
        onPress={this.onPressDate}
      >
        <Input disabled 
          placeholder={placeholder}
          placeholderTextColor={material.inputColorPlaceholder} 
          style={{...styles.dateInputStyle, ...dateInputStyle}} value={this.getDateStr()} />                
          {icon && <Icon
            style={{...styles.dateIcon, ...customStyles.dateIcon}}
            name={icon}
          />}
          {Platform.OS === 'ios' && <Modal
            transparent={true}
            animationType="none"
            visible={this.state.modalVisible}
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {this.setModalVisible(false)}}
          >
            <View
              style={{flex: 1}}
            >
              <Button
                style={styles.datePickerMask}
                activeOpacity={1}
                underlayColor={'#00000077'}
                onPress={this.onPressCancel}
              >
                <View
                  underlayColor={'#fff'}
                  style={{flex: 1}}
                >
                  <Animated.View
                    style={{...styles.datePickerCon, height: this.state.animatedHeight, ...customStyles.datePickerCon}}
                  >
                    <DatePickerIOS
                      date={this.state.date}
                      mode={mode}
                      minimumDate={minDate && this.getDate(minDate)}
                      maximumDate={maxDate && this.getDate(maxDate)}
                      onDateChange={(date) => this.setState({date: date})}
                      minuteInterval={minuteInterval}
                      timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                      style={{...styles.datePicker, ...customStyles.datePicker}}
                    />
                    <Button
                      transparent
                      onPress={this.onPressCancel}
                      style={{...styles.btnText, ...styles.btnCancel, ...customStyles.btnCancel}}
                    >
                      <Text
                        style={{...styles.btnTextText, ...styles.btnTextCancel, ...customStyles.btnTextCancel}}
                      >
                        {cancelBtnText}
                      </Text>
                    </Button>
                    <Button
                      transparent
                      onPress={this.onPressConfirm}
                      style={{...styles.btnText, ...styles.btnConfirm, ...customStyles.btnConfirm}}
                    >
                      <Text style={{...styles.btnTextText, ...customStyles.btnTextConfirm}}>{confirmBtnText}</Text>
                    </Button>
                  </Animated.View>
                </View>
              </Button>
            </View>
          </Modal>}
        
      </Item>
    )
  }
}

DatePicker.defaultProps = {
  mode: 'date',
  date: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: 'OK',
  cancelBtnText: 'Cancel',  
  customStyles: {},

  // whether or not show the icon
  icon: "date-range",
  disabled: false,
  placeholder: '',
  modalOnResponderTerminationRequest: e => true
}

DatePicker.propTypes = {
  mode: React.PropTypes.oneOf(['date', 'datetime', 'time']),
  date: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
  format: React.PropTypes.string,
  minDate: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
  maxDate: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
  height: React.PropTypes.number,
  duration: React.PropTypes.number,
  confirmBtnText: React.PropTypes.string,
  cancelBtnText: React.PropTypes.string,  
  customStyles: React.PropTypes.object,
  icon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onDateChange: React.PropTypes.func,
  onOpenModal: React.PropTypes.func,
  onCloseModal: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  modalOnResponderTerminationRequest: React.PropTypes.func,
  is24Hour: React.PropTypes.bool
}

export default DatePicker