import { CLINGME_SERVER } from '~/store/constants/api'
export default {
    list(xsession, from=1320985607, to=1510374407) {
        //http://dev.clingme.net:9099/transaction/list?fromTime=1320985607&toTime=1510374407
        return fetch(CLINGME_SERVER + 'transaction/list?fromTime='+from+'&toTime='+to, {
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
}