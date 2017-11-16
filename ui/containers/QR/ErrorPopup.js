import React, { Component } from 'react'
import { View, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import { Text, Button } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"
import I18n from '~/ui/I18n'

export default class ErrorPopup extends Component {
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

    _handleRetry = () => {
        this.close()
        this.props.onRetry && this.props.onRetry()
    }

    _handleCancel = () => {
        this.close()
        this.props.onCancel && this.props.onCancel()
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
                                <Text grayDark>{I18n.t('err_qr')}</Text>
                            </View>

                            <View style={styles.rowEnd}>
                                <TouchableWithoutFeedback onPress={this._handleCancel}>
                                    <View style={styles.btnDialog}>
                                        <Text gray bold>{I18n.t('cancel')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this._handleRetry}>
                                    <View style={styles.btnDialog}>
                                        <Text primary bold>{I18n.t('retry')}</Text>
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