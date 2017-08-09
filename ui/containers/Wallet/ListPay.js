import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import { getSession } from "~/store/selectors/auth";

import material from "~/theme/variables/material.js";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    TRANSACTION_DIRECT_STATUS,
    TRANSACTION_TYPE_CLINGME,
    TRANSACTION_TYPE_DIRECT
} from "~/store/constants/app";
import PayItem from './PayItem'
import I18n from '~/ui/I18n'
import { _isArrDiffPartial, _isArrDiff } from '~/ui/shared/utils'

@connect(state => ({
    xsession: getSession(state)
}), { ...commonAction, ...walletAction })
export default class extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (!this.props.data && !nextProps.data) return false
        if (!this.props.data || !nextProps.data) return true
        return _isArrDiff(this.props.data, nextProps.data,
            ['tranCode', 'tranTime', 'moneyAmount', 'tranType']
        )
    }

    render() {
        const { forwardTo, data } = this.props
        return (

            <List dataArray={data}
                renderRow={(item) => <PayItem data={item} />}
                pageSize={10}
            ></List>
        )
    }
}