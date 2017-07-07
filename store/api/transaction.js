import { apiGet, apiPost } from '~/store/api/common'
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
    // /merchantapp/transaction-detail
    detail(xsession, dealTransactionId){
        console.log('Trans Detail API', xsession+'---'+dealTransactionId)
        return apiGet('/merchantapp/transaction-detail', {dealTransactionId}, xsession)
    },
    detailPayWithClingme(xsession, transactionId){
        console.log('Tras Detail Clingme', xsession+'---'+transactionId)
        return apiGet('/merchantapp/payclm-detail', {transactionId}, xsession)
    },
    getDenyReason(xsession){
        return apiGet('/merchantapp/transaction-reason', {}, xsession)
    },
    confirmTransaction(xsession, clingmeId, transactionType=1){
        console.log('Transaction API Confirm', xsession+'---'+clingmeId+'---'+transactionType)
        return apiPost('/merchantapp/payclm-confirm', {clingmeId, transactionType}, xsession)
    },
    getDenyReasonClm(xsession){
        return apiGet('/merchantapp/payclm-reason', {}, xsession)
    },
    sendDenyReason(xsession, dealTransactionId, reasonId, note, isMcAccept = 2){
        return apiPost('/merchantapp/confirm-transaction', {dealTransactionId, reasonId, note, isMcAccept}, xsession)
    },
    sendDenyReasonClm(xsession, clingmeId, reasonId, note='', amountMoney=0){
        console.log('Send Deny CLM API', xsession+'---'+clingmeId+'---'+reasonId+'---'+note+'---'+amountMoney)
        return apiPost('/merchantapp/payclm-help', {clingmeId, reasonId, note, amountMoney}, xsession)
    }

}