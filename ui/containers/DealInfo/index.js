import React, {Component} from 'react'
import {View, ScrollView, Linking, TouchableHighlight, StyleSheet} from 'react-native'
import {Text, Button} from 'native-base'
import Icon from '~/ui/elements/Icon'

import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {formatPhoneNumber} from '~/ui/shared/utils'
import material from '~/theme/variables/material'
import {Bar, Pie, StockLine} from '~/ui/components/Chart'
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});
import {barChartConfig, pieChartConfig, lineChartConfig} from './options'
@connect(null, {forwardTo})

export default class DealInfo extends Component {
    constructor(props) {
        super(props)
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




    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
            {this._generateSampleBar()}
            {this._generateSamplePie()}
            {this._generateSampleLine()}
          </ScrollView>
        </View>
      )
    }
}
