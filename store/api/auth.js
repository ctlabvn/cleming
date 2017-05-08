import { apiPost } from '~/store/api/common'
import { CLINGME_SERVER } from '~/store/constants/api'
import md5 from 'md5'
export default {


  login(username, password) {
    // return apiPost(`/token`, {      
    //   username,
    //   password,
    //   grant_type: 'password',
    // })

    // var crypto = require('crypto');
    // var name = 'braitsch';
    // var hash = crypto.createHash('md5').update(name).digest('hex');
    // console.log(hash); //
    return fetch(CLINGME_SERVER + 'login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-VERSION': 1,
        'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
        'X-DATA-VERSION': 1,
        'X-AUTH': ''
      },
      body: JSON.stringify({
        userName: username,
        password: md5(password),
      })
    }).then(async (response) => {
      const xsession = response.headers.map['x-session'][0]
      const body = await response.json()
      return { ...body.updated.account, xsession }
    })
  },

  refreshAccessToken(refreshToken) {
    return apiPost(`/auth/token`, {
      refreshToken,
    })
  },

  reject(refreshToken) {
    return apiPost(`/auth/reject`, {
      refreshToken,
    })
  },

  /**
  * Logs the current user out
  */
  logout(accessToken) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiPost(`/api/Account/Logout`, {}, accessToken)
  },

}
