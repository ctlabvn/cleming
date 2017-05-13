/**
 * Created by vjtc0n on 5/5/17.
 */
import React, {Component} from 'react'
import { Field, FieldArray } from 'redux-form'
import {
    ListItem, Text, View, Grid, Col
} from 'native-base'

import _ from 'underscore'

import {
    // InputField,
    CheckBoxField,
    // DateField,
} from '~/ui/elements/Form'

import styles from './styles'

// if long then seperate
export const validate = (values) => {
    const errors = {}
    if(!values) return errors
    return errors
}

export class renderGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    console.log(this.state.employeeListPlace)
    console.log(nextProps.employeeListPlace)
    console.log(_.isEqual(this.state.employeeListPlace, nextProps.employeeListPlace))
    if (!_.isEqual(this.props.employeeListPlace, nextProps.employeeListPlace)) {
      this.props.fields.map((address, index) => {
        nextProps.employeeListPlace.forEach((place) => {
          if (place.placeId == this.props.fields.get(index).placeId) {
            this.props.onCheckDetailAddress(address)
          }
        })
      })
    }
    this.setState({
      employeeListPlace: nextProps.employeeListPlace
    })
  }
  
  componentDidMount() {
    this.props.fields.map((address, index) => {
      this.props.employeeListPlace.forEach((place) => {
        if (place.placeId == this.props.fields.get(index).placeId) {
          this.props.onCheckDetailAddress(address)
        }
      })
    })
    this.setState({
      employeeListPlace: this.props.employeeListPlace
    })
  }
  
  render() {
    let {fields, checkAll} = this.props
    return (
      <View>
        <Grid>
            <Col style={{alignItems: 'center'}}>
                  <Text style={styles.leftAddressTitleText}>Danh sách địa điểm</Text>
              </Col>
              <Col style={{alignItems: 'center'}}>
                  <Text
                    style={styles.rightAddressTitleText}
                    onPress={() => {
                            checkAll(fields)
                        }}>
                      Đánh dấu tất cả
                  </Text>
            </Col>
        </Grid>
        {fields.map((address, index) =>
          {
            return (
              <ListItem key={index} last={index===fields.length-1} style={styles.listItem}>
                  <Text small style={styles.left}>{fields.get(index).address}</Text>
                  <View style={styles.right}>
                      <Field name={`${address}.ad`}  component={CheckBoxField}/>
                  </View>
              </ListItem>
            )
          }
        )}
      </View>
    )
  }
}