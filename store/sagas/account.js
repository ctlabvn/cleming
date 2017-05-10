import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceProfile,
} from '~/store/actions/account'


const requestGetProfile = createRequestSaga({
    request: api.account.getProfile,
    key: 'getProfile',    
    success: [
        (data) => replaceProfile(data),       
    ],
    failure: [
        () => setToast('Couldn\'t get profile', 'error')
    ],
})

const requestChangePassword = createRequestSaga({
    request: api.account.changePassword,
    key: 'changePassword',    
    success: [
        () => setToast('Change password successfully!')
    ],
    failure: [
        () => setToast('Couldn\'t change password', 'error')
    ]
})

const requestResetPassword = createRequestSaga({
    request: api.account.resetPassword,
    key: 'resetPassword',    
    success: [
        ({code, msg}) => {
        if(code === 1201)  {
            throw new Error(msg)            
        }
          return setToast('Reset password successfully!')  
        } 
    ],
    failure: [
        () => setToast('Couldn\'t reset password', 'error')
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
            takeLatest('app/getProfile', requestGetProfile),  
            takeLatest('app/changePassword', requestChangePassword),  
            takeLatest('app/resetPassword', requestResetPassword),            
        ]
    },
]


