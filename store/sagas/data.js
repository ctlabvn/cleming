import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceCountries,
    replaceCities
} from '~/store/actions/data'


const requestGetCountries = createRequestSaga({
    request: api.data.getCountries,
    key: 'getCountries',    
    success: [
        (data) => replaceCountries(data),              
    ],
    failure: [
        () => setToast('Couldn\'t get countries', 'error')
    ],
})

const requestGetCities = createRequestSaga({
    request: api.data.getCities,
    key: 'getCities',    
    success: [
        (data) => replaceCities(data),             
    ],
    failure: [
        () => setToast('Couldn\'t get cities', 'error')
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
            takeLatest('app/getCountries', requestGetCountries),            
            takeLatest('app/getCities', requestGetCities),            
        ]
    },
]

