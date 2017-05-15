// action requestors

export const getProfile = (...args) => ({
  type: 'app/getProfile',
  args,
})

export const updateProfile = (...args) => ({
  type: 'app/updateProfile',
  args,
})

export const changePassword = (...args) => ({
  type: 'app/changePassword',
  args,
})

export const resetPassword = (...args) => ({
  type: 'app/resetPassword',
  args,
})


// action creators
export const replaceProfile = (data) => ({
  type: 'app/replaceProfile',
  payload: data,
})

export const getListEmployee = (...args) => ({
  type: 'app/getListEmployee',
  args
})

export const setListEmployee = (data) => ({
  type: 'app/setListEmployee',
  payload: data
})

export const getGeneratedPassword = (...args) => ({
  type: 'app/getGeneratedPassword',
  args
})

export const setGeneratedPassword = (data) => ({
  type: 'app/setGeneratedPassword',
  payload: data
})

export const updateEmployeeInfo = (...args) => ({
  type: 'app/updateEmployeeInfo',
  args
})

export const createEmployeeInfo = (...args) => ({
  type: 'app/createEmployeeInfo',
  args
})

export const deleteEmployeeInfo = (...args) => ({
  type: 'app/deleteEmployeeInfo',
  args
})