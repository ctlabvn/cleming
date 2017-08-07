import React, { Component } from "react";
import { List } from "native-base";
import { View } from "react-native";
import I18n from '~/ui/I18n'
import ItemComponent from './TransactionItemComponent'
import {_isArrDiff, _isArrDiffPartial} from '~/ui/shared/utils'
import EnhancedListView from '~/ui/components/EnhancedListView'
const checkProperties = ['dealTransactionId', 'transactionId', 'transactionStatus']
export default class extends Component {
    // constructor(props) {
    //     super(props)
    // }

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     return _isArrDiff(this.props.data, nextProps.data, 
    //         ['transactionType', 'transactionStatus', 'dealTransactionId', 'dealTransactionIdDisplay',
    //             'originPrice', 'invoiceTime', 'moneyNumberClingme'
    //         ]
    //     )
    // }

    render() {
        console.log('Render List Component')
        const {data, ...props} = this.props
        return (
            
                <EnhancedListView dataArray={this.props.data}
                    renderRow={(item) => (<ItemComponent data={item} />)}
                    keyExtractorArr={checkProperties}
                    {...props}
                />
            
        )
    }
}