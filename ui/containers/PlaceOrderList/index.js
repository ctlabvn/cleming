import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Content, List, ListItem, Text, Thumbnail, Button, Tabs, Tab, TabHeading, ScrollableTab, Input, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Picker, Easing, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './styles'
import TopDropdown from '~/ui/components/TopDropdown'
import DateFilter from '~/ui/components/DateFilter'
import * as authAction from '~/store/actions/auth'
import * as commonActions from '~/store/actions/common'
import { InputField } from '~/ui/elements/Form'
import RadioPopup from '~/ui/components/RadioPopup'
import TabsWithNoti from '~/ui/components/TabsWithNoti'
import Icon from '~/ui/elements/Icon'
import Border from '~/ui/elements/Border'
@connect(state=>({
  
}), {...commonActions})
export default class PlaceOrderList extends Component {

    constructor(props) {
        super(props)
        this.tabData = [
            {
                tabID: 1,
                text: 'Chờ xác nhận',
                number: 2
            },
            {
                tabID: 2,
                text: 'Đã xác nhận'
            },
        ]
    }
    _handlePressTab(item) {

    }
    
    onDetailPlacePress() {
      const { forwardTo } = this.props
      forwardTo('placeOrderDetail')
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.merchantAddress}>
                    <Text small white>33 Nguyễn Chí Thanh, Ba Đình, Hà Nội</Text>
                </View>
                <TabsWithNoti tabData={this.tabData} activeTab={1} onPressTab={this._handlePressTab.bind(this)} />
                <Content style={styles.content}>



                    <View style={styles.block}>
                        <Button
                          onPress={this.onDetailPlacePress.bind(this)}
                          style={styles.detailButton}>
                            <View style={styles.rowPadding}>
                                <Text primary bold>#DC123456</Text>
                                <Text small style={{color: 'black'}}>17:10 10/03/2017</Text>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Icon name='calendar' style={styles.icon} />
                                    <Text style={{color: 'black'}}>14/2</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                                <View style={styles.column}>
                                    <Icon name='history' style={styles.icon} />
                                    <Text style={{color: 'black'}}>11:30</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                                <View style={styles.column}>
                                    <Icon name='friend' style={styles.icon} />
                                    <Text style={{color: 'black'}}>2</Text>
                                </View>
                                <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                                <View style={styles.column}>
                                    <Icon name='want-feed' style={styles.icon} />
                                    <Text style={{color: 'black'}}>2</Text>
                                </View>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' size={1} />
                            <View style={styles.rowPadding}>
                                <View style={styles.row}>
                                    <Icon name='account' style={{...styles.icon, ...styles.iconLeft}} />
                                    <Text small style={{color: 'black'}}>Username</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon name='phone' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                                    <Text primary>0977865062</Text>
                                </View>
                            </View>
                            <View style={{...styles.rowPadding, ...styles.center}}>
                                <Text error small>Đã có 3 mã đặt chỗ được xác nhận trong khoảng thời gian này</Text>
                            </View>
                        </Button>
                        <View style={styles.rowPadding}>
                            <Button transparent style={styles.button}><Text small light>Từ chối</Text></Button>
                            <Button transparent style={styles.button}><Text small primary>Nhận đặt chỗ</Text></Button>
                        </View>
                    </View>


                    <View style={styles.block}>
                        <View style={styles.rowPadding}>
                            <Text primary bold>#DC123456</Text>
                            <Text small>17:10 10/03/2017</Text>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Icon name='calendar' style={styles.icon} />
                                <Text>14/2</Text>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                            <View style={styles.column}>
                                <Icon name='history' style={styles.icon} />
                                <Text>11:30</Text>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                            <View style={styles.column}>
                                <Icon name='friend' style={styles.icon} />
                                <Text>2</Text>
                            </View>
                            <Border color='rgba(0,0,0,0.5)' orientation='vertical' size={1} padding={1} />
                            <View style={styles.column}>
                                <Icon name='want-feed' style={styles.icon} />
                                <Text>2</Text>
                            </View>
                        </View>
                        <Border color='rgba(0,0,0,0.5)' size={1} />
                        <View style={styles.rowPadding}>
                            <View style={styles.row}>
                                <Icon name='account' style={{...styles.icon, ...styles.iconLeft}} />
                                <Text small>Username</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name='phone' style={{ ...styles.icon, ...styles.primary, ...styles.iconLeft }} />
                                <Text primary>0977865062</Text>
                            </View>
                        </View>
                        <View style={styles.rowRight}>
                            <Text success small>Đã nhận đặt chỗ</Text>
                            <Icon name='done' style={{...styles.icon, ...styles.iconRight, ...styles.success}} />
                        </View>
                    </View>




                </Content>

            </View >
        )
    }
}