import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, TextInput} from 'react-native'
import {Text, Button, Container, Content, Form} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo, showPopupInfo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
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
const promoOptions = [{key: 1, label: 'Giảm giá theo %'}, {key: 3, label: 'Giảm giá theo số tiền'}, {key: 2, label: 'Quà tặng theo điều kiện'}]
const formSelector = formValueSelector('CreateDeal')
@connect(state => ({
    xsession: getSession(state),
    place: state.place,
    formValues: formSelector(state, 'left_value', 'right_value'),
    category: dealCategorySelector(state)
}), {forwardTo, getDealCategory, createDeal, showPopupInfo, resetForm: reset})

@reduxForm({ form: 'CreateDeal', validate})
export default class CreateDeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          promoType: 1,
          loading: false
        }
        this.category = []
    }

    _fillRightPromo = () => {
      switch (this.state.promoType) {
        // Giảm giá theo %
        case 1:
        default:
          this.props.change('promoTitle', '%')
          break
        // Quà tặng kèm
        case 2:
          this.props.change('promoTitle', '')
          break
        // Gỉam giá theo số tiền
        case 3:
          this.props.change('promoTitle', '')
          break
      }
    }
    componentDidMount(){
      // Move to Prevent warning
      this._fillRightPromo()
      const {xsession, getDealCategory} = this.props
      console.log('Props: ', this.props.category)
      getDealCategory(xsession)
    }

    componentDidUpdate(){
      this._fillRightPromo()
    }

    _onOk = (item) => {
      this.setState({loading: true})
      const {createDeal, xsession, showPopupInfo, resetForm} = this.props
      let {fromDate, toDate, leftPromo, promoTitle, dealTitle, description, searchTag, promoType, dealCategoryId} = item
      let placeIdList = this.placeSelector.getConcatPlace()
      let exclusiveType = this.exclusiveTypeSelector.getSelected()
      let spendingLevel = 1
      let from = moment(fromDate, "MM/DD/YYYY").startOf('day').unix()
      let to = moment(toDate, "MM/DD/YYYY").endOf('day').unix()
      let coverPicture = this.dealImageSelector.getCover()
      let imageList = this.dealImageSelector.getImageList()
      imageList = imageList.map(item=>({uri: item.path, name: 'detail_files[]', filename: item.path, type: 'image/jpg'}))
      let data = {
        leftPromo, promoTitle, dealTitle, description,
        searchTag, spendingLevel, placeIdList, exclusiveType,
        coverPicture: {uri: coverPicture, name: coverPicture, type: 'image/jpg'},
        'detail_files[]': {type: 'multi', data: imageList},
        dealCategoryId: dealCategoryId.key,
        promoType: promoType.key,
        fromDate: from,
        toDate: to,
      }
      createDeal(xsession, data,
        (err, data) => {
          console.log('createDeal Err', err)
          console.log('createDeal data', data)
          // this.loadingModal.hide()
          this.setState({loading: false})
          if (data && data.updated && data.updated.isSaved){
            resetForm('CreateDeal')
            showPopupInfo('Tạo Khuyến mãi thành công')
          }
        }
      )
    }

    _onPromoTypeChange = (value) => {
      this.setState({promoType: value.key})
    }

    _renderPromoteBlock = () => {
      console.log('Current Promo Type', this.state.promoType)
      let leftPlaceholder='', rightPlaceholder='', rightDisabled = false,
        leftKeyboardType = 'default', rightKeyboardType = 'default'
      switch (this.state.promoType) {
        // Giảm giá theo %
        case 1:
        default:
          leftPlaceholder = 'Giảm / Tặng'
          rightPlaceholder = '%'
          rightDisabled = true,
          leftKeyboardType='numeric'
          rightKeyboardType = 'default'
          break
        // Quà tặng kèm
        case 2:
          leftPlaceholder = 'Tặng'
          rightPlaceholder = 'Quà tặng kèm'
          rightDisabled = false,
          leftKeyboardType='default'
          break
        // Gỉam giá theo số tiền
        case 3:
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
              style={{...styles.inputItem, width: 150}}
              placeholder={leftPlaceholder}
              keyboardType={leftKeyboardType}
          />

          <Field autoCapitalize="none" name="promoTitle"
              icon={(input, active) => input.value && active ? 'close' : false}
              iconStyle={{ color: material.gray500 }}
              onIconPress={input => input.onChange('')}
              component={InputFieldWithErr}
              style={{...styles.inputItem, width: 150}}
              placeholder={rightPlaceholder}
              disabled={rightDisabled}
              keyboardType={rightKeyboardType}
          />
      </View>
    )
    }
    render() {
        const {forwardTo, place, handleSubmit, category} = this.props
        if (this.category.length == 0){
          this.category = category.map(item => ({key: item.dealCategoryId, label: item.name}))
        }
        return (
          <Container style={styles.fixContainer}>
            <LoadingModal text={I18n.t('processing')} ref={ref=>this.loadingModal=ref} loading = {this.state.loading}/>
            <Content style={styles.container}>
                <Text style={styles.label}>{I18n.t('deal_image')}</Text>
                <DealImageSelector ref={ref=>this.dealImageSelector=ref}/>
                <Field autoCapitalize="none" name="dealTitle"
                    icon={(input, active) => input.value && active ? 'close' : false}
                    iconStyle={{ color: material.gray500 }}
                    onIconPress={input => input.onChange('')}
                    component={InputFieldWithErr}
                    style={styles.inputItem}
                    placeholder={I18n.t('title')}
                />

                <Field autoCapitalize="none" name="dealCategoryId"
                    component={DropdownField}
                    style={styles.inputItem}
                    placeholder='category'
                    items={this.category}
                    selected={this.category[0]}
                    header='Loại hình dịch vụ kinh doanh'
                    style={{...styles.mb20}}
                />

                <View style={styles.rowFull}>
                  <Field autoCapitalize="none" name="fromDate"
                      onIconPress={input => input.onChange('')}
                      component={DateField}
                      style={{...styles.inputItem, width: '45%'}}
                      placeholder={I18n.t('from_date')}
                      icon='calendar'
                      mode='date'
                      displayFormat='DD/MM/YYYY'
                  />
                  <Field autoCapitalize="none" name="toDate"
                      onIconPress={input => input.onChange('')}
                      component={DateField}
                      style={{...styles.inputItem, width: '45%'}}
                      placeholder={I18n.t('to_date')}
                      icon='calendar'
                      mode='date'
                      displayFormat='DD/MM/YYYY'
                  />
                </View>

                <Field autoCapitalize="none" name="promoType"
                    component={DropdownField}
                    style={styles.inputItem}
                    placeholder='category'
                    items={promoOptions}
                    header='Chọn loại giảm giá'
                    onSelected={(value)=>this._onPromoTypeChange(value)}
                    selected={promoOptions[0]}
                    style={{...styles.mb20}}
                />
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
