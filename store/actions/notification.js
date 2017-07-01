// action requestors

export const getNotification = (...args) => ({
  type: 'app/getNotification',
  args
})


// action creators
export const replaceNotification = (data) => ({
  type: 'app/replaceNotification',
  payload: data,
})

export const updateRead = (...args) => ({
  type: 'notification/updateReadStatus',
  args
})

export const updateReadOfline = (notifyId) => ({
  type: 'notification/updateReadOffline',
  payload: notifyId
})