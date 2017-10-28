import React, { Component, PropTypes } from 'react'
import {
  View,
  TextInput
} from 'react-native'
export default class MultipleLineTextInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
      cursorPosition: 0
    }
  }

  render(){
    return (<TextInput
      numberOfLines={5}
      multiline
      blurOnSubmit={false}
      underlineColorAndroid={'transparent'}
      onChangeText={(text) => {
        this.setState({ text });
        this.props.onChange && this.props.onChange(text)
      }}
      style={{textAlignVertical: 'top'}}
      value={this.state.text}
      onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
      onSubmitEditing={(event) => {
        const { text, cursorPosition } = this.state;
        let newText = text;
        const ar = newText.split('');
        ar.splice(cursorPosition, 1, "\n");
        newText = ar.join('');
        this.setState({ text: newText });
        this.props.onChange && this.props.onChange(newText)
      }}
      {...this.props}
    />)
  }
}