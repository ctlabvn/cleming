import React, { Component } from 'react'
import { View, Text, Button } from 'native-base'
import { NetInfo } from 'react-native'
import Icon from "~/ui/elements/Icon"
import * as metaActions from "~/store/actions/meta"
import { connect } from 'react-redux'
import { getRouter } from '~/store/selectors/common'
import routes from '~/ui/routes'
import I18n from '~/ui/I18n'

@connect(state => ({
    meta: state.meta,
    router: getRouter(state),
    router: getRouter(state)
}), { ...metaActions })

export default class ConnectionInfo extends Component {
    _handleReload = () => {
        console.log('Press reload')
    }
    componentDidMount() {
        const {setConnectionStatus} = this.props
        NetInfo.isConnected.fetch().then(isConnected => {
            let status = isConnected ? 'online' : 'offline'
            setConnectionStatus(status)
        });
        NetInfo.addEventListener('change', (reach) => {
            if (reach == 'NONE') {
                setConnectionStatus('offline')
            }else{
                setConnectionStatus('online')
            }
        })
    }
    render() {
        const { meta, router } = this.props
        let currentPage = routes[router.route]
        let bottom =  (!currentPage || currentPage.footerType == 'none') ? 0 : 40
        if (meta.connectionStatus == 'offline') {
            return (
                <View style={{
                    position: 'absolute', 
                    bottom: bottom,
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    zIndex: 100,
                    paddingLeft: 10
                }}>
                    <Text white>{I18n.t('no_internet')}</Text>
                    <Button transparent onPress={() => this._handleReload()}>
                        <Icon name='reload' style={{ color: 'white' }} />
                    </Button>
                </View>
            )
        }
        return <View />

    }
}

