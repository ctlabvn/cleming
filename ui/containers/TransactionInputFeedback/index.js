import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text, Button, Content, Spinner, Radio, Input } from 'native-base'
import { View, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import material from '~/theme/variables/material'
import { FEEDBACK_CLM_TRANSACTION } from '~/store/constants/app'
import * as commonActions from '~/store/actions/common'
@connect(null, commonActions)
export default class FeedbackDialogClingme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }
    _handlePressOk = () => {
        const { goBack } = this.props
        goBack()

    }
    componentWillMount() {
        const { route, app } = this.props
        if (route.params.reasonID == FEEDBACK_CLM_TRANSACTION.MISS) {
            app.header.show('back', 'Giao dịch trả thiếu tiền')
        } else {
            app.header.show('back', 'Giao dịch trả thừa tiền')
        }
    }
    componentWillFocus() {
        const { route, app } = this.props
        if (route.params.reasonID == FEEDBACK_CLM_TRANSACTION.MISS) {
            app.header.show('back', 'Giao dịch trả thiếu tiền')
        } else {
            app.header.show('back', 'Giao dịch trả thừa tiền')
        }
    }
    render() {
        const { route, app } = this.props
        let text = 'Nhập số tiền thừa'

        if (route.params.reasonID == FEEDBACK_CLM_TRANSACTION.MISS) {
            text = 'Nhập số tiền còn thiếu'
        }

        return (
            <Container style={styles.container}>
                <Text>{text}</Text>
                <Input
                    style={styles.input}
                    keyboardType='phone-pad'
                />
                <Button style={styles.okBtn} onPress={() => this._handlePressOk()}>
                    <Text>OK</Text>
                </Button>
            </Container>
        )
    }
}