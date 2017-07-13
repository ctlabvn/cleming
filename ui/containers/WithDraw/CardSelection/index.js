import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Container, List, ListItem, Text } from "native-base"
import { InteractionManager, View, TouchableOpacity, Image } from "react-native"
import styles from "../styles"
import CheckBox from '~/ui/elements/CheckBox'
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAccount: props.listAccounts[0]
        }
    }
    _handlePress = (item) => {
        console.log('Pressing Card Selection', item)
        this.setState({selectedAccount:item})
    }
    getSelected(){
        return this.state.selectedAccount
    }
    render() {
        return (
            <View >
                {this.props.listAccounts.map((item) => (
                    <TouchableOpacity key={item.id} onPress={()=>this._handlePress(item)}>
                        <View style={styles.bankLogoContainer}>
                            <Image source={{ uri: item.url }} style={styles.bankLogo} />
                            <Text style={{ textAlign: 'center' }}>{item.number}</Text>
                            <CheckBox type="radio" checked={(item.id == this.state.selectedAccount.id)} />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}