import React, {Component} from 'react'
import { connect } from "react-redux"
import {
    Button,
    Icon,
    Container,
    Text,
    Item,
    View,
    Input,
} from 'native-base'
import BadgeSelector from '~/ui/components/BadgeSelector'
import styles from './styles'
import * as settingActions from "~/store/actions/setting"
import { getSession } from "~/store/selectors/auth"
import I18n from '~/ui/I18n'
import LoadingModal from "~/ui/components/LoadingModal"
@connect(state => ({
    xsession: getSession(state),
    setting: state.setting
}), { ...settingActions })
export default class Setting extends Component {
    constructor(props){
        super()
        this.hourValues = []
        this.selectValue = props.setting.setHour || 6
        this.state = {
            processing: false
        }
    }
    componentDidMount(){
        const {xsession, getSettingHour} = this.props
        getSettingHour(xsession)
    }
    _handleSelect = (item) => {
        console.log('Handle Select', item)
        const {xsession, updateSettingHour, saveSettingHourOffline}  = this.props
        // this.processingModal.setModalVisible(true)
        this.setState({processing: true})
        updateSettingHour(xsession, item.id,
            (err, data) => {
                this.setState({processing: false})
                if (data && data.data && data.data.success){
                    this.badgeSelector.setSelect(item.id)
                    saveSettingHourOffline(item.id)
                }
                // this.processingModal.setModalVisible(false)
            }
        )
    }
    render() {
        const {setting} = this.props
        if (setting.hourData && setting.hourData.length > 0 && this.hourValues.length == 0){
            this.hourValues = setting.hourData.map(item => ({
                id: item.hour,
                name: `${item.hour} ${I18n.t('hour')}`
            }))
        }
        
        return (
            <Container style={styles.container}> 
                <LoadingModal text={I18n.t('processing')} ref={ref=>this.processingModal = ref} loading={this.state.processing}/>
                <View style={styles.underlineItem}>
                    <Text style={styles.row}>Thời gian duyệt Cashback</Text>
                    <View style={styles.row}>
                        <BadgeSelector listValues={this.hourValues} selectedValue={this.selectValue}
                            onSelect={this._handleSelect} ref={ref=>this.badgeSelector=ref}
                        />
                    </View>
                </View>
            </Container>

        )
    }
}