import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, ScrollableTab } from 'native-base'
import { View, ListView, TouchableOpacity, Animated, Easing, Tabs, Tab } from 'react-native'
import styles from './styles'
import Content from '~/ui/components/Content'
import RadioPopup from '~/ui/components/RadioPopup'
import moment from 'moment'
export default class TabsWithNoti extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: props.activeTab || props.tabData[0].tabID,
            tabData: props.tabData
        }
    }
    _handlePressTab(item) {
        if (this.state.activeTab != item.tabID) {
            this.setState({ activeTab: item.tabID })
            this.props.onPressTab(item)
        }
    }
    getActiveTab() {
        return this.state.activeTab
    }
    updateNumber(tabID, number) {
        let tabData = this.state.tabData.slice()
        let index = tabData.findIndex(item => item.tabID == tabID)
        tabData[index].number = number
        this.setState({ tabData: tabData })
    }
    render() {
        return (
            <View style={styles.tabBar}>
                {this.state.tabData.map((tabItem) => {
                    let isActive = (tabItem.tabID == this.state.activeTab)
                    return (
                        <View style={isActive ? styles.tabActive : styles.tabDeactive} key={tabItem.tabID}>
                            <TouchableOpacity onPress={() => this._handlePressTab(tabItem)}>
                                <View style={styles.tab}>
                                    <Text small style={isActive ? styles.tabTextActive : styles.tabTextDeactive}>{tabItem.text}</Text>
                                    {(typeof tabItem.number != 'undefined') && <View style={isActive ? styles.tabNumberContainerActive : styles.tabNumberContainerDeactive}>
                                        <Text style={isActive ? styles.tabNumberActive : styles.tabNumberDeactive}>
                                            {tabItem.number}
                                        </Text>
                                    </View>}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }
}