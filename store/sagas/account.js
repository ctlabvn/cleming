import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceProfile,
    setListEmployee,
    setGeneratedPassword
} from '~/store/actions/account'

import {
  setUserAvatar
} from '~/store/actions/auth'


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

const requestGetListEmployee = createRequestSaga({
  request: api.account.getListEmployee,
  key: 'getListEmployee',
  success: [
    (data) => setListEmployee(data),
  ],
  failure: [
    () => setToast('Couldn\'t get employee list', 'error')
  ],
})

const requestGetGeneratedPassword = createRequestSaga({
  request: api.account.getGeneratedPassword,
  key: 'getGeneratedPassword',
  success: [
    (data) => setGeneratedPassword(data),
  ],
  failure: [
    () => setToast('Couldn\'t get password', 'error')
  ],
})

const requestUpdateEmployeeInfo = createRequestSaga({
  request: api.account.updateEmployeeInfo,
  key: 'updateEmployeeInfo',
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t update employee', 'error')
  ],
})

const requestCreateEmployeeInfo = createRequestSaga({
  request: api.account.createEmployeeInfo,
  key: 'createEmployeeInfo',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t create employee', 'error')
  ],
})

const requestDeleteEmployeeInfo = createRequestSaga({
  request: api.account.deleteEmployeeInfo,
  key: 'deleteEmployeeInfo',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t delete employee', 'error')
  ],
})

const requestUpdateOwnerAvatar = createRequestSaga({
  request: api.account.updateOwnerAvatar,
  key: 'updateOwnerAvatar',
  success: [
    (data) => setUserAvatar(data),
  ],
  failure: [
    () => setToast('Couldn\'t upload avatar', 'error')
  ],
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
          takeLatest('app/getListEmployee', requestGetListEmployee),
          takeLatest('app/getGeneratedPassword', requestGetGeneratedPassword),
          takeLatest('app/updateEmployeeInfo', requestUpdateEmployeeInfo),
          takeLatest('app/createEmployeeInfo', requestCreateEmployeeInfo),
          takeLatest('app/deleteEmployeeInfo', requestDeleteEmployeeInfo),
          takeLatest('app/updateOwnerAvatar', requestUpdateOwnerAvatar)
        ]
    },
]


