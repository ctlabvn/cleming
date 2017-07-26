import React, { Component } from 'react'
import styles from './styles'
import moment from 'moment'
import ProgressCircle from 'react-native-progress-circle'
import { Text } from 'native-base'
import { View } from 'react-native'
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countTo: props.countTo, // seconds
            baseMinute: props.baseMinute,
            counting: props.counting
        }
        this.intervalID = -1
    }
    componentDidMount() {
        this.startInterval()
    }
    // componentWillBlur() {
    //     // why not stop
    //     this.stopInterval()
    // }
    stopInterval() {
        console.log('Go to clear Interval')
        clearInterval(this.intervalID)
        this.intervalID = -1
    }
    startInterval() {
        if (this.intervalID != -1) return
        if (this.state.countTo < moment().unix() ||
            (this.state.countTo - moment().unix()) > this.state.baseMinute * 60) return
        this.intervalID = setInterval(() => {
            let now = moment().unix()
            let countDownMinute = Math.floor((this.state.countTo - now) / 60)
            if (countDownMinute <= 0) {
                this.stopInterval()
            } else if (countDownMinute > this.state.baseMinute) {
                this.stopInterval()
            }
            this.forceUpdate()
        }, 60000)
    }
    componentWillUnmount() {
        this.stopInterval()
    }
    componentWillReceiveProps({ countTo, counting }) {
        // console.log('Will receive props', counting)
        // console.log('Will receive props', countTo)
        if (countTo != this.state.countTo) {
            this.setState({ countTo: countTo })
        }
        if (!counting) {
            this.stopInterval()
        } else {
            this.startInterval()
        }
    }
    render() {
        let now = moment().unix()
        let countDownMinute = Math.floor((this.state.countTo - now) / 60)
        if (countDownMinute < 0) {
            countDownMinute = 0
        }
        if (countDownMinute > this.state.baseMinute) {
            return <View></View>
        }
        return (
            <ProgressCircle
                percent={Math.floor(countDownMinute / this.state.baseMinute * 100)}
                radius={20}
                borderWidth={3}
                color="red"
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 18, color: 'red' }}>{countDownMinute}'</Text>
            </ProgressCircle>
        )

    }
}