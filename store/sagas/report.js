import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setMapReport, setCustomerReport } from '~/store/actions/report'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
const requestCustomerReport = createRequestSaga({
    request: api.report.getCustomerReport,
    key: 'customer/statistic',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load report', data)
            if (data.code){
                return setToast(GENERAL_ERROR_MESSAGE, 'error')
            }
            // return setListTransaction(data.updated.data)
            return setCustomerReport(data.updated.data)
        }          
    ],
})
const requestMapReport = createRequestSaga({
    request: api.report.getMapStatistic,
    key: 'map/statistic',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load map', data)
            if (data.code){
                return setToast(GENERAL_ERROR_MESSAGE, 'error')
            }
            // return setListTransaction(data.updated.data)
            return setMapReport(data.updated.data)
        }          
    ],
})
export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('customer/statistic', requestCustomerReport),
            takeLatest('map/statistic', requestMapReport)
        ]
    },
]


