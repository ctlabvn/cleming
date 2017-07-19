import { BOOKING_WAITING_CONFIRM, BOOKING_CONFIRMED, BOOKING_CANCEL } from '~/store/constants/app'
import I18n from '~/ui/I18n'
export default {
    tabData : [
        {
            tabID: BOOKING_WAITING_CONFIRM,
            text: I18n.t('booking_wait_confirm'),
        },
        {
            tabID: BOOKING_CONFIRMED,
            text: I18n.t('booking_confirmed')
        },
        {
            tabID: BOOKING_CANCEL,
            text: I18n.t('booking_cancel')
        }
    ]
}