import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, goBack, showPopupInfo } from '~/store/actions/common'

import {
    setBalance,
} from '~/store/actions/wallet'

import {
    setUserAvatar,
    updateProfileToRedux
} from '~/store/actions/auth'
import { getToastMessage } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'


const requestGetBalance = createRequestSaga({
    request: api.wallet.balance,
    key: 'app/getBalance',
    success: [
        (data) => {
            console.log('Balance: ', data)
            return setBalance(data)
        }
    ],
    failure: [
    ]
})

const requestGetBalanceDetail = createRequestSaga({
    request: api.wallet.balanceDetail,
    key: 'app/getBalanceDetail',
    success: [

    ],
    failure: [
    ]
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
        ]
    },
]


