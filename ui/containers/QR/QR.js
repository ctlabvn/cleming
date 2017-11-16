import React, { Component } from 'react'
import { View, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import { Text, Left, Body, Title, Right } from 'native-base'
// import QRCode from 'react-native-qrcode'
import QRCode from 'react-native-qrcode-svg'
import material from '~/theme/variables/material'
import Icon from "~/ui/elements/Icon"
import I18n from '~/ui/I18n'
import styles from './styles'
import { setToast } from '~/store/actions/common'
import ErrorPopup from './ErrorPopup'
import DuplicatePopup from './DuplicatePopup'

export default class QR extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            qr: '',
            errorVisible: false,
            duplicateVisible: false
        }
    }

    open = (qr) => {
        if (!qr) qr = ''
        this.setState({ modalVisible: true, qr })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return  this.props.loading != nextProps.loading
            || this.state.modalVisible != nextState.modalVisible
            || this.state.qr != nextState.qr
            || this.state.errorVisible != nextState.errorVisible
            || this.state.duplicateVisible != nextState.duplicateVisible
    }

    close = () => {
        this.setState({
            errorVisible: false,
            duplicateVisible: false
        }, ()=>{
            setTimeout(()=>this.setState({modalVisible: false,qr: '',}), 50)
        })   
    }

    openError = () => {
        this.setState({errorVisible: true, duplicateVisible: false})
    }

    openDuplicate = () => {
        this.setState({duplicateVisible: true, errorVisible: false})
    }

    _onGenAnother = () => {
        this.close()
        this.props.onGenAnother && this.props.onGenAnother()
    }

    _onPaid = () => {
        this.close()
        this.props.onPaid && this.props.onPaid()
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => false}
            >
                <ErrorPopup ref={ref => this.errorPopup = ref}
                    onRetry={this.props.onRetry}
                    onCancel={this.props.onCancelError}
                    visible={this.state.errorVisible}
                    />
                <DuplicatePopup ref={ref=>this.duplicatePopup = ref} 
                    onClose={this.props.onCloseDuplicate}   
                    visible={this.state.duplicateVisible} 
                />

                <View style={{...styles.fullScreenPopup}}>
                    <View style={styles.popupHeader}>
                        <Left>
                            <TouchableWithoutFeedback>
                                <Icon style={{ fontSize: 25, color: 'white', padding: 10 }} name='back' onPress={() => this.close()} />
                            </TouchableWithoutFeedback>
                        </Left>
                        <Body>
                            <Text bold white>{I18n.t('create_qr_2')}</Text>
                        </Body>
                        <Right />
                    </View>
                    <View style={{
                        width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center',
                        backgroundColor: 'white', padding: 10
                    }}>
                        <Text bold medium grayDark style={{ marginBottom: 40 }}>{I18n.t('qr_use_hint')}</Text>
                        {!(!!this.state.qr) &&
                            <View style={styles.loadingPlaceHolder}>
                                {this.props.loading && <ActivityIndicator size='large' color={material.primaryColor} />}
                            </View>
                        }
                        {!this.props.loading && !!this.state.qr &&
                            <QRCode
                                value={this.state.qr}
                                size={250}
                                ecl='L'
                                color='black'
                            />
                        }

                    </View>
                    <View style={styles.fixBottomButtonBlock}>
                        <TouchableWithoutFeedback onPress={this._onGenAnother}>
                            <View style={{ ...styles.bottomBtn, ...styles.bgWarning }}>
                                <Text white bold>{I18n.t('gen_another')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this._onPaid}>
                            <View style={{ ...styles.bottomBtn, ...styles.bgPrimary }}>
                                <Text white bold>{I18n.t('close')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }
}