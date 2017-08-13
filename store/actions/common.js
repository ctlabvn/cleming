import {  
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS, 
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED
} from '~/store/constants/actions'

// do nothing
export const noop = (explanation) => ({
  type: 'app/noop',
  payload: explanation,
})

// do callback and get result as paload
export const invokeCallback = (callback, ...args) => ({
  type: 'app/invokeCallback',
  payload: callback && callback.call(null, ...args),
})

export const log = (data, type='table') => ({
  type: 'app/log',
  payload: data,
})

// Little helper function to abstract going to different pages
export const navigate = (routeName, params, reset=false) => {
  const action = {
    type: 'navigate/' + (reset ? 'reset' : 'push'),
    payload: {
      routeName,
    }
  }
  // only update object
  if(typeof params === 'object') 
    action.payload.params = params

  return action
}

export const forwardTo = (routeName, params) => navigate(routeName, params, false)
export const resetTo = (routeName, params) => navigate(routeName, params, true)

export const goBack = () => ({
  type: 'navigate/pop',
  payload: null,
})

// mark request for later checking
export const markRequestPending = (key) => ({
  type: MARK_REQUEST_PENDING,
  meta: { key },
})

export const markRequestSuccess = (key) => ({
  type: MARK_REQUEST_SUCCESS,
  meta: { key },
})

export const markRequestCancelled = ({type, reason}, key) => ({
  type: MARK_REQUEST_CANCELLED,
  payload: `${type}: ${reason || 'called'}`,
  meta: { key },
})

// failed need a reason, because we do not know why !!!
export const markRequestFailed = (reason, key) => ({
  type: MARK_REQUEST_FAILED,
  payload: reason,
  meta: { key },
})

// show toast => we can use kind of alerts, stackbar to notify user
// with dynamic id force update everytime
export const setToast = (message, level = 'info', callback=null, data=null,duration = 3000, position = 'bottom') => ({
  type: 'app/setToast',
  payload: {    
    message,
    level,
    callback,
    data,
    duration,
    position,    
  },
})

export const showPopupInfo = (message) => ({
  type: 'app/showPopupInfo',
  payload: message
})
export const hidePopupInfo = () => ({
  type: 'app/hidePopupInfo'
})
export const clearToast = () => ({
  type: 'app/clearToast',
})

export const openDrawer = () => ({
  type: 'app/openDrawer',  
})

export const closeDrawer = () => ({
  type: 'app/closeDrawer',  
})

export const search = (payload) => ({
  type: 'app/search',
  payload,
})

export const replaceFooterRoute = (index, route) => ({
  type: 'app/replaceFooterRoute',
  payload: {index, route},
})

export const openModal = () => ({
  type: 'app/openModal'
})

export const closeModal = () => ({
  type: 'app/closeModal',
})

