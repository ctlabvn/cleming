import {ORDER_WAITING_CONFIRM, ORDER_WAITING_DELIVERY, ORDER_SUCCESS, ORDER_CANCEL} 
    from '~/store/constants/app'
export default {
  tabData : [
      {
          tabID: ORDER_WAITING_CONFIRM,
          text: 'Chờ xác nhận'
      },
      {
          tabID: ORDER_WAITING_DELIVERY,
          text: 'Chờ giao hàng'
      },
      {
          tabID: ORDER_SUCCESS,
          text: 'Thành công'
      },
      {
          tabID: ORDER_CANCEL,
          text: 'Đã hủy'
      }
  ],
    
}