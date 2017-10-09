import I18n from '~/ui/I18n'
export const TRANSACTION_TYPE_CLINGME = 2
export const TRANSACTION_TYPE_DIRECT = 0
export const TRANSACTION_TYPE_ORDER_SUCCESS = 1
export const ORDER_WAITING_CONFIRM = 0
export const ORDER_WAITING_DELIVERY = 1
export const ORDER_SUCCESS = 2
export const ORDER_CANCEL = 3
export const REVENUE_PROCESSING = 1;
export const REVENUE_DONE = 2;
export const REVENUE_DELIVERY = 1;
export const REVENUE_CLINGME_PAY = 2;
export const ALL_PLACES_CHECKING = 1;

export const MERCHANT_COLLECTED = 1;
export const CLINGME_COLLECTED = 2;
export const CLINGME_MERCHANT_COLLECTED = 3;

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
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss  DD/MM/YY'
export const TIME_FORMAT_WITHOUT_SECOND = 'HH:mm  DD/MM/YY'
export const TIME_FORMAT_WITHOUT_SECOND_FULL_YEAR = 'HH:mm  DD/MM/YYYY'
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
    TRANSACTION_CLINGME: 10,
    TRANSACTION_CLINGME_REPUSH: 15

}

export const TRANSACTION_TYPE={
    CLINGME: 2,
    DIRECT: 0
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

// exclusiveType: int, khuyến mại độc quyền hay khuyến mại thường: 0 – khuyến mại thường, 1 – khuyến mại độc quyền. (bắt buộc)

export const EXCLUSIVE_TYPE = {
  NORMAL: 0,
  CASHBACK: 1
}

export const PROMO_TYPE = {
  PERCENT: 1,
  GIFT: 2,
  MONEY: 3
}

export const initialRouteName = 'login'
export const initialAuthRouteName = 'merchantOverview'
export const ITEM_ALL_PLACE = {id: 0, name: I18n.t('all_places'), address: I18n.t('all_places')}

export const CASHOUT_AND_PAY_HISTORY_ALL = 0
export const CASHOUT_AND_PAY_HISTORY_COME_IN = 1
export const CASHOUT_AND_PAY_HISTORY_COME_OUT = 2
