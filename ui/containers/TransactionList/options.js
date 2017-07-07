import { TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT } from '~/store/constants/app'
import I18n from '~/ui/I18n'
export default {
  transactionFilterListDirect: [
      {
          value: 0,
          display: I18n.t('all_transaction')
      },
      {
          value: 1,
          display: I18n.t('wait_confirm')
      },
      {
          value: 2,
          display: I18n.t('cashback_success')
      },
      {
          value: 3,
          display: I18n.t('reject')
      }
  ],
  transactionFilterListClingme:[
      {
          value: 0,
          display: I18n.t('all_transaction')
      },
      {
          value: 1,
          display: I18n.t('paid')
      },
      {
          value: 2,
          display: I18n.t('pay_complete')
      }
  ],
  tabData: [
      {
          tabID: TRANSACTION_TYPE_CLINGME,
          text: 'Trả qua Clingme',
      },
      {
          tabID: TRANSACTION_TYPE_DIRECT,
          text: 'Trả trực tiếp',
      }
  ]
}