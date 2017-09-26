import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, TextInput, PickerIOS, Platform} from 'react-native'
import {Text, Button, Container, Form} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo, showPopupInfo, setToast} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber, getToastMessage } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import RatingBar from '~/ui/components/RatingBar'
import Picker from '~/ui/components/Picker'
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { DateField, InputFieldWithErr, MultiLineInputFieldWithErr, DropdownField } from "~/ui/elements/Form"
import DealImageSelector from './DealImageSelector'
import ExclusiveTypeSelector from './ExclusiveTypeSelector'
import PlaceSelector from './PlaceSelector'
import moment from 'moment'
import {getDealCategory, createDeal} from "~/store/actions/deal"
import { getSession, getUser } from "~/store/selectors/auth"
import {dealCategorySelector} from '~/store/selectors/deal'
import LoadingModal from "~/ui/components/LoadingModal"
import {validate} from './validate'
import Content from '~/ui/components/Content'
import { PROMO_TYPE } from "~/store/constants/app";
import {API_BASE} from '~/store/constants/api'
import RNFetchBlob from 'react-native-fetch-blob'
import UploadingProgress from '~/ui/components/UploadingProgress'
import DealPreviewPopup from './DealPreviewPopup'
// export const PROMO_TYPE = {
//   PERCENT: 1,
//   GIFT: 2,
//   MONEY: 3
// }

// const promoOptions = [{value: 1, label: 'Giảm giá theo %'}, {value: 3, label: 'Giảm giá theo số tiền'}, {value: 2, label: 'Quà tặng theo điều kiện'}]
const formSelector = formValueSelector('CreateDeal')
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    formValues: formSelector(state, 'leftPromo', 'promoTitle'),
    category: dealCategorySelector(state)
}), {forwardTo, getDealCategory, createDeal, showPopupInfo, setToast, resetForm: reset})

@reduxForm({ form: 'CreateDeal', validate, touchOnBlur: false, touchOnChange: false, enableReinitialize: true})
export default class CreateDeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          promoType: 1,
          loading: false,
        }
        this.changedPromoType = false
        this.category = []
    }

    _fillForm = (dealInfo) => {
      console.log('Deal Info _fillForm', dealInfo)
      this.props.change('dealTitle', dealInfo.dealName)
      this.props.change('description', dealInfo.description)
      this.props.change('searchTag', dealInfo.searchTag)
      let images = dealInfo.lstPicture.map(item=>({...item, path: item.fullPath}))
      this.dealImageSelector.setImages(images)
      this.dealImageSelector._setAvatar(dealInfo.detailPicture)
      this.placeSelector.setSelectedPlace(dealInfo.placeId)
      this.spendingLevelBar.setValue(dealInfo.spendingLevel)
      this.exclusiveTypeSelector.setSelected(dealInfo.exclusive)
      // this.promoPicker.setValue(dealInfo.dealType)
      this.props.change('fromDate', new Date(dealInfo.fromDate*1000))
      this.props.change('toDate', new Date(dealInfo.toDate*1000))

      let promoTitle = dealInfo.promoBriefTitle
      let percentRe = /(\d+)%/
      if (percentRe.test(promoTitle)){
        promoTitle = promoTitle.substring(0, promoTitle.length-1)
        this.props.change('promoTitle', promoTitle)
      }
      if (dealInfo.promoBriefSmallLeft){
        console.log('Case left Promo not null')
        this.props.change('leftPromo', dealInfo.promoBriefSmallLeft)
      }
    }

    componentDidMount(){
      // Move to Prevent warning
      const {xsession, getDealCategory, route} = this.props
      getDealCategory(xsession)
      if (route && route.params && route.params.deal){
        this._fillForm(route.params.deal)
      }
    }

    _convertURI = (uri) => (Platform.OS === 'android') ? uri.replace('file:///', '') : uri

    _fetch = (data) => {

      console.log('Data', data);
      const {resetForm, showPopupInfo} = this.props

      let formData = []
      for (let key in data){
        if (data[key] && data[key].type && data[key].type=='multi'){
            for (let item of data[key].data){
              // case multiple file with sample key
              formData.push({...item, data: RNFetchBlob.wrap(this._convertURI(item.uri))})
            }
        }else{
          if (data[key] && data[key].type && data[key].type.indexOf('image') > -1){
            // case single file
            formData.push({...data[key], name: key})
          }else{
            // case text data
            formData.push({name: key, data: String(data[key])})
          }
        }
      }

      const {xsession} = this.props
      let xVersion = 1
      let xDataVersion = 1
      let xTimeStamp = Math.floor((new Date().getTime()) / 1000)
      this.uploadingProgress.open()
      RNFetchBlob.fetch('POST', API_BASE+'/deal/create', {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'X-VERSION': String(xVersion),
        'X-TIMESTAMP': String(xTimeStamp),
        'X-DATA-VERSION': String(xDataVersion),
        'X-AUTH': '',
        'X-SESSION': xsession[0],
      }, formData)
      .uploadProgress({ interval : 50 },(written, total) => {
          this.uploadingProgress.updateProgress(Math.floor(written / total*100))
      })
      .then((res) => {
        let dataRes = res.json()
        if (dataRes && dataRes.updated && dataRes.updated.isSaved){
              resetForm('CreateDeal')
              this.dealImageSelector.reset()
              this.placeSelector.reset()
              this.uploadingProgress.close()
              showPopupInfo(I18n.t('create_deal_successful'))
            }
        ;
      })
      .catch((err) => {
        this.uploadingProgress.close()
        console.log('catch', err);
      })
    }

    _onOk = (item) => {
      const {createDeal, xsession, showPopupInfo, resetForm, setToast} = this.props
      let {fromDate, toDate, leftPromo, promoTitle, dealTitle, description, searchTag} = item
      promoTitle = promoTitle+'%' //concat % sign
      let placeIdList = this.placeSelector.getConcatPlace()
      let exclusiveType = this.exclusiveTypeSelector.getSelected()
      let dealCategoryId = this.dealCategoryPicker.getValue()
      let promoType = this.state.promoType
      console.log('Deal Category Id', dealCategoryId)
      let spendingLevel = this.spendingLevelBar.getValue()
      console.log('spendingLevel: ', spendingLevel)
      let from = moment(fromDate, "MM/DD/YYYY").startOf('day').unix()
      let to = moment(toDate, "MM/DD/YYYY").endOf('day').unix()
      let coverPicture = this.dealImageSelector.getCover()

      if (!coverPicture || coverPicture == ''){
        setToast(getToastMessage(I18n.t('err_need_at_least_one_image')), 'info', null, null, 3000, 'top')
        return
      }

      if (!placeIdList || placeIdList==''){
        setToast(getToastMessage(I18n.t('err_need_at_least_one_place')), 'info', null, null, 3000, 'top')
        return
      }

      let imageList = this.dealImageSelector.getImageList()
      imageList = imageList.map(item=>({uri: item.path, name: 'detail_files[]', filename: item.path, type: 'image/jpg'}))
      let data = {
        leftPromo, promoTitle, dealTitle, description, dealCategoryId,
        searchTag, spendingLevel, placeIdList, exclusiveType, promoType,
        coverPicture: {uri: coverPicture, name: coverPicture, filename: coverPicture, type: 'image/jpg', data: RNFetchBlob.wrap(this._convertURI(coverPicture))},
        'detail_files[]': {type: 'multi', data: imageList},
        fromDate: from,
        toDate: to,
      }
      this.dealPreview.open(data)
      // this._fetch(data)
    }

    onConfirm = (data) => {
      console.log('On Confirm', data)
      this._fetch(data)
    }

    _renderPromoteBlock = () => {
      return (
        <View style={{...styles.rowFull, ...styles.mb20}}>
          <Field autoCapitalize="none" name="leftPromo"
              icon={(input, active) => input.value && active ? 'close' : false}
              iconStyle={{ color: material.gray500 }}
              onIconPress={input => input.onChange('')}
              component={InputFieldWithErr}
              style={{...styles.inputItem, ...styles.halfRow}}
              placeholder='Giảm/Tặng'
          />

          <Field autoCapitalize="none" name="promoTitle"
              icon={(input, active) => input.value && active ? 'close' : false}
              iconStyle={{ color: material.gray500 }}
              onIconPress={input => input.onChange('')}
              component={InputFieldWithErr}
              style={{...styles.inputItem, ...styles.halfRow}}
              placeholder='%'
              keyboardType='numeric'
          />
      </View>
    )
    }
    render() {
        const {forwardTo, place, handleSubmit, category, route} = this.props
        if (this.category.length == 0){
          this.category = category.map(item => ({value: item.dealCategoryId, label: item.name}))
        }

        return (
          <Container style={styles.fixContainer}>
            <LoadingModal text={I18n.t('processing')} ref={ref=>this.loadingModal=ref} loading = {this.state.loading}/>
            <UploadingProgress text= 'Đang tạo khuyến mãi...' ref={ref=>this.uploadingProgress=ref}/>
            <DealPreviewPopup ref={ref=>this.dealPreview=ref} onOk={this.onConfirm}/>
            <Content style={styles.container}>
              <Form>
                <Text style={styles.label}>{I18n.t('deal_image')}</Text>
                <DealImageSelector ref={ref=>this.dealImageSelector=ref}
                  mode='prefill'
                />
                <Text style={styles.label}>{I18n.t('title')}</Text>
                <Field autoCapitalize="none" name="dealTitle"
                    icon={(input, active) => input.value && active ? 'close' : false}
                    iconStyle={{ color: material.gray500 }}
                    icon={(input, active) => input.value && active ? 'close' : false}
                    onIconPress={input => input.onChange('')}
                    component={InputFieldWithErr}
                    style={styles.inputItem}
                />

                <View style={{...styles.mb20}}>
                  <Text style={styles.label}>{I18n.t('business_type')}</Text>
                  <View style={styles.fakeInput}>
                    <Picker options={this.category} ref={ref=>this.dealCategoryPicker=ref}/>
                  </View>
                </View>


                <View style={{...styles.mb20}}>
                  <Text style={styles.label}>{I18n.t('spending_level')}</Text>
                  <RatingBar ref={ref=>this.spendingLevelBar=ref}/>
                </View>

                <Text style={styles.label}>{I18n.t('discount_period')}</Text>
                <View style={styles.rowFull}>
                  <Field autoCapitalize="none" name="fromDate"
                      onIconPress={input => input.onChange('')}
                      component={DateField}
                      style={{...styles.dateInputHalf}}
                      inputStyle={{width: 100}}
                      outerStyle={{...styles.dateInputHalfOuter}}
                      placeholder={I18n.t('from_date')}
                      icon='calendar'
                      mode='date'
                      displayFormat='DD/MM/YYYY'
                  />
                  <Field autoCapitalize="none" name="toDate"
                      onIconPress={input => input.onChange('')}
                      component={DateField}
                      style={{...styles.dateInputHalf}}
                      inputStyle={{width: 100}}
                      outerStyle={{...styles.dateInputHalfOuter}}
                      placeholder={I18n.t('to_date')}
                      icon='calendar'
                      mode='date'
                      displayFormat='DD/MM/YYYY'
                  />
                </View>

                {this._renderPromoteBlock()}

                <ExclusiveTypeSelector ref={ref=>this.exclusiveTypeSelector=ref}/>
                <Text style={styles.label}>{I18n.t('deal_description')}</Text>
                <Field autoCapitalize="none" name="description"
                    component={MultiLineInputFieldWithErr}
                    style={styles.inputItem}
                />
                <Text style={styles.label}>{I18n.t('keyword')}</Text>
                <Field autoCapitalize="none" name="searchTag"
                    icon={(input, active) => input.value && active ? 'close' : false}
                    iconStyle={{ color: material.gray500 }}
                    onIconPress={input => input.onChange('')}
                    component={InputFieldWithErr}
                    style={styles.inputItem}
                />
                <Border />
                {(place && place.listPlace) &&
                  <PlaceSelector ref={ref=>this.placeSelector=ref} listPlace={place.listPlace}/>
                }
              </Form>
            </Content>
            <Button style={styles.bottomButton} onPress={handleSubmit(this._onOk)}>
              <Text white>OK</Text>
            </Button>
          </Container>
        )
    }
}
