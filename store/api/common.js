
// default api_base for all request
import {
  API_BASE, SECRET_KEY
} from '~/store/constants/api'
import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'
// import {crypto} from 'crypto'

const urlEncode = data => data
  ? Object.keys(data).map((key) => key + '=' + data[key]).join('&')
  : ''

export const rejectErrors = async (res) => {
  const { status } = res
  if (status >= 200 && status < 300) {
    return res
  }
  // we can get message from Promise but no need, just use statusText instead of
  // server return errors
  let errorBody = await (res.json())
  return Promise.reject({ message: res.statusText, status, ...errorBody })
}

// try invoke callback for refresh token here
export const fetchJson = (url, options = {}, base = API_BASE) => {
  // in the same server, API_BASE is emtpy
  /// check convenient way of passing base directly
  //   Checksum=SHA256(X-DATA-VERSION+X-VERSION+X-TIMESTAMP+SecretKey+Json body).
    let xVersion = 1
    let xDataVersion = 1
    let xTimeStamp = Math.floor((new Date().getTime()) / 1000)
    let xAuthStr = options.method == 'GET' ? ""+xDataVersion+xVersion+xTimeStamp+SECRET_KEY : ""+xDataVersion+xVersion+xTimeStamp+SECRET_KEY+options.body
    console.log('Options FetchJSON', options)
    console.log('xAUTH Str', xAuthStr)
    let xAuth = SHA256(xAuthStr).toString(CryptoJS.enc.Hex)
    console.log('xAuth Hex', xAuth)

  return fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
    ...options,
    headers: {
      ...options.headers,
      // 'Content-Type':'application/x-www-form-urlencoded',   
      // Origin: API_BASE,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-VERSION': xVersion,
      'X-TIMESTAMP': xTimeStamp,
      'X-DATA-VERSION': xDataVersion,
      'X-AUTH': xAuth,
    },
  })
    .then(rejectErrors)
    // default return empty json when no content
    .then((res) => {
      const contentType = res.headers.get("content-type") || ''
      return (res.status !== 204 && contentType.indexOf("application/json") !== -1) ? res.json() : {}
    })
}

export const fetchJsonWithToken = (token, url, options = {}, ...args) => {
  return fetchJson(url, {
    ...options,
    headers: {
      ...options.headers,
      'X-SESSION': token.accessToken || token,
    },
  }, ...args)
}

// default is get method, we can override header with method:PUT for sample
export const apiCall = (url, options, token = null) =>{
  return token ? fetchJsonWithToken(token, url, options) : fetchJson(url, options)
}
  

// must have data to post, put should not return data
export const apiPost = (url, data, token, method = 'POST') => {
  return apiCall(url, { method, body: JSON.stringify(data) }, token)
}

export const apiGet = (url, data, token, headers, method = 'GET') =>
  apiCall(url + '?' + urlEncode(data), { method, headers }, token)


// if we want to fetch blob data with progress support, we should use fetchBlob, such as download from uri to local, then cache it
// https://github.com/wkh237/react-native-fetch-blob  

