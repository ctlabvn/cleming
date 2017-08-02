import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setListRevenueProcessing, setListRevenueDone, setListRevenue, setDetailRevenue } from '~/store/actions/revenue'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
import { getToastMessage } from '~/ui/shared/utils'

const requestListRevenue = createRequestSaga({
    request: api.revenue.list,
    key: 'revenue/list',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load list revenue ', data)
            return setListRevenue(data.updated.data)
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
            (data) => setToast(getToastMessage(I18n.t('err_general')), 'info', null, null, 3000, 'top'),
        ],
})

export default [
    function* fetchWatcher() {
        yield [
            takeLatest('revenue/list', requestListRevenue),
            takeLatest('revenue/detail', requestRevenueDetail),
        ]
    },
]


