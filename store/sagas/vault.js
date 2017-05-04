import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceVaultInformation,    
} from '~/store/actions/vault'


const requestGetVaultInformation = createRequestSaga({
    request: api.vault.getVaultInformation,
    key: 'getVaultInformation',    
    success: [
        (data) => replaceVaultInformation(data),           
    ],
    failure: [
        () => setToast('Couldn\'t get vault information', 'error')
    ],
})


// saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/getVaultInformation', requestGetVaultInformation),                        
        ]
    },
]

