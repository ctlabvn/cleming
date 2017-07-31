import { apiGet, apiPost } from '~/store/api/common'
export default {
    // transaction/merchantapp/list-direct
    // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1&pageNumber=1
    listProcessing(xsession, fromTime=1320985607, toTime=1510374407, option=0, pageNumber = 1) {
        console.log('Revenue list processing: ', xsession+'---'+fromTime+'----'+toTime+'---'+option+'----'+pageNumber)
        return apiGet('/merchantapp/list-revenue', {fromTime, toTime, option, pageNumber}, xsession)
    },
    listDone(xsession, fromTime=1320985607, toTime=1510374407, option=1, pageNumber=1) {
        console.log('Revenue list done: ', xsession+'---'+fromTime+'---'+toTime+'---'+option+'---'+pageNumber)
        return apiGet('/merchantapp/list-revenue', {fromTime, toTime, option, pageNumber}, xsession)
    },

    list(xsession, fromTime=1320985607, toTime=1510374407, option=0, pageNumber=1) {
        console.log('Revenue list done: ', xsession+'---'+fromTime+'---'+toTime+'---'+option+'---'+pageNumber)
        return apiGet('/merchantapp/list-revenue', {fromTime, toTime, option, pageNumber}, xsession)
    },
    // /merchantapp/transaction-detail
    detail(xsession, tranId=90303){
        console.log('Revenue detail API: ', xsession + '---' + tranId)
        return apiGet('/merchantapp/revenue-detail', {tranId}, xsession)
    },

}