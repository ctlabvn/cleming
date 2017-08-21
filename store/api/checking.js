import { apiGet, apiPost } from '~/store/api/common'
export default {
    // transaction/merchantapp/list-direct
    // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1&pageNumber=1
    detail(xsession, fromTime=1320985607, toTime=1510374407) {
        console.log('Checking detail processing: ', xsession+'---'+fromTime+'----'+toTime)
        return apiGet('/merchantapp/compare-check', {fromTime, toTime}, xsession)
    },

}