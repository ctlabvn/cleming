import React, { Component } from 'react'
import { View, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import { Text, Button } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"
import I18n from '~/ui/I18n'

export default class DuplicatePopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false || this.props.visible,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible != this.props.visible || nextProps.visible != this.state.modalVisible){
            this.setState({modalVisible: nextProps.visible})
        }
    }

    open = () => {
        this.setState({ modalVisible: true })
    }

    close = () => {
        this.setState({ modalVisible: false })
    }

    _handleClose = () => {
        this.close()
        this.props.onClose && this.props.onClose()
    }
    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this.close()}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.close()}
                >
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    }}>
                        <View style={styles.dialogContainer}>
                            <View style={{ ...styles.rowStart, ...styles.mb20 }}>
                                <Text grayDark bold medium>{I18n.t('page_notification')}</Text>
                            </View>
                            <View style={{ ...styles.rowSpaceDialog, ...styles.pd10 }}>
                                <Text grayDark>{I18n.t('err_qr_duplicate')}</Text>
                            </View>

                            <View style={styles.rowEnd}>
                                <TouchableWithoutFeedback onPress={this._handleClose}>
                                    <View style={styles.btnDialog}>
                                        <Text primary bold>{I18n.t('close')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}