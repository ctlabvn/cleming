import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing, LayoutAnimation, Platform, Dimensions } from 'react-native'

import styles from './styles'
import Content from '~/ui/components/Content'
import { PRIMARY_COLOR } from '~/ui/shared/constants'

const { height, width } = Dimensions.get('window')

export default class TopDropdown extends Component {
    constructor(props) {
        super(props)
        let selectedOption
        if (props.selectedOption && Object.keys(props.selectedOption).length>0){
            selectedOption = props.selectedOption
        }else{
            selectedOption = props.dropdownValues[0]
        }
        this.state = {
            openningDropdown: false,
            zIndex: 0,
            // fadeAnim: new Animated.Value(0),
            selectedOption: selectedOption,
            dropdownValues: props.dropdownValues || [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedOption.id != this.state.selectedOption.id){
            this.setState({selectedOption: nextProps.selectedOption})
        }
        if (nextProps.dropdownValues && nextProps.dropdownValues.length > 0 && Object.keys(this.state.selectedOption).length==0){
            this.setState({selectedOption: nextProps.dropdownValues[0]})
        }
    }

    _handlePress(item) {
        this.props.forwardTo(`notification/${item.user}`)
    }
    getValue() {
        return this.state.selectedOption;
    }
    toggle() {
        // LayoutAnimation.easeInEaseOut()
        this.setState({ openningDropdown: !this.state.openningDropdown })
    }

    componentWillMount() {

    }
    _handlePressIcon() {
        this.toggle()
    }
    _handlePress(item) {
        this.setState({ selectedOption: item })
        this.props.onSelect && this.props.onSelect(item)
        this.toggle()
    }
    _handlePressDropdown() {

    }
    render() {
        const { notifications, getNotificationRequest, getNotification } = this.props
        let {dropdownValues} = this.props
        const { openningDropdown } = this.state
        let maxHeight = openningDropdown ? 150 : 0
        let fakeZIndex = (maxHeight == 150) ? { zIndex: 1000 } : { zIndex: null }
        const containerStyle = (Platform.OS === 'ios') ? styles.dropdownContainerIos : styles.dropdownContainerAndroid
        let containerStyleTopDown = { ...containerStyle, ...fakeZIndex }
        if (!dropdownValues || dropdownValues.length == 0){
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
                        <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{this.state.selectedOption.name}</Text>
                    </View>
                </View>
            )
        }
        dropdownValues = dropdownValues.filter(item=>item.id!=this.state.selectedOption.id)
        return (
            <View style={containerStyleTopDown}>
                <View style={styles.dropdownHeader}>
                    <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{this.state.selectedOption.name}</Text>
                    <Button style={styles.dropdownIcon} onPress={() => this._handlePressIcon()} transparent>
                        <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"} style={{
                            color: 'white'
                        }} />
                    </Button>
                </View>

                <List
                    contentContainerStyle={{ backgroundColor: PRIMARY_COLOR }}
                    dataArray={dropdownValues}
                    style={{
                        ...styles.dropdownList,
                        maxHeight,
                    }}
                    renderRow={(item) => {
                        return (
                            <ListItem onPress={e => this._handlePress(item)} style={styles.dropdownListItem}>
                                <Text style={styles.dropdownListItemText}>{item.name}</Text>
                            </ListItem>
                        )
                    }
                    }>
                </List>
            </View>
        )
    }
}