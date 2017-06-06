import React, { Component } from 'react'
import styles from './styles'
import moment from 'moment'
import ProgressCircle from 'react-native-progress-circle'
import { Text } from 'native-base'
import {View} from 'react-native'
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
        console.log('Did Mount Circle Countdown')
        this.startInterval()
    }
    componentWillBlur() {
        console.log('Circle Will Blur')
        this.startInterval()
    }
    stopInterval() {
        clearInterval(this.intervalID)
        this.intervalID = -1
    }
    startInterval() {
        if (this.intervalID != -1) return
        if (this.state.countTo < moment().unix() || 
            (this.state.countTo-moment().unix()) > this.state.baseMinute*60) return
        this.intervalID = setInterval(() => {
            let now = moment().unix()
            let countDownMinute = Math.floor((this.state.countTo - now)/60)
            console.log('Inteval Circle', countDownMinute)
            if (countDownMinute <= 0) {
                console.log('Case <=0 ')
                console.log("Inteval ID", this.intervalID)
                this.stopInterval()
            }else if (countDownMinute > this.state.baseMinute){
                this.stopInterval()
            }
            this.forceUpdate()
        }, 60000)
    }
    componentWillUnmount() {
        this.stopInterval()
    }
    componentWillReceiveProps({ counting }) {
        if (!counting) {
            console.log('Stopping Interval')
            this.stopInterval()
        } else {
            console.log('Resuming Interval')
            this.startInterval()
        }
    }
    render() {
        console.log('Rerender Circle')
        let now = moment().unix()
        let countDownMinute = Math.floor((this.state.countTo - now)/60)
        if (countDownMinute <= 0){
            return <View></View>
        }
        if (countDownMinute > this.state.baseMinute){
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