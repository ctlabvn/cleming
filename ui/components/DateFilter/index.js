import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Button } from 'native-base'
import { View, ScrollView, ListView, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import styles from './styles'
import Content from '~/ui/components/Content'
import RadioPopup from '~/ui/components/RadioPopup'
import PopupAlert from '~/ui/components/PopupAlert'
import moment from 'moment'
import Icon from '~/ui/elements/Icon'
import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_FORMAT, DEFAULT_YEAR_FORMAT }
    from '~/store/constants/app'
import I18n from '~/ui/I18n'
import DateTimePicker from 'react-native-modal-datetime-picker'
import material from '~/theme/variables/material'
export default class DateFilter extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let defaultFilter = props.defaultFilter || 'day'
        if (props.type == 'lite') {
            defaultFilter = 'week'
            this.dateFilterListValue = [
                {
                    value: 'week',
                    display: `7 ${I18n.t('day')}`
                },
                {
                    value: 'month',
                    display: `1 ${I18n.t('month')}`
                },
                {
                    value: 'quarter',
                    display: `3 ${I18n.t('month')}`
                }
            ]
        }else if (props.type == 'lite-round'){
            // defaultFilter = 'week'
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
        }else{
            this.dateFilterListValue = [
                {
                    value: 'day',
                    display: `1 ${I18n.t('day')}`
                },
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
                {
                    value: 'quarter',
                    display: `3 ${I18n.t('month')}`
                },
                {
                    value: 'half-year',
                    display: `6 ${I18n.t('month')}`
                },
                {
                    value: 'custom',
                    display: `${I18n.t('custom')}`
                }
            ]
        }
        this.state = {
            currentDateFilter: defaultFilter,
            currentSelectValue: this._getDefaultCurrnetSelectValue(defaultFilter),
            isShowingStartDate: false,
            isShowingEndDate: false,
        };
        this.dateFilterHeight = 0
        this.contentWidth = 0
        this.scrollFisrtLoad = true

    }
    getData() {
        return this.state
    }
    _handlePressTriggerDateFilterPopup() {
        const {type} = this.props
        if (type == 'lite-round') {
            this.popupAlert.show('Chu kỳ đối soát mặc định 1 tháng. Liên hệ với Clingme để thay đổi.');
        }
        else this.refs.dateFilterTypePopup.setModalVisible(true);
    }
    _handlePressDateFilter(item) {
        this.setState({ currentSelectValue: item })
        this.props.onPressFilter({
            currentDateFilter: this.state.currentDateFilter,
            currentSelectValue: item
        })
    }

    getCurrentSelectValue() {
        return this.state.currentSelectValue;
    }

    setCurrentSelectValue(item) {
        // this.setState({ currentSelectValue: item })
        // console.warn('date filter ' + JSON.stringify(item))
        this._handlePressDateFilter(item);
    }

    _handleYesDateFilter(item) {
        this.setState({ 
            currentDateFilter: item,
            currentSelectValue: this._getDefaultCurrnetSelectValue(item)
        })
        if (item != 'custom'){
            setTimeout(() => {
                this.refs.dateFilterList.scrollToEnd({ animated: false })
                this.props.onPressFilter(this.state)
            }, 0)
        }
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
        for (let i=0; i<6; i++){
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

    componentDidMount() {
        // setTimeout(() => {
        //     this.refs.dateFilterList && this.refs.dateFilterList.scrollToEnd({ animated: false })
        // }, 0)
    }

    // shouldComponentUpdate(nextProps, nextState){

    //     return (this.state.currentSelectValue != nextState.currentSelectValue
    //             || this.state.isShowingStartDate != nextState.isShowingStartDate
    //             || this.state.isShowingEndDate != nextState.isShowingEndDate
    //     )
    // }

    _getDataForFilter(filterType) {
        const {type} = this.props
        // cache current moment
        const current = moment()
        switch(filterType) {
            case 'day':
                // lastest 7 days
                return [6, 5, 4, 3, 2, 1, 0].map((item) => {
                    const now = current.clone().subtract(item, 'days')                                        
                    return {
                        value: {
                            from: now.startOf('day').unix(),
                            to: now.endOf('day').unix()
                        },
                        display: now.format(DEFAULT_DATE_FORMAT)
                    }
                })
            case 'week':
                if (type == 'lite-round'){
                    let weekPeriod = this._generateItemsForWeekPeriod().slice(-4)
                    return weekPeriod.map(item =>({
                        value: {
                            from: item['start'].unix(),
                            to: item['end'].unix()
                        },
                        display: item['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + item['end'].format(DEFAULT_DATE_FORMAT)
                    }))
                }

                return [4, 3, 2, 1].map((item) => {
                    const substractWeek = current.clone().subtract(item, 'weeks')
                    let startWeek = substractWeek.clone().add(1, 'days').startOf('day')
                    let endWeek = substractWeek.clone().add(7, 'days').endOf('day')
                    return {
                        value: {
                            from: startWeek.unix(),
                            to: endWeek.unix()
                        },
                        display: startWeek.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + endWeek.format(DEFAULT_DATE_FORMAT)
                    }
                })
            case '2weeks':
                if (type == 'lite-round'){
                    let twoWeeksPeriod = this._generateItemsForTwoWeeksPeriod().slice(-4)
                    return twoWeeksPeriod.map(item =>({
                        value: {
                            from: item.start.unix(),
                            to: item.end.unix()
                        },
                        display: item['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + item['end'].format(DEFAULT_DATE_FORMAT)
                    }))
                }

                return [4, 3, 2, 1].map((item) => {
                    const substractWeek = current.clone().subtract(item*2, 'weeks')
                    let startWeek = substractWeek.clone().add(1, 'days').startOf('day')
                    let endWeek = substractWeek.clone().add(14, 'days').endOf('day')
                    return {
                        value: {
                            from: startWeek.unix(),
                            to: endWeek.unix()
                        },
                        display: startWeek.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + endWeek.format(DEFAULT_DATE_FORMAT)
                    }
                })

            case 'month':
                if (type == 'lite-round'){
                    let monthsPeriod = this._generateItemsForMonthPeriod()
                    return monthsPeriod.map(item =>({
                        value: {
                            from: item.start.unix(),
                            to: item.end.unix()
                        },
                        display: item['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + item['end'].format(DEFAULT_DATE_FORMAT)
                    }))
                }
                return [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((item) => {
                    let currentMonth = current.clone().subtract(item, 'months')
                    let startMonth = currentMonth.clone().startOf('month')
                    let endMonth = currentMonth.clone().endOf('month')
                    if (endMonth > current) {
                        endMonth = current.clone().endOf('day')
                    }
                    return {
                        value: {
                            from: startMonth.unix(),
                            to: endMonth.unix()
                        },
                        display: currentMonth.format(DEFAULT_MONTH_FORMAT)
                    }
                })
            case 'quarter':
                return [3, 2, 1, 0].map(item => {
                    let currentQuarter = current.clone().subtract(item, 'quarters')
                    let startQuarter = currentQuarter.startOf('quarter')
                    let endQuarter = currentQuarter.clone().endOf('quarters')
                    if (endQuarter > current) {
                        endQuarter = current.clone().endOf('day')
                    }
                    return {
                        value: {
                            from: startQuarter.unix(),
                            to: endQuarter.unix()
                        },
                        display: startQuarter.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + endQuarter.format(DEFAULT_DATE_FORMAT)
                    }
                })
            case 'half-year':
                return [3, 1].map(item => {                    
                    let startQuarter = current.clone().subtract(item, 'quarters').startOf('quarter')
                    let endQuarter = startQuarter.clone().add(1, 'quarters').endOf('quarters')
                    if (endQuarter > current) {
                        endQuarter = current.clone().endOf('day')
                    }
                    return {
                        value: {
                            from: startQuarter.unix(),
                            to: endQuarter.unix()
                        },
                        display: startQuarter.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + endQuarter.format(DEFAULT_DATE_FORMAT)
                    }
                })

            // case 'year':
            //     return [4, 3, 2, 1, 0].map((item) => {
            //         let currentYear = current.clone().subtract(item, 'years')
            //         let startYear = currentYear.clone().startOf('year')
            //         let endYear = currentYear.clone().endOf('year')
            //         if (endYear > current) {
            //             endYear = current.clone().endOf('day')
            //         }
            //         return {
            //             value: {
            //                 from: startYear.unix(),
            //                 to: endYear.unix()
            //             },
            //             display: currentYear.format(DEFAULT_YEAR_FORMAT)
            //         }
            //     })
        }
    }

    _getDefaultCurrnetSelectValue(filterType) {
        const {type} = this.props
        const current = moment()
        switch(filterType) {
            case 'day':
                let from = current.clone().startOf('day').unix()
                let to = current.clone().endOf('day').unix()
                return {
                    value: {
                        from: from,
                        to: to
                    },
                    display: current.format(DEFAULT_DATE_FORMAT)
                }

            case 'week':
                if (type == 'lite-round'){
                    let currentWeekPeriod = this._generateItemsForWeekPeriod().slice(-1)[0]
                    return {
                        value: {
                            from: currentWeekPeriod['start'].unix(),
                            to: currentWeekPeriod['end'].unix()
                        },
                        display: currentWeekPeriod['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + currentWeekPeriod['end'].format(DEFAULT_DATE_FORMAT) 
                    }
                }
                let startWeek = current.clone().subtract(6, 'days').startOf('day')
                let endWeek = current.endOf('day')
                return {
                    value: {
                        from: startWeek.unix(),
                        to: endWeek.unix()
                    },
                    display: startWeek.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + endWeek.format(DEFAULT_DATE_FORMAT)
                }

            case '2weeks':
                if (type == 'lite-round'){
                    let current2WeekPeriod = this._generateItemsForTwoWeeksPeriod().slice(-1)[0]
                    return {
                        value: {
                            from: current2WeekPeriod['start'].unix(),
                            to: current2WeekPeriod['end'].unix()
                        },
                        display: current2WeekPeriod['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + current2WeekPeriod['end'].format(DEFAULT_DATE_FORMAT) 
                    }
                }

                let star2tWeek = current.clone().subtract(13, 'days').startOf('day')
                let end2Week = current.endOf('day')
                return {
                    value: {
                        from: star2tWeek.unix(),
                        to: end2Week.unix()
                    },
                    display: star2tWeek.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + end2Week.format(DEFAULT_DATE_FORMAT)
                }

            case 'month':
                if (type == 'lite-round'){
                    let currentMonthPeriod = this._generateItemsForMonthPeriod().slice(-1)[0]
                    return {
                        value: {
                            from: currentMonthPeriod['start'].unix(),
                            to: currentMonthPeriod['end'].unix()
                        },
                        display: currentMonthPeriod['start'].format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + currentMonthPeriod['end'].format(DEFAULT_DATE_FORMAT) 
                    }
                }
                let startMonth = current.clone().startOf('month')
                return {
                    value: {
                        from: startMonth.unix(),
                        to: current.clone().endOf('day').unix()
                    },
                    display: current.format(DEFAULT_MONTH_FORMAT)
                }

            case 'quarter':
                let startQuarter = current.clone().startOf('quarters')
                return {
                    value: {
                        from: startQuarter.unix(),
                        to: current.clone().endOf('day').unix()
                    },
                    display: startQuarter.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + current.format(DEFAULT_DATE_FORMAT)
                }

            case 'half-year':
                let startHalfYear = current.clone().subtract(1, 'quarters').startOf('quarters')
                return {
                    value: {
                        from: startHalfYear.unix(),
                        to: current.clone().endOf('day').unix()
                    },
                    display: startHalfYear.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + current.format(DEFAULT_YEAR_FORMAT)
                }
            case 'custom':
                let startCustom = current.clone().subtract(6, 'days').startOf('day')
                let endCustom = current.endOf('day')
                this.setState({startDate: new Date(startCustom.unix()*1000), endDate: new Date(endCustom.unix()*1000)})
                return {
                    value: {
                        from: startCustom.unix(),
                        to: endCustom.unix()
                    },
                    display: startCustom.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + endCustom.format(DEFAULT_DATE_FORMAT)
                }
            // case 'year':
            //     let startYear = current.clone().startOf('year')
            //     return {
            //         value: {
            //             from: startYear.unix(),
            //             to: current.clone().endOf('day').unix()
            //         },
            //         display: current.format(DEFAULT_YEAR_FORMAT)
            //     }


        }
    }
    _onConfirmStartDate = (date)=>{
        console.log('Start Date Confirm: ', date)
        let start = moment(date.getTime())
        let end = moment(this.state.currentSelectValue.value.to*1000)
        let currentValue = {
            value: {
                from: start.unix(),
                to: this.state.currentSelectValue.value.to
            },
            display: start.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + end.format(DEFAULT_DATE_FORMAT)
        }
        this.setState({currentSelectValue: currentValue, startDate: date, isShowingStartDate: false})
    }
    _onCancelStartDate = ()=>{
        this.setState({isShowingStartDate: false})
    }

    _triggerStartDate = ()=>{
        this.setState({isShowingStartDate: true})
    }

    _triggerEndDate = () => {
        this.setState({isShowingEndDate: true})
    }

    _onConfirmEndDate = (date)=>{
        let start = moment(this.state.currentSelectValue.value.from*1000)
        let end = moment(date.getTime())
        let currentValue = {
            value: {
                from: this.state.currentSelectValue.value.from,
                to: end.unix()
            },
            display: start.format(DEFAULT_DATE_FORMAT) + ` ${I18n.t('to')} ` + end.format(DEFAULT_DATE_FORMAT)
        }
        this.setState({currentSelectValue: currentValue, endDate: date, isShowingEndDate: false})
    }
    _onCancelEndDate = ()=>{
        this.setState({isShowingEndDate: false})
    }

    _onOkCustomDate = ()=>{
        this.props.onPressFilter({
            currentDateFilter: 'custom',
            currentSelectValue: this.state.currentSelectValue
        })
    }
    render() {        
        // find will not search through
        const currentDateFilter = this.dateFilterListValue.find(item => item.value === this.state.currentDateFilter)
        const currentDateFilterDisplay = currentDateFilter.display
        let data, _data, currentSelectValue
        if (currentDateFilter.value != 'custom'){
            _data = this._getDataForFilter(this.state.currentDateFilter)
            data = this.ds.cloneWithRows(_data)
            currentSelectValue = this.state.currentSelectValue.display ? this.state.currentSelectValue : this._getDefaultCurrnetSelectValue(this.state.currentDateFilter)
        }
        return (
            <View onLayout={()=>{
                            if(this.scrollFisrtLoad){
                             setTimeout(() => this.refs.dateFilterList && this.refs.dateFilterList.scrollToEnd({ animated: false }), 1000)
                            }
                            this.scrollFisrtLoad = false
                        }
                    } style={styles.dateFilter}>
                <DateTimePicker
                      isVisible={this.state.isShowingStartDate}
                      onConfirm={(date)=>this._onConfirmStartDate(date)}
                      onCancel={()=>this._onCancelStartDate()}
                      mode='date'
                      datePickerModeAndroid='calendar'
                    date={this.state.startDate}
                        titleIOS={I18n.t('choose_start_date')}
                        confirmTextIOS={I18n.t('ok')}
                        cancelTextIOS={I18n.t('cancel')}
                    />
                <DateTimePicker
                      isVisible={this.state.isShowingEndDate}
                      onConfirm={(date)=>this._onConfirmEndDate(date)}
                      onCancel={()=>this._onCancelEndDate()}
                      mode='date'
                      datePickerModeAndroid='calendar'
                      date={this.state.endDate}
                      titleIOS={I18n.t('choose_end_date')}
                        confirmTextIOS={I18n.t('ok')}
                        cancelTextIOS={I18n.t('cancel')}
                    />
                <RadioPopup ref='dateFilterTypePopup' listValue={this.dateFilterListValue} selectedValue={this.state.currentDateFilter} onClickYes={this._handleYesDateFilter.bind(this)} />
                <PopupAlert ref={ref=>this.popupAlert = ref} icon='logo' onOk={()=>{}}/>
                <View style={styles.row}>
                <TouchableOpacity onPress={() => this._handlePressTriggerDateFilterPopup()}>
                    <View style={styles.stickPart}>
                        <Icon name="calendar" style={styles.calendarIcon} />
                        <Text small style={styles.filterIntevalLabel}>{currentDateFilterDisplay}</Text>
                    </View>
                </TouchableOpacity>
                {(currentDateFilter.value!='custom') &&
                    <ListView                    
                        enableEmptySections={true}
                        style={styles.dateFilterList}    
                        initialListSize={_data.length}                
                        horizontal={true} showsHorizontalScrollIndicator={false}
                        ref='dateFilterList' dataSource={data}
                        removeClippedSubviews={false}
                        renderRow={
                            (rowData, sectionID, rowID, highlightRow) => {
                                let lastItemStyle = null
                                if (rowID == _data.length - 1) {
                                    lastItemStyle = {
                                        marginRight: 0
                                    }
                                }
                                return (
                                    <TouchableOpacity
                                        style={{ marginRight: 20, ...lastItemStyle }}
                                        onPress={() => this._handlePressDateFilter(rowData)}>
                                        <Text
                                            small
                                            style={(rowData.value.from == currentSelectValue.value.from 
                                                    && rowData.value.to == currentSelectValue.value.to) 
                                                ? styles.dateFilterListItemActive 
                                                : styles.dateFilterListItemDeactive}>{rowData.display}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    />
                }
                {(currentDateFilter.value == 'custom') &&
                        <View style={{...styles.row}}>
                            <TouchableWithoutFeedback onPress={()=>this._triggerStartDate()}>
                                <View style={styles.calendarSelector}>
                                    <Text>{moment(this.state.startDate).format(DEFAULT_DATE_FORMAT)}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this._triggerEndDate()}>
                                <View style={styles.calendarSelector}>
                                    <Text>{moment(this.state.endDate).format(DEFAULT_DATE_FORMAT)}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Button style={styles.buttonCustomDateFilter}
                                onPress={()=>this._onOkCustomDate()}
                            >
                                <Text>Ok</Text>
                            </Button>
                        </View>
                }
                </View>
            </View>
        )
    }
}