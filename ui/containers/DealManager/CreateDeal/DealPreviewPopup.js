import React, {Component} from 'react'
import {View, ScrollView, TouchableWithoutFeedback, Modal} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
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


export default class DealPreviewPopup extends Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }

    open = (data) => {
      this.setState({data: data, visible: true})
    }

    close = () => {
      this.setState({visible: false})
    }

    _renderToDateStatus = (toDate) => {
      if (moment().unix() > toDate){
        return I18n.t('out_dated')
      }else{
        let remainDay = Math.ceil((toDate - moment().unix())/86400)
        return `Hết hạn trong ${remainDay} ngày`
      }
    }

    _capitalize = (str) => (str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())

    _renderImages = (data) => {
      let result = []
      result.push({pictureId: data.coverPicture.uri, fullPath: data.coverPicture.uri})
      if (data['detail_files[]'] && data['detail_files[]'].data){
        let clone = data['detail_files[]'].data.map(item=>({pictureId: item.uri, fullPath: item.uri}))
        result = [...result, ...clone]
      }
      return result
    }

    render() {
      const {forwardTo, route} = this.props
      const {data} = this.state
      if (!data) return false
      return (
        <Modal 
            animationType={"slide"}
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => this.close()}
        >
          <Container style={{...styles.bgWhite}}>
            <TouchableWithoutFeedback onPress={()=>this.close()}>
              <View style={{position: 'absolute', top: 5, right: 5, width: 30, height: 30, 
                  borderColor: material.gray500, borderWidth: 1, 
                  borderRadius: 15, flexDirection: 'row', justifyContent: 'center', 
                  alignItems: 'center', backgroundColor: 'white', zIndex: 10 }}>
                <Icon name='close_bt' style={{fontSize: 22, color: material.gray500}}
                  />
              </View>
            </TouchableWithoutFeedback>
            <View style={{...styles.pd10}}>
              <Text bold medium>Xem trước khuyến mãi</Text>
            </View>
            <ImageSlider data={this._renderImages(data)}/>
            <Text></Text>
            <ScrollView>
              <View style={{...styles.pd10}}>
                <Text bold medium>{data.dealTitle}</Text>
                <Text medium>{this._capitalize(I18n.t('from_date'))}
                  <Text medium bold> {moment(data.fromDate*1000).format(DEFAULT_DATE_FORMAT)} </Text>
                  {I18n.t('to_date').toLowerCase()}
                  <Text medium bold> {moment(data.toDate*1000).format(DEFAULT_DATE_FORMAT)} : </Text>
                  <Text warning>{this._renderToDateStatus(data.toDate)}</Text>
                </Text>
                <View style={{...styles.row, ...styles.pd15}}>
                  <View style={{...styles.halfRowItem}}>
                    <Text large gray>{this._capitalize(data.leftPromo) || 'Tặng'}</Text>
                  </View>
                  <View style={{...styles.halfRowItem}}>
                    <Text large warning bold>{data.promoTitle}</Text>
                  </View>
                </View>
                <Text gray>{data.description}</Text>
              </View>
            </ScrollView>
            <Button style={styles.bottomBtnPreviewPopup} onPress={()=>this.props.onOk && this.props.onOk(this.state.data)}>
              <Text white>OK</Text>
            </Button>
          </Container>
        </Modal>
      )
    }
}
