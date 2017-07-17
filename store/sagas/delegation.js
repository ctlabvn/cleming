import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { getToastMessage } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'

import {
    replaceListDelegation,    
} from '~/store/actions/delegation'


const requestGetListDelegation = createRequestSaga({
    request: api.delegation.getListDelegation,
    key: 'getListDelegation',    
    success: [
        (data) => replaceListDelegation(data),           
    ],
    failure: [
        () => setToast(getToastMessage(I18n.t('could_not_get_list_delegation')), 'error', null, null, 3000, 'top')
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
            takeEvery('app/getListDelegation', requestGetListDelegation),                        
        ]
    },
]

