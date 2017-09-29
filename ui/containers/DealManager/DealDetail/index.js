import React, {Component} from 'react'
import {View, ScrollView, Linking, TouchableHighlight, StyleSheet} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import {formatPhoneNumber} from '~/ui/shared/utils'
import material from '~/theme/variables/material'
import moment from 'moment'
import { getSession } from "~/store/selectors/auth"
import styles from '../styles'
import DateFilter from "~/ui/components/DateFilter"
import Border from "~/ui/elements/Border"
import I18n from '~/ui/I18n'
import ImageSlider from '~/ui/components/ImageSlider'
import { DEFAULT_DATE_FORMAT }from '~/store/constants/app'

@connect(state => ({
    xsession: getSession(state),
}), {forwardTo})

export default class DealDetail extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }


    _renderToDateStatus = (toDate) => {
      if (moment().unix() > toDate){
        return I18n.t('out_dated')
      }else{
        let remainDay = Math.ceil((toDate - moment().unix())/86400)
        return `Hết hạn trong ${remainDay} ngày`
      }
    }

    _capitalize = (str) => (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())

    render() {
      const {forwardTo, route} = this.props
      const {deal} = route.params
      console.log('Deal deal Item', deal)
      return (
        <Container style={{...styles.bgWhite, paddingBottom: 50}}>
          <ImageSlider data={deal.lstPicture}/>
          <ScrollView>
            <View style={{...styles.pd10}}>
              <Text bold medium>{deal.dealName}</Text>
              <Text medium>{this._capitalize(I18n.t('from_date'))}
                <Text medium bold> {moment(deal.fromDate*1000).format(DEFAULT_DATE_FORMAT)} </Text>
                {I18n.t('to_date').toLowerCase()}
                <Text medium bold> {moment(deal.toDate*1000).format(DEFAULT_DATE_FORMAT)} : </Text>
                <Text warning>{this._renderToDateStatus(deal.toDate)}</Text>
              </Text>
              <View style={{...styles.row, ...styles.pd15}}>
                <View style={{...styles.halfRowItem}}>
                  <Text large gray>{this._capitalize(deal.promoBriefSmallLeft)}</Text>
                </View>
                <View style={{...styles.halfRowItem}}>
                  <Text large warning bold>{deal.promoBriefTitle}</Text>
                </View>
              </View>
              <Text gray>{deal.description}</Text>
            </View>
          </ScrollView>

          <View style={styles.bottomBlock}>
            <Button style={styles.bottomBtnLeft}
              onPress={()=>forwardTo('createDeal', {mode: 'clone', deal: deal})}
              >
                <Text white>{I18n.t('clone_deal')}</Text>
            </Button>
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
