import { CLINGME_SERVER } from '~/store/constants/api'
import { apiGet } from '~/store/api/common'
export default {
    // transaction/merchantapp/list-direct
    // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1&pageNumber=1
    list(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0, pageNumber = 1) {
        console.log('Trans API', xsession+'---'+placeId+'---'+fromTime+'----'+toTime+'---'+option+'----'+pageNumber)
        return apiGet('/transaction/merchantapp/list-direct', {placeId, fromTime, toTime, option, pageNumber}, xsession)
    },
    listPayWithClingme(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0, pageNumber=1) {
        return apiGet('/transaction/merchantapp/list-clm', {placeId, fromTime, toTime, option}, xsession)
    },
}