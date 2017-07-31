import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, goBack, showPopupInfo } from '~/store/actions/common'

import {
    setBalance, setBanks, setBalanceDetail
} from '~/store/actions/wallet'

import { getToastMessage } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'


const requestGetBalance = createRequestSaga({
    request: api.wallet.balance,
    key: 'app/getBalance',
    success: [
        (data) => {
            console.log('Balance: ', data)
            if (data.data){
                return setBalance(data.data)
            }
            return setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
        }
    ],
    failure: [
    ]
})

const requestGetBalanceDetail = createRequestSaga({
    request: api.wallet.balanceDetail,
    key: 'app/getBalanceDetail',
    success: [
        (data) => {
            console.log('Balance Detail: ', data)
            if (data.data){
                return setBalanceDetail(data.data)
            }
            return setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
        }
    ],
    failure: [
    ]
})

const requestGetBanks = createRequestSaga({
    request: api.wallet.banks,
    key: 'app/getBanks',
    success: [

        (data) => {
            if (data.data){
                console.log('Bank Data: ', data)
                return setBanks(data.data)
            }
        }
    ],
    failure: [
    ]
})

const requestCashout = createRequestSaga({
    request: api.wallet.cashout,
    key: 'app/cashout',
})

// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/getBalance', requestGetBalance),
            takeLatest('app/getBalanceDetail', requestGetBalanceDetail),
            takeLatest('app/getBanks', requestGetBanks),
            takeLatest('app/cashout', requestCashout)
        ]
    },
]


