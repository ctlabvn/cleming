import React, {Component} from 'react'
import styles from './styles'
import {View, ScrollView, Linking, TouchableWithoutFeedback, Form, TextInput} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { DateField, InputFieldWithErr, MultiLineInputFieldWithErr } from "~/ui/elements/Form"

@connect(null, {forwardTo})
@reduxForm({ form: 'CreateDeal'})
export default class CreateDeal extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){

    }

    render() {
        const {forwardTo} = this.props
        return (

          <Container style={styles.container}>
            <Field autoCapitalize="none" name="title"
                icon={(input, active) => input.value && active ? 'close' : false}
                iconStyle={{ color: material.gray500 }}
                onIconPress={input => input.onChange('')}
                component={InputFieldWithErr}
                style={styles.inputItem}
                placeholder={I18n.t('title')}
            />
            <Field autoCapitalize="none" name="keyword"
                icon={(input, active) => input.value && active ? 'close' : false}
                iconStyle={{ color: material.gray500 }}
                onIconPress={input => input.onChange('')}
                component={InputFieldWithErr}
                style={styles.inputItem}
                placeholder={I18n.t('keyword')}
            />
            <Field autoCapitalize="none" name="deal_description"
                component={MultiLineInputFieldWithErr}
                style={styles.inputItem}
                placeholder={I18n.t('deal_description')}
            />

            <View style={styles.row}>
              <Field autoCapitalize="none" name="from"
                  onIconPress={input => input.onChange('')}
                  component={DateField}
                  style={{...styles.inputItem, width: '45%'}}
                  placeholder={I18n.t('from_date')}
                  icon='calendar'
              />
              <Field autoCapitalize="none" name="from"
                  onIconPress={input => input.onChange('')}
                  component={DateField}
                  style={{...styles.inputItem, width: '45%'}}
                  placeholder={I18n.t('to_date')}
                  icon='calendar'

              />
            </View>

          </Container>
        )
    }
}
