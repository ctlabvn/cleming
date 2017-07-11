import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'

import TabsWithNoti from '~/ui/components/TabsWithNoti'
import DateFilter from '~/ui/components/DateFilter'

import styles from './styles'
import options from './options'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            currentTab: 1,
        })
    }

    _handlePressTab(data) {
        this.setState({
            currentTab: data.tabID,
        })
    }

    _handlePressFilter(data) {

    }

    render() {
        return (
            <Container style={styles.container}>
                <TabsWithNoti tabData={options.tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)} ref='tabs' />
                <DateFilter onPressFilter={this._handlePressFilter.bind(this)} ref='dateFilter' />
                <Text medium primary>
                    current tab: {this.state.currentTab}
                </Text>
            </Container>
        )
    }
}