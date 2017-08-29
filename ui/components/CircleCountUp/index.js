import React, { Component } from 'react'
import moment from 'moment'
import ProgressCircle from 'react-native-progress-circle'
import { Text } from 'native-base'
import { View } from 'react-native'
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countFrom: props.countFrom,
            baseMinute: props.baseMinute,
        }
        this.intervalID = -1
    }
    componentDidMount() {
        this.startInterval()
    }
    stopInterval() {
        console.log('Go to clear Interval')
        clearInterval(this.intervalID)
        this.intervalID = -1
    }
    startInterval() {
        console.log('Start Inteveal')
        if (this.intervalID != -1) return   
        if (this.state.countFrom + this.state.baseMinute*60 < moment().unix()) return
        this.intervalID = setInterval(()=>{
            let now = moment().unix()
            console.log('Call Inteval', now)
            let countDownMinute = Math.floor((this.state.countFrom + this.state.baseMinute*60 - now) / 60)
            console.log('countDownMinute', countDownMinute)
            if (countDownMinute < 0) {
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
    componentWillReceiveProps({ countFrom }) {
        if (countFrom != this.state.countFrom) {
            this.setState({ countFrom: countFrom })
        }
    }
    render() {
        let now = moment().unix()
        let countUpMinute = Math.floor((now - this.state.countFrom)/60)
        if (countUpMinute < 0) return <View />
        if (countUpMinute > this.state.baseMinute){
            countUpMinute = this.state.baseMinute
        }
        return (
            <ProgressCircle
                percent={Math.floor(countUpMinute / this.state.baseMinute * 100)}
                radius={20}
                borderWidth={3}
                color="red"
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 18, color: 'red' }}>{countUpMinute}'</Text>
            </ProgressCircle>
        )

    }
}