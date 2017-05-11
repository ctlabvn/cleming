import { CLINGME_SERVER } from '~/store/constants/api'
import { apiGet } from '~/store/api/common'
export default {
    list(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0) {
        return apiGet('/transaction/merchantapp/list-direct', {placeId, fromTime, toTime, option}, xsession)
    },
    listPayWithClingme(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0) {
        return apiGet('/transaction/merchantapp/list-clm', {placeId, fromTime, toTime, option}, xsession)
    },
}