import { apiGet, apiPost } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
   
  
  /**
  * Logs the current user out
  */
  getOrderList (session, from_time=1494435600,to_time=1494499066,place_list,status=0,page=1) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiGet('/order/list', {from_time, to_time, place_list, status, page}, session)
  },  
  
  getOrderDetail(session, orderId) {
    return apiGet('/order/detail', {orderId}, session)
  }

}
