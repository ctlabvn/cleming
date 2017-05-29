import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListPlace, setPlaceStatistic, setMerchantNews } from '~/store/actions/place'

const requestListPlace = createRequestSaga({
    request: api.place.list,
    key: 'listPlace',
    cancel: 'app/logout',
    success: [
        (data) => {
            // if (data.code && data.msg == 'session_expired'){
            //     return forwardTo('login')
            // }
            return setListPlace(data.updated.listPlace)
        }          
    ],
    failure: [
        (data) => setToast('Place List: '+JSON.stringify(data), 'error')
    ],
})
const requestPlaceStatistic = createRequestSaga({
    request: api.place.statistic,
    key: 'placeStatistic',
    cancel: 'app/logout',
    success: [
        (data) => {
            return setPlaceStatistic(data.updated.data)
        }          
    ],
    failure: [
        (data) => setToast('Place Statistic: '+JSON.stringify(data), 'error')
    ],
})

const requestNews = createRequestSaga({
  request: api.place.news,
  key: 'merchantNews',
  cancel: 'app/logout',
  success: [
    (data) => {
      return setMerchantNews(data.updated.data)
    }
  ],
  failure: [
    () => setToast('Couldn\'t connect to server', 'error')
  ],
})

export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('place/list', requestListPlace),
            takeLatest('place/statistic', requestPlaceStatistic),
            takeLatest('place/getNews', requestNews)
        ]
    },
    
]


