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
    componentWillReceiveProps = (nextProps) => {
        if (!this.state.selectedAccount){
            this.setState({selectedAccount: nextProps.listAccounts[0]})
        }
    }
    _handlePress = (item) => {
        this.setState({selectedAccount:item})
    }
    getSelected(){
        return this.state.selectedAccount
    }
    render() {
        const {listAccounts} = this.props
        return (
            <View >
                {listAccounts
                    && Object.keys(listAccounts).length > 0
                    && listAccounts.map((item) => (
                    <TouchableOpacity key={item.bankId} onPress={()=>this._handlePress(item)}>
                        <View style={styles.bankLogoContainer}>
                            <Image source={{ uri: item.bankIcon }} style={styles.bankLogo} />
                            <Text style={{ textAlign: 'center' }}>{item.accountNumber}</Text>
                            <CheckBox type="radio" checked={(item.bankId == this.state.selectedAccount.bankId)} />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}