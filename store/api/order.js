import { apiGet, apiPost } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
   
  
  /**
  * Logs the current user out
  */
  getOrderList (session, place_list,status=0,page=1, from_time=1304848140,to_time=1494236940) {
    // return fetchJsonWithToken(token, `/logout`)
    console.log('Order API', session+'---'+place_list+'---'+status+'---'+page+'---'+from_time+'---'+to_time)
    return apiGet('/order/list', {from_time, to_time, place_list, status, page}, session)
  },  
  
  getOrderDetail(session, orderId) {
    console.log('Order detail API', session+'---'+orderId)
    return apiGet('/order/detail', {orderId}, session)
  },
  getDenyOrderReason(session){
    console.log('Order Reason API', session)
    return apiGet('/merchantapp/order-reason', {}, session)
  },
  updateOrderStatus(session, posOrderId, status, reasonId, note=''){
    console.log('Update order status', session+'---'+posOrderId+'---'+status+'---'+reasonId+'---'+note)
    return apiPost('/merchantapp/update-order', {posOrderId, status, reasonId, note},session)
  }

}
