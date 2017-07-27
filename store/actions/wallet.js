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

