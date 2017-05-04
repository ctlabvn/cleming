// action requestors

export const getVaultInformation = (...args) => ({
  type: 'app/getVaultInformation',
  args
})


// action creators
export const replaceVaultInformation = (data) => ({
  type: 'app/replaceVaultInformation',
  payload: data,
})
