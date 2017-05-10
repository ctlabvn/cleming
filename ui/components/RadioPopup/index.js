import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing, Modal } from 'react-native'

import styles from './styles'


export default class RadioPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popupHeader: props.popupHeader,
            listValue: props.listValue,
            // listValue: [{value: , display: }]
            selectedValue: props.selectedValue || props.listValue[0].value,
            modalVisible: false
        }
        this.cachedSelectValue= props.selectedValue || props.listValue[0].value
    }
    getSelectedValue(){
        return this.state.selectedValue
    }
    update(listValue){
        this.setState({listValue: listValue})
        this.setState({selectedValue: listValue[0].value})
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    _handlePressRadio(item) {
        this.setState({ selectedValue: item.value })
    }
    render() {
        const selectedValue = this.state.selectedValue || this.state.listValue[0].value
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
                        {this.state.listValue.map((item) => {
                            return (
                                <ListItem key={item.value} style={{ ...styles.listItem, borderBottomWidth: 0 }} onPress={() => this._handlePressRadio(item)}>
                                    <Text style={{...styles.itemText}}>{item.display}</Text>
                                    <Radio selected={selectedValue == item.value} style={{...styles.itemRadio}} onPress={() => this._handlePressRadio(item)}/>
                                </ListItem>
                            )
                        })}
                        <View style={styles.confirmBlock}>
                            <Button light transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                this.setState({selectedValue: this.cachedSelectValue})
                            }} style={styles.confirmButton}>
                                <Text style={{color: 'grey'}}>Cancel</Text>
                            </Button>
                            <Button primary transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                this.props.onClickYes(this.state.selectedValue)
                                this.cachedSelectValue = this.state.selectedValue
                            }} style={styles.confirmButton}>
                                <Text style={{color: 'blue'}}>OK</Text>
                            </Button>
                        </View>
                    </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

