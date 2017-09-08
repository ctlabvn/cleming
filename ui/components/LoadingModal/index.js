import React, { Component } from 'react'
import { Text, Button, Spinner} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
import material from '~/theme/variables/material.js'
export default class LoadingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: props.loading || false,
        }
    }
    setModalVisible(visible){
        this.setState({modalVisible: visible})
    }

    show = () => {
        this.setState({modalVisible: true})
    }

    hide = () => {
        this.setState({modalVisible: false})
    }
    componentWillReceiveProps(props){
        if (!props.loading){
            this.setModalVisible(false)
        }else{
            this.setModalVisible(true)
        }
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(false)
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Spinner color={material.primaryColor} style={styles.spinner}/>
                        <Text primary>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}
