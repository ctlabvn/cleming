import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, goBack, showPopupInfo } from '~/store/actions/common'
import { getToastMessage } from '~/ui/shared/utils'
import { setDealCategory, setListDeal } from '~/store/actions/deal'
import I18n from '~/ui/I18n'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'



const requestDealCategory = createRequestSaga({
    request: api.deal.getDealCategory,
    key: 'deal/getDealCategory',
    success: [
      (data) => {
        if (data && data.updated && data.updated.lstDealCategory){
          return setDealCategory(data.updated.lstDealCategory)
        }
        return noop('')
      }
    ]

})

const requestCreateDeal = createRequestSaga({
    request: api.deal.createDeal,
    key: 'deal/createDeal',
})

const requestDealUserStatistic = createRequestSaga({
    request: api.deal.getDealUserStatistic,
    key: 'deal/getDealUserStatistic'
})

const requestDealStatistic = createRequestSaga({
    request: api.deal.getDealStatistic,
    key: 'deal/getDealStatistic'
})

const requestListDeal = createRequestSaga({
  request: api.deal.getListDeal,
  key: 'deal/getListDeal',
  success: [
    (data) => {
      if (data && data.updated && data.updated.listDeal){
        return setListDeal(data.updated.listDeal)
      }
      return noop('')
    }
  ]
})

export default [
    function* fetchWatcher() {
        yield [
            takeLatest('deal/getDealCategory', requestDealCategory),
            takeLatest('deal/createDeal', requestCreateDeal),
            takeLatest('deal/getDealUserStatistic', requestDealUserStatistic),
            takeLatest('deal/getListDeal', requestListDeal),
            takeLatest('deal/getDealStatistic', requestDealStatistic)
        ]
    },
]
