import { apiGet } from '~/store/api/common'
export default {
    list(xsession, modeGet=1) {        
        return apiGet('/place/list', {modeGet}, xsession)
    },
            // fromTime=1304848140&toTime=1494236940
    statistic(xsession, placeIds, fromTime=1304848140, toTime=1494236940){
        console.log('CALL TO statistic', xsession+'-----'+placeIds)
        return apiGet('/place/statisticBasic', {placeIds, fromTime, toTime}, xsession)
    }
}