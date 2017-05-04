import { apiGet, apiPost } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
   
  
  /**
  * Logs the current user out
  */
  getProfile (accessToken) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiGet('/Api/AccountSettings/Profile', {}, accessToken)
  },

  getBusinessProfile(accessToken) {
    return apiGet('/Api/BusinessAccount/BusinessAccountProfile', {}, accessToken)
  }

}
