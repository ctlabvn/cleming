import I18n from '~/ui/I18n'

import { REVENUE_PROCESSING, REVENUE_DONE } from '~/store/constants/app'

export default {
    tabData: [
        {
            tabID: REVENUE_PROCESSING,
            text: I18n.t('revenue_processing'),
        },
        {
            tabID: REVENUE_DONE,
            text: I18n.t('revenue_done'),
        }
    ]
}