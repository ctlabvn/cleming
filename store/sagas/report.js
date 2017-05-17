import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setCustomerReport } from '~/store/actions/report'
const requestCustomerReport = createRequestSaga({
    request: api.report.getCustomerReport,
    key: 'customer/statistic',
    cancel: 'app/logout',
    success: [
        (data) => {
            console.log('Load report', data)
            if (data.code){
                return setToast('Load trans fail: '+JSON.stringify(data), 'error')
            }
            // return setListTransaction(data.updated.data)
            return setCustomerReport(data.updated.data)
        }          
    ],
    failure: [
        (data) => {
            return setToast('Load Fail: '+JSON.stringify(data), 'error')
        }
    ],
})
export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('customer/statistic', requestCustomerReport),
        ]
    },
]


