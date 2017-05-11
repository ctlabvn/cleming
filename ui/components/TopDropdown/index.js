import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing, LayoutAnimation } from 'react-native'
import styles from './styles'
import Content from '~/ui/components/Content'


export default class TopDropdown extends PureComponent {
    _handlePress(item) {
        this.props.forwardTo(`notification/${item.user}`)
    }
    constructor(props) {
        super(props)
        this.state = {
            openningDropdown: false,
            zIndex: 0,
            fadeAnim: new Animated.Value(0),
            selectedOption: props.selectedOption||{id: -1, name: ""},
            dropdownValues: props.dropdownValues||[],
        }
    }
    getValue(){
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

        this.setState({ openningDropdown: !this.state.openningDropdown }, () => {
            // console.log('Open/Closing drop down');
            this.props.onSelect && this.props.onSelect(this.state.selectedOption)
        })
    }

    componentWillMount() {

    }
    _handlePressIcon() {
        this.toggle()
    }
    _handlePress(item) {
        this.setState({ selectedOption: item })        
        this.toggle()
    }
    _handlePressDropdown() {

    }
    render() {
        const { notifications, getNotificationRequest, getNotification, dropdownValues } = this.props
        const { openningDropdown } = this.state
        const maxHeight = openningDropdown ? 150 : 0
        // console.log(this.props.dropdownValues)
        // const height = Animated.multiply(this.state.fadeAnim, new Animated.Value(150))
        return (
            <View style={styles.dropdownContainer}>
                <View style={styles.dropdownHeader}>
                    <Text numberOfLines={1}  style={styles.dropdownSelectedValue}>{this.state.selectedOption.name}</Text>
                    <Button style={styles.dropdownIcon} onPress={() => this._handlePressIcon()} transparent>
                        <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"} style={{
                            color: 'white'
                        }}
                        ></Icon>
                    </Button>
                </View>

                <List dataArray={dropdownValues} style={{
                    ...styles.dropdownList,
                    maxHeight,
                }}
                    renderRow={(item) =>
                        <ListItem onPress={e => this._handlePress(item)} style={styles.dropdownListItem}>
                            <Text style={styles.dropdownListItemText}>{item.name}</Text>
                        </ListItem>
                    }>
                </List>
            </View>
        )
    }
}