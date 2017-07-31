import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListTransaction, setDenyReason, setListTransactionPayWithClingme, setDenyReasonClm } from '~/store/actions/transaction'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
import { getToastMessage } from '~/ui/shared/utils'
const requestListTransaction = createRequestSaga({
    request: api.transaction.list,
    key: 'transaction/list',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load transaction', data)
            if (data.code) {
                return setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
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

const requestSendDenyReason = createRequestSaga({
    request: api.transaction.sendDenyReason,
    key: 'transaction/sendDenyReason',
    cancel: 'app/logout',
})
const requestSendDenyReasonClm = createRequestSaga({
    request: api.transaction.sendDenyReasonClm,
    key: 'transaction/sendDenyReasonClm',
    cancel: 'app/logout',
})
requestTransactionConfirm = createRequestSaga({
    request: api.transaction.confirmTransaction,
    key: 'transaction/confirm',
    cancel: 'app/logout',
})
requestDenyReasonClm = createRequestSaga({
    request: api.transaction.getDenyReasonClm,
    key: 'transaction/denyReasonClm',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Deny Reason CLM', data)
            if (data && data.updated && data.updated.data) {
                return setDenyReasonClm(data.updated.data)
            }
        }
    ],
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
            takeLatest('transaction/confirm', requestTransactionConfirm),
            takeLatest('transaction/denyReasonClm', requestDenyReasonClm),
            takeLatest('transaction/sendDenyReasonClm', requestSendDenyReasonClm)
        ]
    },
]


