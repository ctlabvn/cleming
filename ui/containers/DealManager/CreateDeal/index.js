import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, TextInput, PickerIOS} from 'react-native'
import {Text, Button, Container, Content, Form} from 'native-base'
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
import { PROMO_TYPE } from "~/store/constants/app";

// export const PROMO_TYPE = {
//   PERCENT: 1,
//   GIFT: 2,
//   MONEY: 3
// }

const promoOptions = [{value: 1, label: 'Giảm giá theo %'}, {value: 3, label: 'Giảm giá theo số tiền'}, {value: 2, label: 'Quà tặng theo điều kiện'}]
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

    _fillRightPromo = () => {
      this.props.change('promoType', this.state.promoType)
      switch (this.state.promoType) {
        // Giảm giá theo %
        case PROMO_TYPE.PERCENT:
        default:
          this.props.change('leftPromo', '')
          this.props.change('promoTitle', '%')
          break
        // Quà tặng kèm
        case PROMO_TYPE.MONEY:
        case PROMO_TYPE.GIFT:
          this.props.change('leftPromo', '')
          this.props.change('promoTitle', '')
          break
      }
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
      this.promoPicker.setValue(dealInfo.dealType)
      // promoBriefSmallLeft:"TẶNG"
      // promoBriefSmallRight:""
      // promoBriefTitle:"10%"
    }

    componentDidMount(){
      // Move to Prevent warning

      this._fillRightPromo()
      const {xsession, getDealCategory, route} = this.props
      getDealCategory(xsession)
      if (route && route.params && route.params.deal){
        this._fillForm(route.params.deal)
      }
    }

    componentDidUpdate(){
      if (this.changedPromoType){
        this.changedPromoType = false
        this._fillRightPromo()
      }
    }

    _onOk = (item) => {
      const {createDeal, xsession, showPopupInfo, resetForm, setToast} = this.props
      let {fromDate, toDate, leftPromo, promoTitle, dealTitle, description, searchTag} = item
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
        coverPicture: {uri: coverPicture, name: coverPicture, type: 'image/jpg'},
        'detail_files[]': {type: 'multi', data: imageList},
        fromDate: from,
        toDate: to,
      }
      this.setState({loading: true})
      createDeal(xsession, data,
        (err, data) => {
          console.log('createDeal Err', err)
          console.log('createDeal data', data)
          // this.loadingModal.hide()
          this.setState({loading: false})
          if (data && data.updated && data.updated.isSaved){
            resetForm('CreateDeal')
            this.dealImageSelector.reset()
            this.placeSelector.reset()
            showPopupInfo(I18n.t('create_deal_successful'))
          }
        }
      )
    }

    _onPromoTypeChange = (value) => {
      console.log('Promo Change', value)
      this.changedPromoType = true
      this.setState({promoType: value})
    }

    _renderPromoteBlock = () => {
      let leftPlaceholder='', rightPlaceholder='', rightDisabled = false,
        leftKeyboardType = 'default', rightKeyboardType = 'default'
      switch (this.state.promoType) {
        // Giảm giá theo %
        case PROMO_TYPE.PERCENT:
        default:
          leftPlaceholder = 'Giảm / Tặng'
          rightPlaceholder = '%'
          rightDisabled = true,
          leftKeyboardType='numeric'
          rightKeyboardType = 'default'
          break
        // Quà tặng kèm
        case PROMO_TYPE.GIFT:
          leftPlaceholder = 'Tặng'
          rightPlaceholder = 'Quà tặng kèm'
          rightDisabled = false,
          leftKeyboardType='default'
          break
        // Gỉam giá theo số tiền
        case PROMO_TYPE.MONEY:
          leftPlaceholder = 'Giá cũ'
          rightPlaceholder = 'Giá mới'
          rightDisabled= false
          leftKeyboardType='numeric'
          rightKeyboardType = 'numeric'
          break
      }
      return (
        <View style={{...styles.rowFull, ...styles.mb20}}>
          <Field autoCapitalize="none" name="leftPromo"
              icon={(input, active) => input.value && active ? 'close' : false}
              iconStyle={{ color: material.gray500 }}
              onIconPress={input => input.onChange('')}
              component={InputFieldWithErr}
              style={{...styles.inputItem, ...styles.halfRow}}
              placeholder={leftPlaceholder}
              keyboardType={leftKeyboardType}
          />

          <Field autoCapitalize="none" name="promoTitle"
              icon={(input, active) => input.value && active ? 'close' : false}
              iconStyle={{ color: material.gray500 }}
              onIconPress={input => input.onChange('')}
              component={InputFieldWithErr}
              style={{...styles.inputItem, ...styles.halfRow}}
              placeholder={rightPlaceholder}
              disabled={rightDisabled}
              keyboardType={rightKeyboardType}
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
            <Content style={styles.container}>
                <Text style={styles.label}>{I18n.t('deal_image')}</Text>
                <DealImageSelector ref={ref=>this.dealImageSelector=ref}
                  mode='prefill'
                />
                <Field autoCapitalize="none" name="dealTitle"
                    icon={(input, active) => input.value && active ? 'close' : false}
                    iconStyle={{ color: material.gray500 }}
                    onIconPress={input => input.onChange('')}
                    component={InputFieldWithErr}
                    style={styles.inputItem}
                    placeholder={I18n.t('title')}
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

                <View style={{...styles.mb20}}>
                  <Text style={styles.label}>{I18n.t('discount_type')}</Text>
                  <View style={styles.fakeInput}>
                    <Picker options={promoOptions} ref={ref=>this.promoPicker=ref}
                      onChange={(value)=>this._onPromoTypeChange(value)}
                    />
                  </View>
                </View>

                {this._renderPromoteBlock()}

                <ExclusiveTypeSelector ref={ref=>this.exclusiveTypeSelector=ref}/>
                <Field autoCapitalize="none" name="description"
                    component={MultiLineInputFieldWithErr}
                    style={styles.inputItem}
                    placeholder={I18n.t('deal_description')}
                />
                <Field autoCapitalize="none" name="searchTag"
                    icon={(input, active) => input.value && active ? 'close' : false}
                    iconStyle={{ color: material.gray500 }}
                    onIconPress={input => input.onChange('')}
                    component={InputFieldWithErr}
                    style={styles.inputItem}
                    placeholder={I18n.t('keyword')}
                />
                <Border />
                {(place && place.listPlace) &&
                  <PlaceSelector ref={ref=>this.placeSelector=ref} listPlace={place.listPlace}/>
                }
            </Content>
            <Button style={styles.bottomButton} onPress={handleSubmit(this._onOk)}>
              <Text white>OK</Text>
            </Button>
          </Container>
        )
    }
}
