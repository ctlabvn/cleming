import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Button } from 'native-base'
import { View, ListView, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import styles from './styles'
import Content from '~/ui/components/Content'
import RadioPopup from '~/ui/components/RadioPopup'
import moment from 'moment'
import Icon from '~/ui/elements/Icon'
import { DEFAULT_DATE_FORMAT, DEFAULT_MONTH_FORMAT, DEFAULT_YEAR_FORMAT }
    from '~/store/constants/app'
export default class DateFilter extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let defaultFilter = props.defaultFilter || 'week'
        this.state = {
            currentDateFilter: defaultFilter,
            currentSelectValue: this._getDefaultCurrnetSelectValue(defaultFilter)
        };
        this.dateFilterListValue = [
            {
                value: 'day',
                display: '1 ngày'
            },
            {
                value: 'week',
                display: '7 ngày'
            },
            {
                value: 'month',
                display: '1 tháng'
            },
            {
                value: 'quarter',
                display: '3 tháng'
            },
            {
                value: 'half-year',
                display: '6 tháng'
            },
            {
                value: 'year',
                display: '1 năm'
            }
        ]
        if (props.type == 'lite') {
            this.dateFilterListValue = [
                {
                    value: 'week',
                    display: '7 ngày'
                },
                {
                    value: 'month',
                    display: '1 tháng'
                },
                {
                    value: 'quarter',
                    display: '3 tháng'
                }
            ]
        }
        this.dateFilterHeight = 0
        this.contentWidth = 0
    }
    getData() {
        return this.state
    }
    _handlePressTriggerDateFilterPopup() {
        this.refs.dateFilterTypePopup.setModalVisible(true)
    }
    _handlePressDateFilter(item) {
        this.setState({ currentSelectValue: item })
        this.props.onPressFilter({
            currentDateFilter: this.state.currentDateFilter,
            currentSelectValue: item
        })
    }
    _handleYesDateFilter(item) {
        this.setState({ currentDateFilter: item })
        this.setState({ currentSelectValue: this._getDefaultCurrnetSelectValue(item) })
        setTimeout(() => {
            this.refs.dateFilterList.scrollToEnd({ animated: false })
            this.props.onPressFilter(this.state)
        }, 0)

    }
    componentDidMount() {
        setTimeout(() => {
            this.refs.dateFilterList && this.refs.dateFilterList.scrollToEnd({ animated: false })
        }, 0)
    }
    componentDidUpdate() {
        // this.refs.dateFilterList.scrollToEnd({ animated: false })
    }
    _getDataForFilter(filterType) {
        if (filterType == 'day') {
            // lastest 7 days
            return [6, 5, 4, 3, 2, 1, 0].map((item) => {
                let now = moment().subtract(item, 'days')
                let from = moment().subtract(item, 'days').startOf('day').unix()
                let to = moment().subtract(item, 'days').endOf('day').unix()
                return {
                    value: {
                        from: from,
                        to: to
                    },
                    display: now.format(DEFAULT_DATE_FORMAT)
                }
            })
        } else if (filterType == 'week') {
            return [4, 3, 2, 1].map((item) => {
                let startWeek = moment().subtract(item, 'weeks').add(1, 'days').startOf('day')
                let endWeek = moment().subtract(item, 'weeks').add(7, 'days').endOf('day')
                return {
                    value: {
                        from: startWeek.unix(),
                        to: endWeek.unix()
                    },
                    display: startWeek.format(DEFAULT_DATE_FORMAT) + ' đến ' + endWeek.format(DEFAULT_DATE_FORMAT)
                }
            })
        } else if (filterType == 'month') {
            return [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((item) => {
                let currentMonth = moment().subtract(item, 'months')
                let startMonth = moment().subtract(item, 'months').startOf('month')
                let endMonth = moment().subtract(item, 'months').endOf('month')
                if (endMonth > moment()) {
                    endMonth = moment().endOf('day')
                }
                return {
                    value: {
                        from: startMonth.unix(),
                        to: endMonth.unix()
                    },
                    display: currentMonth.format(DEFAULT_MONTH_FORMAT)
                }
            })
        } else if (filterType == 'quarter') {
            return [3, 2, 1, 0].map(item => {
                let currentQuarter = moment().subtract(item, 'quarters')
                let startQuarter = moment().subtract(item, 'quarters').startOf('quarter')
                let endQuarter = moment().subtract(item, 'quarters').endOf('quarters')
                if (endQuarter > moment()) {
                    endQuarter = moment().endOf('day')
                }
                return {
                    value: {
                        from: startQuarter.unix(),
                        to: endQuarter.unix()
                    },
                    display: startQuarter.format(DEFAULT_DATE_FORMAT) + ' đến ' + endQuarter.format(DEFAULT_DATE_FORMAT)
                }
            })
        } else if (filterType == 'half-year') {
            return [3, 1].map(item => {
                let currentQuarter = moment().subtract(item, 'quarters')
                let startQuarter = moment().subtract(item, 'quarters').startOf('quarter')
                let endQuarter = moment().subtract(item - 1, 'quarters').endOf('quarters')
                if (endQuarter > moment()) {
                    endQuarter = moment().endOf('day')
                }
                return {
                    value: {
                        from: startQuarter.unix(),
                        to: endQuarter.unix()
                    },
                    display: startQuarter.format(DEFAULT_DATE_FORMAT) + ' đến ' + endQuarter.format(DEFAULT_DATE_FORMAT)
                }
            })

        } else if (filterType == 'year') {
            return [4, 3, 2, 1, 0].map((item) => {
                let currentYear = moment().subtract(item, 'years')
                let startYear = moment().subtract(item, 'years').startOf('year')
                let endYear = moment().subtract(item, 'years').endOf('year')
                if (endYear > moment()) {
                    endYear = moment().endOf('day')
                }
                return {
                    value: {
                        from: startYear.unix(),
                        to: endYear.unix()
                    },
                    display: currentYear.format(DEFAULT_YEAR_FORMAT)
                }
            })
        }
    }
    _getDefaultCurrnetSelectValue(filterType) {
        if (filterType == 'day') {
            let now = moment()
            let from = moment().startOf('day').unix()
            let to = moment().endOf('day').unix()
            return {
                value: {
                    from: from,
                    to: to
                },
                display: now.format(DEFAULT_DATE_FORMAT)
            }
        } else if (filterType == 'week') {
            let startWeek = moment().subtract(6, 'days').startOf('day')
            let endWeek = moment().endOf('day')
            return {
                value: {
                    from: startWeek.unix(),
                    to: endWeek.unix()
                },
                display: startWeek.format(DEFAULT_DATE_FORMAT) + ' đến ' + endWeek.format(DEFAULT_DATE_FORMAT)
            }


        } else if (filterType == 'month') {
            let current = moment()
            let startMonth = moment().startOf('month')
            return {
                value: {
                    from: startMonth.unix(),
                    to: current.endOf('day').unix()
                },
                display: current.format(DEFAULT_MONTH_FORMAT)
            }
        } else if (filterType == 'quarter') {
            let current = moment()
            let startQuarter = moment().startOf('quarters')
            return {
                value: {
                    from: startQuarter.unix(),
                    to: current.endOf('day').unix()
                },
                display: startQuarter.format(DEFAULT_DATE_FORMAT) + ' đến ' + current.format(DEFAULT_DATE_FORMAT)
            }
        } else if (filterType == 'half-year') {
            let current = moment()
            let startHalfYear = moment().subtract(1, 'quarters').startOf('quarters')
            return {
                value: {
                    from: startHalfYear.unix(),
                    to: current.endOf('day').unix()
                },
                display: startHalfYear.format(DEFAULT_DATE_FORMAT) + ' đến ' + current.format(DEFAULT_YEAR_FORMAT)
            }
        } else if (filterType == 'year') {
            let current = moment()
            let startYear = moment().startOf('year')
            return {
                value: {
                    from: startYear.unix(),
                    to: current.endOf('day').unix()
                },
                display: current.format(DEFAULT_YEAR_FORMAT)
            }
        }
    }
    render() {
        const currentDateFilterDisplay = this.dateFilterListValue.filter((item) => item.value == this.state.currentDateFilter)[0].display
        const _data = this._getDataForFilter(this.state.currentDateFilter)
        const data = this.ds.cloneWithRows(_data)
        var currentSelectValue = this.state.currentSelectValue.display ? this.state.currentSelectValue : this._getDefaultCurrnetSelectValue(this.state.currentDateFilter)

        return (
            <View style={styles.dateFilter}>
                <RadioPopup ref='dateFilterTypePopup' listValue={this.dateFilterListValue} selectedValue={this.state.currentDateFilter} onClickYes={this._handleYesDateFilter.bind(this)} />
                <TouchableOpacity onPress={() => this._handlePressTriggerDateFilterPopup()}>
                    <View style={styles.stickPart}>
                        <Icon name="calendar" style={styles.calendarIcon} />
                        <Text small style={styles.filterIntevalLabel}>{currentDateFilterDisplay}</Text>
                    </View>
                </TouchableOpacity>
                <ListView
                    style={styles.dateFilterList}
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
                                        style={(rowData.value.from == currentSelectValue.value.from && rowData.value.to == currentSelectValue.value.to) ? styles.dateFilterListItemActive : styles.dateFilterListItemDeactive}>{rowData.display}</Text>
                                </TouchableOpacity>
                            )
                        }
                    }
                />
            </View>
        )
    }
}