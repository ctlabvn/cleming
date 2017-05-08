import { CLINGME_SERVER } from '~/store/constants/api'
export default {
    list(xsession) {
        //http://dev.clingme.net:9099/transaction/list?fromTime=1320985607&toTime=1510374407
        return fetch(CLINGME_SERVER + 'place/list?modeGet=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-VERSION': 1,
                'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
                'X-DATA-VERSION': 1,
                'X-AUTH': '',
                'X-SESSION': xsession
            },
        }).then(response=>response.json())
    },
            // fromTime=1304848140&toTime=1494236940
    statistic(xsession, placeIds, from=1304848140, to=1494236940){
        console.log('CALL TO statistic', xsession+'-----'+placeIds)
        return fetch(CLINGME_SERVER + 'place/statisticBasic?placeIds='+placeIds+'&fromTime='+from+'&toTime='+to, 
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-VERSION': 1,
                'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
                'X-DATA-VERSION': 1,
                'X-AUTH': '',
                'X-SESSION': xsession
            },
        }).then(response=>response.json())
    }
}