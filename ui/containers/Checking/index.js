import React, { Component } from 'react'
import { Text } from 'native-base'
import I18n from '~/ui/I18n'
import styles from './styles'
import {connect} from 'react-redux'

export default class extends Component {
    render() {
        return (
            <Text>
                {I18n.t('checking')}
            </Text>
        )
    }
}