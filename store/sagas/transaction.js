import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListTransaction } from '~/store/actions/transaction'

const requestListTransaction = createRequestSaga({
    request: api.transaction.list,
    key: '',
    cancel: 'app/logout',
    success: [
        (data) => {
            if (data.code && data.msg == 'session_expired'){
                return forwardTo('login')
            }
            return setListTransaction(data.updated.data)
        }          
    ],
    failure: [
        () => setToast('Couldn\'t login', 'error')
    ],
})

export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('transaction/list', requestListTransaction),
        ]
    },
]


