import React, {Component} from 'react'
import {View, ScrollView, Linking, TouchableHighlight, StyleSheet} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'

import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {formatPhoneNumber} from '~/ui/shared/utils'
import material from '~/theme/variables/material'
import {Bar, Pie, StockLine} from '~/ui/components/Chart'
import {getDealUserStatistic, getSingleDealStatistic} from '~/store/actions/deal'
import moment from 'moment'
import { getSession } from "~/store/selectors/auth"
import {dealStatisticSelector, viewDetailSelector} from '~/store/selectors/deal'
import DealItem from '~/ui/containers/DealManager/DealItem'
import {singleChartConfig, doubleChartConfig, pieChartConfig} from './options'
import styles from '../styles'
import DateFilter from "~/ui/components/DateFilter"
import Border from "~/ui/elements/Border"
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import ChartLegend from '~/ui/components/ChartLegend'
// const {
//   Group,
//   Shape,
//   Surface,
// } = ART;

@connect(state => ({
    xsession: getSession(state),
    statistic: dealStatisticSelector(state),
    viewDetail: viewDetailSelector(state)
}), {forwardTo, getDealUserStatistic, getSingleDealStatistic})

export default class DealInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    _load = (from, to) => {
      const {getDealUserStatistic, getSingleDealStatistic, xsession, route} = this.props
      let deal = route.params.deal
      this.setState({dealItem: deal})
      getDealUserStatistic(xsession, deal.dealId, from, to)
      getSingleDealStatistic(xsession, deal.dealId, from, to)
    }

    _handlePressFilter = (item) => {
        const {app} = this.props
        let dateValue  = item.currentSelectValue.value
        this._load(dateValue.from, dateValue.to)
    }

    _generateDistanceBar = () => {
      const {statistic} = this.props
      if (statistic.distanceLevel1 == undefined) return false
      let sum = statistic.distanceLevel1+statistic.distanceLevel2+statistic.distanceLevel3+statistic.distanceLevel4
      
      if (sum == 0){
        return (
          <View style={styles.chartContainer}>
            <Text medium bold>{I18n.t('distance')}</Text>
            <Text style={styles.noDataStr}>{I18n.t('noData')}</Text>
          </View>
        )
      }

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
      return (
        <View style={styles.chartContainer}>
          <Text medium bold>{I18n.t('distance')}</Text>
          <Bar 
            colors={['#2a83ac', '#2a83ac', '#2a83ac', '#2a83ac', '#2a83ac']}
            data={distanceData} 
            options={singleChartConfig} 
            accessorKey='distanceNumber'
            percent={percent}
            />
        </View>
      )          
    }

    _generateAgeBar = () => {
      const {statistic} = this.props
      if (statistic.ageFemaleLevel1 == undefined) return false

      let sumMale = statistic.ageMaleLevel1 + statistic.ageMaleLevel2 + statistic.ageMaleLevel3 + statistic.ageMaleLevel4
      let sumFemale = statistic.ageFemaleLevel1 + statistic.ageFemaleLevel2 + statistic.ageFemaleLevel3 + statistic.ageFemaleLevel4
      if (sumMale == 0 || sumFemale == 0){
        return (
          <View style={styles.chartContainer}>
            <Text medium bold>{I18n.t('age')}</Text>
            <Text style={styles.noDataStr}>{I18n.t('noData')}</Text>
          </View>
        )
      }

      let distanceData = [
        [
          {
          'ageNumber': statistic.ageMaleLevel1,
          'name': I18n.t('ageLevel1')
          },
          {
            'ageNumber': statistic.ageFemaleLevel1,
            'name': I18n.t('ageLevel1')
            },
        ],

        [
          {
          'ageNumber': statistic.ageMaleLevel2,
          'name': I18n.t('ageLevel2')
          },
          {
            'ageNumber': statistic.ageFemaleLevel2,
            'name': I18n.t('ageLevel2')
            },
        ],

        [
          {
          'ageNumber': statistic.ageMaleLevel3,
          'name': I18n.t('ageLevel3')
          },
          {
            'ageNumber': statistic.ageFemaleLevel3,
            'name': I18n.t('ageLevel3')
          },
        ],

        [
          {
          'ageNumber': statistic.ageMaleLevel4,
          'name': I18n.t('ageLevel4')
          },
          {
            'ageNumber': statistic.ageFemaleLevel4,
            'name': I18n.t('ageLevel4')
          },
        ],    
      ]

      let male1Percent = Math.floor(statistic.ageMaleLevel1/sumMale*100)
      let male2Percent = Math.floor(statistic.ageMaleLevel2/sumMale*100)
      let male3Percent = Math.floor(statistic.ageMaleLevel3/sumMale*100)
      let male4Percent = (100-male1Percent-male2Percent-male3Percent)
      let female1Percent = Math.floor(statistic.ageFemaleLevel1/sumFemale*100)
      let female2Percent = Math.floor(statistic.ageFemaleLevel2/sumFemale*100)
      let female3Percent = Math.floor(statistic.ageFemaleLevel3/sumFemale*100)
      let female4Percent = (100-female1Percent-female2Percent-female3Percent)

      let percent = [
        male1Percent+'%', male2Percent+'%', male3Percent+'%', male4Percent+'%',
        female1Percent+'%', female2Percent+'%', female3Percent+'%', female4Percent+'%'
      ]
      let legendData = [
        {
          name: I18n.t('male'),
          color: '#2a83ac'
        },
        {
          name: I18n.t('female'),
          color: '#93e5e1'
        }
      ]
      
      return (
        <View style={styles.chartContainer}>
          <Text medium bold>{I18n.t('age')}</Text>
          <Bar 
            colors={['#2a83ac', '#2a83ac', '#2a83ac', '#2a83ac',
                    '#93e5e1', '#93e5e1', '#93e5e1', '#93e5e1'
            ]}
            data={distanceData} 
            options={doubleChartConfig}
            percent={percent}
            accessorKey='ageNumber' 
          />
          <ChartLegend data={legendData} />
      </View>
      )
    }

    _generateGenderPie = () => {
      const {statistic} = this.props
      if (statistic.maleNumber == undefined) return false
      let sum = statistic.maleNumber+statistic.femaleNumber
      if (sum == 0){
        return (
          <View style={styles.chartContainer}>
            <Text medium bold>{I18n.t('gender')}</Text>
            <Text style={styles.noDataStr}>{I18n.t('noData')}</Text>
          </View>
        )
      }
      let malePercent = Math.floor((statistic.maleNumber)/sum*100)
      let femalePercent = 100-malePercent

      let genderDataOrigin = [
        {
          "name": I18n.t('male')+"("+malePercent+"%)",
          "genderNumber": statistic.maleNumber
        },
        {
          "name": I18n.t('female')+"("+femalePercent+"%)",
          "genderNumber": statistic.femaleNumber
        }
      ]
      let palleteOrigin = [ '#2a83ac', '#93e5e1']
      let genderData = [], pallete = []
      /*Handle Zero Case, quite Tricky*/
      for (let i=0; i<genderDataOrigin.length; i++){
        if (genderDataOrigin[i]['genderNumber'] > 0){
          genderData.push(genderDataOrigin[i])
          pallete.push(palleteOrigin[i])
        }
      }

      let legendData = [
        {
          name: I18n.t('male'),
          color: '#2a83ac'
        },
        {
          name: I18n.t('female'),
          color: '#93e5e1'
        }
      ]
      return (
        <View style={styles.chartContainer}>
          <Text medium bold>{I18n.t('gender')}</Text>
          <Pie data={genderData} 
                pallete = {pallete}
                options={pieChartConfig} 
                accessorKey="genderNumber"/>
          <ChartLegend data={legendData} />
        </View>
      )
    }

    _generateIncomeLevelPie = () => {
      const {statistic} = this.props
      if (statistic.incomeLevel1 == undefined) return false
      let sum = statistic.incomeLevel1+statistic.incomeLevel2+statistic.incomeLevel3
      if (sum == 0){
        return (
          <View style={styles.chartContainer}>
            <Text medium bold>{I18n.t('gender')}</Text>
            <Text style={styles.noDataStr}>{I18n.t('noData')}</Text>
          </View>
        )
      }
      let incomeLevel1Percent = Math.floor(statistic.incomeLevel1/sum*100)
      let incomeLevel2Percent = Math.floor(statistic.incomeLevel2/sum*100)
      let incomeLevel3Percent = 100-incomeLevel1Percent-incomeLevel2Percent
      
      let incomeDataOrigin = [
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
      let palleteOrigin = ['#93e5e1', '#2a83ac', '#454545']
      let incomeData = [], pallete = []
      
      /*Handle Zero Case, quite Tricky*/
      for (let i=0; i<incomeDataOrigin.length; i++){
        if (incomeDataOrigin[i]['incomeNumber'] > 0){
          incomeData.push(incomeDataOrigin[i])
          pallete.push(palleteOrigin[i])
        }
      }


      let legendData = [
        {
          name: I18n.t('incomeLevel1'),
          color: '#93e5e1'
        },
        {
          name: I18n.t('incomeLevel2'),
          color: '#2a83ac'
        },
        {
          name: I18n.t('incomeLevel3'),
          color: '#454545'
        }
      ]

      
          
      return (
        <View style={styles.chartContainer}>
          <Text medium bold>{I18n.t('income')}</Text>
          <Pie data={incomeData} 
              pallete = {pallete}
              options={pieChartConfig} 
              accessorKey="incomeNumber"/>   
          <ChartLegend data={legendData} /> 
        </View>
      )
    }


    componentDidMount(){
      const {getDealUserStatistic, xsession, route} = this.props
      let deal = route.params.deal
      this.setState({dealItem: deal})
      const dateValue = this.dateFilter.getData().currentSelectValue.value
      this._load(dateValue.from, dateValue.to)
    }

    _formatIncreaseDecrease = (number) => {
      if (number == undefined) return false
      if (number >=0) return  <Text small success>&#8593; {number.toFixed(2)}%</Text>
      else return <Text small warning>&#8595; {number.toFixed(2)}%</Text>
    }

    render() {
      const {dealItem} = this.state
      const {forwardTo, viewDetail} = this.props

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
          <DateFilter onPressFilter={this._handlePressFilter} ref={ref=>this.dateFilter=ref} />
          
          <ScrollView>

            <View style={{...styles.cardBlock2, ...styles.pb10}}>
              <View style={{...styles.row, ...styles.pd15 }}>
                  <View style={styles.moneyItem}>
                    <Text>{I18n.t('revenue')}</Text>
                    <Text medium bold primary>{formatNumber(viewDetail.totalMoney)} đ</Text>
                  </View>
                  <View style={styles.moneyItem}>
                    <Text medium>{I18n.t('clingme_fee')}</Text>
                    <Text medium bold  primary>{formatNumber(viewDetail.charge)} đ</Text>
                  </View>
              </View>
              <Border />
              <View style={{...styles.row}}>
                  <View style={styles.infoItem2}>
                    <Text>{I18n.t('approach')}</Text>
                    <Text bold style={styles.infoNumber2}>{formatNumber(viewDetail.reachNumber)}</Text>
                    
                  </View>
                  <Border horizontal={false} />
                  <View style={styles.infoItem2}>
                    <Text>{I18n.t('view')}</Text>
                    <Text bold style={styles.infoNumber2}>{formatNumber(viewDetail.viewNumber)}</Text>
                    
                  </View>
                  <Border horizontal={false} />
                  <View style={styles.infoItem2}>
                    <Text>{I18n.t('mark')}</Text>
                    <Text bold style={styles.infoNumber2}>{formatNumber(viewDetail.markNumber)}</Text>
                    
                  </View>
                  <Border horizontal={false} />
                  <View style={styles.infoItem2}>
                    <Text>{I18n.t('share')}</Text>
                    <Text bold style={styles.infoNumber2}>{formatNumber(viewDetail.shareNumber)}</Text>
                    
                  </View>
                  <Border horizontal={false} />
                  <View style={styles.infoItem2}>
                    <Text>{I18n.t('buy')}</Text>
                    <Text bold style={styles.infoNumber2}>{formatNumber(viewDetail.boughtNumber)}</Text>
                  </View>
              </View>
              <Border />
            </View>

            {this._generateGenderPie()}
            {this._generateAgeBar()}
            {this._generateIncomeLevelPie()}
            {this._generateDistanceBar()}
  
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
