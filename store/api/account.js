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
  },
  
  getListAccount() {
    return apiPost('/account/list')
  },

  changePassword(session, oldPassword, password) {
    return apiPost('/change/password', {oldPassword, password}, session)
  },

  resetPassword(userName) {
    return apiPost('/reset/password', {userName})
  },
  
  getListEmployee(session) {
    return apiGet('/merchantapp/list-subaccount', {}, session)
  },
  
  getGeneratedPassword(session) {
    return apiGet('/merchantapp/gen-password', {}, session)
  },
  
  updateEmployeeInfo(session, updatedData) {
    return apiPost('/merchantapp/edit-subaccount', {updatedData}, session)
  },
  
  createEmployeeInfo(session, updatedData) {
    return apiPost('/merchantapp/add-subaccount', {updatedData}, session)
  }

}
