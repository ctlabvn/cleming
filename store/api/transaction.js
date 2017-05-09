import { CLINGME_SERVER } from '~/store/constants/api'
export default {
    list(xsession, from=1320985607, to=1510374407) {
        // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1
        return fetch(CLINGME_SERVER + 'transaction/merchantApp/list-direct?fromTime='+from+'&toTime='+to, {
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