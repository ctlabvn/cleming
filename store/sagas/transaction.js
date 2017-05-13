import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListTransaction } from '~/store/actions/transaction'

const requestListTransaction = createRequestSaga({
    request: api.transaction.list,
    key: 'transaction/list',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load transaction', data)
            return setListTransaction(data.updated.data)
        }          
    ],
    failure: [
        (data) => {
            return setToast('Load Fail: '+JSON.stringify(data), 'error')
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
            return setListTransaction(data.updated.data)
        }          
    ],
    failure: [
        () => setToast('Couldn\'t load list transaction Clingme', 'error')
    ],
})
export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('transaction/list', requestListTransaction),
            takeLatest('transaction/listPayWithClingme', requestListTransactionPayWithClingme)
        ]
    },
]


