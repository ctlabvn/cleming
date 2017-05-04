// action requestors

export const getNetworks = (...args) => ({
  type: 'app/getNetworks',
  args,
})

export const getNetwork = (...args) => ({
  type: 'app/getNetwork',
  args,
})

export const getBusinessNetwork = (...args) => ({
  type: 'app/getBusinessNetwork',
  args,
})

// basically, we do not need to update this payload into reducer
// we just use invokeCallback to get the temporary data to bind
export const getFollowTransactions = (...args)=>({
  type: 'app/getFollowTransactions',
  args,
})


// action creators
export const replaceNetworks = (data) => ({
  type: 'app/replaceNetworks',
  payload: data,
})

export const replaceNetwork = (data) => ({
  type: 'app/replaceNetwork',
  payload: data,
})

export const replaceBusinessNetwork = (data) => ({
  type: 'app/replaceBusinessNetwork',
  payload: data,
})