/**
 * Created by vjtc0n on 5/5/17.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ListItem, Text, View, Grid, Col, List
} from 'native-base'
import shallowCompare from 'react-addons-shallow-compare'
import CheckBox from '~/ui/elements/CheckBox'
import validate from 'validate.js'
import _ from 'underscore'

import {
    // InputField,
    CheckBoxField,
    // DateField,
} from '~/ui/elements/Form'

import styles from './styles'
import { convertVn } from '~/ui/shared/utils'

const namePattern = /^([A-Za-z_]{2,}\s)*[A-Za-z_]{2,}$/
const usernameConstraints = {
  username: {
    format: {
      pattern: namePattern,
      flags: 'g'
    }
  }
}

const phonePattern = /^0\d{9,10}$/
const phoneConstraints = {
  phone: {
    format: {
      pattern: phonePattern,
      flags: 'i'
    }
  }
}

const emailConstraints = {
  email: {
    email: true
  }
}

// if long then seperate
export const validateField = (values) => {
  const errors = {}
  if(!values) return errors
  
  if (values.name.trim() == '') {
    errors.name = "Bạn cần nhập tên"
      return errors;
  } else {
    // if (!_.isUndefined(validate({username: values.name}, usernameConstraints))) {
    //   errors.name = "Tên cần có ít nhất 2 ký tự, tối đa 1 dấu cách giữa các ký tự và không bao gồm các ký tự đặc biệt và số"
    // }
    if(!convertVn(values.name).match(namePattern)){
      errors.name = "Tên cần có ít nhất 2 ký tự, tối đa 1 dấu cách giữa các ký tự và không bao gồm các ký tự đặc biệt và số"
        return errors;
    }
  }
  
  if (values.phone.trim() == '') {
    errors.phone = "Bạn cần nhập số điện thoại"
      return errors;
  } else {
    if (!_.isUndefined(validate({phone: values.phone}, phoneConstraints))) {
      errors.phone = "Bạn nhập chưa đúng định dạng số điện thoại"
        return errors;
    }
  }
  
  if (values.email.trim() != '') {
    if (!_.isUndefined(validate({email: values.email}, emailConstraints))) {
      errors.email = "Bạn nhập chưa đúng định dạng email"
        return errors;
    }
  }
  
  return errors
}

@connect(state => ({  
  place: state.place,
}))
export class RenderGroup extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   // fields: props.fields.map((c, index)=>({
    //   //   placeId: props.fields.get(index).placeId,
    //   //   checked: false,
    //   //   address: props.fields.get(index).address
    //   // })),
    //   // checkAll: false,
    //     selectedPlaceId: props.selectedPlaceId,
    // }
    this.children = {}
    this.selectedPlaceId = props.selectedPlaceId
  }
  
  componentWillMount() {
    
  }

  // clearAll(){
    // const newState = this.state.fields.slice(0)  
    // newState.map((c, index) => {
    //   c.checked = false         
    // })
    // this.setState({
    //   fields: newState
    // })
  // }
  
  componentWillReceiveProps(nextProps) {

    // if (nextProps.employeeListPlace.length != 0 && this.props.employeeListPlace.length != 0) {
    //   if (this.props.employeeListPlace != nextProps.employeeListPlace) {
    //     const newState = this.state.fields.slice(0)
    //     newState.map((c, index) => {
    //       newState[index].checked = false
    //       nextProps.employeeListPlace.map((place, placeIndex) => {
    //         if (place.placeId == c.placeId) {
    //           newState[index].checked = true
    //         }
    //       })
    //     })
    //     this.setState({
    //       fields: newState
    //     })
    //   }
    // }

      // if (nextProps.employeeListPlace.length != 0 && this.props.employeeListPlace.length != 0) {
      //     if (this.props.employeeListPlace != nextProps.employeeListPlace) {
      //         const newState = this.state.fields.slice(0)
      //         newState.map((value, index) => {
      //             newState[index].checked = value.placeId === nextProps.selectedPlaceId;
      //         })
      //         this.setState({
      //             fields: newState
      //         })
      //     }
      // }
      //
      // console.warn(JSON.stringify({status: 'componentWillReceiveProps'}, null, 2));
      //
      // if (this.state.selectedPlaceId != nextProps.selectedPlaceId) {
      //     this.setState({
      //         selectedPlaceId: nextProps.selectedPlaceId,
      //     }, this.setDefaultChecked);
      // }
  }
  
  componentDidMount() {
    // const newState = this.state.fields.slice(0)
    // newState.map((c, index) => {
    //   this.props.employeeListPlace.map((place, placeIndex) => {
    //     if (place.placeId == c.placeId) {
    //       newState[index].checked = true
    //     }
    //   })
    // })
    // this.setState({
    //   fields: newState
    // }, () => {
    //   this.props.handleGetListPlaceFromArrayField(this.getSelected())
    // })

      // this.props.handleGetListPlaceFromArrayField(this.getSelected())
    // this.state.selectedPlaceId

    this.props.onReady && this.props.onReady(this)
      // alert('selected place utils' + this.state.selectedPlace)

      // this.setDefaultChecked();
  }

  // setDefaultChecked() {
      // select default place the same the selected place

      // let selectedPlaceId = this.props.selectedPlaceId;
      // let placeIndex = 0;
      // this.state.fields.map((c, index)=>{
      //     if (c.placeId == selectedPlaceId) {
      //         placeIndex = index;
      //         this.handleCheck(placeIndex);
      //         return;
      //     }
      // })

  // }
  
  // getSelected(){
    // console.log(this.state.fields)
    // return this.state.fields.filter(c=>c.checked).map(c=>c)
  // }
  
  handleCheck(address){

    // console.log(this.children)

    if(address.placeId !== this.selectedPlaceId){
      this.children[this.selectedPlaceId]._root.setState({checked: false})
      this.selectedPlaceId = address.placeId
      this.children[this.selectedPlaceId]._root.setState({checked: true})
    }    


    // this.setState({
    //   selectedPlaceId
    // })

    // const newState = this.state.fields.slice(0)
    // let newState = this.state.fields
    // // this.state.fields.map((item)=>{
    // //   return {...item, checked : false}
    // // })

    // if(newState[index]){
    //   // newState[index].checked = true;
    //   // console.log(newState)
    //   let newSelectedPlaceId = newState[index].placeId;
    //   this.setState({
    //       // fields: newState,
    //       selectedPlaceId: newSelectedPlaceId,
    //   }, () => {
    //     // console.log(newState)
    //     // this.props.handleGetListPlaceFromArrayField(this.getSelected())
    //   })
    // }
  }
  
  // handleCheckAll() {
    // const newState = this.state.fields.slice(0)
    // newState.map((c, index) => {
    //   // alert('index: ' + index);
    //   c.checked = !this.state.checkAll
    // })
    // this.setState({
    //   fields: newState,
    //   checkAll: !this.state.checkAll
    // }, () => {
    //   this.props.handleGetListPlaceFromArrayField(this.getSelected())
    // })
  // }
  
  render() {

    const {place} = this.props
      
    return (
      <View style={{marginTop: 10}}>
        <Grid>
            <Col style={{alignItems: 'center'}}>
              <Text style={styles.leftAddressTitleText}>Danh sách địa điểm</Text>
            </Col>
            <Col style={{alignItems: 'center'}}>
              {/*<Text
                style={styles.rightAddressTitleText}
                onPress={this.handleCheckAll.bind(this)}>
                  Đánh dấu tất cả
              </Text>*/}
            </Col>
        </Grid>
        <View style={{maxHeight: 300,marginVertical: 10}}>
        {place.listPlace && place.listPlace.map((address,index) => (
              <ListItem key={index} last={index === place.listPlace.length -1} style={styles.listItem}>
                  <Text small numberOfLines={2} style={styles.left}>{address.address}</Text>
                  <View style={styles.right}>
                      <CheckBox
                          ref={ref=>this.children[address.placeId]=ref}
                          type="radio"
                          parent={this}
                          checked={address.placeId === this.selectedPlaceId}
                          onPress={()=>this.handleCheck(address)}
                      />
                  </View>
              </ListItem>
          ))}
        </View>
      </View>
    )
  }
}