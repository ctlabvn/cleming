import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceNotification,
} from '~/store/actions/notification'


const requestGetNotification = createRequestSaga({
    request: api.notification.getNotification,
    key: 'getNotification',    
    success: [
        (data, {args:[session, page]}) => replaceNotification({data, page}),              
    ],
    failure: [
    ],
})

const requestUpdateReadStatus = createRequestSaga({
    request: api.notification.updateReadNotification,
    key: 'notification/updateReadStatus',
})

// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeEvery('app/getNotification', requestGetNotification),
            takeLatest('notification/updateReadStatus', requestUpdateReadStatus)            
        ]
    },
]


