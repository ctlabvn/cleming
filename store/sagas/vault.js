import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { getToastMessage } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'

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
        () => setToast(getToastMessage(I18n.t('could_not_get_vault_information')), 'error', null, null, 3000, 'top')
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

