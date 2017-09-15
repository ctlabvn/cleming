import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { setCheckingData } from '~/store/actions/checking'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
import { getToastMessage } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'


const requestCheckingDetail = createRequestSaga({
    request: api.checking.detail,
    key: 'checking/detail',
    cancel: 'app/logout',
    success: [
        (data) => {
          console.log('Data Checking', data);
          if (data && data.data){
            return setCheckingData(data.data)
          }
          return noop('')

        }
    ],
    failure: [
        (data) => setToast(getToastMessage(I18n.t('err_general')), 'info', null, null, 3000, 'top'),
    ],
})

export default [
    function* fetchWatcher() {
        yield [
            takeLatest('checking/detail', requestCheckingDetail),
        ]
    },
]
