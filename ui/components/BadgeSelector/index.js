import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles'
export default class BadgeSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedValue: props.selectedValue || props.listValues[0]
    }
  }
  _handleSelect = (item) => {
    this.setState({selectedValue:item})
  }
  render() {
    return (
      <View style={styles.row}>
        {this.props.listValues.map(item=>(
          <TouchableWithoutFeedback onPress={()=>this._handleSelect(item)}>
            <Text style={(this.state.selectedValue.id == item.id) ? styles.selectItem : styles.item}>{item.name}</Text>
          </TouchableWithoutFeedback>
        ))}
      </View> 
    )
  }
}
