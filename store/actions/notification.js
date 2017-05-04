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