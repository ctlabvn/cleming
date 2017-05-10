// action requestors

export const getProfile = (...args) => ({
  type: 'app/getProfile',
  args,
})

export const changePassword = (...args) => ({
  type: 'app/changePassword',
  args,
})

export const resetPassword = (...args) => ({
  
})


// action creators
export const replaceProfile = (data) => ({
  type: 'app/replaceProfile',
  payload: data,
})