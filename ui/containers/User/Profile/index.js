import React, { Component } from 'react'
import { TouchableOpacity, Image, Animated } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, Button, Icon, List,
  ListItem, InputGroup, Input, Picker, Text, Thumbnail,
  Form, Item, Switch, View,
} from 'native-base'

import options from './options'
import styles from './styles'

import * as dataActions from '~/store/actions/data'
import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'
import * as dataSelectors from '~/store/selectors/data'

import Content from '~/ui/components/Content'
import DatePicker from '~/ui/components/DatePicker'
import PhotoChooser from '~/ui/components/PhotoChooser'
import Header from '~/ui/components/Header'
import Toggle from '~/ui/components/Toggle'

import { API_BASE } from '~/store/constants/api'
import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
  DateField, 
  DropdownField,
} from '~/ui/elements/Form'

import { validate } from './utils'
import { profileCoverSource } from '~/assets'

@connect(state=>({  
  initialValues: accountSelectors.getProfile(state),
  countries: dataSelectors.getCountries(state),
  cities: dataSelectors.getCities(state),
}), {...commonActions, ...dataActions})
@reduxForm({ form: 'ProfileForm', validate})
export default class extends Component {  

  constructor(props) {
    super(props)    
    this.state = {
      avatar: {uri: (API_BASE + props.initialValues.PhotoUrl)},
      scrollY: new Animated.Value(0)
    }
  }

  componentDidMount(){
    const {countries, getCountries, initialValues:profile} = this.props
    countries.length 
      ? this.loadCities(countries, profile.Country) 
      : getCountries(data=>this.loadCities(data. profile.Country))
  }

  loadCities(countries, value){    
    const countryCode = countries.find(item=> item.Name === value)['Code']
    // this.props.getCities(countryCode)    
  }

  makeItems(data){
    const ret = {}
    // pure key value
    data && data.forEach(item=>ret[item.Name] = item.Name)
    return ret
  }

  _handleChoosePhoto = ({uri, data})=>{
    // update 'data:image/jpeg;base64,' + data
    this.setState({avatar:{uri}})
  }

  _onChangeCountries = (value)=>{        
    this.loadCities(this.props.countries, value)
  }

  _onScroll = (e)=>{    
    const offsetY = e.nativeEvent.contentOffset.y     
    this.state.scrollY.setValue(offsetY)
  }

  _handleSave = (data)=>{
    console.log(data)
  }

  render() {        
    const {initialValues:profile, route, goBack, countries, cities, handleSubmit} = this.props
    const {avatar, scrollY} = this.state    
    // no header or footer
    const opacity = scrollY.interpolate({
      inputRange: [0, options.header.SCROLL_DISTANCE / 2],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })    
    const top = scrollY.interpolate({
      inputRange: [0, options.header.SCROLL_DISTANCE],
      outputRange: [options.header.MAX_HEIGHT - options.avatar.size, 30],
      extrapolate: 'clamp',
    })
    const size = scrollY.interpolate({
      inputRange: [0, options.header.SCROLL_DISTANCE],
      outputRange: [options.avatar.size, 60],
      extrapolate: 'clamp',
    })    
    const borderRadius = Animated.divide(size, new Animated.Value(2))

  
    return (
      <Container>                             
        <Animated.View style={{...styles.headerContainer, opacity}} />
        <Button transparent style={styles.buttonLeft} onPress={()=>goBack()}>
          <Text style={styles.iconGray}>Cancel</Text>
        </Button>
        <Button onPress={handleSubmit(this._handleSave)} transparent style={styles.buttonRight}>
          <Text style={styles.iconGray}>Save</Text>
        </Button>                     
        <Animated.View style={{...styles.avatarContainer,top}}>      
          <Animated.Image source={avatar} style={{...styles.avatar,width:size,height:size,borderRadius}}/>
          <PhotoChooser style={styles.photoIcon} onSuccess={this._handleChoosePhoto}/>
        </Animated.View>                      
        

        <Content scrollEventThrottle={10} style={styles.container} onScroll={this._onScroll}>          
          <Image style={styles.headerImage} source={profileCoverSource}/>  
          <Form style={styles.form}>            
            <Text style={styles.label}>DisplayName</Text>
            <Field name="DisplayName" component={InputField} />
            <Toggle titleStyle={styles.label} title="Day of birth"/>            
            <Field name="Birthdate" displayFormat="DD MMMM YYYY" component={DateField} icon="keyboard-arrow-down" />
            <Toggle titleStyle={styles.label} title="Location"/>            
            <Field name="Country" onSelected={this._onChangeCountries} component={DropdownField} 
              header="Select Country" items={this.makeItems(countries)} />            
            <Field name="City" component={DropdownField} 
              header="Select City" items={this.makeItems(cities)}/>
          </Form>
        </Content>


      </Container>
    )
  }
}
