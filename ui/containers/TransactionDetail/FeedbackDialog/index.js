import React, {Component} from "react";
import {Button, Item, Text} from "native-base";
import {Modal, TextInput, TouchableOpacity, ScrollView, View} from "react-native";
import Icon from "~/ui/elements/Icon";
import styles from "./styles";
import {formatNumber} from "~/ui/shared/utils";
import CheckBox from "~/ui/elements/CheckBox";
import ModalOverlay from "~/ui/components/ModalOverlay";
// import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'

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
        let listValueProps = nextProps.listValue
        if (!listValueProps || listValueProps.length == 0) return
        if (this.state.listValue && this.state.listValue.length > 0) return
        let length = listValueProps.length
        let listValue = listValueProps.slice(0, length - 1)
        let otherValue = listValueProps[length - 1]
        this.setState({
            selectedValue: listValue[0].reasonId,
            listValue: listValue,
            otherValue: otherValue
        })
    }

    _resetDialog = () => {
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
        this.height = height        
        this.forceUpdate()
    }
    _handlePressClear = () => {
        console.log('Pressing Clear CLM')
        this.setState({ note: '' })
    }

    renderScrollView(content){
        if(material.platform === 'ios'){
            return ( 
                <View ref={ref=>this.wrapperScrollView=ref} style={{
                    maxHeight: this.height
                }}>
                    <ScrollView                         
                        ref={ref => this.scrollView = ref} keyboardShouldPersistTaps='always'>
                        {content}
                    </ScrollView>
                </View>
            )
        }

        return (
            <ScrollView style={{
                    maxHeight: this.height
                }}
                ref={ref => this.scrollView = ref} keyboardShouldPersistTaps='always'>
                {content}
            </ScrollView>
        )
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

                <ModalOverlay onToggle={(toggled, maxHeight) =>{     
                    this.wrapperScrollView && this.wrapperScrollView.setNativeProps({
                       style:{
                            maxHeight: toggled ? maxHeight - 150 : this.height         
                       } 
                    }) 
                    toggled && this.scrollView && setTimeout(() => this.scrollView.scrollToEnd(), 500)
                }} style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.rowPadding}>
                            <Text small>Không đồng ý với giao dịch <Text small bold>{this.props.transactionCode}</Text></Text>
                        </View>
                        
                        {this.renderScrollView(
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
                                    <TextInput placeholder='Lí do khác...'
                                        style={styles.input}
                                        value={this.state.note}
                                        underlineColorAndroid={'transparent'}
                                        onFocus={() => {

                                            this.setState({ selectedValue: this.state.otherValue.reasonId })
                                        }}
                                        onChangeText={(text) => this.setState({ note: text })}
                                        ref='otherReasonInput'
                                    />
                                    {(this.state.note != '' || this.state.note.length > 0) && <Icon name='close' style={styles.icon} onPress={this._handlePressClear} />}
                                    </Item>
                                </View>
                            </View>
                        )}
                        
                        <View style={{ ...styles.rowPadding, justifyContent: 'flex-end', width: '100%' }}>
                            <Button transparent onPress={() =>{
                                this._resetDialog()
                                this.setModalVisible(false)
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