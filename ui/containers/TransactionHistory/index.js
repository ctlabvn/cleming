import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Container, Text, List, ListItem, Spinner} from 'native-base'

import * as commonAction from "~/store/actions/common";
import * as authActions from "~/store/actions/auth";
import * as revenueActions from "~/store/actions/revenue";
import { getSession } from "~/store/selectors/auth";
import { getRevenueData } from "~/store/selectors/revenue";

import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'

import styles from './styles'
import options from './options'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import Content from "~/ui/components/Content";

import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";

import {REVENUE_PROCESSING, REVENUE_DONE} from '~/store/constants/app'
import {REVENUE_DELIVERY, REVENUE_CLINGME_PAY} from '~/store/constants/app'

import I18n from '~/ui/I18n'

import {
    TIME_FORMAT_WITHOUT_SECOND,
} from "~/store/constants/app";

@connect(null, null)

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Text>
                lịch sử giao dịch
            </Text>
        )
    }

}