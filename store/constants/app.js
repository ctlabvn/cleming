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

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY'
export const DEFAULT_MONTH_FORMAT = 'MM/YYYY'
export const DEFAULT_YEAR_FORMAT = 'YYYY'
export const DEFAULT_TIME_FORMAT = 'hh:mm:ss DD/MM/YYYY'

export const NOTIFY_TYPE={
    TRANSACTION_DIRECT_WAITING: 5,
    TRANSACTION_DIRECT_SUCCESS: 7,
    NEW_BOOKING: 6
}
export const TRANSACTION_TYPE={
    CLINGME: 1,
    DIRECT: 2
}