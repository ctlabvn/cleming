import React, {Component} from 'react'
import {View, ScrollView, Linking, TouchableHighlight, StyleSheet, ART} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'

import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {formatPhoneNumber} from '~/ui/shared/utils'
import material from '~/theme/variables/material'
import {Bar, Pie, StockLine} from '~/ui/components/Chart'
import {getDealUserStatistic} from '~/store/actions/deal'
import moment from 'moment'
import { getSession } from "~/store/selectors/auth"
import {dealStatisticSelector} from '~/store/selectors/deal'
import DealItem from '~/ui/containers/DealManager/DealItem'
import {barChartConfig, pieChartConfig, lineChartConfig} from './options'
import styles from '../styles'
import DateFilter from "~/ui/components/DateFilter"
import Border from "~/ui/elements/Border"
import I18n from '~/ui/I18n'
// const {
//   Group,
//   Shape,
//   Surface,
// } = ART;

@connect(state => ({
    xsession: getSession(state),
    statistic: dealStatisticSelector(state),
}), {forwardTo, getDealUserStatistic})

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

    _generateDistanceBar = () => {
      const {statistic} = this.props
      if (statistic.distanceLevel1 == undefined) return false
      let sum = statistic.distanceLevel1+statistic.distanceLevel2+statistic.distanceLevel3+statistic.distanceLevel4
      let distanceData = [
        [{
          'distanceNumber': statistic.distanceLevel1,
          'name': I18n.t('distanceLevel1')
        }],
        [{
          'distanceNumber': statistic.distanceLevel2,
          'name': I18n.t('distanceLevel2')
        }],
        [{
          'distanceNumber': statistic.distanceLevel3,
          'name': I18n.t('distanceLevel3')
        }],
        [{
          'distanceNumber': statistic.distanceLevel4,
          'name': I18n.t('distanceLevel4')
        }]
      ]
      let percent = [
        Math.floor(statistic.distanceLevel1/sum*100)+'%',
        Math.floor(statistic.distanceLevel2/sum*100)+'%',
        Math.floor(statistic.distanceLevel3/sum*100)+'%',
        (100-Math.floor(statistic.distanceLevel1/sum*100)-Math.floor(statistic.distanceLevel2/sum*100)-Math.floor(statistic.distanceLevel3/sum*100))+'%'
      ]
      return <Bar 
        colors={['#2a83ac', '#2a83ac', '#2a83ac', '#2a83ac', '#2a83ac']}
        data={distanceData} 
        options={barChartConfig} 
        accessorKey='distanceNumber'
        percent={percent}
        />
    }

    _generateGenderPie = () => {
      const {statistic} = this.props
      if (statistic.maleNumber == undefined) return false
      let malePercent = Math.floor((statistic.maleNumber)/(statistic.maleNumber+statistic.femaleNumber)*100)
      let femalePercent = 100-malePercent
      let genderData = [
        {
          "name": I18n.t('male')+"("+malePercent+"%)",
          "genderNumber": statistic.maleNumber
        },
        {
          "name": I18n.t('female')+"("+femalePercent+"%)",
          "genderNumber": statistic.femaleNumber
        }
      ]
      return <Pie data={genderData} 
              pallete = {[
                {'r':42,'g':131,'b':172},
                {'r':147,'g':229,'b':225},
              ]}
              options={pieChartConfig} 
              accessorKey="genderNumber"/>
    }

    _generateIncomeLevelPie = () => {
      const {statistic} = this.props
      if (statistic.incomeLevel1 == undefined) return false
      let sum = statistic.incomeLevel1+statistic.incomeLevel2+statistic.incomeLevel3
      let incomeLevel1Percent = Math.floor(statistic.incomeLevel1/sum*100)
      let incomeLevel2Percent = Math.floor(statistic.incomeLevel2/sum*100)
      let incomeLevel3Percent = 100-incomeLevel1Percent-incomeLevel2Percent
      let incomeData = [
        {
          "name": I18n.t('incomeLevel1')+"("+incomeLevel1Percent+"%)",
          "incomeNumber": statistic.incomeLevel1
        },
        {
          "name": I18n.t('incomeLevel2')+"("+incomeLevel2Percent+"%)",
          "incomeNumber": statistic.incomeLevel2
        },
        {
          "name": I18n.t('incomeLevel3')+"("+incomeLevel3Percent+"%)",
          "incomeNumber": statistic.incomeLevel3
        },
        
      ]
      return <Pie data={incomeData} 
              pallete = {[
                {'r':42,'g':131,'b':172},
                {'r':147,'g':229,'b':225},
                {'r':111,'g':111,'b':111},
              ]}
              options={pieChartConfig} 
              accessorKey="incomeNumber"/>
    }


    componentDidMount(){
      const {getDealUserStatistic, xsession, route} = this.props
      let deal = route.params.deal
      this.setState({dealItem: deal})
      let fromTime = moment().subtract(6, 'month').unix()
      let toTime = moment().unix()
      getDealUserStatistic(xsession, '', fromTime, toTime)
      console.log('Statistic', this.props.statistic)
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
          <ScrollView>
            
            <View style={styles.chartContainer}>
              <Text medium bold>Giới tính</Text>
              {this._generateGenderPie()}
            </View>

            <View style={styles.chartContainer}>
              <Text medium bold>Thu nhập</Text>
              {this._generateIncomeLevelPie()}
            </View>

            <View style={styles.chartContainer}>
              <Text medium bold>Khoảng cách</Text>
              {this._generateDistanceBar()}
            </View>

            {/* <View style={styles.chartContainer}>
              <Surface width={200} height={100}>
                <Group x={0} y={0}>
                  <Shape
                    d={this.props.linePath}
                    stroke="#000"
                    strokeWidth={1}
                  />
                </Group>
              </Surface>
            </View> */}

            <View style={{width: '100%', height: 50}}>
            </View>


          </ScrollView>
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
