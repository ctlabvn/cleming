import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import DateFilter from "~/ui/components/DateFilter"
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import DealItem from './DealItem'
@connect(null, {forwardTo})

export default class DealManager extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){

    }

    _handlePressFilter = (item) => {
        console.log('DealManager DateFilter', item);
    }

    render() {
        const {forwardTo} = this.props
        return (

          <Container>
            <DateFilter onPressFilter={this._handlePressFilter} ref='dateFilter' />
            <ScrollView style={styles.container}>
              <View style={{...styles.cardBlock, ...styles.pb10}}>
                <View style={{...styles.row, ...styles.pd15 }}>
                    <View style={styles.moneyItem}>
                      <Text>{I18n.t('revenue')}</Text>
                      <Text medium bold primary>{formatNumber(9500353)} đ</Text>
                    </View>
                    <View style={styles.moneyItem}>
                      <Text medium>{I18n.t('clingme_fee')}</Text>
                      <Text medium bold  primary>{formatNumber(1200000)} đ</Text>
                    </View>
                </View>

                <Border/>
                <View style={{...styles.row}}>
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('approach')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(5700)}</Text>
                      <Text success>&#8593; 42.5%</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('view')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(5700)}</Text>
                      <Text warning>&#8595; 32.5%</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('find_out')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(179)}</Text>
                      <Text warning>&#8593; 8.25%</Text>
                    </View>
                    <Border horizontal={false} />
                    <View style={styles.infoItem}>
                      <Text>{I18n.t('buy')}</Text>
                      <Text bold style={styles.infoNumber}>{formatNumber(57)}</Text>
                      <Text warning>&#8595; 3.25%</Text>
                    </View>
                </View>
                <Border/>
              </View>

              <TouchableWithoutFeedback onPress={()=>forwardTo('transactionList')}>
                <View style={{...styles.row, ...styles.pd10, ...styles.cardBlock}}>
                    <View style={styles.inline}>
                      <Icon name='coin_mark' style={{...styles.icon, ...styles.success, ...styles.mr3}} />
                      <Text>{I18n.t('transaction')}</Text>
                    </View>
                    <View style={styles.inline}>
                      <Text>87</Text>
                      <Icon name='foward' style={styles.icon} />
                    </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={{...styles.cardBlock, ...styles.pd10,}}>
                <Text bold medium style={styles.mb10}>{I18n.t('page_deal_manager')}</Text>
                <DealItem
                  image="https://image.foodbook.vn/images/fb/items/396/2016-04-15-03_09_22_sup-bi-do.jpg"
                  name='Tặng 25% Lẩu Loxoho'
                  number='25'
                  address='94 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'
                />
                <DealItem
                  image="https://image.foodbook.vn/images/fb/items/396/2016-04-15-03_09_22_sup-bi-do.jpg"
                  name='Tặng 25% Lẩu Loxoho'
                  number='25'
                  address='94 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'
                />
              </View>
            </ScrollView>
            <Button style={styles.fabBtn}
              onPress={()=>forwardTo('createDeal')}
              >
                <Text white style={styles.fabBtnText}>+</Text>
            </Button>
          </Container>
        )
    }
}
