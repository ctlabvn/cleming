import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Thumbnail, Button } from 'native-base'
import { View, TouchableWithoutFeedback, TextInput, Dimensions, Modal, ScrollView } from 'react-native'
import { chainParse } from "~/ui/shared/utils"
import styles from './styles'
import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'

const { height, width } = Dimensions.get('window')

export default class SearchableDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showing: false,
            selectedOption: props.selectedOption || props.dropdownValues[0],
            dropdownValues: props.dropdownValues,
        }
    }
    
    _handlePress = () => {
        console.log('Pressing')
        this.setState({showing: true})
    }

    getValue = () => {
        return this.state.selectedOption
    }

    componentWillReceiveProps = (nextProps) => {
        if (!this.state.dropdownValues || this.state.dropdownValues.length == 0){
            this.setState({
                selectedOption: nextProps.selectedOption || nextProps.dropdownValues[0],
                dropdownValues: nextProps.dropdownValues
            })
        }
    }

    _handleTextChange = (text) => {
        if (!text || text.trim() == ''){
            this.setState({dropdownValues : this.props.dropdownValues})
        }
        let dropdownValues = this.props.dropdownValues.slice()
        let searchResult = dropdownValues.filter(item =>item.name.toLowerCase().indexOf(text.toLowerCase().trim())!=-1)
        this.setState({dropdownValues : searchResult})
    }

    _onSelect = (item) => {
        this.setState({selectedOption:item, showing: false, dropdownValues: this.props.dropdownValues})
    }
    _close = () => {
        this.setState({showing: false, dropdownValues: this.props.dropdownValues})
    }
    render() {
        if (!this.props.dropdownValues || this.props.dropdownValues.length == 0){
            return <View />
        }
        return (
            <View style={{...styles.container, ...this.props.style}}>
                <View>
                    <Button onPress={() => this._handlePress()} transparent style={styles.selectContainer}>
                        <Text black numberOfLines={1}>{chainParse(this.state, ['selectedOption', 'name'])}</Text>
                        <Icon name="foward" style={styles.icon}/>
                    </Button>
                    <Modal 
                        animationType={"none"}
                        transparent={true}
                        visible={this.state.showing}
                        onRequestClose={() => {this.setState({showing: false})}}
                    >
                        <View style={styles.modalOverlay} onPress={()=>{
                            console.log('Pressing modal overlay')
                            this.setState({showing: false})
                        }}>
                            <View style={styles.modalContainer}>
                                <View style={styles.rowPadding}>
                                    <Icon name='places' style={styles.icon} />
                                    <TextInput placeholder='Nhập từ khoá ...'
                                            style={styles.input}
                                            underlineColorAndroid={'transparent'}
                                            onChangeText={(text) => this._handleTextChange(text)}
                                            ref='searchInput'
                                    />
                                </View>
                                <ScrollView style={{ maxHeight: 300, width: '100%' }}
                                    keyboardShouldPersistTaps='always'>
                                    <List
                                        dataArray={this.state.dropdownValues}
                                        renderRow={(item) => {
                                            return (
                                                <ListItem style={styles.listItem}
                                                    onPress={()=>this._onSelect(item)}
                                                >
                                                    <Text  numberOfLines={1}>{item.name}</Text>
                                                </ListItem>
                                            )
                                        }}

                                    />
                                </ScrollView>
                                <Button transparent onPress={() => this._close()} style={styles.closeBtn}>
                                    <Text medium primary>Đóng</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}