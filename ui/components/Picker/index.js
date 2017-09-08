import React, {Component} from 'react'
import {Picker} from 'react-native'

export default class Dropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
          value: props.value || ((props.options && props.options.length >0) ? props.options[0].value : '')
        }
    }

    componentWillReceiveProps = (nextProps)=>{
      if (!this.state.value && nextProps.options && nextProps.options.length >0){
        this.setState({value: nextProps.options[0].value})
      }
    }

    getValue = () => {
      return this.state.value
    }

    onValueChange = (itemValue, itemIndex) => {
      this.setState({value: itemValue})
      this.props.onChange && this.props.onChange(itemValue)
    }

    render() {
        return (
          <Picker
            selectedValue={this.state.value}
            onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, itemIndex)}>
            {this.props.options.map(item=><Picker.Item label={item.label} value={item.value} key={item.value}/>)}
          </Picker>
        )
    }
}
