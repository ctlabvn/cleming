import React, {PureComponent, Component} from 'react'
import {connect} from 'react-redux'
import {List, ListItem, Text, Icon, Thumbnail, Button, View} from 'native-base'
import { TouchableWithoutFeedback, Animated, Easing, LayoutAnimation, Platform, Dimensions} from 'react-native'

import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'

const {height, width} = Dimensions.get('window')
// const itemAll = {placeId: '000000', name: 'Tất cả các địa điểm', address: 'Tất cả các địa điểm'}

export default class TopDropdown extends Component {
    constructor(props) {
        super(props)
        let selectedOption
        let dropdownValues = props.dropdownValues;
        // dropdownValues.splice(0,0, itemAll)
        if (props.selectedOption && Object.keys(props.selectedOption).length > 0) {
            selectedOption = props.selectedOption
        } else {
            if (dropdownValues && dropdownValues.length > 0) {
                selectedOption = dropdownValues[0]
            }
        }
        this.state = {
            openningDropdown: false,
            zIndex: 0,
            // fadeAnim: new Animated.Value(0),
            selectedOption: selectedOption,
            dropdownValues: dropdownValues || [],
        }
    }

    componentWillReceiveProps(nextProps) {
        // If selectedPlace from store change, all TopDropdown will change follow
        if (nextProps.selectedOption && this.state.selectedOption
            && Object.keys(nextProps.selectedOption).length > 0
            && Object.keys(this.state.selectedOption).length > 0
            && nextProps.selectedOption.id != this.state.selectedOption.id
        ) {
            this.setState({selectedOption: nextProps.selectedOption})
        }
        // If state.selectedOption empty, set value
        if (nextProps.dropdownValues && nextProps.dropdownValues.length > 0) {
            if ((!this.state.selectedOption) || Object.keys(this.state.selectedOption).length == 0) {

                this.setState({selectedOption: nextProps.dropdownValues[0]})
            }
        }
        if (this.state.openningDropdown) {
            this.setState({openningDropdown: false})
        }

    }

    updateDropdownValues(dropdownValues) {
        // dropdownValues.splice(0,0, itemAll)
        this.setState({dropdownValues: dropdownValues})
    }

    updateSelectedOption(selectedOption) {
        this.setState({selectedOption: selectedOption})
    }

    getValue() {
        return this.state.selectedOption;
    }

    toggle() {
        // LayoutAnimation.easeInEaseOut()
        this.setState({openningDropdown: !this.state.openningDropdown})
    }

    close() {
        this.setState({openningDropdown: false})
    }

    componentWillMount() {

    }

    _handlePressIcon() {
        this.toggle()
    }

    _handlePress(item) {
        this.setState({selectedOption: item})
        this.props.onSelect && this.props.onSelect(item)
        // this.toggle()
        this.setState({openningDropdown: false})
    }

    _handlePressOverlay = () => {
        this.close()
    }

    render() {
        const {notifications, getNotificationRequest, getNotification} = this.props
        let {dropdownValues} = this.props
        const {openningDropdown} = this.state
        const MAX_HEIGHT = 350;
        let maxHeight = openningDropdown ? MAX_HEIGHT : 0
        let fakeZIndex = (maxHeight == MAX_HEIGHT) ? {zIndex: 1000} : {zIndex: null}
        const containerStyle = (Platform.OS === 'ios') ? styles.dropdownContainerIos : styles.dropdownContainerAndroid
        const containerStyleFull = (Platform.OS === 'ios') ? styles.dropdownContainerIosFull : styles.dropdownContainerAndroidFull
        let containerStyleTopDown = (maxHeight == MAX_HEIGHT) ? {...containerStyleFull, ...fakeZIndex} : {...containerStyle, ...fakeZIndex}
        if (!dropdownValues || dropdownValues.length == 0) {
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
                        <Text numberOfLines={1}
                              style={styles.dropdownSelectedValue}>{this.state.selectedOption.name}</Text>
                    </View>
                </View>
            )
        }
        dropdownValues = dropdownValues.filter(item => item.placeId != this.state.selectedOption.placeId)
        return (
            <View style={containerStyleTopDown}>
                <View style={styles.dropdownHeader}>
                    <Button style={styles.dropdownIcon} onPress={() => this._handlePressIcon()} transparent>
                        <View row>
                            <View style={{justifyContent: 'center', flex: 1}}>
                                <Text numberOfLines={1}
                                      style={styles.dropdownSelectedValue}>{this.state.selectedOption.address}</Text>
                            </View>
                            <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"}
                                  style={{color: material.white500}}/>
                        </View>
                    </Button>
                </View>

                <List
                    contentContainerStyle={{backgroundColor: material.primaryColor}}
                    dataArray={dropdownValues}
                    style={{
                        ...styles.dropdownList,
                        maxHeight,
                    }}
                    renderRow={(item) => {
                        return (
                            <ListItem onPress={e => this._handlePress(item)} style={styles.dropdownListItem}>
                                <Text style={styles.dropdownListItemText}>{item.address}</Text>
                            </ListItem>
                        )
                    }
                    }>
                </List>
                <TouchableWithoutFeedback onPress={() => this._handlePressOverlay()}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}