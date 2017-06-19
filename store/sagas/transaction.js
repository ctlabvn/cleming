import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListTransaction, setDenyReason, setListTransactionPayWithClingme } from '~/store/actions/transaction'

const requestListTransaction = createRequestSaga({
    request: api.transaction.list,
    key: 'transaction/list',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load transaction', data)
            if (data.code){
                return setToast('Load trans fail: '+JSON.stringify(data), 'error')
            }
            return setListTransaction(data.updated.data)
        }          
    ],
})
requestListTransactionPayWithClingme = createRequestSaga({
    request: api.transaction.listPayWithClingme,
    key: 'transaction/listPayWithClingme',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load transaction PayWithClingme', data)
            return setListTransactionPayWithClingme(data.updated.data)
        }          
    ],
}),
requestTransactionDetail = createRequestSaga({
    request: api.transaction.detail,
    key: 'transaction/detail',
    cancel: 'app/logout',
    failure: [
    ],
})
requestTransactionDetailPayWithClingme = createRequestSaga({
    request: api.transaction.detailPayWithClingme,
    key: 'transaction/detailPayWithClingme',
    cancel: 'app/logout',
})
requestDenyReason = createRequestSaga({
    request: api.transaction.getDenyReason,
    key: 'transaction/denyReason',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Deny Reason', data)
            return setDenyReason(data.updated.data)
        }
    ],
})

requestSendDenyReason = createRequestSaga({
    request: api.transaction.sendDenyReason,
    key: 'transaction/sendDenyReason',
    cancel: 'app/logout',
})
requestTransactionConfirm = createRequestSaga({
    request: api.transaction.confirmTransaction,
    key: 'transaction/confirm',
    cancel: 'app/logout',
})
export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('transaction/list', requestListTransaction),
            takeLatest('transaction/listPayWithClingme', requestListTransactionPayWithClingme),
            takeLatest('transaction/detail', requestTransactionDetail),
            takeLatest('transaction/denyReason', requestDenyReason),
            takeLatest('transaction/sendDenyReason', requestSendDenyReason),
            takeLatest('transaction/detailPayWithClingme', requestTransactionDetailPayWithClingme),
            takeLatest('transaction/confirm', requestTransactionConfirm)
        ]
    },
]


