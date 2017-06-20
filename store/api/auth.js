import { apiPost, apiGet } from '~/store/api/common'
import { CLINGME_SERVER } from '~/store/constants/api'
import md5 from 'md5'
import 'whatwg-fetch'
export default {


  login(username, password, xDevice, xUniqueDevice) {
    console.log('Login API', username+'---'+password+'---'+xDevice+'---'+xUniqueDevice)
    return fetch(CLINGME_SERVER + 'login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-VERSION': 1,
        'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
        'X-DATA-VERSION': 1,
        'X-AUTH': '',
        'X-DEVICE': xDevice,
        'X-UNIQUE-DEVICE': xUniqueDevice
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

  // login(userName, password) {
  //   return apiPost('/login', {
  //     userName,
  //     password
  //   })
  // },

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
  logout(session, xDevice, xUniqueDevice) {
    // return fetchJsonWithToken(token, `/logout`)
    console.log('API logout', session+'---'+xDevice+'---'+xUniqueDevice)
    return apiGet(`/logout`, {}, session, {'X-DEVICE': xDevice, 'X-UNIQUE-DEVICE': xUniqueDevice})
  },

}
