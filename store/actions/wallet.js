export const getBalance = (...args) => ({
  type: 'app/getBalance',
  args,
})

export const getBalanceDetail = (...args) => ({
    type: 'app/getBalanceDetail',
    args
})

export const setBalance = (data) => ({
    type: 'app/setBalance',
    payload: data
})

export const setBalanceDetail = (data) => ({
    type: 'app/setBalanceDetail',
    payload: data
})

export const getBanks = (...args) => ({
    type: 'app/getBanks',
    args
})

export const setBanks = (data) => ({
    type: 'app/setBanks',
    payload: data
})

export const cashout = (...args) => ({
    type: 'app/cashout',
    args
})

export const addBank = (...args) => ({
    type: 'app/addBank',
    args
})

export const getListBank = (...args) => ({
    type: 'app/getListBank',
    args
})

export const setListBank = (data) => ({
    type: 'app/setListBank',
    payload: data
})

export const getCashoutHistory = (...args) => ({
  type: 'app/getCashoutHistory',
  args
})

export const setCashoutHistory = (data) => ({
  type: 'app/setCashoutHistory',
  payload: data
})

export const getCashoutDetail = (...args) => ({
  type: 'app/getCashoutDetail',
  args
})

export const getCashoutOverview = (...args) => ({
  type: 'app/getCashoutOverview',
  args
})

export const setCashoutOverview = (data) => ({
  type: 'app/setCashoutOverview',
  payload: data
})

export const getCheckingHistory = (...args) => ({
  type: 'app/getCheckingHistory',
  args
})

export const setCheckingHistory = (data) => ({
  type: 'app/setCheckingHistory',
  payload: data
})

export const getGigatumBank = (...args) => ({
    type: 'payDetail/getGigatumBank',
    args
})

export const setGigatumBank = (data) => ({
    type: 'app/setGigatumBank',
    payload: data
})
