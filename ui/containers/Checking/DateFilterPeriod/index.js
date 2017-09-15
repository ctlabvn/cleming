import React, {Component} from 'react'
import {Container, Text, List, Spinner, View, Button} from 'native-base'
import {TouchableHighlight, VirtualizedList, TouchableWithoutFeedback} from 'react-native'
import I18n from '~/ui/I18n'
import material from '~/theme/variables/material'
import Icon from '~/ui/elements/Icon'
import Border from "~/ui/elements/Border";
import styles from './styles'
import moment from "moment";
import {formatNumber} from "~/ui/shared/utils";
import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_FORMAT, DEFAULT_YEAR_FORMAT }
    from '~/store/constants/app'

export default class DateFilterPeriod extends Component {

    constructor(props) {
      super(props)
      this.state = {
          page: 0
      }
    }

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.data.length > this.props.data.length){
        let currentValue = this._getDataForFilter(this.props.data)[this.state.page]
        if (currentValue && currentValue.id){
          let newPage = this._getDataForFilter(nextProps.data).findIndex(item => item.id== currentValue.id)
          this.setState({page: newPage})
        }
      }
      else if (nextProps.select != this.props.select){
        let page = this._getDataForFilter(this.props.data).findIndex(item => item.id == nextProps.select)
        let currentValue = this._getDataForFilter(this.props.data)[page]

        if (page != this.state.page){
          this.dateFilterPeriod.scrollToIndex({index: page})
          this.setState({page: page})
          this.props.onChangeDate && this.props.onChangeDate(currentValue, false)
        }
      }
    }

    componentDidMount(){
      setTimeout(()=>{
        if (this.props.select){
          let page = this._getDataForFilter(this.props.data).findIndex(item => item.id == this.props.select)
          if (page >-1){
            this.dateFilterPeriod.scrollToIndex({index: page})
            this.setState({page: page})
            let currentValue = this._getDataForFilter(this.props.data)[page]
            this.props.onChangeDate && this.props.onChangeDate(currentValue)
          }
        }else{
          this.dateFilterPeriod.scrollToEnd({animated: false})
          let length = this._getDataForFilter(this.props.data).length
          this.setState({page: length-1})
          let currentValue = this._getDataForFilter(this.props.data)[length-1]
          this.props.onChangeDate && this.props.onChangeDate(currentValue)
        }
      }, 100)
    }

    _generateTypeDisplay = (type) => {
      // "cycleType": int		// 1 là 1 tuần, 2 là 2 tuần, 3 là 1 tháng
      switch (type) {
        case 1:
          return `1 ${I18n.t('week')}`
        case 2:
          return `2 ${I18n.t('week')}`
        case 3:
        default:
          return `1 ${I18n.t('month')}`
      }
    }
    _getDataForFilter(data) {
        return data.slice()
                   .reverse()
                   .map(item => ({
                    ...item,
                    typeDisplay: this._generateTypeDisplay(item.type),
                    display: moment(item['fromTime']*1000).format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + moment(item['toTime']*1000).format(DEFAULT_DATE_FORMAT)
                   }))
    }

    onScrollEnd = (e) => {
      let contentOffset = e.nativeEvent.contentOffset;
      let viewSize = e.nativeEvent.layoutMeasurement;
      // console.log('Content offset', contentOffset);
      // console.log('View Size', viewSize);
      // Divide the horizontal offset by the width of the view to see which page is visible
      let pageNum = Math.ceil(contentOffset.x / viewSize.width);
      // console.log('Page Num', pageNum);
      if (pageNum <=0){
        this.props.loadMore && this.props.loadMore()
      }

      this.setState({page: pageNum},
        () => {
          let currentValue = this._getDataForFilter(this.props.data)[pageNum]
          // console.log('Current Value', currentValue);
          this.props.onChangeDate && this.props.onChangeDate(currentValue)
        }
      )
    }

    _renderItem = ({item}) => {
      let text = <Text small style={styles.dateFilterListItemActive}>{item.display}</Text>
      return <View style={styles.itemContainer}>
        <Text>{text}</Text>
      </View>
    }

    _goNext = () => {
      let page = this.state.page
      // console.log("prev Page", this.state.page);
      if (page >= this._getDataForFilter(this.props.data).length-1) return
      page ++
      this.setState({page: page},
        ()=>{
          this.dateFilterPeriod.scrollToIndex({index: page})
          let currentValue = this._getDataForFilter(this.props.data)[page]
          this.props.onChangeDate && this.props.onChangeDate(currentValue)
        }
      )
    }

    _goPrevious = () => {
      let page = this.state.page
      // console.log("prev Page", this.state.page);
      if (page <= 0) return
      page --
      if (page <=0){
        this.props.loadMore && this.props.loadMore()
      }
      this.dateFilterPeriod.scrollToIndex({index: page})
      this.setState({page: page}, ()=> {
        let currentValue = this._getDataForFilter(this.props.data)[page]
        this.props.onChangeDate && this.props.onChangeDate(currentValue)
      })

    }

    getItemLayout = (data, index) => {
      let length = Math.floor(material.deviceWidth-160)
      return { length: length, offset: length * index, index }
    }

    render() {
        let hasPrevious = true, hasNext = true
        if (this.state.page <= 0) hasPrevious = false
        if (this.state.page >= this._getDataForFilter(this.props.data).length-1) hasNext = false
        if (!this.props.data || this.props.data.length == 0) return <View />
        return (
          <View style={styles.row}>
            <View style={styles.stickPart}>
                <Icon name="calendar" style={styles.calendarIcon} />
                <Text small style={styles.filterIntevalLabel}>{this._getDataForFilter(this.props.data)[this.state.page].typeDisplay}</Text>
            </View>
            {!hasPrevious && <View style={styles.fakeIcon} />}
            {hasPrevious && <TouchableWithoutFeedback onPress={this._goPrevious}>
              <View style={styles.iconContainer}>
                <Icon name='back' style={styles.navigateIcon} />
              </View>
            </TouchableWithoutFeedback>}
            <VirtualizedList
              data={this._getDataForFilter(this.props.data)}
              renderItem={this._renderItem}
              keyExtractor={item=>item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={this.onScrollEnd}
              ref={ref=>this.dateFilterPeriod=ref}
              onEndReachedThreshold={10}
              getItemLayout={this.getItemLayout}
            />
            {hasNext && <TouchableWithoutFeedback onPress={this._goNext}>
              <View style={styles.iconContainer}>
                <Icon name='foward' style={styles.navigateIcon} />
              </View>
            </TouchableWithoutFeedback>}
            {!hasNext && <View style={styles.fakeIcon} />}
          </View>
        )
    }
}
