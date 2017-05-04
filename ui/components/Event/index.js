import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, 
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
// import * as accountSelectors from '~/store/selectors/account'
import moment from 'moment'
import CacheableImage from '~/ui/components/CacheableImage'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import styles from './styles'


export default class extends Component {

  render() {
    const {feed} = this.props    
    const avatar = {uri: API_BASE + feed.BusinessImageUrl}
    const cardImage = {uri: API_BASE + feed.Image}

    return (      
        <Card style={styles.container}>
          <CardItem bordered style={styles.firstCard}>
            <Left>
              <Text style={styles.textGray}>EVENT</Text>
            </Left>
            <Right>
              <Button small transparent>                      
                  <Icon style={styles.iconGray} name="more-horiz" />
              </Button>
            </Right>
          </CardItem>
          <CardItem bordered style={styles.avatarContainer}>
            <Left>
                <CacheableImage style={styles.avatar} source={avatar} />
                <Body>
                    <Text>{feed.BusinessName}</Text>
                    <Text note>{moment(feed.SpendEffectDate).format('DD MMM YYYY')}</Text>
                </Body>
            </Left>
            <Right style={{flex:0.5}}>
              <Button style={styles.button} small bordered iconLeft>
                <Icon style={styles.icon} name="follow"/>
                <Text style={styles.text}>Follow</Text>                        
              </Button>
            </Right>
          </CardItem>
          <CardItem header style={styles.headerContainer}>
            <Text>{feed.Name}</Text>                            
          </CardItem>
          <CardItem content>                  
          <Body>
            <Text style={styles.textGreen}>{moment(feed.SpendEndDate).format('DD MMM YYYY')}</Text>                             
            <Text>{feed.Description}</Text>
          </Body>
          </CardItem>
          <CardItem cardBody>
            <CacheableImage style={styles.image} source={cardImage} />
          </CardItem>              
          <CardItem footer style={styles.footerContainer}>
              <RegitButton>Join</RegitButton>
          </CardItem>
       </Card>       
    )
  }
}