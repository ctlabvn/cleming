import React, { Component } from 'react'
import { Container, Text, Button, Content, Spinner, Input, Item } from 'native-base'
import { View, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import material from '~/theme/variables/material'
import CheckBox from '~/ui/elements/CheckBox'

import ModalOverlay from '~/ui/components/ModalOverlay'

export default class FeedbackDialogClingme extends Component {
    constructor(props) {
        super(props)

        let length = props.listValue.length
        let listValue = props.listValue.slice(0, length - 1)
        let otherValue = props.listValue[length - 1]

        this.state = {
            modalVisible: false,
            selectedValue: listValue[0].reasonId,
            listValue: listValue,
            otherValue: otherValue,
            note: '',
            keyboardType: 'phone-pad',
            // showingInput: false
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    _handlePressRadio(item) {
        this.setState({ note: '' })
        this.setState({ selectedValue: item.reasonId })
    }
    _resetDialog() {
        let length = this.props.listValue.length
        let listValue = this.props.listValue.slice(0, length - 1)
        let otherValue = this.props.listValue[length - 1]

        this.setState({
            selectedValue: listValue[0].reasonId,
            note: '',
        })
    }
    _onMeasure = (e) => {
        console.log('Go onMeasure')
        if (!this.caculatingHeight) return
        this.caculatingHeight = false
        const { height } = e.nativeEvent.layout
        console.log('Content Height', height)
        this.height = height
        this.forceUpdate()
    }
    _handlePressClear = () => {
        console.log('Pressing Clear CLM')
        this.setState({ note: '' })
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
                            <Text small>Không đồng ý với giao dịch <Text small bold>{this.props.transactionCode}</Text></Text>
                        </View>
                        <ScrollView style={{ maxHeight: this.height }} keyboardShouldPersistTaps='always'>
                            <View onLayout={this._onMeasure}>
                                {this.state.listValue && this.state.listValue.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => this._handlePressRadio(item)} key={item.reasonId}>
                                            <View style={styles.row}>
                                                <CheckBox type="radio" checked={this.state.selectedValue == item.reasonId} style={styles.marginRight} />
                                                <Text>{item.reason}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                                <View style={styles.rowPadding}>
                                    <Item style={styles.item}>
                                        <Input placeholder='Lí do khác...'
                                            style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: material.gray300, height: 40, fontSize: 14 }}
                                            value={this.state.note}
                                            onFocus={() => {
                                                console.log('On Focus')
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
                                onPress={() => {
                                    this.setModalVisible(false)
                                    this.props.onClickYes(this.props.dealTransactionId, this.state.selectedValue, this.state.note)
                                    this._resetDialog()
                                }}
                            ><Text primary>Ok</Text></Button>
                        </View>
                    </View>
                </ModalOverlay>
            </Modal>
        )
    }
}