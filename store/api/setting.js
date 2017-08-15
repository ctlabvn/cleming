import { apiGet, apiPost } from '~/store/api/common'
export default {
    getSettingHour(xsession){
        console.log('Setting Hour API: ', xsession)
        return apiGet('/merchantapp/hours', {}, xsession)
    },
    updateSettingHour(xsession, hour){
    	return apiPost('/merchantapp/update-hours', {}, xsession)
    }
}