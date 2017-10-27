import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button, Input } from 'native-base'
import { View, TouchableWithoutFeedback, BackHandler, LayoutAnimation, Platform, Dimensions } from 'react-native'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
const { height, width } = Dimensions.get('window')
const SEARCH_IF_MORE_THAN = 9;
const CONCAT_CHARACTER = ';'
const emptyObj = {}
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
            canMultipleSelect: true,
            selectingHash: {}
        }
        this.selectingHashBackup = {}
        this.rowHasChanged = false
        this.rowHasChangedHash = {}
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

    setCanMultileSelect = (canSelect) => {
        this.setState({canMultipleSelect : canSelect})
    }

    resetMultipleSelect = () => {
        if (this.state.selectingHash && Object.keys(this.state.selectingHash).length > 0){
            this.setState({selectingHash: {}})
            this.selectingHashBackup = {}
        }
    }

    updateSelectedOption(selectedOption, canMultipleSelect) {
        if (selectedOption.id && selectedOption.id.toString().indexOf(CONCAT_CHARACTER)>-1){    
            let selectedArr = selectedOption.id.split(CONCAT_CHARACTER)
            let selectingHash = {}
            for (let i=0; i<selectedArr.length; i++){
                selectingHash[selectedArr[i]] = true
            }
            this.setState({selectedOption: selectedOption, selectingHash: selectingHash, 
                selectingMultiple: true, canMultipleSelect: canMultipleSelect
            })
            this.selectingHashBackup = this._cloneHash(selectingHash)
            return
        }
        this.selectingHashBackup = {}
        this.setState({ 
            selectedOption: selectedOption, selectingHash: {}, 
            selectingMultiple: false, canMultipleSelect: canMultipleSelect 
        })

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
        })
    }
    componentWillMount() {

    }

    _genOutputMultipleSelect = () =>{
        if (this.state.selectingHash[0]===true){
            return this.props.dropdownValues.filter(item=>item.id==0)[0]
        }
        let keyArr = Object.keys(this.state.selectingHash)
        let result = []
        for (let i=0; i<keyArr.length; i++){
            if (this.state.selectingHash[keyArr[i]]===true){
                result.push(keyArr[i])
            }
        }
        if (!result || !result.length) return {}
        if (result.length == 1){
            return this.props.dropdownValues.filter(item=>item.id==result[0])[0]
        }
        return {
            id: result.join(CONCAT_CHARACTER),
            name: `${result.length} ${I18n.t('multiple_select_display')}`,
            address: `${result.length} ${I18n.t('multiple_select_display')}`
        }
    }

    _cloneHash = (hash) => {
        let newHash = {}
        let keyArr = Object.keys(hash)
        for (let i=0; i< keyArr.length; i++){
            newHash[keyArr[i]] = hash[keyArr[i]]
        }
        return newHash
    }

    _getNumberMultipleSelect = (hash) => {
        let counter = 0
        let keyArr = Object.keys(hash)
        for (let i=0; i< keyArr.length; i++){
            if (hash[keyArr[i]]===true) counter++
        }
        return counter
    }

    _handlePress(item) {
        if (this.state.selectingMultiple){
            let cloneSelectingHash = this._cloneHash(this.state.selectingHash)
            // If press `Tất cả địa điểm`, all item will be select or unselect
            if (item.id == 0){

                let allSyncValue = cloneSelectingHash[item.id] ? false : true
                for (let i=0; i<this.state.dropdownValues.length; i++){
                    cloneSelectingHash[this.state.dropdownValues[i].id] = allSyncValue
                }
            }else{
                if (!cloneSelectingHash[item.id]){
                    cloneSelectingHash[item.id] = true
                    let keyArr = Object.keys(cloneSelectingHash)
                    // If all item selected, `Tất cả địa điểm` will be select too
                    let countAllSelect = 0
                    for (let i=0; i<keyArr.length; i++){
                        if(keyArr[i] != 0 && cloneSelectingHash[keyArr[i]] == true) countAllSelect++
                    }
                    if (countAllSelect == Object.keys(this.state.dropdownValues).length -1){
                        cloneSelectingHash[0] = true
                    }
                }else{
                    // If any item unselect, `Tất cả địa điểm` will be unselect too
                    cloneSelectingHash[0] = false
                    cloneSelectingHash[item.id] = false   
                }    
            }
            this.setState({selectingHash: cloneSelectingHash})
            return
        }
        this.props.onSelect && this.props.onSelect(item)
        this.setState({
            selectedOption: item,
            dropdownValues: this.props.dropdownValues,
            dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
            openningDropdown: false,
        })
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
                if (this.state.selectingHash[keyArr[i]] != nextState.selectingHash[keyArr[i]]){
                    this.rowHasChangedHash[keyArr[i]] = true
                }
            }
        }
        this.rowHasChanged = (this.state.openningDropdown != nextState.openningDropdown
            || this.state.canMultipleSelect != nextState.canMultipleSelect
            || this.state.selectingMultiple != nextState.selectingMultiple
            || Object.keys(this.state.selectingHash).length != Object.keys(nextState.selectingHash).length
        )
        
        return (
            this.rowHasChanged
            || Object.keys(this.rowHasChangedHash).length > 0
            || this._isDiff(this.state.selectedOption, nextState.selectedOption)
            || this._isArrDiff(this.state.dropdownValues, nextState.dropdownValues)
        )
    }

    componentDidUpdate(prevProps, prevState) {
        this.rowHasChanged = false
        this.rowHasChangedHash = {}
    }

    componentDidMount(){
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     console.log('Back Press Top Dropdown')
        // })
    }

    _onLongPressItem = (item) => {
        if (!this.state.canMultipleSelect) return
        let cloneSelectingHash = this._cloneHash(this.state.selectingHash)
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
        let multipleSelectValue = this._genOutputMultipleSelect()
        let numberSelectBackup = this._getNumberMultipleSelect(this.selectingHashBackup)
        if (!multipleSelectValue || typeof multipleSelectValue.id == 'undefined'){
            this.props.onPressOverlay && this.props.onPressOverlay()
            this.setState({
                dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
                openningDropdown: false,
                selectingHash: this.selectingHashBackup,
                selectingMultiple: numberSelectBackup > 0? true: false
            })
            return
        }else if (multipleSelectValue.id == 0){
            this.setState({
                dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
                openningDropdown: false,
                selectingHash: {},
                selectingMultiple: numberSelectBackup > 0? true: false
            })
        }
        this.selectingHashBackup = this._cloneHash(this.state.selectingHash)
        this.props.onPressOverlay && this.props.onPressOverlay()
        this.props.onSelect && this.props.onSelect(multipleSelectValue)
        if (multipleSelectValue && multipleSelectValue.id && multipleSelectValue.id.toString().indexOf(CONCAT_CHARACTER)>-1){
            this.setState({
                dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
                openningDropdown: false,
            })
            return
        }
        this.setState({
            dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
            openningDropdown: false,
            selectingHash: {},
            selectingMultiple: false
        })        
    }

    _handleCancelMultiple = () => {
        // this._handlePressOverlay()
        this.props.onPressOverlay && this.props.onPressOverlay()
        let numberSelectBackup = this._getNumberMultipleSelect(this.selectingHashBackup)
        this.setState({
            dropdownValues: this.state.defaultDropdownValues ? this.state.defaultDropdownValues : this.state.dropdownValues,
            openningDropdown: false,
            selectingHash: this.selectingHashBackup,
            selectingMultiple: (numberSelectBackup > 0) ? true : false
        })
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
                    rowHasChanged={(r1, r2) => {
                        return this.rowHasChanged || r1.id != r2.id || this.rowHasChangedHash[r1.id]
                        {/* return true */}
                    }}
                    renderRow={(item) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={e => this._handlePress(item)}
                                onLongPress={()=>this._onLongPressItem(item)}
                            >
                                <View style={styles.dropdownListItem}>
                                    {this.state.canMultipleSelect && this.state.selectingMultiple 
                                        && this.state.selectingHash[item.id]===true && 
                                        <Icon name='checked' style={styles.checkedIcon}/>
                                    }
                                    {this.state.canMultipleSelect && this.state.selectingMultiple 
                                        && !this.state.selectingHash[item.id] 
                                        && <Icon name='option_uncheck' style={styles.checkedIcon}/>
                                    }
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
