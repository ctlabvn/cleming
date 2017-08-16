import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text, Item, Input } from "native-base";
import { InteractionManager, View, TouchableOpacity, Image, Keyboard, ScrollView } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";

import Icon from "~/ui/elements/Icon";
import moment from "moment";
import { formatNumber, getToastMessage } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";
import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import Border from "~/ui/elements/Border"
import ListViewExtend from '~/ui/components/ListViewExtend'
@connect(state => ({
    xsession: getSession(state),
}), { ...commonAction })
export default class extends Component {
    constructor(props) {
        super(props)
        this.dataNotCheck = [
            {
                text: 'Đối soát tháng 8',
                timeRange: '(01/08/17 - 25/08/17)',
                number: 1900000
            },
            {
                text: 'Đối soát tháng 9',
                timeRange: '(01/09/17 - 25/09/17)',
                number: 2850000
            },
        ]

        this.dataChecked = [
            {
                text: 'Đối soát tháng 7',
                timeRange: '(01/08/17 - 25/08/17)',
                number: 1900000
            },
            {
                text: 'Đối soát tháng 6',
                timeRange: '(01/09/17 - 25/09/17)',
                number: 2850000
            },
            {
                text: 'Đối soát tháng 5',
                timeRange: '(01/09/17 - 25/09/17)',
                number: 150000
            },
        ]
    }
    componentDidMount = () => {
    
    }
    _renderRowNotCheck = (item) => {
        return (
            <View>
                <View style={styles.rowPadding}>
                    <Text medium>{item.text}</Text>
                    <View style={styles.row}>
                        <Text warning bold medium>{formatNumber(item.number)}đ</Text>
                        <Icon name='foward' style={styles.forwardIconWarning}/>
                    </View>
                </View>
                <View style={styles.rowPadding}>
                    <Text>{item.timeRange}</Text>
                </View>
                <View style={styles.rowPadding}>
                    <Text warning>Clingme nợ</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
            </View>
        )
    }

    _renderRowChecked = (item) => {
        return (
            <View>
                <View style={styles.rowPadding}>
                    <Text medium>{item.text}</Text>
                    <View style={styles.row}>
                        <Text success bold>{formatNumber(item.number)}đ</Text>
                        <Icon name='foward' style={styles.forwardIconSuccess}/>
                    </View>
                </View>
                <View style={styles.rowPadding}>
                    <Text>{item.timeRange}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
            </View>
        )
    }
    
    render() {
        const {forwardTo} = this.props
        return (
            <ScrollView style={styles.container}>
                <View style={{...styles.rowPadding }}>
                    <Text bold medium>{I18n.t('checking_history')}</Text>
                </View>

                <View style={{...styles.rowPadding, ...styles.borderTop}}>
                    <Text bold medium italic warning>{I18n.t('not_checking_yet')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <ListViewExtend
                    dataArray={this.dataNotCheck}
                    renderRow={(item) => this._renderRowNotCheck(item)}
                />


                <View style={{...styles.rowPadding, ...styles.borderTop}}>
                    <Text bold medium italic success>{I18n.t('checked')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <ListViewExtend
                    dataArray={this.dataChecked}
                    renderRow={(item) => this._renderRowChecked(item)}
                />
            </ScrollView>
        )
    }
}