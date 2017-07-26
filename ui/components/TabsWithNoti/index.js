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
    getData = ()=>{
        return this.state.tabData
    }
    _handlePressTab(item) {
        if (this.state.activeTab != item.tabID) {
            this.setState({ activeTab: item.tabID })
            setTimeout(()=>this.props.onPressTab(item), 0)
        }
    }
    componentWillReceiveProps(nextProps){
        let activeTab = nextProps.activeTab || nextProps.tabData[0].tabID
        if (nextProps.tabData.length != this.state.tabData.length ||
            nextProps.tabData[0].tabID != this.state.tabData[0].tabID
        ){
            this.setState({activeTab: activeTab, tabData: nextProps.tabData})
        }
    }
    _isDiff = (item1, item2) => {
        return (item1.tabID != item2.tabID 
            || item1.text != item2.text
            || (item1.number != item2.number)
        )
    }
    _isArrDiff = (arr1, arr2) => {
        if (arr1.length != arr2.length) return true
        for (let i=0; i<arr1.length; i++){
            if (this._isDiff(arr1[i], arr2[i])) return true
        }
        return false
    }
    shouldComponentUpdate(nextProps, nextState){

        return (
           this.state.activeTab != nextState.activeTab
            || this.state.tabData.length != nextState.tabData.length
            || this._isArrDiff(this.state.tabData, nextState.tabData)
        )
    }

    getActiveTab() {
        return this.state.activeTab
    }
    setActiveTab(tabID){
        this.setState({activeTab: tabID})
    }
    updateNumber(tabID, number) {
        let tabData = this.state.tabData.map(item=>Object.assign({}, item))
        let index = tabData.findIndex(item => item.tabID == tabID)
        tabData[index].number = number
        this.setState({ tabData: tabData })
    }

    updateMultipleNumber = (data) => {
        let tabData = this.state.tabData.map(item=>Object.assign({}, item))
        // let index = tabData.findIndex(item => item.tabID == tabID)
        for (let i=0; i<data.length; i++){
            let index = tabData.findIndex(item => item.tabID == data[i].tabID)
            tabData[index].number = data[i].number
        }
        this.setState({tabData: tabData})
    }


    renderTextCount(isActive, number){
        const fontSize = +number > 99 ? 8 : 10
        const style = isActive ? styles.tabNumberActive : styles.tabNumberDeactive
        return (            
            <Text style={{...style,fontSize}}>{number}</Text>
        )
    }

    render() {
        console.log('Render TabsNoti')
        return (
            <View style={styles.tabBar}>
                {this.state.tabData.map((tabItem) => {
                    let isActive = (tabItem.tabID == this.state.activeTab)
                    return (
                        <View style={isActive ? styles.tabActive : styles.tabDeactive} key={tabItem.tabID}>
                            <TouchableOpacity onPress={() => this._handlePressTab(tabItem)}>
                                <View style={styles.tab}>
                                    <Text small style={isActive ? styles.tabTextActive : styles.tabTextDeactive}>{tabItem.text}</Text>
                                    {(typeof tabItem.number != 'undefined' && tabItem.number != 0) && <View style={isActive ? styles.tabNumberContainerActive : styles.tabNumberContainerDeactive}>                                        
                                        {this.renderTextCount(isActive, tabItem.number)}                                        
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