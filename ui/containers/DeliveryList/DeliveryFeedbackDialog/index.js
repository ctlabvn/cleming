import React, { Component } from 'react'
import { Container, Text, Button, Content, Spinner, Input, Item } from 'native-base'
import { View, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import material from '~/theme/variables/material.js'
import CheckBox from '~/ui/elements/CheckBox'
// import Content from '~/ui/components/Content'

import ModalOverlay from '~/ui/components/ModalOverlay'

export default class DeliveryFeedbackDialog extends Component {
    constructor(props) {
        super(props)
        let length = props.listValue.length
        let listValue = props.listValue.slice(0, length - 1)
        let otherValue = props.listValue[length - 1]
        this.state = {
            modalVisible: false,
            listValue: listValue,
            otherValue: otherValue,
            note: ''
        }
        if (listValue.length > 0) {
            this.state.selectedValue = listValue[0].reasonId
        }
        this.caculatingHeight = true
        this.height = 0
    }
    setListValue(listValue) {
        let length = listValue.length
        listValue = props.listValue.slice(0, length - 1)
        let otherValue = props.listValue[length - 1]
        this.setState({
            selectedValue: listValue[0].reasonId,
            listValue: listValue,
            otherValue: otherValue,
        })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    show(posOrderId) {
        this.setState({ posOrderId: posOrderId, modalVisible: true })
    }
    _handlePressRadio(item) {
        this.setState({ note: '' })
        this.setState({ selectedValue: item.reasonId })
    }
    _handlePressOK = () => {
        if (this.state.selectedValue != this.state.otherValue.reasonId) {
            this.setModalVisible(false)
            this.props.onClickYes(this.state.posOrderId, this.state.selectedValue, this.state.note)
            this._resetDialog()
        } else if (this.state.note && this.state.note.trim().length > 0) {
            this.setModalVisible(false)
            this.props.onClickYes(this.state.posOrderId, this.state.selectedValue, this.state.note)
            this._resetDialog()
        }

    }
    _handlePressClear = () => {
        this.setState({ note: '' })
    }
    _resetDialog() {
        let length = this.props.listValue.length
        let listValue = this.props.listValue.slice(0, length - 1)
        let otherValue = this.props.listValue[length - 1]
        this.setState({
            listValue: listValue,
            otherValue: otherValue,
            selectedValue: listValue[0].reasonId,
            note: ''
        })
    }
    _onMeasure = (e) => {
        console.log('Go onMeasure')
        if (!this.caculatingHeight) return
        this.caculatingHeight = false
        const { height } = e.nativeEvent.layout
        console.log('Content Height', height)
        this.height = height// status bar height
        this.forceUpdate()
    }
    render() {

        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}
            >

                <ModalOverlay style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.rowPadding}>
                            <Text>Lí do hủy đơn hàng</Text>
                        </View>
                        <ScrollView style={{ maxHeight: this.height }}>
                            <View onLayout={this._onMeasure}>
                                {this.state.listValue && this.state.listValue.map((item) => (
                                    <TouchableOpacity onPress={() => this._handlePressRadio(item)} key={item.reasonId}>
                                        <View style={styles.row}>
                                            <CheckBox type="radio" checked={this.state.selectedValue == item.reasonId} style={styles.marginRight} />
                                            <Text style={styles.reasonText}>{item.reason}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                <View style={styles.rowPadding}>
                                    <Item style={styles.item}>
                                        <Input placeholder='Lí do khác...'
                                            style={styles.input}
                                            value={this.state.note}
                                            onFocus={() => {
                                                this.setState({ selectedValue: this.state.otherValue.reasonId })
                                            }}
                                            onChangeText={(text) => this.setState({ note: text })}
                                        />
                                        {(this.state.note != '' || this.state.note.length > 0) && <Icon name='close' style={styles.icon} onPress={this._handlePressClear} />}
                                    </Item>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ ...styles.rowPadding, justifyContent: 'flex-end', width: '100%' }}>
                            <Button transparent onPress={() => {
                                this.setModalVisible(false)
                                this._resetDialog()
                            }}><Text style={styles.gray}>Cancel</Text></Button>
                            <Button transparent
                                onPress={this._handlePressOK}
                            ><Text primary>Ok</Text></Button>
                        </View>

                    </View>
                </ModalOverlay>
            </Modal>
        )
    }
}