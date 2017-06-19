/**
 * Created by vjtc0n on 5/12/17.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Right, Left, Grid, View, Col } from 'native-base'
import { TouchableWithoutFeedback, Animated, Easing, LayoutAnimation } from 'react-native'
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
      selectedOption: props.selectedOption || { id: -1, name: "" },
      dropdownValues: props.dropdownValues || [],
    }
  }
  getValue() {
    return this.state.selectedOption;
  }
  toggle() {
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
    const { notifications, getNotificationRequest, getNotification, dropdownValues } = this.props
    const { openningDropdown } = this.state
    const maxHeight = openningDropdown ? 150 : 0

    if (dropdownValues.length == 1) {
      return (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownHeader}>
            <Grid>
              <Col style={{ justifyContent: 'center' }}>
                <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{this.state.selectedOption.name}</Text>
              </Col>
            </Grid>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownHeader}>
          <Grid>
            <Col style={{ justifyContent: 'center' }}>
              <Text numberOfLines={1} style={styles.dropdownSelectedValue}>{this.state.selectedOption.name}</Text>
            </Col>
            <Col>
              <Button style={styles.dropdownIcon} onPress={() => this._handlePressIcon()} transparent>
                <Icon name={openningDropdown ? "clear" : "keyboard-arrow-down"} style={{ color: '#7e7e7e' }} />
              </Button>
            </Col>
          </Grid>
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