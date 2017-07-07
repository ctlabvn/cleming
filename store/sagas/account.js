import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, goBack } from '~/store/actions/common'

import {
    replaceProfile,
    setListEmployee,
    setGeneratedPassword
} from '~/store/actions/account'

import {
  setUserAvatar,
  updateProfileToRedux
} from '~/store/actions/auth'

import I18n from '~/ui/I18n'


const requestGetProfile = createRequestSaga({
    request: api.account.getProfile,
    key: 'getProfile',    
    success: [
        (data) => replaceProfile(data),       
    ],
    failure: [
        () => setToast('Couldn\'t get profile', 'danger')
    ],
})

const requestChangePassword = createRequestSaga({
    request: api.account.changePassword,
    key: 'changePassword',    
    success: [
        () => setToast('Thay đổi Mật khẩu thành công.'),
        // () => forwardTo('merchantOverview')
    ],
    failure: [
        () => setToast('Mật khẩu hiện tại không đúng, vui lòng kiểm tra lại', 'danger')
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
          return setToast('Đặt lại mật khẩu thành công.')  
        } 
    ],
    failure: [
        () => setToast('Số điện thoại không tồn tại, vui lòng liên hệ chủ cửa hàng để kiểm tra.', 'danger')
    ]
})

const requestUpdateProfile = createRequestSaga({
  request: api.account.updateProfile,
  key: 'updateProfile',
  success: [
    (data) => updateProfileToRedux(data),
    () => setToast('Update profile successfully!'),
      goBack,
  ],
  failure: [
    () => setToast('Couldn\'t update profile', 'danger')
  ],
})

const requestGetListEmployee = createRequestSaga({
  request: api.account.getListEmployee,
  key: 'getListEmployee',
  success: [
    (data) => setListEmployee(data),
  ],
  failure: [
  ],
})

const requestGetGeneratedPassword = createRequestSaga({
  request: api.account.getGeneratedPassword,
  key: 'getGeneratedPassword',
  success: [
    (data) => setGeneratedPassword(data),
  ],
  failure: [
  ],
})

const requestUpdateEmployeeInfo = createRequestSaga({
  request: api.account.updateEmployeeInfo,
  key: 'updateEmployeeInfo',
  success: [

  ],
  failure: [
    (error) => {
      if (error.code == 1207) {
        return setToast('Số điện thoại đã tồn tại', 'danger')
      } else if (error.code == 1206) {
        return setToast('Địa chỉ email đã tồn tại', 'danger')
      }
      return setToast('Không có kết nối đến máy chủ', 'danger')
    }
  ],
})

const requestCreateEmployeeInfo = createRequestSaga({
  request: api.account.createEmployeeInfo,
  key: 'createEmployeeInfo',
  success: [
  
  ],
  failure: [
    (error) => {
      // console.log('Error', error)
      //   console.warn(JSON.stringify(error))
        switch (error.code) {
            case 1207:
            case 1206:
            case 1808:
                return setToast(I18n.t(error.msg), 'danger');
                break;
            default:
                return setToast(I18n.t('connection_have_problem'), 'danger')
                break;
        }
    }
  ],
})

const requestDeleteEmployeeInfo = createRequestSaga({
  request: api.account.deleteEmployeeInfo,
  key: 'deleteEmployeeInfo',
  success: [
  
  ],
  failure: [
  ],
})

const requestUpdateOwnerAvatar = createRequestSaga({
  request: api.account.updateOwnerAvatar,
  key: 'updateOwnerAvatar',
  success: [
    (data) => setUserAvatar(data),
  ],
  failure: [
    () => setToast('Couldn\'t upload avatar', 'danger')
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
          takeLatest('app/updateOwnerAvatar', requestUpdateOwnerAvatar),
          takeLatest('app/updateProfile', requestUpdateProfile)
        ]
    },
]


