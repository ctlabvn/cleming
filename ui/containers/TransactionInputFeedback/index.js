import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Container, Input, Item, Text} from "native-base";
import {InteractionManager, Keyboard} from "react-native";
import styles from "./styles";
import {FEEDBACK_CLM_TRANSACTION} from "~/store/constants/app";
import * as commonActions from "~/store/actions/common";
import * as transactionActions from "~/store/actions/transaction";
import Icon from "~/ui/elements/Icon";
import {getSession} from "~/store/selectors/auth";
import I18n from '~/ui/I18n'
import { formatNumber, getToastMessage, chainParse } from "~/ui/shared/utils"
import LoadingModal from "~/ui/components/LoadingModal"
@connect(state => ({ xsession: getSession(state) }), { ...commonActions, ...transactionActions })
export default class FeedbackDialogClingme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }
    _handlePressOk = () => {
        const { goBack, setToast, route, xsession, sendDenyReasonClm } = this.props
        if (!this.state.value) {
            setToast(getToastMessage('Bạn phải nhập số tiền'), 'info', null, null, 2000, 'top')
            return
        } else if (isNaN(this.state.value)) {
            setToast(getToastMessage('Số tiền phải ở dạng số'), 'info', null, null, 2000, 'top')
            return
        }
        const clingmeId = route.params.dealID
        const reasonID = route.params.reasonID
        Keyboard.dismiss()
        this.loadingModal.show()
        sendDenyReasonClm(xsession, clingmeId, reasonID, '', this.state.value,
            (err, data) => {
                this.loadingModal.hide()
                if (chainParse(data, ['updated', 'data', 'success'])){
                    setToast(getToastMessage(I18n.t('received_feedback')), 'info', null, null, 2000, 'top')
                    goBack()
                }
            }
        )
    }
    _handlePressClear = () => {
        console.log('Go to clear')
        this.setState({ value: '' })
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
        InteractionManager.runAfterInteractions(() => {
            if (route.params.reasonID == FEEDBACK_CLM_TRANSACTION.MISS) {
                app.header.show('back', 'Giao dịch trả thiếu tiền')
            } else {
                app.header.show('back', 'Giao dịch trả thừa tiền')
            }
            this.setState({value: 0})
        })
    }
    render() {
        const { route, app } = this.props
        let text = 'Nhập số tiền thừa'

        if (route.params.reasonID == FEEDBACK_CLM_TRANSACTION.MISS) {
            text = 'Nhập số tiền còn thiếu'
        }

        return (
            <Container style={styles.container}>
                <LoadingModal text={I18n.t('processing')} ref={ref=>this.loadingModal=ref}/>
                <Text>{text}</Text>
                <Item style={styles.item}>
                    <Input
                        style={styles.input}
                        keyboardType='phone-pad'
                        onChangeText={(value) => this.setState({ value })}
                        value={this.state.value.toString()}
                    />
                    {(this.state.value != 0 || this.state.value.length > 0) && <Icon name='close' style={styles.icon} onPress={this._handlePressClear} />}
                </Item>

                <Button style={styles.okBtn} onPress={() => this._handlePressOk()}>
                    <Text>OK</Text>
                </Button>
            </Container>
        )
    }
}