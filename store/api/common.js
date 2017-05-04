
// default api_base for all request
import {  
  API_BASE
} from '~/store/constants/api'

const urlEncode = data => data 
? Object.keys(data).map((key) => key + '=' + encodeURIComponent(data[key])).join('&')
: ''

export const rejectErrors = (res) => {
  const { status } = res  
  if (status >= 200 && status < 300) {
    return res
  }
  // we can get message from Promise but no need, just use statusText instead of
  // server return errors
  return Promise.reject({ message: res.statusText, status })
}

// try invoke callback for refresh token here
export const fetchJson = (url, options = {}, base = API_BASE) => (
  // in the same server, API_BASE is emtpy
  /// check convenient way of passing base directly  
  fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type':'application/x-www-form-urlencoded',      
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
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
      Authorization: `Bearer ${token.accessToken || token}`,
    },
  }, ...args)
)

// default is get method, we can override header with method:PUT for sample
export const apiCall = (url, options, token = null) => 
  token ? fetchJsonWithToken(token, url, options) : fetchJson(url, options)

// must have data to post, put should not return data
export const apiPost = (url, data, token, method='POST') => 
  apiCall(url, { method, body: urlEncode(data) }, token)

export const apiGet = (url, data, token, method='GET') => 
  apiCall(url + '?' + urlEncode(data), { method }, token)


// if we want to fetch blob data with progress support, we should use fetchBlob, such as download from uri to local, then cache it
// https://github.com/wkh237/react-native-fetch-blob  

