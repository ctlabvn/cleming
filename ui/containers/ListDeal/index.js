import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native'
import {
    List,
    ListItem
} from 'native-base'
import styles from './styles'
import DealDes from '~/ui/components/DealDes'

// let navigation to new screen
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

@connect(null, {...commonActions})
export default class extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            peopleDataSource: ds.cloneWithRows([]),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    initialListSize={5}
                    enableEmptySections={true}
                    dataSource={this.state.peopleDataSource}
                    renderRow={(deal) => { return this.renderDealRow(deal)}} />
            </View>
        )
    }
    
    componentDidMount() {
        var lstDealData = [
            {
                dealImage: 'http://osl.ugr.es/wp-content/uploads/2017/02/react-native.png',
                dealTitle: 'Tặng 25% ABCDE tặng tặng',
                placeName: 'DUNKIN\'DONUST',
                spendingLevel: 3,
                salePercen: '-25%'
            },
            {
                dealImage: 'http://osl.ugr.es/wp-content/uploads/2017/02/react-native.png',
                dealTitle: 'Tặng 25% ABCDE tặng tặng',
                placeName: 'DUNKIN\'DONUST',
                spendingLevel: 5,
                salePercen: '-25%'
            },
            {
                dealImage: 'http://osl.ugr.es/wp-content/uploads/2017/02/react-native.png',
                dealTitle: 'Tặng 25% ABCDE tặng tặng',
                placeName: 'DUNKIN\'DONUST',
                spendingLevel: 4,
                salePercen: '-25%'
            }
        ]
        
        this.setState({
            peopleDataSource: ds.cloneWithRows(lstDealData)
        })
    }

    renderDealRow(deal) {
        const { forwardTo } = this.props
        return (
            <TouchableOpacity onPress={e => forwardTo('dealsOverview')}>
                <DealDes deal={deal} />
            </TouchableOpacity>
        )
    }

    onPress() {
        alert('Thành Công');
    }
}