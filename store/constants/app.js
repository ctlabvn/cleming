import I18n from '~/ui/I18n'
export const TRANSACTION_TYPE_CLINGME = 1
export const TRANSACTION_TYPE_DIRECT = 2
export const ORDER_WAITING_CONFIRM = 0
export const ORDER_WAITING_DELIVERY = 1
export const ORDER_SUCCESS = 2
export const ORDER_CANCEL = 3

//  "transactionStatus": int,	// Trạng thái của hoá đơn, 0 và 3 là đang chờ Clingme xử lý, 1 là thành công, 2 là bị từ chối, 4 là chờ merchant phê duyệt, 5 là merchant đã xem và khiếu nại
export const TRANSACTION_DIRECT_STATUS = {
    WAITING_CLINGME_PROCESS_1: 0,
    WAITING_CLINGME_PROCESS_2: 3,
    SUCCESS: 1,
    REJECT: 2,
    WAITING_MERCHANT_CHECK: 4,
    MERCHANT_CHECKED: 5
}

// status: 0 là lấy các booking đang chờ, status = 1 là booking đã được xác nhận
export const BOOKING_WAITING_CONFIRM = 0
export const BOOKING_CONFIRMED = 1
export const BOOKING_CANCEL = 2

export const DEFAULT_DATE_FORMAT = 'D/M/YY'
export const DEFAULT_MONTH_FORMAT = 'MM/YYYY'
export const DAY_WITHOUT_YEAR = 'DD/MM'
export const DEFAULT_YEAR_FORMAT = 'YYYY'
export const DEFAULT_HOUR_FORMAT = 'HH:mm'
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss  D/M/YY'
export const TIME_FORMAT_WITHOUT_SECOND = 'HH:mm  D/M/YY'
export const NOTIFY_TYPE={
    COMMENT: 1,
    PAY: 2,
    NEW_BILL: 3,
    DEAL_EXPIRED: 4,
    TRANSACTION_DIRECT_WAITING: 5,
    TRANSACTION_DIRECT_SUCCESS: 7,
    NEW_BOOKING: 6,
    NEW_ORDER: 8,
    TRANSACTION_FEEDBACK: 9,
    ORDER_FEEDBACK: 11,
    ORDER_CANCELLED: 12,
    ORDER_REPUSH_1: 13,
    ORDER_REPUSH_2: 14,
    TRANSACTION_CLINGME: 10
}

export const TRANSACTION_TYPE={
    CLINGME: 1,
    DIRECT: 2
}
export const FEEDBACK_CLM_TRANSACTION = {
    MISS: 1,
    REDUNDANT: 2
}

export const DIFF_COORD = 0.1
export const FAST_DELIVERY = {
    YES: 1,
    NO: 0
}
export const DELIVERY_FEEDBACK = {
  OK: 1,
  CANCEL: 2
}

export const GENERAL_ERROR_MESSAGE = I18n.t('err_general')
export const EXPIRED_ERROR_MESSAGE = I18n.t('err_expired')
export const CONNECTION_ERROR_MESSAGE = I18n.t('err_connection')
export const DETECT_LOCATION_INTERVAL = 180000 // 3 minute

export const DEFAULT_MAP_DELTA = {
    LAT: 0.004,
    LONG: 0.004
}

export const TRANSACTION_DISPLAY = {
    BOTH: 0,
    CLINGME: 1,
    DIRECT: 2,
}

export const SCREEN = {
    TRANSACTION_LIST_DIRECT: 'transactionListDirect',
    TRANSACTION_LIST_CLINGME: 'transactionListClingme',
    ORDER_LIST: 'orderList',
    BOOKING_LIST: 'bookingList'
}