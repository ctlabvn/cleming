import React, { Component } from 'react'
import { Text, Button} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import I18n from '~/ui/I18n'
import { connect } from 'react-redux'
import material from "../../../theme/variables/material";
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
    _close = () => {
        this.setState({ modalVisible: false })
    }
    render() {
        const  {text} = this.state
        return (
            <Modal 
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this._close()}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/*<View style={styles.header}>*/}
                            {/*<Text bold white>{I18n.t('info')}</Text>*/}
                        {/*</View>*/}
                        <View style={styles.textContanter}>
                            <Text medium style={styles.text}>{text}</Text>
                        </View>
                        <View style={styles.confirmContainer}>
                            <Button
                                transparent  style={styles.btnLeft}
                                onPress={()=>{
                                    this._close()
                                    this.props.onCancel && this.props.onCancel();
                                }}>
                                <Text style={{color: material.blue500}}>{I18n.t('cancel')}</Text>
                            </Button>

                            <Button transparent style={styles.btnRight}
                                onPress={()=>{
                                    this._close()
                                    this.props.onOk && this.props.onOk()   
                                }}
                                >
                                <Text style={{color: material.blue500}}>{I18n.t('ok')}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}