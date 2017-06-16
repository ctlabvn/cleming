import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { replaceOrderList, setOrderDenyReason } from '~/store/actions/order'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
const requestGetOrderList = createRequestSaga({
    request: api.order.getOrderList,
    key: 'getOrderList',    
    success: [
        (data) => {
            if (data && data.updated){
                return replaceOrderList(data)
            }
            return setToast('Load order fail: ', JSON.stringify(data))
        },               
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

const requestGetOrderDenyReason = createRequestSaga({
    request: api.order.getDenyOrderReason,
    key: 'getDenyOrderReason',    
    success: [
        (data)=>{
            console.log('Deny Order Reason', data)
            if (data && data.updated && data.updated.data){
                return setOrderDenyReason(data.updated.data)
            }
            return setToast(GENERAL_ERROR_MESSAGE, 'danger')
        }
    ],
    failure: [
        (data) => setToast('can not get order detail', 'error')
    ]
})

const requestUpdateOrderStatus = createRequestSaga({
    request: api.order.updateOrderStatus,
    key: 'updateOrderStatus',    
})
export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('app/getOrderList', requestGetOrderList),
            takeLatest('app/getOrderDetail', requestGetOrderDetail),
            takeLatest('app/getOrderDenyReason', requestGetOrderDenyReason),
            takeLatest('app/updateOrderStatus', requestUpdateOrderStatus)            
        ]
    },
    
]


