import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListRevenueProcessing, setListRevenueDone, setDetailRevenue } from '~/store/actions/revenue'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
import { getToastMessage } from '~/ui/shared/utils'

const requestListRevenueProcessing = createRequestSaga({
    request: api.revenue.listProcessing,
    key: 'revenue/listProcessing',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load list revenue processing', data)
            if (data.code) {
                return setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
            }
            return setListRevenueProcessing(data.updated.data)
        }
    ],

    failure: [
        () => {
        }
    ]
})

const requestListRevenueDone = createRequestSaga({
    request: api.revenue.listDone,
    key: 'revenue/listDone',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load list revenue done', data)
            return setListRevenueDone(data.updated.data)
        }
    ],
})

const requestRevenueDetail = createRequestSaga({
        request: api.revenue.detail,
        key: 'revenue/detail',
        cancel: 'app/logout',
        success: [
            (data) => {
                console.log('Load detail revenue', data)
                setToast(getToastMessage(JSON.stringify(data)), 'info', null, null, 3000, 'top')
                return setDetailRevenue(data.updated.data)
            }
        ],
        failure: [
            () => setToast(getToastMessage('detail failed'), 'info', null, null, 3000, 'top')
        ],
})

export default [
    function* fetchWatcher() {
        yield [
            takeLatest('revenue/listProcessing', requestListRevenueProcessing),
            takeLatest('revenue/listDone', requestListRevenueDone),
            takeLatest('revenue/detail', requestRevenueDetail),
        ]
    },
]


