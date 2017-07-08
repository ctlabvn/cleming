import React, { Component } from 'react'
import { Text, Button } from 'native-base'
import { View, Modal } from 'react-native'
import styles from './styles'
import I18n from '~/ui/I18n'
export default class ToastModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            text: props.text || ''
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    show(text) {
        this.setState({ modalVisible: true, text: text })
        setTimeout(()=>{
            this.setState({modalVisible: false, text: ''})
        }, 1000)
    }
    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setModalVisible(false) }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>{this.state.text}</Text>
                    </View>
                </View>

            </Modal>
        )
    }
}