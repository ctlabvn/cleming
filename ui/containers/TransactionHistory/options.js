import I18n from '~/ui/I18n'

import { MERCHANT_COLLECTED, CLINGME_COLLECTED } from '~/store/constants/app'

export default {
    tabData: [
        {
            tabID: MERCHANT_COLLECTED,
            text: 'Đối tác đã thu',
        },
        {
            tabID: CLINGME_COLLECTED,
            text: 'Clingme đã thu',
        },
    ]
}