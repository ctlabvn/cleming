// action requestors

export const getListDelegation = (...args) => ({
  type: 'app/getListDelegation',
  args
})


// action creators
export const replaceListDelegation = (data) => ({
  type: 'app/replaceListDelegation',
  payload: data,
})
