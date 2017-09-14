import React, {Component} from 'react'
import {Container, Text, List, Spinner, View, Button} from 'native-base'
import {TouchableHighlight, VirtualizedList} from 'react-native'
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
      let defaultFilter = props.defaultFilter || '2weeks'
      this.dateFilterListValue = [
          {
              value: 'week',
              display: `7 ${I18n.t('day')}`
          },
          {
              value: '2weeks',
              display: `2 ${I18n.t('week')}`
          },
          {
              value: 'month',
              display: `1 ${I18n.t('month')}`
          },
      ]
      this.state = {
          currentDateFilter: defaultFilter,
          currentSelectValue: this._getDefaultCurrentSelectValue(defaultFilter),
          page: 0
      }
    }

    componentDidMount(){
      setTimeout(()=>this.dateFilterPeriod.scrollToEnd({animated: false}), 100)
    }

    _generateItemsForWeekPeriod = () => {
        const current = moment()
        const startPrevMonth = current.clone().subtract(1, 'months').startOf('month')
        let prevLoop = startPrevMonth
        let result = []
        for (let i=0; i<8; i++){
            let temp = {}
            if (i%4 == 3){
                temp['start'] = prevLoop.clone()
                let end = prevLoop.clone().endOf('month')
                temp['end'] = end
                if (end.isAfter(current)){
                    temp['end'] = current.clone().endOf('day')
                    result.push(temp)
                    break
                }
                prevLoop = end.clone().add(1, 'days').startOf('day')

            }else{
                temp['start'] = prevLoop.clone()
                let end = prevLoop.clone().add(6, 'days').endOf('day')
                temp['end'] = end
                if (end.isAfter(current)){
                    temp['end'] = current.clone().endOf('day')
                    result.push(temp)
                    break
                }
                prevLoop = end.clone().add(1, 'days').startOf('day')

            }
            result.push(temp)
        }
        return result
    }

    _generateItemsForTwoWeeksPeriod = () => {
        const current = moment()
        const startPrevTwoMonth = current.clone().subtract(2, 'months').startOf('month')
        let prevLoop = startPrevTwoMonth
        let result = []
        for (let i=0; i<12; i++){
            let temp = {}
            if (i%2 == 1){
                temp['start'] = prevLoop.clone()
                let end = prevLoop.clone().endOf('month')
                temp['end'] = end
                if (end.isAfter(current)){
                    temp['end'] = current.clone().endOf('day')
                    result.push(temp)
                    break
                }
                prevLoop = end.clone().add(1, 'days').startOf('day')

            }else{
                temp['start'] = prevLoop.clone()
                let end = prevLoop.clone().add(13, 'days').endOf('day')
                temp['end'] = end
                if (end.isAfter(current)){
                    temp['end'] = current.clone().endOf('day')
                    result.push(temp)
                    break
                }
                prevLoop = end.clone().add(1, 'days').startOf('day')

            }
            result.push(temp)
        }
        return result
    }

    _generateItemsForMonthPeriod = () => {
        const current = moment()
        let result = []
        for (let i=3; i>=0; i--){
            if (i !=0){
                let start = current.clone().subtract(i, 'months').startOf('month')
                let end = current.clone().subtract(i, 'months').endOf('month')
                result.push({start, end})
            }else{
                let start = current.clone().startOf('month')
                let end = current.clone().endOf('day')
                result.push({start, end})
            }
        }
        return result
    }

    _getDefaultCurrentSelectValue(filterType) {
        const current = moment()
        switch(filterType) {
            case 'week':
              let currentWeekPeriod = this._generateItemsForWeekPeriod().slice(-1)[0]
              return {
                  value: {
                      from: currentWeekPeriod['start'].unix(),
                      to: currentWeekPeriod['end'].unix()
                  },
                  display: currentWeekPeriod['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + currentWeekPeriod['end'].format(DEFAULT_DATE_FORMAT)
              }

            case '2weeks':
              let current2WeekPeriod = this._generateItemsForTwoWeeksPeriod().slice(-1)[0]
              return {
                  value: {
                      from: current2WeekPeriod['start'].unix(),
                      to: current2WeekPeriod['end'].unix()
                  },
                  display: current2WeekPeriod['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + current2WeekPeriod['end'].format(DEFAULT_DATE_FORMAT)
              }

            case 'month':
              let currentMonthPeriod = this._generateItemsForMonthPeriod().slice(-1)[0]
              return {
                  value: {
                      from: currentMonthPeriod['start'].unix(),
                      to: currentMonthPeriod['end'].unix()
                  },
                  display: currentMonthPeriod['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + currentMonthPeriod['end'].format(DEFAULT_DATE_FORMAT)
              }
        }
    }


    _getDataForFilter(filterType) {
        const current = moment()
        switch(filterType) {
            case 'week':
              let weekPeriod = this._generateItemsForWeekPeriod().slice(-4)
              return weekPeriod.map(item =>({
                  value: {
                      from: item['start'].unix(),
                      to: item['end'].unix()
                  },
                  display: item['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + item['end'].format(DEFAULT_DATE_FORMAT)
              }))
            case '2weeks':
              let twoWeeksPeriod = this._generateItemsForTwoWeeksPeriod().slice(-4)
              return twoWeeksPeriod.map(item =>({
                  value: {
                      from: item.start.unix(),
                      to: item.end.unix()
                  },
                  display: item['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + item['end'].format(DEFAULT_DATE_FORMAT)
              }))

            case 'month':
              let monthsPeriod = this._generateItemsForMonthPeriod()
              return monthsPeriod.map(item =>({
                  value: {
                      from: item.start.unix(),
                      to: item.end.unix()
                  },
                  display: item['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + item['end'].format(DEFAULT_DATE_FORMAT)
              }))



        }
    }

    onScrollEnd = (e) => {
      let contentOffset = e.nativeEvent.contentOffset;
      let viewSize = e.nativeEvent.layoutMeasurement;
      console.log('Content offset', contentOffset);
      console.log('View Size', viewSize);
      // Divide the horizontal offset by the width of the view to see which page is visible
      let pageNum = Math.ceil(contentOffset.x / viewSize.width);
      this.setState({page: pageNum},
        () => {
          let currentValue = this._getDataForFilter(this.props.type)[pageNum]
          console.log('Current Value', currentValue);
          this.setState({currentSelectValue: currentValue})
          this.props.onChangeDate && this.props.onChangeDate(currentValue)
        }
      )
    }

    _renderItem = ({item}) => {
      let text = <Text small
         style={(item.value.from == this.state.currentSelectValue.value.from
                 && item.value.to == this.state.currentSelectValue.value.to)
             ? styles.dateFilterListItemActive
             : styles.dateFilterListItemDeactive}>{item.display}</Text>
      return <View style={styles.itemContainer}>
        <Text>{text}</Text>
      </View>
    }

    render() {
        return (
          <View style={styles.row}>
            <View style={styles.stickPart}>
                <Icon name="calendar" style={styles.calendarIcon} />
                <Text small style={styles.filterIntevalLabel}>1 tháng</Text>
            </View>
            <VirtualizedList
              data={this._getDataForFilter(this.props.type)}
              renderItem={this._renderItem}
              keyExtractor={item=>item.display}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={this.onScrollEnd}
              ref={ref=>this.dateFilterPeriod=ref}
              onEndReachedThreshold={10}
              onEndReached={() => {
                console.log('on end reached ')
              }}
            />
          </View>
        )
    }
}
