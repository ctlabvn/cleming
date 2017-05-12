import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { replaceOrderList } from '~/store/actions/order'

const requestGetOrderList = createRequestSaga({
    request: api.order.getOrderList,
    key: 'getOrderList',    
    success: [
        (data) => replaceOrderList(data),               
    ],
    failure: [
        (data) => setToast('Can not get order', 'error')
    ],
})
const requestGetOrderDetail = createRequestSaga({
    request: api.order.getOrderDetail,
    key: 'getOrderDetail',    
    failure: [
        (data) => setToast('can not get order detail', 'error')
    ],
})

export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('app/getOrderList', requestGetOrderList),
            takeLatest('app/getOrderDetail', requestGetOrderDetail),            
        ]
    },
    
]


