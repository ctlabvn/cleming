import React, {Component} from 'react'
import {Picker} from 'react-native'
import {Platform, TouchableWithoutFeedback, View, Modal} from 'react-native'
import {Text, Button} from 'native-base'
import styles from './styles'
export default class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
          value: props.value || ((props.options && props.options.length >0) ? props.options[0].value : ''),
          modalVisible: false
        }
        this.cacheValue = this.state.value
    }

    componentWillReceiveProps = (nextProps)=>{
      if (!this.state.value && nextProps.options && nextProps.options.length >0){
        this.setState({value: nextProps.options[0].value})
      }
    }

    getValue = () => {
      return this.state.value
    }

    setValue = (value) => {
        this.setState({value: value})
        this.props.onChange && this.props.onChange(value)
    }

    onValueChange = (itemValue, itemIndex) => {
        this.setState({value: itemValue})
        this.props.onChange && this.props.onChange(itemValue)
    }

    _openModal = () => {
      this.setState({modalVisible: true})
    }

    _closeModal = () => {
      this.setState({value: this.cacheValue, modalVisible: false})
      this.props.onChange && this.props.onChange(this.cacheValue)
    }

    _onOk = () => {
      this.cacheValue = this.state.value
      this.setState({modalVisible: false})
    }
    _getLabel = (value) => {
      let index = this.props.options.findIndex(item => item.value == value)
      let clone = Object.assign({}, this.props.options[index])
      return clone.label
    }

    render() {
      if (Platform.OS === 'android'){
        return (
          <Picker
            style={{height: 40, ...this.props.styles}}
            selectedValue={this.state.value}
            onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, itemIndex)}>
            {this.props.options.map(item=><Picker.Item label={item.label} value={item.value} key={item.value}/>)}
          </Picker>
        )
      }
      return (<TouchableWithoutFeedback onPress={()=>this._openModal()}>
        <View style={{height: 40, padding: 10, flexDirection: 'row', alignItems: 'center', ...this.props.styles}}>
          <Text>{this._getLabel(this.state.value)}</Text>
          <Modal
              animationType={"none"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                  this._closeModal()
              }}
          >
            <TouchableWithoutFeedback onPress={()=>this._closeModal()}>
              <View style={styles.modalContainer}>
                <View style={{...styles.row, ...styles.buttonBlock, ...styles.pd10}}>
                  <Button transparent onPress={()=>this._closeModal()}>
                    <Text light medium>Cancel</Text>
                  </Button>
                  <Button  transparent onPress={()=>this._onOk()}>
                    <Text primary medium bold>Ok</Text>
                  </Button>
                </View>
                <View style={styles.bottomSheet}>
                  <Picker
                    selectedValue={this.state.value}
                    onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, itemIndex)}>
                    {this.props.options.map(item=><Picker.Item label={item.label} value={item.value} key={item.value}/>)}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>)
    }
}
