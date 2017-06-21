import React, { Component } from 'react'
import { Container, Text, Button, Content, Spinner, Input } from 'native-base'
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

export default class FeedbackDialog extends Component {
    constructor(props) {
        super(props)

        let length = props.listValue ? props.listValue.length : 0
        let listValue = props.listValue ? props.listValue.slice(0, length - 1) : []
        let otherValue = props.listValue ? props.listValue[length - 1] : {}

        this.state = {
            modalVisible: false,
            selectedValue: (listValue && listValue.length > 0) ? listValue[0].reasonId : 0,
            listValue: listValue,
            otherValue: otherValue,
            note: ''
        }
        this.caculatingHeight = true
        this.height = 0
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    _handlePressRadio(item) {
        this.setState({ note: '', selectedValue: item.reasonId })
        this.refs.otherReasonInput.blur()
    }
    componentWillReceiveProps(nextProps) {
        console.log('Dialog Will Receive Props', nextProps)
        let listValue = nextProps.listValue
        if (!listValue || listValue.length == 0) return
        let length = listValue.length
        listValue = listValue.slice(0, length - 1)
        let otherValue = listValue[length - 1]
        this.setState({
            selectedValue: listValue[0].reasonId,
            listValue: listValue,
            otherValue: otherValue
        })
    }

    _resetDialog() {
        let length = props.listValue ? props.listValue.length : 0
        let listValue = props.listValue.slice(0, length - 1)
        let otherValue = props.listValue[length - 1]

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
        this.height = height
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

                <ModalOverlay onToggle={toggled =>
                    toggled && this.scrollView && this.scrollView.scrollToEnd({ animated: false })
                } style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.rowPadding}>
                            <Text small>Không đồng ý với giao dịch <Text small bold>{this.props.transactionCode}</Text></Text>
                        </View>
                        <ScrollView ref={ref=>this.scrollView=ref} style={{ maxHeight: this.height }} keyboardShouldPersistTaps='always'>
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
                                    <TextInput placeholder='Lí do khác...'
                                        style={styles.input}
                                        value={this.state.note}
                                        onFocus={() => {

                                            this.setState({ selectedValue: this.state.otherValue.reasonId })
                                        }}
                                        onChangeText={(text) => this.setState({ note: text })}
                                        ref='otherReasonInput'
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ ...styles.rowPadding, justifyContent: 'flex-end', width: '100%' }}>
                            <Button transparent onPress={() => this.setModalVisible(false)}><Text style={styles.gray}>Cancel</Text></Button>
                            <Button transparent
                                onPress={() => {
                                    this.setModalVisible(false)
                                    this.props.onClickYes(this.props.dealTransactionId, this.state.selectedValue, this.state.note)
                                }}
                            ><Text primary>Ok</Text></Button>
                        </View>

                    </View>
                </ModalOverlay>
            </Modal>
        )
    }
}