import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListPlace, setPlaceStatistic, setMerchantNews } from '~/store/actions/place'

const requestListPlace = createRequestSaga({
    request: api.place.listPlace,
    key: 'listPlace',
    cancel: 'app/logout',
    success: [
        (data) => {
            if (data && data.updated) {
                return setListPlace(data.updated.data)
            }
            return setToast('Load place fail', 'error')

        }
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
})

const requestNews = createRequestSaga({
    request: api.place.news,
    key: 'merchantNews',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('News Data', data)
            return setMerchantNews(data.updated.data)
        }
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


