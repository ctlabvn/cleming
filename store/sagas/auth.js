import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

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
        (data)=>setAuthState(true),
        (data) => {
          if (data.firstLogin == 0) {
            return forwardTo('merchantOverview', true)
          } else {
            return noop("nothing")
          }
        },
        () => setToast('Logged successfully!!!')
    ],
    failure: [
        // code : 1201
        (data) => setToast('Email/SDT hoặc mật khẩu không đúng, vui lòng kiểm tra lại', 'danger')
    ],
})


const requestLogout = createRequestSaga({
    request: api.auth.logout,
    key: 'logout',
    success: [
        () => removeLoggedUser(),
        () => setAuthState(false),           
        () => closeDrawer(),
        () => forwardTo('login'),
        () => setToast('Logout successfully!!!'),    
    ],
    failure: [
        () => setToast('Couldn\'t logout', 'danger')
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


