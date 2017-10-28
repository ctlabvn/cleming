import { apiGet } from '~/store/api/common'
export default {
    list(xsession, modeGet=1) {        
        return apiGet('/place/list', {modeGet}, xsession)
    },

    listPlace(xsession, latitude=0, longitude=0, modeGet=0){
        console.log('Get list place', xsession+'---'+latitude+'---'+longitude)
        return apiGet('/merchantapp/list-place', {latitude, longitude, modeGet}, xsession)
    },
            // fromTime=1304848140&toTime=1494236940
    statistic(xsession, placeIds, fromTime=1304848140, toTime=1494236940){
        return apiGet('/place/statisticBasic', {placeIds, fromTime, toTime}, xsession)
    },
    news(xsession, placeId){
        console.log('Place News API', xsession+'---'+placeId)
        if (!placeId || placeId <= 0) return apiGet('/merchantapp/news', {}, xsession)
        return apiGet('/merchantapp/news', {placeId}, xsession)
    }
}