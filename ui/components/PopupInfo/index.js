import React, { Component } from 'react'
import { Text, Button} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import I18n from '~/ui/I18n'
import { hidePopupInfo } from '~/store/actions/common'
import { connect } from 'react-redux'
@connect(state => ({
  popupInfo: state.popupInfo,
}), {hidePopupInfo})
export default class PopupInfo extends Component {
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
        const  {showing, message} = this.props.popupInfo
        const {hidePopupInfo} = this.props
        return (
            <Modal 
                animationType={"none"}
                transparent={true}
                visible={showing}
                onRequestClose={() => {hidePopupInfo()}}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Text bold white>{I18n.t('info')}</Text>
                        </View>
                        <View style={styles.textContanter}>
                            <Text style={styles.text}>{message}</Text>
                        </View>
                        <View style={styles.confirmContainer}>
                            <Button transparent onPress={()=>hidePopupInfo()} style={styles.confirmBtn}>
                                <Text primary>{I18n.t('ok')}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}