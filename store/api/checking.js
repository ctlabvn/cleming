import { apiGet, apiPost } from '~/store/api/common'
export default {
    // transaction/merchantapp/list-direct
    // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1&pageNumber=1
    detail(xsession, pageNumber = 1) {
        console.log('Checking detail processing: ', xsession+'---'+pageNumber)
        return apiGet('/merchantapp/compare-check', {pageNumber}, xsession)
    },

}
