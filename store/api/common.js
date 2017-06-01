
// default api_base for all request
import {  
  API_BASE
} from '~/store/constants/api'

const urlEncode = data => data 
? Object.keys(data).map((key) => key + '=' + data[key]).join('&')
: ''

export const rejectErrors = (res) => {
  const { status } = res
  if (status >= 200 && status < 300) {
    return res
  }
  console.log('Res', res)
  // we can get message from Promise but no need, just use statusText instead of
  // server return errors
  let code = status
  if (res._bodyText){
    code = JSON.parse(res._bodyText).code ? JSON.parse(res._bodyText).code:code
  }
  return Promise.reject({ message: res.statusText, status, code })
}

// try invoke callback for refresh token here
export const fetchJson = (url, options = {}, base = API_BASE) => (
  // in the same server, API_BASE is emtpy
  /// check convenient way of passing base directly  
  fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
    ...options,
    headers: {
      ...options.headers,
      // 'Content-Type':'application/x-www-form-urlencoded',   
      // Origin: API_BASE,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-VERSION': 1,
      'X-TIMESTAMP': Math.floor((new Date().getTime()) / 1000),
      'X-DATA-VERSION': 1,
      'X-AUTH': '',
    },
  })
  .then(rejectErrors)
  // default return empty json when no content
  .then((res) => {    
    const contentType = res.headers.get("content-type") || ''
    return (res.status !== 204 && contentType.indexOf("application/json") !== -1) ? res.json() : {}
  })
)

export const fetchJsonWithToken = (token, url, options = {}, ...args) => (
  fetchJson(url, {
    ...options,
    headers: {
      ...options.header,
      'X-SESSION': token.accessToken || token,
    },
  }, ...args)
)

// default is get method, we can override header with method:PUT for sample
export const apiCall = (url, options, token = null) => 
  token ? fetchJsonWithToken(token, url, options) : fetchJson(url, options)

// must have data to post, put should not return data
export const apiPost = (url, data, token, method='POST') => {
  return apiCall(url, { method, body: JSON.stringify(data) }, token)
}

export const apiGet = (url, data, token, method='GET') => 
  apiCall(url + '?' + urlEncode(data), { method }, token)


// if we want to fetch blob data with progress support, we should use fetchBlob, such as download from uri to local, then cache it
// https://github.com/wkh237/react-native-fetch-blob  

