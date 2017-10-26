import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Input } from 'native-base'
import { View, TouchableWithoutFeedback, BackHandler, LayoutAnimation, Platform, Dimensions } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'
import ListViewExtend from '~/ui/components/ListViewExtend'

const { height, width } = Dimensions.get('window')

const SEARCH_IF_MORE_THAN = 9;

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
            selectingMultiple: false,
            selectingHash: {}
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
        return this.state.defaultDropdownValues
    }
    updateDropdownValues(dropdownValues) {
        this.setState({ dropdownValues: dropdownValues })
    }

    updateDefaultDropdownValues(defaultDropdownValues) {
        this.setState({ defaultDropdownValues: defaultDropdownValues})
    }

    updateSelectedOption(selectedOption) {
        this.setState({ selectedOption: selectedOption })
        // this._handlePress(selectedOption);
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
        // console.warn(this.state.defaultDropdownValues.length);
        this.setState({
            dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
            openningDropdown: false,
            selectingMultiple: false
        })
    }
    componentWillMount() {

    }
    _handlePress(item) {
        if (this.state.selectingMultiple){
            let cloneSelectingHash = {...this.state.selectingHash}
            if (item.id == 0){
                let allSyncValue = cloneSelectingHash[item.id] ? false : true
                for (let i=0; i<this.state.dropdownValues.length; i++){
                    cloneSelectingHash[this.state.dropdownValues[i].id] = allSyncValue
                }
            }else{
                if (!cloneSelectingHash[item.id]){
                    console.log('Handle Press Case 1')
                    cloneSelectingHash[item.id] = true
                    let keyArr = Object.keys(cloneSelectingHash)
                    let countAllSelect = 0
                    for (let i=0; i<keyArr.length; i++){
                        if(keyArr[i] != 0 && cloneSelectingHash[keyArr[i]] == true) countAllSelect++
                    }
                    if (countAllSelect == Object.keys(this.state.dropdownValues).length -1){
                        cloneSelectingHash[0] = true
                    }
                }else{
                    console.log('Handle Press Case 2')
                    cloneSelectingHash[0] = false
                    cloneSelectingHash[item.id] = false   
                }    
            }
            
            console.log('Clone Hash', cloneSelectingHash)
            this.setState({selectingHash: cloneSelectingHash})
            return
        }

        // this.state.selectedOption = item
        this.props.onSelect && this.props.onSelect(item)
        // this.state.dropdownValues = this.props.dropdownValues

        this.setState({
            selectedOption: item,
            dropdownValues: this.props.dropdownValues
        })

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
        if (this.state.selectingMultiple){
            if (!nextState.selectingMultiple) return true
            let keyArr = Object.keys(this.state.selectingHash)
            for (let i=0; i<keyArr.length; i++){
                if (this.state.selectingHash[keyArr[i]] != nextState.selectingHash[keyArr[i]]) return true
            }
        }
        return (
            this.state.openningDropdown != nextState.openningDropdown
            || this.state.selectingMultiple != nextState.selectingMultiple
            || this._isDiff(this.state.selectedOption, nextState.selectedOption)
            || this._isArrDiff(this.state.dropdownValues, nextState.dropdownValues)
            || Object.keys(this.state.selectingHash).length != Object.keys(nextState.selectingHash).length
            
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

    _onLongPressItem = (item) => {
        console.log('On Long Press', item)
        let cloneSelectingHash = {...this.state.selectingHash}
        if (item.id != 0){
            cloneSelectingHash[item.id] = true
        }else{
            for (let i=0; i<this.state.dropdownValues.length; i++){
                cloneSelectingHash[this.state.dropdownValues[i].id] = true
            }
        }
        
        this.setState({selectingMultiple: true, selectingHash: cloneSelectingHash})
    }

    needSearch() {
        return this.state.defaultDropdownValues.length > SEARCH_IF_MORE_THAN;
    }

    _handleOkMultiple = () => {
        this.close()
    }

    _handleCancelMultiple = () => {
        this._handlePressOverlay()
    }

    render() {

        const { notifications, getNotificationRequest, getNotification } = this.props
        let { openningDropdown, selectedOption, dropdownValues } = this.state
        let maxHeight = openningDropdown ? (material.deviceHeight-material.toolbarHeight-260) : 0
        // let maxHeight = 50
        if (!dropdownValues || dropdownValues.length == 0){
            return <View />
        }

        // if (selectedOption && Object.keys(selectedOption).length > 0){
        //     dropdownValues = dropdownValues.filter(item => item.id != this.state.selectedOption.id)
        // }


        // console.log('similarity', this.searchByWord('lang ha ha noi', dropdownValues))
        let overlayStyle = openningDropdown ? (this.needSearch() ? styles.ovarlayContainerOpenPlus : styles.ovarlayContainerOpen) :styles.ovarlayContainerClose
        // let overlayStyle = openningDropdown ? styles.ovarlayContainerOpen :styles.ovarlayContainerClose
        // console.warn('topdropdownlistvalue render dropdownValues ' + JSON.stringify(dropdownValues));
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
                    rowHasChanged={(r1, r2) => true}
                    renderRow={(item) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={e => this._handlePress(item)}
                                onLongPress={()=>this._onLongPressItem(item)}
                            >
                                <View style={styles.dropdownListItem}>
                                    {this.state.selectingMultiple && this.state.selectingHash[item.id]===true && <Icon name='checked' style={styles.checkedIcon}/>}
                                    {this.state.selectingMultiple && !this.state.selectingHash[item.id] && <Icon name='option_uncheck' style={styles.checkedIcon}/>}
                                    {item.name.length > 60 ? <Text  numberOfLines={2} style={styles.dropdownListItemText}>{item.name}</Text>
                                    : <Text  numberOfLines={1} style={styles.dropdownListItemText}>{item.name}</Text>}

                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                    }>
                </List>

                {this.state.selectingMultiple && <View style={styles.multipleActionBlock}>
                    <TouchableWithoutFeedback onPress={this._handleCancelMultiple}>                    
                        <View style={styles.multipleActionContainerCancel}>
                        <Icon name='close_bt' style={styles.multipleActionIcon}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._handleOkMultiple}>
                        <View style={styles.multipleActionContainerOk}>  
                            <Icon name='done' style={styles.multipleActionIcon}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>}

                <TouchableWithoutFeedback onPress={()=>this._handlePressOverlay()}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            </View>

        )
    }
}
