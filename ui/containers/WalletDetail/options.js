import { TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT } from '~/store/constants/app'
import I18n from '~/ui/I18n'
export default {
  tabData: [
      {
          tabID: 1,
          text: I18n.t('money_credited'),
      },
      {
          tabID: 2,
          text: I18n.t('debit'),
      },
      {
          tabID: 3,
          text: I18n.t('money_withdrawn')
      }
  ]
}