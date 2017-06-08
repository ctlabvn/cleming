import React, { Component } from 'react'
import { Container, Text, Button, Content, Spinner, Radio, Input } from 'native-base'
import { View, Modal, TouchableOpacity, Animated, Easing, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import material from '~/theme/variables/material.js'
export default class FeedbackDialog extends Component {
    constructor(props) {
        super(props)
        let listValue = props.listValue.filter((item) => (item.reason.toLowerCase().localeCompare('khác') != 0))
        let otherValue = props.listValue.filter((item) => (item.reason.toLowerCase().localeCompare('khác') == 0))[0]
        this.state = {
            modalVisible: false,
            selectedValue: listValue[0].reasonId,
            listValue: listValue,
            otherValue: otherValue,
            note: ''
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    _handlePressRadio(item) {
        this.setState({ note: '' })
        this.setState({ selectedValue: item.reasonId })
    }
    _resetDialog(){
        let listValue = props.listValue.filter((item) => (item.reason.toLowerCase().localeCompare('khác') != 0))
        let otherValue = props.listValue.filter((item) => (item.reason.toLowerCase().localeCompare('khác') == 0))[0]

        this.setState({
            listValue: listValue,
            otherValue: otherValue,
            selectedValue: listValue[0].reasonId,
            note: ''
        })
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
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.rowPadding}>
                            <Text small>Không đồng ý với giao dịch <Text small bold>{this.props.transactionCode}</Text></Text>
                        </View>
                        {this.state.listValue && this.state.listValue.map((item) => (
                            <TouchableOpacity onPress={() => this._handlePressRadio(item)} key={item.reasonId}>
                                <View style={styles.rowPadding}>
                                    <Radio selected={this.state.selectedValue == item.reasonId} style={styles.marginRight} />
                                    <Text>{item.reason}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.rowPadding}>
                            <Input placeholder='Lí do khác...'
                                style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: material.gray300, height: 40, fontSize: 14 }}
                                value={this.state.note}
                                onFocus={() => {
                                    this.setState({ selectedValue: this.state.otherValue.reasonId })
                                }}
                                onChangeText={(text) => this.setState({ note: text })}
                            />
                        </View>
                        <View style={{ ...styles.rowPadding, justifyContent: 'flex-end', width: '100%' }}>
                            <Button transparent onPress={() => this.setModalVisible(false)}><Text light>Cancel</Text></Button>
                            <Button transparent
                                onPress={() => {
                                    this.setModalVisible(false)
                                    this.props.onClickYes(this.props.dealTransactionId, this.state.selectedValue, this.state.note)
                                }}
                            ><Text primary>Ok</Text></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}