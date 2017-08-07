import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Input, Item } from 'native-base'
import { View, TouchableOpacity, TouchableWithoutFeedback, Animated, Easing, LayoutAnimation, Platform, Dimensions } from 'react-native'

import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
const { height, width } = Dimensions.get('window')

import leven from 'leven'
import { convertVn } from '~/ui/shared/utils'

export default class TopDropdown extends Component {
    constructor(props) {
        super(props)
        let selectedOption
        if (props.selectedOption && Object.keys(props.selectedOption).length > 0) {
            selectedOption = props.selectedOption
        } else {
            if (props.dropdownValues && props.dropdownValues.length > 0) {
                selectedOption = props.dropdownValues[0]
            }
        }
        this.state = {
            openningDropdown: false,
            zIndex: 0,
            // fadeAnim: new Animated.Value(0),
            selectedOption: selectedOption,
            dropdownValues: props.dropdownValues || [],
            show: false,
            searchString: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        // If selectedPlace from store change, all TopDropdown will change follow
        if (nextProps.selectedOption && this.state.selectedOption
            && Object.keys(nextProps.selectedOption).length > 0
            && Object.keys(this.state.selectedOption).length > 0
            && nextProps.selectedOption.id != this.state.selectedOption.id
        ) {
            this.setState({ selectedOption: nextProps.selectedOption })
        }
        // If state.selectedOption empty, set value
        if (nextProps.dropdownValues && nextProps.dropdownValues.length > 0) {
            if ((!this.state.selectedOption) || Object.keys(this.state.selectedOption).length == 0) {
                this.setState({ selectedOption: nextProps.dropdownValues[0] })
            }
        }
        if (this.state.openningDropdown) {
            this.setState({ openningDropdown: false })
        }

    }

    updateDropdownValues(dropdownValues) {
        this.setState({ 
            dropdownValues: dropdownValues,
            searchString: '',
        })
    }
    updateSelectedOption(selectedOption) {
        this.setState({ 
            selectedOption: selectedOption, 
            openningDropdown: false,
            searchString: '', 
        })
        this.state.callback && this.state.callback(selectedOption)
    }
    setCallbackPlaceChange(callback){
        this.setState({callback: callback})
    }
    show(showState){
        this.setState({show:showState})
    }

    getValue() {
        return this.state.selectedOption;
    }
    toggle() {
        // LayoutAnimation.easeInEaseOut()
        this.setState({ openningDropdown: !this.state.openningDropdown })
    }
    close() {
        this.setState({ openningDropdown: false })
    }
    componentWillMount() {

    }
    _handlePressIcon() {
        // Need before toggle
        this.props.onPressIcon && this.props.onPressIcon(this.state.openningDropdown)
        this.toggle()
    }
    _handlePress(item) {
        this.setState({ selectedOption: item })
        this.props.onSelect && this.props.onSelect(item)
        // this.toggle()
        this.setState({ openningDropdown: false })
    }
    _handlePressOverlay = () => {
        this.close()
    }


    _isDiff = (item1, item2) => {
        if (!item1 && !item2) return false
        if (!item1) return true
        return (item1.id != item2.id || item1.name != item2.name)
    }
    _isArrDiff = (arr1, arr2) => {
        if (arr1.length != arr2.length){
            return true
        }
        for (let i=0; i<arr1.length; i++){
            if (this._isDiff(arr1[i], arr2[i])) return true
        }
        return false
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            this.state.show != nextState.show
            || this.state.openningDropdown != nextState.openningDropdown
            || this._isDiff(this.state.selectedOption, nextState.selectedOption)
            || this._isArrDiff(this.state.dropdownValues, nextState.dropdownValues)
        )
    }

    search(searchString){            
        const  data = this.state.dropdownValues        
        const searchWord = convertVn(searchString.trim().toLowerCase())
        if(searchWord) {
            const searchedData = data.map(item=>{
                const compareWord = convertVn(item.name.trim().toLowerCase())
                const longest = Math.max(searchWord.length, compareWord.length)
                const distance = leven(searchWord, compareWord)
                const point = (longest-distance)/longest
                // console.log(distance + ':'+ longest, searchWord, compareWord)     
                return {
                    item,
                    point,
                }
            })
            const listPlace = searchedData.sort((a,b)=>b.point-a.point)
                .slice(0, 5).map(c=>c.item)   

            this.props.app.topDropdownListValue.updateDropdownValues(listPlace)
        } else {
            this.props.app.topDropdownListValue.updateDropdownValues(data)
        }
        
        // this.setState({searchString})
    }

    render() {
        console.log('Render TopDropdownSeperate')
        const { notifications, getNotificationRequest, getNotification } = this.props
        let { openningDropdown, dropdownValues, selectedOption } = this.state
        let maxHeight = openningDropdown ? 150 : 0
        let fakeZIndex = (maxHeight == 150) ? { zIndex: 1000 } : { zIndex: null }
        const containerStyle = (Platform.OS === 'ios') ? styles.dropdownContainerIos : styles.dropdownContainerAndroid
        const containerStyleFull = (Platform.OS === 'ios') ? styles.dropdownContainerIosFull : styles.dropdownContainerAndroidFull
        let containerStyleTopDown = (maxHeight == 150) ? { ...containerStyleFull, ...fakeZIndex } : { ...containerStyle, ...fakeZIndex }
        if (!this.state.show){
            return <View />
        }
        if (!dropdownValues || dropdownValues.length == 0 || !selectedOption ||
                Object.keys(selectedOption).length == 0){
            return (
                <View style={containerStyleTopDown}>
                    <View style={styles.dropdownHeader}>
                        <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{I18n.t('loading_place')}</Text>
                    </View>
                </View>
            )
        }
        if (dropdownValues.length == 1) {
            return (
                <View style={containerStyleTopDown}>
                    <View style={styles.dropdownHeader}>
                        <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{selectedOption.name}</Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={containerStyleTopDown}>
                <View style={styles.dropdownHeader}>
                    <TouchableOpacity style={styles.dropdownIcon} onPress={() => this._handlePressIcon()}>
                        <View>
                        <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{selectedOption.name}</Text>                    
                        <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"} style={{
                            color: material.white500,
                            position: 'absolute',     
                            marginTop: -5,                                                   
                            right: 10,                            
                        }} />
                        </View>
                        {openningDropdown && <Item style={styles.searchContainer}>                              
                              <Input autoCapitalize="none" defaultValue={this.state.searchString} 
                                autoCorrect={false} 
                                onChangeText={text => this.search(text)}
                                placeholderTextColor="#fff" style={styles.searchInput} 
                                placeholder="Search Place" />                        
                          </Item>}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}