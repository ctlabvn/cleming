import { apiGet, apiPost } from '~/store/api/common'

import moment from "moment";
import {
    TIME_FORMAT_WITHOUT_SECOND,
    DEFAULT_TIME_FORMAT
} from "~/store/constants/app";

export default {
    // transaction/merchantapp/list-direct
    // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1&pageNumber=1
    list(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0, pageNumber = 1) {
        console.log('Trans API', xsession+'---'+placeId+'---'+fromTime+'----'+toTime+'---'+option+'----'+pageNumber)
        return apiGet('/transaction/merchantapp/list-direct', {placeId, fromTime, toTime, option, pageNumber}, xsession)
    },
    listPayWithClingme(xsession, placeId, fromTime=1320985607, toTime=1510374407, option=0, pageNumber=1) {
        console.log('Call list CLM: ', xsession+'---'+placeId+'---'+fromTime+'---'+toTime+'---'+option+'---'+pageNumber)
        return apiGet('/transaction/merchantapp/list-clm', {placeId, fromTime, toTime, option, pageNumber}, xsession)
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
    confirmTransaction(xsession, payOfflineId, transactionType=1){
        console.log('Transaction API Confirm', xsession+'---'+payOfflineId+'---'+transactionType)
        return apiPost('/merchantapp/payclm-confirm', {payOfflineId, transactionType}, xsession)
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
    },
    listAll(xsession, placeId, fromTime, toTime, tranType=0, pageNumber=0){
        console.log('List All API: ', xsession+'---'+placeId+'---'+fromTime+'---'+toTime+'---'+tranType+'---'+pageNumber)
        if (!placeId || placeId <= 0) return apiGet('/merchantapp/tran-list', {fromTime, toTime, tranType, pageNumber}, xsession)
        else return apiGet('/merchantapp/tran-list', {placeId, fromTime, toTime, tranType, pageNumber}, xsession)
    },

    historyList(xsession, placeId, fromTime, toTime, option=1, compareId){
        console.log('history list API: ', xsession+'---'+placeId+'---'+fromTime+'---'+toTime+'---'+option+'---'+compareId)
        if (placeId && placeId>0) return apiGet('/merchantapp/tran-history', {placeId, fromTime, toTime, option, compareId}, xsession)
        else return apiGet('/merchantapp/tran-history', {fromTime, toTime, option, compareId}, xsession)
    },

    updateViewStatusPayCLM(xsession, tranId){
        console.log('Update View CLM API: ', xsession+'---'+tranId)
        return apiPost('/merchantapp/view-tran', {tranId}, xsession)
    },

    updateInvoiceNumber(xsession, tranId, invoiceNumber) {
        console.log('Update Invoice Number: ', xsession+'---'+tranId+'---'+invoiceNumber);
        return apiPost('/payclm/update-invoicenumber', {tranId, invoiceNumber}, xsession)
    }
}

