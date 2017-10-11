import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, TextInput, PickerIOS, Platform} from 'react-native'
import {Text, Button, Container, Form} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo, showPopupInfo, setToast} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber, getToastMessage, revertFormatMoney, formatMoney } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import RatingBar from '~/ui/components/RatingBar'
import Picker from '~/ui/components/Picker'
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { DateField, InputFieldWithErr2, MultiLineInputFieldWithErr, DropdownField, MoneyInputField } from "~/ui/elements/Form"
import DealImageSelector from './DealImageSelector'
import ExclusiveTypeSelector from './ExclusiveTypeSelector'
import PlaceSelector from './PlaceSelector'
import moment from 'moment'
import {getDealCategory, createDeal, markReloadDealManager} from "~/store/actions/deal"
import { getSession, getUser } from "~/store/selectors/auth"
import {dealCategorySelector} from '~/store/selectors/deal'
import LoadingModal from "~/ui/components/LoadingModal"
import {validate} from './validate'
import Content from '~/ui/components/Content'
import { PROMO_TYPE, EXCLUSIVE_TYPE } from "~/store/constants/app";
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
    // formValues: formSelector(state, 'leftPromo', 'promoTitle'),
    category: dealCategorySelector(state)
}), {forwardTo, getDealCategory, createDeal, showPopupInfo, setToast, markReloadDealManager, resetForm: reset})

@reduxForm({ form: 'CreateDeal', validate, touchOnBlur: false, touchOnChange: false, enableReinitialize: true})
export default class CreateDeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          promoType: 1,
          loading: false,
          showCashback: true
        }
        this.changedPromoType = false
        this.category = []
    }

    _fillForm = (dealInfo) => {
      console.log('Deal Info _fillForm', dealInfo)
      this.props.change('dealTitle', dealInfo.dealName)
      this.props.change('description', dealInfo.description)
      this.props.change('searchTag', dealInfo.searchTag)
      let images = (dealInfo.lstPicture && dealInfo.lstPicture.length > 0) ? dealInfo.lstPicture.map(item=>({...item, path: item.fullPath})) : [{pictureId: 1, path: dealInfo.detailPicture}]
      let avatar = (dealInfo.lstPicture && dealInfo.lstPicture.length > 0) ? dealInfo.lstPicture.filter(item=>item.thumbnail==1)[0].fullPath : dealInfo.detailPicture
      this.dealImageSelector.setImages(images)
      this.dealImageSelector._setAvatar(avatar)
      this.placeSelector.setSelectedPlace(dealInfo.placeId)
      this.spendingLevelBar.setValue(dealInfo.spendingLevel)
      this.exclusiveTypeSelector.setSelected(dealInfo.exclusive)
      this.props.change('exclusiveType', dealInfo.exclusive)
      //Need some handle

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
        this.props.change('leftPromo', dealInfo.promoBriefSmallLeft)
      }
    }

    componentWillReceiveProps = (nextProps) => {
      if (!this.props.submitFailed && nextProps.submitFailed){
        switch(nextProps.error){
          case 'dealTitle':
            this.content.scrollTo({x:0, y: 20})
            break
          case 'fromDate':
          case 'toDate':
            this.content.scrollTo({x:0, y: 220})
            break
          case 'leftPromo':
          case 'promoTitle':
          case 'moneyLimit':
            this.content.scrollTo({x:0, y: 300})
            break
          case 'description':
            this.content.scrollTo({x:0, y: 360})
            break
          case 'searchTag':
            this.content.scrollTo({x:0, y: 540})
            break
        }
      }
      
    }

    componentDidMount(){
      // Move to Prevent warning
      const {xsession, getDealCategory, route} = this.props
      getDealCategory(xsession)
      if (route && route.params && route.params.deal){
        this._fillForm(route.params.deal)
      }else{
        this.props.change('exclusiveType', EXCLUSIVE_TYPE.CASHBACK)
      }
    }

    _convertURI = (uri) => (Platform.OS === 'android') ? uri.replace('file:///', '') : uri

    _fetch = (data) => {
      const {resetForm, showPopupInfo, forwardTo, markReloadDealManager, xsession} = this.props
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
          }else if (typeof data[key] != 'undefined'){
            // case text data
            formData.push({name: key, data: String(data[key])})
          }
        }
      }
      console.log('Before Send', formData)
      let xVersion = 1
      let xDataVersion = 1
      let xTimeStamp = Math.floor((new Date().getTime()) / 1000)
      this.dealPreview.close()
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
        console.log('Res ', res)
        if (dataRes && dataRes.updated && dataRes.updated.isSaved){
          markReloadDealManager(true)
          this.uploadingProgress.close()
          showPopupInfo(I18n.t('create_deal_successful'))
          forwardTo('dealManager')
        }else if (dataRes.code){
          // 1901 Invalid input data Data nhập vào không chính xác
          // 1923 Invalid deal title Tiêu đề khuyến mại bị rỗng
          // 1924 Invalid deal description Mô tả deal bị rỗng
          // 1925 Invalid deal deal promo title Chữ ở giữa bị trống
          // 1926 Invalid date Ngày của deal bị sai
          // 1927 To date less than from date Từ ngày lớn hơn đến ngày khuyến mại
          // 1922 Invalid place id list Danh sách các place truyền lên không thuộc quyền quản lý của merchant này
          // 1921 Invalid cover file Ảnh cover không có
          this.uploadingProgress.close()
          switch(dataRes.code){
            case 1901:
              showPopupInfo(I18n.t('err_invalid_data'))
              break
            case 1923:
              showPopupInfo(I18n.t('err_deal_title_empty'))
              break
            case 1922:
              showPopupInfo(I18n.t('err_place_not_belong_to_merchant'))
              break
            case 1921:
              showPopupInfo(I18n.t('err_missing_cover_picture'))
              break
            case 1926:
              showPopupInfo(I18n.t('err_invalid_deal_start_date'))
              break
            case 1927:
              showPopupInfo(I18n.t('err_invalid_deal_end_date'))
              break
          }

        }else{
          this.uploadingProgress.close()
          showPopupInfo(I18n.t('create_deal_fail'))
        }
      })
      .catch((err) => {
        this.uploadingProgress.close()
        showPopupInfo(I18n.t('create_deal_fail'))
        console.log('catch', err);
      })
    }

    _onOk = (item) => {
      const {createDeal, xsession, showPopupInfo, resetForm, setToast} = this.props
      let {exclusiveType, fromDate, toDate, leftPromo, promoTitle, dealTitle, description, searchTag, moneyLimit} = item

      promoTitle = promoTitle ? promoTitle+'%': '*'//concat % sign
      let placeIdList = this.placeSelector.getConcatPlace()
      // let exclusiveType = this.exclusiveTypeSelector.getSelected()
      let dealCategoryId = this.dealCategoryPicker.getValue()
      let promoType = this.state.promoType
      let spendingLevel = (exclusiveType==EXCLUSIVE_TYPE.CASHBACK) ? this.spendingLevelBar.getValue():1
      let from = moment(fromDate, "MM/DD/YYYY").startOf('day').unix()
      let to = moment(toDate, "MM/DD/YYYY").endOf('day').unix()
      
      // exclusiveDealType: 1 là giảm giá theo % không giới hạn số tiền cashback, 2 là giảm giá theo phần trăm có giới hạn số tiền cashback, 3 là giảm tiền cho hoá đơn, 4 là giảm tiền cho hoá đơn nếu hoá đơn lớn hơn một số tiền nhất định. Bắt buộc truyền lên.
      // moneyLimit (long): số tiền giới hạn cashback, nếu không giới hạn truyền lên là 0. Bắt buộc truyền lên.
      moneyLimit = revertFormatMoney(moneyLimit)
      let exclusiveDealType
      if (moneyLimit && moneyLimit > 0){
        exclusiveDealType = 2
      }else{
        exclusiveDealType = 1
        moneyLimit = 0
      }
      

      let coverPicture = this.dealImageSelector.getCover()
      if (!coverPicture || coverPicture == ''){
        setToast(getToastMessage(I18n.t('err_need_at_least_one_image')), 'info', null, null, 3000, 'top')
        return
      }

      if (!placeIdList || placeIdList==''){
        setToast(getToastMessage(I18n.t('err_need_at_least_one_place')), 'info', null, null, 3000, 'top')
        return
      }

      if (coverPicture.indexOf('http')==-1){
        coverPicture = {uri: coverPicture, name: coverPicture, filename: coverPicture, type: 'image/jpg', data: RNFetchBlob.wrap(this._convertURI(coverPicture))}
      }
      let placeSelectedArr = this.placeSelector.getSelectedPlaceObj()
      let imageList = this.dealImageSelector.getImageList()
      imageFiles = imageList.filter(item=>item.path.indexOf('http')==-1)
                              .map(item=>({uri: item.path, name: 'detail_files[]', filename: item.path, type: 'image/jpg'}))
      imageLinks = imageList.filter(item=>item.path.indexOf('http') > -1).map(item=>item.path).join(';')
      let data = {
        leftPromo, promoTitle, dealTitle, description, dealCategoryId,
        searchTag, spendingLevel, placeIdList, exclusiveType, promoType,
        moneyLimit, exclusiveDealType, coverPicture: coverPicture,
        'detail_files[]': {type: 'multi', data: imageFiles},
        'imageLinks': imageLinks,
        fromDate: from,
        toDate: to,
      }
      this.dealPreview.open({...data, allImages: imageList, placeSelectedArr})
    }

    onConfirm = (data) => {
      console.log('On Confirm', data)
      this._fetch(data)
    }

    _onChangeExclusiveType = (select) => {
      // exclusiveType: int, khuyến mại độc quyền hay khuyến mại thường: 0 – khuyến mại thường, 1 – khuyến mại độc quyền. (bắt buộc)
      // exclusiveDealType: 1 là giảm giá theo % không giới hạn số tiền cashback, 2 là giảm giá theo phần trăm có giới hạn số tiền cashback, 3 là giảm tiền cho hoá đơn, 4 là giảm tiền cho hoá đơn nếu hoá đơn lớn hơn một số tiền nhất định. Bắt buộc truyền lên.
      // exclusiveDealType: 1 là giảm giá theo % không giới hạn số tiền cashback, 2 là giảm giá theo phần trăm có giới hạn số tiền cashback, 3 là giảm tiền cho hoá đơn, 4 là giảm tiền cho hoá đơn nếu hoá đơn lớn hơn một số tiền nhất định. Bắt buộc truyền lên.
      // moneyLimit (long): số tiền giới hạn cashback, nếu không giới hạn truyền lên là 0. Bắt buộc truyền lên.
      this.props.change('exclusiveType', select)
      if (select == EXCLUSIVE_TYPE.CASHBACK){
        this.setState({showCashback: true})
      }else{
        this.setState({showCashback: false})
      }

    }

    _renderPromoteBlock = () => {
      return (
        <View style={{...styles.rowFull}}>
          <View style={{...styles.halfRow}}>
            <Text style={styles.label}>{I18n.t('percent_cashback')}</Text>
            <Field autoCapitalize="none" name="promoTitle"
                icon={(input, active) => input.value && active ? 'close' : false}
                iconStyle={{ color: material.gray500 }}
                onIconPress={input => input.onChange('')}
                component={InputFieldWithErr2}
                style={{...styles.inputItem}}
                placeholder='%'
                keyboardType='numeric'
            />
          </View>
          <View style={{...styles.halfRow}}>
            <Text style={styles.label}>{I18n.t('max_cashback')}</Text>
            <Field autoCapitalize="none" name="moneyLimit"
                icon={(input, active) => input.value && active ? 'close' : false}
                iconStyle={{ color: material.gray500 }}
                onIconPress={input => input.onChange('')}
                component={MoneyInputField}
                style={{...styles.inputItem}}
                placeholder='VND'
                keyboardType='numeric'
            />
          </View>
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
            <Content style={styles.container} ref={ref=>this.content=ref}>
              <Form>
                <View style={{...styles.mb20}}>
                  <Text style={styles.label}>{I18n.t('deal_image')}</Text>
                  <DealImageSelector ref={ref=>this.dealImageSelector=ref}
                    mode='prefill'
                  />
                </View>
                <Text style={styles.label}>{I18n.t('title')}</Text>
                <Field autoCapitalize="none" name="dealTitle"
                    icon={(input, active) => input.value && active ? 'close' : false}
                    iconStyle={{ color: material.gray500 }}
                    icon={(input, active) => input.value && active ? 'close' : false}
                    onIconPress={input => input.onChange('')}
                    component={InputFieldWithErr2}
                    style={styles.inputItem}
                />

                <View style={{...styles.mb20}}>
                  <Text style={styles.label}>{I18n.t('business_type')}</Text>
                  <View style={styles.fakeInput}>
                    <Picker options={this.category} ref={ref=>this.dealCategoryPicker=ref}/>
                  </View>
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

                <ExclusiveTypeSelector ref={ref=>this.exclusiveTypeSelector=ref}
                  onChange={this._onChangeExclusiveType}
                />
                {this.state.showCashback &&
                  <View>
                    <View style={{...styles.mb20}}>
                      <Text style={styles.label}>{I18n.t('spending_level')}</Text>
                      <RatingBar ref={ref=>this.spendingLevelBar=ref}/>
                    </View>
                    {this._renderPromoteBlock()}
                  </View>}
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
                    component={InputFieldWithErr2}
                    style={styles.inputItem}
                />
                <Border />
                {(place && place.listPlace) &&
                  <PlaceSelector ref={ref=>this.placeSelector=ref} listPlace={place.listPlace}/>
                }
              </Form>
            </Content>
            <Button style={styles.bottomButton} onPress={handleSubmit(this._onOk)}>
              <Text white>{I18n.t('preview')}</Text>
            </Button>
          </Container>
        )
    }
}
