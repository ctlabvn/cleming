import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, Content, Input, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as commonAction from '~/store/actions/common'
import * as transactionAction from '~/store/actions/transaction'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
import moment from 'moment'
import { formatNumber } from '~/ui/shared/utils'
export default class TransactionFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listValue: props.listValue,
            selectValue: props.listValue[0],
            indicatorNumber: 0
        }
    }
    _handleYesFilterTransactionType(item){
        let selectValue = this.state.listValue.filter(value=>value.value==item)[0]
        this.setState({selectValue: selectValue})
        this.props.onFilterChange(selectValue)
    }
    _handlePressTransactionFilter() {
        this.refs.transactionTypePopup.setModalVisible(true)
        // this.props.onFilterChange()
    }
    updateFilter(listValue){
        this.setState({listValue: listValue, selectValue: listValue[0]})
        this.refs.transactionTypePopup.update(listValue)
    }
    updateIndicatorNumber(number){
        this.setState({indicatorNumber: number})
    }
    getCurrentValue(){
        return this.state.selectValue
    }
    render() {
        return (
            <View style={styles.container}>
                <RadioPopup ref='transactionTypePopup' listValue={this.state.listValue} onClickYes={this._handleYesFilterTransactionType.bind(this)} />
                <View style={styles.filterByTransactionType}>
                    <TouchableOpacity onPress={() => this._handlePressTransactionFilter()}>
                        <View style={styles.leftContainer}>
                            <Icon name='filter' style={styles.transactionTypeIcon} />
                            <Text small>{this.state.selectValue.display}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text small style={styles.numberRight}>{this.state.indicatorNumber}</Text>
                </View>


            </View>
        )
    }
}