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
  
  updateProfile (session, updatedInfo) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiPost('/edit/info', updatedInfo, session)
  },
  
  updateAvatar (accessToken, avatarFile) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiPost('/edit/info', {avatarFile}, accessToken)
  },
  
  getListAccount() {
    return apiPost('/account/list')
  },

  changePassword(session, data) {
    return apiPost('/change/password', data, session)
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
    console.log(updatedData)
    return apiPost('/merchantapp/edit-subaccount', updatedData, session)
  },
  
  createEmployeeInfo(session, updatedData) {
    return apiPost('/merchantapp/add-subaccount', updatedData, session)
  },
  
  deleteEmployeeInfo(session, bizAccountId) {
    return apiPost('/merchantapp/delete-subaccount', {bizAccountId}, session)
  },
  
  updateOwnerAvatar(session, avatarFile) {
    return apiPost('/edit/avatar', avatarFile, session)
  }

}
