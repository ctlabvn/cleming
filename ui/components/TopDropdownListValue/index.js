import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Input } from 'native-base'
import { View, TouchableWithoutFeedback, BackHandler, LayoutAnimation, Platform, Dimensions } from 'react-native'

import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'

const { height, width } = Dimensions.get('window')

export default class TopDropdownListValue extends Component {
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
            selectedOption: selectedOption,
            dropdownValues: props.dropdownValues || [],
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

    }

    getValues = () => {
        return this.props.dropdownValues
    }
    updateDropdownValues(dropdownValues) {
        this.setState({ dropdownValues: dropdownValues })
    }
    updateSelectedOption(selectedOption) {
        this.setState({ selectedOption: selectedOption })
    }
    getValue() {
        return this.state.selectedOption;
    }
    toggle() {
        // LayoutAnimation.easeInEaseOut()
        this.setState({ openningDropdown: !this.state.openningDropdown })
    }
    open() {
        this.setState({ openningDropdown: true })
    }
    close() {
        this.setState({
            openningDropdown: false,
            dropdownValues: this.props.dropdownValues
        })
    }
    componentWillMount() {

    }
    _handlePress(item) {
        this.setState({ selectedOption: item })
        this.props.onSelect && this.props.onSelect(item)
        // this.toggle()
        this.close();
    }
    _handlePressOverlay = () => {
        this.props.onPressOverlay && this.props.onPressOverlay()
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
            this.state.openningDropdown != nextState.openningDropdown
            || this._isDiff(this.state.selectedOption, nextState.selectedOption)
            || this._isArrDiff(this.state.dropdownValues, nextState.dropdownValues)
        )
    }

    componentDidMount(){
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     console.log('Back Press Top Dropdown')
        // })
    }

    // searchByWord(word, data){
    //     // calculate the sum of similarity by compare word by word        
    //     const searchWord = convertVn(word.trim().toLowerCase())
    //     const searchedData = data.map(item=>{
    //         const compareWords = convertVn(item.name.trim().toLowerCase())
    //         const longest = Math.max(searchWord.length, compareWords.length)
    //         const distance = leven(searchWord, compareWords)
    //         const point = (longest-distance)/longest
    //         return {
    //             item,
    //             point,
    //         }
    //     })
    //     return searchedData.sort((a,b)=>b.point-a.point).map(c=>c.item)
    // }

    render() {

        const { notifications, getNotificationRequest, getNotification } = this.props
        let { openningDropdown, selectedOption, dropdownValues } = this.state
        let maxHeight = openningDropdown ? (material.deviceHeight-material.toolbarHeight-260) : 0
        // let maxHeight = 50
        if (!dropdownValues || dropdownValues.length == 0){
            return <View />
        }
        if (selectedOption && Object.keys(selectedOption).length > 0){
            dropdownValues = dropdownValues.filter(item => item.id != this.state.selectedOption.id)
        }

        // console.log('similarity', this.searchByWord('lang ha ha noi', dropdownValues))

        let overlayStyle = openningDropdown ? styles.ovarlayContainerOpen:styles.ovarlayContainerClose
        return (
            <View style={overlayStyle}>                               
                <List
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={{ backgroundColor: material.primaryColor }}
                    dataArray={dropdownValues}
                    style={{
                        ...styles.dropdownList,
                        maxHeight,
                    }}
                    renderRow={(item) => {
                        return (
                            <ListItem onPress={e => this._handlePress(item)} style={styles.dropdownListItem}>                                
                                <Text  numberOfLines={1} style={styles.dropdownListItemText}>{item.name}</Text>
                            </ListItem>
                        )
                    }
                    }>
                </List>
                <TouchableWithoutFeedback onPress={()=>this._handlePressOverlay()}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            </View>

        )
    }
}