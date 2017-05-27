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
        this.state = {
            openningDropdown: false,
            zIndex: 0,
            // fadeAnim: new Animated.Value(0),
            selectedOption: props.selectedOption || props.dropdownValues[0],
            dropdownValues: props.dropdownValues || [],
        }
    }

    /*componentWillReceiveProps(nextProps) {
      if (this.props.modalOpen != nextProps.modalOpen) {
        if (nextProps.modalOpen == "open" && this.state.openningDropdown == true) {
          this.toggle()
        }
      }
    }*/

    _handlePress(item) {
        this.props.forwardTo(`notification/${item.user}`)
    }
    getValue() {
        return this.state.selectedOption;
    }
    toggle() {
        // Animated.timing(this.state.fadeAnim, {
        //     toValue: this.state.openningDropdown ? 0 : 1,
        //     duration: this.state.openningDropdown ? 300 : 300,
        //     easing: Easing.inOut(Easing.quad)
        // }).start(() => {
        //     // console.log('Open/Closing drop down');
        //     this.props.onSelect && this.props.onSelect(this.state.selectedOption)
        // });

        LayoutAnimation.easeInEaseOut()

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