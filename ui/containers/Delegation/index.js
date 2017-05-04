import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, List, TabHeading, Thumbnail,
    Text, Item, View, Input, Left, Body, Tab, Right,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'
import Header from '~/ui/components/Header'

import AutoWidthTabs from '~/ui/components/AutoWidthTabs'

import Icon from '~/ui/elements/Icon'

import options from './options'
import styles from './styles'

import { API_BASE } from '~/store/constants/api'

@connect(state=>({
  profile: accountSelectors.getProfile(state),
}), {...commonActions})
export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh =() => {
    this.setState({refreshing: true})
    setTimeout(() => {
      this.setState({refreshing: false})
    }, 2000)
  }    

  render() {

    const {goBack, route, profile} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}

    return (          
       
        <Container>

            <AutoWidthTabs>
                <Tab style={styles.container} heading="WHO YOU DELEGATED TO">
                    <Content refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}                
                    >              
                      <View rounded style={styles.content} >
                        <List dataArray={options.notifications} renderRow={item =>
                          <ListItem avatar noBorder style={styles.listItemContainer}>
                              <Left>
                                  <Thumbnail style={styles.thumb} source={avatar}/>
                              </Left>
                              <Body style={{marginLeft:10}}>
                                  <Text small bold active>{profile.DisplayName}</Text>                        
                                  <Text note small>{profile.Birthdate}</Text>
                              </Body>
                              <Right  style={styles.rightContainer}>
                                {item.icon === 'refresh'
                                  ?<Button small textSmall style={styles.button} bordered success>
                                      <Text>Active</Text>
                                  </Button>
                                  :<Button small textSmall style={styles.button} bordered warning>
                                      <Text>Pending</Text>
                                  </Button>
                                }
                                  
                                  <Icon large name="keyboard-arrow-right" /> 
                              </Right>
                          </ListItem>   
                        }/>      
                        </View>
                    </Content>
                </Tab>
                <Tab style={styles.container} heading="WHO HAS DELEGATED TO YOU">
                    <Content refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}                
                    >              
                      <View rounded style={styles.content} >
                        <List dataArray={options.notifications} renderRow={item =>
                          <ListItem avatar noBorder style={styles.listItemContainer}>
                              <Left>
                                  <Thumbnail style={styles.thumb} source={avatar}/>
                              </Left>
                              <Body style={{marginLeft:10}}>
                                  <Text small bold active>{profile.DisplayName}</Text>                        
                                  <Text note small>{profile.Birthdate}</Text>
                              </Body>
                              <Right  style={styles.rightContainer}>
                                {item.icon === 'refresh'
                                  ?<Button small textSmall style={styles.button} bordered success>
                                      <Text>Active</Text>
                                  </Button>
                                  :<Button small textSmall style={styles.button} bordered warning>
                                      <Text>Pending</Text>
                                  </Button>
                                }
                                  
                                  <Icon large name="keyboard-arrow-right" /> 
                              </Right>
                          </ListItem>   
                        }/>      
                        </View>
                    </Content>
                </Tab>
            </AutoWidthTabs>                        
            
        </Container>
      
    )
  }
}