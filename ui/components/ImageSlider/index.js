import React, { PropTypes, Component } from 'react';
import { View, FlatList, Platform, RefreshControl, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import material from '~/theme/variables/material.js'
export default class ImageSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  _renderItem=(item) => {
    return <Image source={{uri: item.fullPath}} style={{resizeMode: 'cover', width: material.deviceWidth, height: 250}}
    />
  }

  _goPrevious = () => {
    if (this.state.page <= 0) return
    let page = this.state.page - 1
    this.imageSlider.scrollToIndex({index: page})
    this.setState({page: page})
  }

  _goNext = () => {
    if (this.state.page >= this.props.data.length-1) return
    let page = this.state.page + 1
    this.imageSlider.scrollToIndex({index: page})
    this.setState({page: page})
  }

  getItemLayout = (data, index) => (
    { length: material.deviceWidth, offset: material.deviceWidth * index, index }
  )

  onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let page = Math.floor(contentOffset.x / viewSize.width)
    this.setState({page: page})
  }

  render() {
    let showPrev = true, showNext = true
    if (this.state.page <= 0) showPrev = false
    if (this.state.page >= this.props.data.length-1) showNext = false
    if (!this.props.data || this.props.data.length == 0) return <View />
    return (
      <View style={styles.imageSlider}>
        <FlatList
          horizontal={true}
          data={this.props.data}
          renderItem={({item})=>this._renderItem(item)}
          getItemLayout={this.getItemLayout}
          keyExtractor={item=>item.pictureId}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.onScrollEnd}
          ref={ref=>this.imageSlider=ref}
        />

        {showPrev && <TouchableWithoutFeedback onPress={this._goPrevious}>
          <View style={{...styles.iconContainer, ...styles.iconPrevious}}>
            <Icon name='back' style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>}

        {showNext && <TouchableWithoutFeedback onPress={this._goNext}>
          <View style={{...styles.iconContainer, ...styles.iconNext}}>
            <Icon name='foward' style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>}
      </View>
    )

  }
}
