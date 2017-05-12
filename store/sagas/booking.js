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
            return setBookingList(data.updated.bookingList)
        }          
    ],
    failure: [
        (data) => {
            console.log('Booking Err', data)
            return setToast('Booking Fail: '+JSON.stringify(data), 'error')
        }
    ],
})

export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('booking/list', requestBookingList),
        ]
    },
]


