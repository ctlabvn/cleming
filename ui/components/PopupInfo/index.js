import React, { Component } from 'react'
import { Text, Button} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
export default class FeedbackDialogClingme extends Component {
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
    show(text){
        this.setState({modalVisible: true, text: text})
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
                        <Text style={styles.text}>{this.state.text}</Text>
                        <View style={styles.confirmContainer}>
                            <Button transparent onPress={()=>this.setModalVisible(false)} style={styles.confirmBtn}>
                                <Text>OK</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}