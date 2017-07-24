import React, { Component } from "react";
import { List } from "native-base";
import { View } from "react-native";
import I18n from '~/ui/I18n'
import ItemComponent from './TransactionItemComponent'
import {_isArrDiff} from './utils'
export default class extends Component {
    constructor(props) {
        super(props)
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return _isArrDiff(this.props.data, nextProps.data)
    }

    render() {
        console.log('Render List Component')
        return (
            <View>
                <List dataArray={this.props.data}
                    renderRow={(item) => (<ItemComponent data={item} />)}
                    pageSize={10}
                ></List>
            </View>
        )
    }
}