import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading,
    Text, Item, View, Input, Left, Body, Tab, Right,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as delegationActions from '~/store/actions/delegation'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as delegationSelectors from '~/store/selectors/delegation'

import moment from 'moment'

import CacheableImage from '~/ui/components/CacheableImage'
import AutoWidthTabs from '~/ui/components/AutoWidthTabs'

import Icon from '~/ui/elements/Icon'

import options from './options'
import styles from './styles'

import { API_BASE } from '~/store/constants/api'

@connect(state=>({
  token: authSelectors.getToken(state),
  delegation: delegationSelectors.getDelegation(state),
}), {...commonActions, ...delegationActions})
export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshingIn: false,
      refreshingOut: false,
    }
  }

  componentDidMount(){
    const {token, delegation, getListDelegation} = this.props
    // later we have the network    
    !delegation['DelegationIn'] && getListDelegation(token, 'DelegationIn')
    !delegation['DelegationOut'] && getListDelegation(token, 'DelegationOut')         
  }

  _onRefreshIn =() => {
    this.setState({refreshingIn: true})
    this.props.getListDelegation(this.props.token, 'DelegationIn', ()=>this.setState({refreshingIn: false}))    
  }   

  _onRefreshOut =() => {
    this.setState({refreshingOut: true})
    this.props.getListDelegation(this.props.token, 'DelegationOut', ()=>this.setState({refreshingOut: false}))    
  }  

  renderList(listDelegation){
    const {forwardTo} = this.props    
    return (
      <View rounded style={styles.content} >
        {listDelegation && listDelegation.Listitems.map((item, index) =>
          <ListItem key={item.DelegationId} avatar noBorder style={styles.listItemContainer}>
              <Left>
                  <CacheableImage style={styles.thumb} source={{
                    uri: API_BASE + (listDelegation.Direction === 'DelegationOut' ? item.ToPhotoUrl : item.FromPhotoUrl)
                  }}/>
              </Left>
              <Body style={{marginLeft:10}}>
                  <Text small bold active>{listDelegation.Direction === 'DelegationOut' ? item.ToUserDisplayName : item.FromUserDisplayName}</Text>                        
                  <Text note small>{moment(item.EffectiveDate).format('DD MMM YYYY')}</Text>
              </Body>
              <Right  style={styles.rightContainer}>
              
                <Button small textSmall style={styles.button} bordered 
                  success={item.Status === 'Accepted'} 
                  warning={item.Status === 'Pending'}
                >
                  <Text>{item.Status}</Text>
                </Button>
                
                <Button iconRight noPadder transparent 
                  onPress={e=>forwardTo(`delegation/detail/${index}?direction=${item.Direction}`)}>
                  <Icon gray name="keyboard-arrow-right" /> 
                </Button>
              </Right>
          </ListItem>   
        )} 
      </View>
    )
  }

  render() {

    const {delegation} = this.props    

    return (          
       
        <Container>         

            <AutoWidthTabs>
                <Tab style={styles.container} heading="WHO YOU DELEGATED TO">
                    <Content refreshing={this.state.refreshingIn}
                        onRefresh={this._onRefreshIn}                
                    >     
                        {this.renderList(delegation['DelegationIn'])}                      
                    </Content>
                </Tab>
                <Tab style={styles.container} heading="WHO HAS DELEGATED TO YOU">
                    <Content refreshing={this.state.refreshingOut}
                        onRefresh={this._onRefreshOut}                
                    > 
                        {this.renderList(delegation['DelegationOut'])}                      
                    </Content>
                </Tab>
            </AutoWidthTabs>   
            
        </Container>
      
    )
  }
}