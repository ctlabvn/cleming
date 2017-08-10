import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing, Modal } from 'react-native'
import CheckBox from '~/ui/elements/CheckBox'
import styles from './styles'
import I18n from '~/ui/I18n'

//<CheckboxPopup
//      ref='checkboxPopupItem'
//      cacheMode={true}
//      listValue={this._getListValueCheckboxPopup(this.state.checkboxOption)}
//      onClickYes={this._handleYesPopup.bind(this)} />

export default class CheckBoxPopup extends Component {
    constructor(props) {
        super(props)

        const listValue = props.listValue;
        const checkedAll = this._isCheckAll(listValue)

        this.state = {
            popupHeader: props.popupHeader,
            listValue: props.listValue,
            // listValue: [{value: 1, display: string, checked: true|false}]
            checkedAll: checkedAll,
            selectedValue: props.selectedValue || props.listValue[0].value,
            modalVisible: false
        }
        this.cachedSelectValue = props.selectedValue || props.listValue[0].value
        this.cachedListValue = this._getArrayFrom(listValue);
    }

    _getArrayFrom(arr) {
        let newArr = Array.from(arr);
        arr.map((value, index) => { newArr[index] = {...value}})
        return newArr;
    }

    _isCheckAll(listValue) {
        if (listValue) return listValue.filter((item) => !item.checked).length == 0;
    }

    getSelectedValue(){
        return this.state.selectedValue
    }
    update(listValue){
        if (!listValue) return;
        this.cachedListValue = this._getArrayFrom(listValue);
        this.setState({listValue: this._getArrayFrom(listValue)})
    }

    setModalVisible(visible) {
        if (typeof this.cachedListValue == 'undefined') this.cachedListValue = this._getArrayFrom(this.state.listValue);
        const cacheMode = this.props.cacheMode;

        const listValue = cacheMode ? this._getArrayFrom(this.cachedListValue) : this._getArrayFrom(this.state.listValue);
        const checkedAll = this._isCheckAll(listValue);

        this.setState({
            listValue: listValue,
            checkedAll: checkedAll,
            modalVisible: visible,
        })
    }

    _handlePressCheck(index, item) {
        // WARNING: use just index could make problem!!!
        let newListValue = this.state.listValue;
        newListValue[index].checked = !newListValue[index].checked;
        const checkAll =  this._isCheckAll(newListValue);
        this.setState({
            listValue: newListValue,
            checkedAll: checkAll,
        });
    }

    _handlePressCheckAll() {
        const checkedAll = !this.state.checkedAll;
        let newListValue = this.state.listValue;
        newListValue.map((value, index) => {
            newListValue[index].checked = checkedAll;
        })

        this.setState({
            listValue: newListValue,
            checkedAll: checkedAll
        })
    }

    render() {
        console.log('Checkbox Popup render')
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                    this.setState({selectedValue: this.cachedSelectValue})
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                    <View>
                        {this.state.popupHeader && <Text>{this.state.popupHeader}</Text>}
                        <ListItem key={this.state.listValue.length + 1} style={{ ...styles.listItem, borderBottomWidth: 0 }} onPress={() => this._handlePressCheckAll()}>
                            <Text warning style={{...styles.itemText}}>Tất cả</Text>
                            <CheckBox type="checkbox" checked={this.state.checkedAll} style={{...styles.itemRadio}}
                                      onPress={() => this._handlePressCheckAll()}/>
                        </ListItem>
                        {this.state.listValue.map((item, index) => {
                            return (
                                <ListItem key={index} style={{ ...styles.listItem, borderBottomWidth: 0 }} onPress={() => this._handlePressCheck(index)}>
                                    <Text style={{...styles.itemText}}>{item.display}</Text>
                                    <CheckBox type="checkbox" checked={this.state.listValue[index].checked} style={{...styles.itemRadio}}
                                              onPress={() => this._handlePressCheck(index)}/>
                                </ListItem>
                            )
                        })}

                        <View style={styles.confirmBlock}>
                            <Button light transparent onPress={() => {
                                this.setState({
                                    modalVisible: !this.state.modalVisible,
                                })
                            }} style={styles.confirmButton}>
                                <Text style={{color: 'grey'}}>{I18n.t('cancel')}</Text>
                            </Button>
                            <Button primary transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                this.props.onClickYes(this.state.listValue)
                                this.cachedListValue = this._getArrayFrom(this.state.listValue)
                            }} style={styles.confirmButton}>
                                <Text primary>{I18n.t('ok')}</Text>
                            </Button>
                        </View>
                    </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

