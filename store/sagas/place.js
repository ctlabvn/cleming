import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListPlace, setPlaceStatistic } from '~/store/actions/place'

const requestListPlace = createRequestSaga({
    request: api.place.list,
    key: 'listPlace',
    cancel: 'app/logout',
    success: [
        (data) => {
            if (data.code && data.msg == 'session_expired'){
                return forwardTo('login')
            }
            return setListPlace(data.updated.listPlace)
        }          
    ],
    failure: [
        () => setToast('Couldn\'t login', 'error')
    ],
})
const requestPlaceStatistic = createRequestSaga({
    request: api.place.statistic,
    key: 'placeStatistic',
    cancel: 'app/logout',
    success: [
        (data) => {
            if (data.code && data.msg == 'session_expired'){
                return forwardTo('login')
            }
            return setPlaceStatistic(data.updated.data)
        }          
    ],
    failure: [
        () => setToast('Couldn\'t login', 'error')
    ],
})

export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('place/list', requestListPlace),
            takeLatest('place/statistic', requestPlaceStatistic)
        ]
    },
    
]


