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
        } 
        this.state = {
            openningDropdown: false,
            selectedOption: selectedOption,
            // show: !!props.show,
            isMultiple: true,
            searchString: '',
            placeholderText: I18n.t('search'),
        }


    }

    updateSelectedOption(selectedOption) {
        this.setState({ 
            selectedOption: selectedOption, 
            openningDropdown: false,
            searchString: '', 
        })
        this.callback && this.callback(selectedOption)
    }

    setCallbackPlaceChange(callback){
        this.callback = callback
    }

    show(showState){
        // for sure should set top to negative of deviceHeight
        // this.setState({show: showState})
        this.translate(showState ? 0 : material.deviceWidth)
    }
    setIsMultiple(isMultiple){
        this.setState({isMultiple: isMultiple})
    }

    translate(translateX){        
        this.container.setNativeProps({
            style: {
                transform: [
                  {translateX},
                ],     
            }
        })
    }

    getValue() {
        return this.state.selectedOption;
    }
    toggle() {
        // LayoutAnimation.easeInEaseOut()
        this.setState({
            openningDropdown: !this.state.openningDropdown,
        })
    }
    close() {
        this.setState({ openningDropdown: false })
    }

    _handlePressIcon() {
        if (!this.state.isMultiple) return
        // Need before toggle
        this.props.onPressIcon && this.props.onPressIcon(this.state.openningDropdown)
        this.toggle()
    }

    _handlePress(item) {
        this.setState({ selectedOption: item, openningDropdown: false })
        this.props.onSelect && this.props.onSelect(item)
    }
    _handlePressOverlay = () => {
        this.close()
    }



    search(searchString){            
        const  data = this.props.app.topDropdownListValue.getValues()
        if(!data) return
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
    }

    _setPlaceholderText(text = ''){
        this.setState({placeholderText: text});
    }

    renderContent(){

    }

    render() {
        console.log('Render TopDropdownSeperate')
        const { notifications, getNotificationRequest, getNotification, show } = this.props
        let { openningDropdown, selectedOption, isMultiple } = this.state
        let maxHeight = openningDropdown ? 150 : 0
        let fakeZIndex = (maxHeight == 150) ? { zIndex: 1000 } : { zIndex: null }
        const containerStyle = (Platform.OS === 'ios') ? styles.dropdownContainerIos : styles.dropdownContainerAndroid
        const containerStyleFull = (Platform.OS === 'ios') ? styles.dropdownContainerIosFull : styles.dropdownContainerAndroidFull
        let containerStyleTopDown = (maxHeight == 150) ? { ...containerStyleFull, ...fakeZIndex } : { ...containerStyle, ...fakeZIndex }
        
        // is shown?        
        containerStyleTopDown.transform = [{translateX: show ? 0 : material.deviceWidth}]
       
        return (
            <View ref={ref=>this.container = ref} style={containerStyleTopDown}>

            {(!selectedOption || !selectedOption.name) 
                ? <View style={styles.dropdownHeader}>
                        <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{I18n.t('loading_place')}</Text>
                    </View>

                : <View style={openningDropdown ? styles.dropdownHeaderPlus : styles.dropdownHeader}>

                    <TouchableOpacity style={styles.dropdownIcon} onPress={() => this._handlePressIcon()}>
                        <View>
                            <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{selectedOption.name}</Text>
                                {isMultiple &&
                                    <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"} style={{
                                        color: material.white500,
                                        position: 'absolute',
                                        marginTop: -5,
                                        right: 10,
                                    }} />
                                }

                        </View>
                    </TouchableOpacity>
                    {openningDropdown && isMultiple && <Item style={styles.searchContainer}>
                        <Input autoCapitalize="none" defaultValue={this.state.searchString}
                               autoCorrect={false}
                               onChangeText={text => this.search(text)}
                               selectionColor={styles.searchInput.color}
                               placeholderTextColor={material.gray300} style={styles.searchInput}
                               placeholder={this.state.placeholderText}/></Item>}

                </View>}
            </View>
        )
    }
}