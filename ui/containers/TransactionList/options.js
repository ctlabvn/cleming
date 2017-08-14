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
          display: I18n.t('not_confirm_yet')
      },
      {
          value: 2,
          display: I18n.t('confirmed')
      }
  ],
  transactionFilter: [
      {
          value: 0,
          display: I18n.t('all_transaction')
      },
      {
          value: 1,
          display: 'Trả qua Clingme'
      },
      {
          value: 2,
          display: 'Trả trực tiếp'
      }
  ],

  tabData: [
      {
          tabID: TRANSACTION_TYPE_DIRECT,
          text: I18n.t('transaction_type_direct'),
      },
      {
          tabID: TRANSACTION_TYPE_CLINGME,
          text: I18n.t('transaction_type_clingme'),
      },
  ],
  tabDataClingme: [
      {
          tabID: TRANSACTION_TYPE_CLINGME,
          text: I18n.t('transaction_type_clingme'),
      }
  ],
  tabDataDirect: [
      {
          tabID: TRANSACTION_TYPE_DIRECT,
          text: I18n.t('transaction_type_direct'),
      }
  ]
}