import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setBookingList } from '~/store/actions/booking'

const requestBookingList = createRequestSaga({
    request: api.booking.list,
    key: 'booking/list',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load booking', data)
            if (data.code) {
                return setToast('Load Booking Fail: ' + JSON.stringify(data), 'error')
            }
            return setBookingList(data.updated)
        }
    ],

    failure: [
    ],
})

const requestBookingDetail = createRequestSaga({
    request: api.booking.detail,
    key: 'booking/detail',
    cancel: 'app/logout',
    failure: [
    ]
})

export default [
    function* fetchWatcher() {
        yield [
            takeLatest('booking/list', requestBookingList),
            takeLatest('booking/detail', requestBookingDetail)
        ]
    },
]


