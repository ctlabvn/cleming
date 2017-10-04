import I18n from '~/ui/I18n'

import { CASHOUT_AND_PAY_HISTORY_ALL, CASHOUT_AND_PAY_HISTORY_COME_IN, CASHOUT_AND_PAY_HISTORY_COME_OUT } from '~/store/constants/app'

export default {
    tabData: [
        {
            tabID: CASHOUT_AND_PAY_HISTORY_ALL,
            text: 'Tất cả',
        },
        {
            tabID: CASHOUT_AND_PAY_HISTORY_COME_IN,
            text: 'Tiền chuyển vào',
        },
        {
            tabID: CASHOUT_AND_PAY_HISTORY_COME_OUT,
            text: 'Tiền chuyển ra',
        }
    ]
}