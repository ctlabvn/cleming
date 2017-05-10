import { CLINGME_SERVER } from '~/store/constants/api'
import { apiGet } from '~/store/api/common'
// export default {
//     list(xsession, modeGet=1) {        
//         return apiGet('/place/list', {modeGet}, xsession)
//     },
//             // fromTime=1304848140&toTime=1494236940
//     statistic(xsession, placeIds, fromTime=1304848140, toTime=1494236940){
//         return apiGet('/place/statisticBasic', {placeIds, fromTime, toTime}, xsession)
//     }
// }

export default {
    list(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0) {
        return apiGet('/transaction/merchantApp/list-direct', {placeId, fromTime, toTime, option}, xsession)
    },
    listPayWithClingme(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0) {
        return apiGet('/transaction/merchantApp/list-clm', {placeId, fromTime, toTime, option}, xsession)
    },
}