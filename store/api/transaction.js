import { CLINGME_SERVER } from '~/store/constants/api'
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
    getDenyReason(xsession){
        return apiGet('/merchantapp/transaction-reason', {}, xsession)
    },

    //"dealTransactionId": long,	// id của giao dịch
// "isMcAccept": int,	// 1 là đồng ý, 2 là không đồng ý, khiếu nại
// "reasonId": int,	// id lý do từ chối, nếu là khiếu nại thì bắt buộc gửi lên, nếu đồng ý thì không cần gửi
// "note": string,	// thêm ý kiến khác, lựa chọn, mặc định là “”
    sendDenyReason(xsession, dealTransactionId, reasonId, note, isMcAccept = 2){
        return apiPost('/merchantapp/confirm-transaction', {dealTransactionId, reasonId, note, isMcAccept}, xsession)
    }

}