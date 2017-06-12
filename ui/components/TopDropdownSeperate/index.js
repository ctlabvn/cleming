import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing, LayoutAnimation, Platform, Dimensions } from 'react-native'

import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'

const { height, width } = Dimensions.get('window')

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
            show: false
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

    _handlePress(item) {
        this.props.forwardTo(`notification/${item.user}`)
    }
    updateDropdownValues(dropdownValues) {
        this.setState({ dropdownValues: dropdownValues })
    }
    updateSelectedOption(selectedOption) {
        this.setState({ selectedOption: selectedOption, openningDropdown: false })
        console.log('Updating selected option', selectedOption)
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

    render() {
        const { notifications, getNotificationRequest, getNotification } = this.props
        let { openningDropdown, dropdownValues, selectedOption } = this.state
        let maxHeight = openningDropdown ? 150 : 0
        let fakeZIndex = (maxHeight == 150) ? { zIndex: 1000 } : { zIndex: null }
        const containerStyle = (Platform.OS === 'ios') ? styles.dropdownContainerIos : styles.dropdownContainerAndroid
        const containerStyleFull = (Platform.OS === 'ios') ? styles.dropdownContainerIosFull : styles.dropdownContainerAndroidFull
        let containerStyleTopDown = (maxHeight == 150) ? { ...containerStyleFull, ...fakeZIndex } : { ...containerStyle, ...fakeZIndex }
        if (!this.state.show){
            console.log('Case TopDropdown hide')
            return <View />
        }
        console.log('Case Topdropdown showrr')
        if (!dropdownValues || dropdownValues.length == 0 || !selectedOption ||
                Object.keys(selectedOption).length == 0){
            return (
                <View style={containerStyleTopDown}>
                    <View style={styles.dropdownHeader}>
                        <Text numberOfLines={1} style={styles.dropdownSelectedValue}>Đang tải địa điểm...</Text>
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
                    <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{selectedOption.name}</Text>
                    <Button style={styles.dropdownIcon} onPress={() => this._handlePressIcon()} transparent>
                        <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"} style={{
                            color: material.white500
                        }} />
                    </Button>
                </View>
            </View>
        )
    }
}