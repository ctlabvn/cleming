import { BOOKING_WAITING_CONFIRM, BOOKING_CONFIRMED, BOOKING_CANCEL } from '~/store/constants/app'
export default {
    tabData : [
        {
            tabID: BOOKING_WAITING_CONFIRM,
            text: 'Chờ xác nhận',
        },
        {
            tabID: BOOKING_CONFIRMED,
            text: 'Đã xác nhận'
        },
        {
            tabID: BOOKING_CANCEL,
            text: 'Đã hủy'
        }
    ]
}