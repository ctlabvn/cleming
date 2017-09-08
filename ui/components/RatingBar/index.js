import React, {Component} from 'react'
import styles from './styles'
import {View, TouchableWithoutFeedback} from 'react-native'
import {Text, Button} from 'native-base'
import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'

export default class RatingBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          value: props.value || 1
        }
    }

    getValue = () => {
      return this.state.value
    }

    _handlePresIcon = (index) => {
      this.setState({value: index+1})
    }

    render() {
        const {icon='cash', activeColor='#8CC63F', maxNumber=5} = this.props
        let listIcon = []
        for (let i=0; i<maxNumber; i++){
          if (i<this.state.value){
            listIcon.push(<Icon name={icon} key={i} style={{color: activeColor, marginRight: 10}} onPress={()=>this._handlePresIcon(i)}/>)
          }else{
            listIcon.push(<Icon name={icon} key={i} style={{color: material.gray300, marginRight: 10}} onPress={()=>this._handlePresIcon(i)}/>)
          }

        }
        return (
          <View style={styles.row}>
            {listIcon}
          </View>
        )
    }
}
