import React, {Component} from 'react'
import {View, ScrollView, Linking, TouchableHighlight, StyleSheet} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'

import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {formatPhoneNumber} from '~/ui/shared/utils'
import material from '~/theme/variables/material'
import {Bar, Pie, StockLine} from '~/ui/components/Chart'
import {getDealStatistic} from '~/store/actions/deal'
import moment from 'moment'
import { getSession } from "~/store/selectors/auth"
import DealItem from '~/ui/containers/DealManager/DealItem'
import {barChartConfig, pieChartConfig, lineChartConfig} from './options'
import styles from '../styles'
import DateFilter from "~/ui/components/DateFilter"
import Border from "~/ui/elements/Border"
import I18n from '~/ui/I18n'
@connect(state => ({
    xsession: getSession(state),
}), {forwardTo, getDealStatistic})

export default class DealInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _handlePressFilter = (item) => {
        const {app} = this.props
        let dateValue  = item.currentSelectValue.value
        console.log('Date value', item);
        // let selectedPlace = app.topDropdown.getValue()
        // if (selectedPlace && Object.keys(selectedPlace).length > 0) {
        //   this._load(selectedPlace.id, dateValue.from, dateValue.to)
        // }
    }

    _generateSampleBar = ()=>{
      let data = [
        [{
          "v": 49,
          "name": "Apple",
        }],
        [{
          "v": 69,
          "name": "Banana"
        }],
        [{
          "v": 29,
          "name": "Grape"
        }],
        [{
          "v": 29,
          "name": "XXX"
        }],
        [{
          "v": 29,
          "name": "ZZZ"
        }]
      ]
      return <Bar data={data} options={barChartConfig} accessorKey='v'/>
    }

    _generateSamplePie = ()=>{
        let dataPie = [{
          "name": "Washington",
          "population": 7694980
        }, {
          "name": "Oregon",
          "population": 2584160
        }, {
          "name": "Minnesota",
          "population": 6590667,
          "color": {'r':200,'g':200,'b':200}
        }, {
          "name": "Alaska",
          "population": 7284698
        }]

        console.log('PieChartConfig', pieChartConfig)
        return <Pie data={dataPie} options={pieChartConfig} accessorKey="population"/>

    }

    _generateSampleLine = () => {
      let lineData = [
        [{
          "x": 0,
          "y": 47782
        }, {
          "x": 1,
          "y": 48497
        }, {
          "x": 2,
          "y": 77128
        }, {
          "x": 3,
          "y": 73413
        }]
      ]
      return <StockLine data={lineData} options={lineChartConfig} xKey='x' yKey='y' />
    }

    componentDidMount(){
      const {getDealStatistic, xsession, route} = this.props
      console.log('Deal', route)
      this.setState({dealItem: route.params.deal})
      let fromTime = moment().subtract(6, 'month').unix()
      let toTime = moment().unix()
      getDealStatistic(xsession, '137615;137607;137100;134867;132751;131541;129798;128267;126685;124826;122755;121570;119881;118837;117517;116014;114896;113599', fromTime, toTime,
        (err, data) => {
          console.log('Deal Statistic', err)
          console.log('Deal Statistic', data)
        }
      )
    }

    //<View style={{...styles.row, ...styles.pd10, ...styles.bgWhite, backgroundColor: 'yellow'}}>
      //  </View>

    render() {
      const {dealItem} = this.state
      const {forwardTo} = this.props
      return (

        <Container>
          {dealItem &&
            <View style={{...styles.pd10, ...styles.bgWhite}}>
              <DealItem
                image={dealItem.detailPicture}
                name={dealItem.dealName}
                number={dealItem.promoBriefTitle}
                address={dealItem.address}
                key={dealItem.dealId}
                textLeft={dealItem.promoBriefSmallLeft}
                withoutLine={true}
                fromDate={dealItem.fromDate}
                toDate={dealItem.toDate}
                status={dealItem.status}
                onPress={()=>forwardTo('dealDetail', {deal: this.state.dealItem})}
              />
            </View>
          }
          <Border />
          <DateFilter onPressFilter={this._handlePressFilter} ref={ref=>this.dateFilter=ref} />
          <Border />
          {/* <ScrollView>
            {this._generateSampleBar()}
            {this._generateSamplePie()}
            {this._generateSampleLine()}
          </ScrollView> */}
          <View style={styles.bottomBlock}>
            <Button style={styles.bottomBtnLeft}
                onPress={()=>forwardTo('createDeal',  {mode: 'clone', deal:this.state.dealItem})}
              ><Text white>{I18n.t('clone_deal')}</Text></Button>
            <Button style={styles.bottomBtnRight}
                onPress={()=>forwardTo('createDeal', {mode: 'new'})}
              >
              <Text white>{I18n.t('create_new_deal')}</Text>
            </Button>
          </View>
        </Container>
      )
    }
}
