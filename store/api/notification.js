import { apiGet, apiPost } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
   
  
  /**
  * Logs the current user out
  */
  getNotification(session, page=1) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiGet('/notify/list', {page}, session)
  },

}
