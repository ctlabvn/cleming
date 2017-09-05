import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
@connect(null, {forwardTo})

export default class DealManager extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){

    }

    render() {
        const {forwardTo} = this.props
        return (
            <View>
              
            </View>
        )
    }
}
