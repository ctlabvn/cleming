import { apiGet } from '~/store/api/common'
export default {
    list(xsession, modeGet=1) {        
        return apiGet('/place/list', {modeGet}, xsession)
    },
            // fromTime=1304848140&toTime=1494236940
    statistic(xsession, placeIds, fromTime=1304848140, toTime=1494236940){
        return apiGet('/place/statisticBasic', {placeIds, fromTime, toTime}, xsession)
    },
    news(xsession, placeIds, fromTime=1304848140, toTime=1494236940){
        return apiGet('/merchantapp/news', {placeIds, fromTime, toTime}, xsession)
    }
}