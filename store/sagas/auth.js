import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { CONNECTION_ERROR_MESSAGE } from '~/store/constants/app'

import {
    setAuthState,
    saveLoggedUser,
    removeLoggedUser,
    setUserData
} from '~/store/actions/auth'

import {
    getProfile,
} from '~/store/actions/account'

import { closeDrawer } from '~/store/actions/common'

// const requestLogin = createRequestSaga({
//     request: api.auth.login,
//     key: 'login',
//     cancel: 'app/logout',
//     success: [
//         (data) => saveLoggedUser(data),
//         ({access_token}) => getProfile(access_token),
//         () => setAuthState(true),                   
//         () => forwardTo('home'), 
//         () => setToast('Logged successfully!!!'),            
//     ],
//     failure: [
//         () => setToast('Couldn\'t login', 'danger')
//     ],
// })

const requestLogin = createRequestSaga({
    request: api.auth.login,
    key: 'login',
    cancel: 'app/logout',
    success: [
        (data) => setUserData(data),
        (data) => setAuthState(true),
        (data) => {
            if (data.firstLogin == 0) {
                return forwardTo('merchantOverview', true)
            } else {
                return noop("nothing")
            }
        },
        // () => setToast('Logged successfully!!!')
    ],
    failure: [
        // code : 1201
        (data) => {
            if (data.code == 1203 || data.code == 1202){
                return setToast('Email/Số Điện Thoại không hợp lệ. Vui lòng kiểm tra lại.', 'danger')
            }else if(data.code == 1201){
                return setToast('Email/Số Điện Thoại chưa được đăng kí, vui lòng liên hệ chủ cửa hàng.', 'danger')
            }else if (data.code == 1204){
                return setToast('Tài khoản này chưa được kích hoạt.', 'danger')
            }else {
                return setToast(CONNECTION_ERROR_MESSAGE, 'danger')
            }
            
        } 
        
    ],
})


const requestLogout = createRequestSaga({
    request: api.auth.logout,   
    key: 'logout',
    success: [
        // () => removeLoggedUser(),
        // () => setAuthState(false),
        // () => closeDrawer(),
        // () => forwardTo('login', true)
    ],
    failure: [
        // () => removeLoggedUser(),
        // () => setAuthState(false),
        // () => closeDrawer(),
        // () => forwardTo('login', true)
    ],
})



// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    // other watcher may be background workers
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/login', requestLogin),
            takeLatest('app/logout', requestLogout)
        ]
    },
]


