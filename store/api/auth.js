import { apiPost } from '~/store/api/common'

export default {
 

  login (username, password) {
    return apiPost(`/token`, {      
      username,
      password,
      grant_type: 'password',
    })
  },

  refreshAccessToken (refreshToken) {
    return apiPost(`/auth/token`, {      
      refreshToken,
    })
  },

  reject (refreshToken) {
    return apiPost(`/auth/reject`, {
      refreshToken,
    })
  },
  
  /**
  * Logs the current user out
  */
  logout (accessToken) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiPost(`/api/Account/Logout`, {}, accessToken)
  },

}
