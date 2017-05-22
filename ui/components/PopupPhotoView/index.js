import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    TouchableNativeFeedback
} from 'react-native'
import Icon  from '~/ui/elements/Icon'
import PhotoView from 'react-native-photo-view'
import styles from './styles'
export default class PopupPhotoView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            uri: props.uri
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    setImage(uri) {
        this.setState({ uri: uri, modalVisible: true })
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setModalVisible(false) }}
            >
                <View style={styles.imagePopupContainer}>
                    <View style={styles.controlBlock}>
                        <TouchableNativeFeedback onPress={() => this.setModalVisible(false)}>
                            <Icon name='back' style={styles.backIcon} />
                        </TouchableNativeFeedback>
                    </View>
                    <PhotoView
                        source={{ uri: this.state.uri }}
                        minimumZoomScale={0.5}
                        maximumZoomScale={3}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </Modal>
        )
    }
}