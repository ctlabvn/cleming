import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, goBack, showPopupInfo } from '~/store/actions/common'

import {
  replaceProfile,
  setListEmployee,
  setGeneratedPassword
} from '~/store/actions/account'

import {
  setUserAvatar,
  updateProfileToRedux
} from '~/store/actions/auth'
import { getToastMessage } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'

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
    () => showPopupInfo(I18n.t('mess_change_password_success')),
    // () => forwardTo('merchantOverview')
  ],
  failure: [
    () => showPopupInfo(I18n.t('err_current_password_invalid'))
  ]
})

const requestResetPassword = createRequestSaga({
  request: api.account.resetPassword,
  key: 'resetPassword',
  success: [
    (data) => {
      const { code, msg } = data
      console.log('Data', data)
      // if (code === 1201) {
      //   throw new Error(msg)
      // }
      if (data && data.updated && data.updated.isSuccess){
        return showPopupInfo(I18n.t('mess_reset_password_success'))
      }
      return showPopupInfo(I18n.t('err_not_master'))
    }
  ],
  failure: [
    (data) => {
      if (data.code == 1201){
        return showPopupInfo(I18n.t('err_reset_password'))
      }
      return showPopupInfo(GENERAL_ERROR_MESSAGE)
    }
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
        return setToast(getToastMessage(I18n.t('err_phone_exists')), 'info', null, null, 3000, 'top')
      } else if (error.code == 1206) {
        return setToast(getToastMessage(I18n.t('err_email_exists')), 'info', null, null, 3000, 'top')
      }
      return setToast(getToastMessage(I18n.t('err_connection')), 'info', null, null, 3000, 'top')
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
          return setToast(getToastMessage(I18n.t(error.msg)), 'info', null, null, 3000, 'top')
          break;
        default:
          return setToast(getToastMessage(I18n.t('err_connection')), 'info', null, null, 3000, 'top')
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


