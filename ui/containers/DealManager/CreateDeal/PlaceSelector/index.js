import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Modal, Image} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import CheckBox from '~/ui/elements/CheckBox'
import styles from './styles'
import ListViewExtend from '~/ui/components/ListViewExtend'

export default class PlaceSelector extends Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: []
      }
      // sync with state, use for O(1) searching
      this.selectedMap = {}
    }

    reset = () => {
      this.setState({selected: []})
      this.selectedMap = {}
    }

    setSelectedPlace = (placeId) => {
      this.selectedMap[placeId] = 1
      this.setState({selected: [...this.state.selected, placeId]})
    }

    getSelectedPlaceObj = () => {
      const {listPlace} = this.props
      let selected = listPlace.filter(item=>this.state.selected.indexOf(item.placeId)>-1)
      return {
        isAll: !!(this.state.selected.length == listPlace.length),
        selected: selected
      }
    }

    _markAll = () => {
      const {listPlace} = this.props
      if (this.state.selected.length != listPlace.length){
        let clone = [...this.state.selected]
        let flag = 0
        for (let i=0; i<listPlace.length; i++){
          let item = listPlace[i]
          if (!this.selectedMap[item.placeId]){
            flag++
            this.selectedMap[item.placeId] = 1
            clone.push(item.placeId)
          }
        }
        if (flag >0) this.setState({selected: clone})
      }else{
        this.reset()
      }

    }

    getSelected = () => {
      return this.state.selected
    }

    getConcatPlace = () => {
      if (this.state.selected.length == 0) return ''
      return this.state.selected.join(';')
    }

    _onPressItem = (item) => {
        this.selectedMap[item.placeId] = (!this.selectedMap[item.placeId]) ? 1:0
        let clone = [...this.state.selected]
        let index = clone.findIndex(idx=>idx==item.placeId)
        if (index == -1){
          clone.push(item.placeId)
        }else{
          clone.splice(index, 1)
        }
        this.setState({selected: clone})
    }

    renderRow = (item) => {
      return (
        <TouchableWithoutFeedback onPress={()=>this._onPressItem(item)}>
          <View style={{...styles.row, ...styles.mb10}}>
            <Text style={styles.labelFix}>{item.address}</Text>
            <CheckBox
                type="radio"
                parent={this}
                checked={(this.selectedMap[item.placeId] == 1)}
            />
          </View>
        </TouchableWithoutFeedback>
      )
    }
    render() {
      const {forwardTo, listPlace} = this.props
      if (!listPlace) return
      let markText = I18n.t('mark_all')
      if (this.state.selected.length == listPlace.length) markText=I18n.t('clear_all')
      return (
        <View style={styles.container}>
          <View style={{...styles.row, ...styles.mb10}}>
            <Text bold medium style={styles.label}>{I18n.t('apply_place')}</Text>
            <TouchableWithoutFeedback onPress={this._markAll}>
              <Text bold medium primary>{markText}</Text>
            </TouchableWithoutFeedback>
          </View>

          <ListViewExtend
                removeClippedSubviews={false}
                ref={ref=>this.listView = ref}
                keyExtractor={item=>item.placeId}
                dataArray={this.props.listPlace}
                renderRow={(item)=> this.renderRow(item)}
                rowHasChanged={true}
            />
        </View>
      )
    }
}
