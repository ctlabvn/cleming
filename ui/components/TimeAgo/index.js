import React, { PureComponent } from 'react'
import {                     
    Text,
} from 'native-base'

import moment from 'moment'

export default class extends PureComponent {

  static defaultProps = {
    interval: 60000,    
    hideAgo: false,
  }

  componentDidMount() {
    const {interval} = this.props
    this.timer = setInterval(()=>this.forceUpdate(), interval)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {time, interval, hideAgo, ...props} = this.props
    return (
      <Text {...props}>{moment(time).fromNow(hideAgo)}</Text>
    )
  }

}