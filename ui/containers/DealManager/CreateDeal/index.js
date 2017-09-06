import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, Form, TextInput} from 'react-native'
import {Text, Button, Container, Content} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { DateField, InputFieldWithErr, MultiLineInputFieldWithErr } from "~/ui/elements/Form"
import DealImageSelector from './DealImageSelector'
import ExclusiveTypeSelector from './ExclusiveTypeSelector'
import PlaceSelector from './PlaceSelector'
import moment from 'moment'

@connect(state => ({
    place: state.place,
}), {forwardTo})
@reduxForm({ form: 'CreateDeal'})
export default class CreateDeal extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){

    }

    _onOk = (item) => {
      // console.log('Place Select: ', this.placeSelector.getSelected())
      // console.log('ExclusiveTypeSelector: ', this.exclusiveTypeSelector.getSelected())
      let {from_date, to_date} = item
      let from = moment(from_date, "MM/DD/YYYY").startOf('day').unix()
      let to = moment(to_date, "MM/DD/YYYY").endOf('day').unix()
      console.log('From: ', from)
      console.log('To: ', to)
    }

    render() {
        const {forwardTo, place, handleSubmit} = this.props
        return (
          <Container style={styles.fixContainer}>
            <Content style={styles.container}>
              <Text style={styles.label}>{I18n.t('deal_image')}</Text>
              <DealImageSelector ref={ref=>this.dealImageSelector=ref}/>
              <Field autoCapitalize="none" name="title"
                  icon={(input, active) => input.value && active ? 'close' : false}
                  iconStyle={{ color: material.gray500 }}
                  onIconPress={input => input.onChange('')}
                  component={InputFieldWithErr}
                  style={styles.inputItem}
                  placeholder={I18n.t('title')}
              />
              <View style={styles.row}>
                <Field autoCapitalize="none" name="from_date"
                    onIconPress={input => input.onChange('')}
                    component={DateField}
                    style={{...styles.inputItem, width: '45%'}}
                    placeholder={I18n.t('from_date')}
                    icon='calendar'
                    mode='date'
                    displayFormat='DD/MM/YYYY'
                />
                <Field autoCapitalize="none" name="to_date"
                    onIconPress={input => input.onChange('')}
                    component={DateField}
                    style={{...styles.inputItem, width: '45%'}}
                    placeholder={I18n.t('to_date')}
                    icon='calendar'
                    mode='date'
                    displayFormat='DD/MM/YYYY'
                />
              </View>
              <ExclusiveTypeSelector ref={ref=>this.exclusiveTypeSelector=ref}/>
              <Field autoCapitalize="none" name="deal_description"
                  component={MultiLineInputFieldWithErr}
                  style={styles.inputItem}
                  placeholder={I18n.t('deal_description')}
              />
              <Field autoCapitalize="none" name="keyword"
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
