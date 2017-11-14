import React, { Component } from 'react'
import { View, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import { Text, Button } from 'native-base'
import material from '~/theme/variables/material'
import styles from './popupStyles'
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"
import I18n from '~/ui/I18n'

const defaultData = {
    invoiceNumber: '',
    noBill: false
}
export default class ConfirmPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            data: defaultData,
        }
    }

    open = (data) => {
        this.setState({ modalVisible: true, data: data })
    }

    close = () => {
        this.setState({ modalVisible: false, data: defaultData })
    }

    _handleOk = () => {
        this.close()
        this.props.onOK && this.props.onOK()
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
                                <Text grayDark bold medium>{I18n.t('confirm_info')}</Text>
                            </View>
                            {!this.state.data.noBill &&
                                <View style={{ ...styles.rowSpaceDialog, ...styles.pd10 }}>
                                    <Text grayDark>{I18n.t('invoice_number_hint')}:</Text>
                                    <Text bold grayDark>{this.state.data.invoiceNumber.toUpperCase()}</Text>
                                </View>
                            }
                            {this.state.data.noBill &&
                                <View style={{ ...styles.rowSpaceDialog, ...styles.pd10 }}>
                                    <Text grayDark>{I18n.t('invoice_time')}:</Text>
                                    <Text bold grayDark>{this.state.data.invoiceNumber}</Text>
                                </View>
                            }
                            <View style={styles.rowEnd}>
                                <TouchableWithoutFeedback onPress={() => this.close()}>
                                    <View style={styles.btnDialog}>
                                        <Text gray bold>{I18n.t('back')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this._handleOk}>
                                    <View style={styles.btnDialog}>
                                        <Text primary bold>{I18n.t('ok')}</Text>
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