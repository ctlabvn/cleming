export const getDealCategory = (...args) => ({
  type: 'deal/getDealCategory',
  args
})

export const setDealCategory = (data) => ({
  type: 'deal/setDealCategory',
  payload: data
})

export const createDeal = (...args) => ({
  type: 'deal/createDeal',
  args
})

export const getDealUserStatistic = (...args) => ({
  type: 'deal/getDealUserStatistic',
  args
})

export const getDealStatistic = (...args) => ({
  type: 'deal/getDealStatistic',
  args
})

export const getListDeal = (...args) => ({
  type: 'deal/getListDeal',
  args
})

export const setListDeal = (data) => ({
  type: 'deal/setListDeal',
  payload: data
})

export const setDealUserStatistic = (data) => ({
  type: 'deal/setUserStatistic',
  payload: data
})

export const updateDateFilter = (payload) => ({
  type: 'deal/updateDateFilter',
  payload,
})

export const setDealViewOverview = (payload) => ({
  type: 'deal/setDealViewOverview',
  payload
})

export const getSingleDealStatistic = (...args) => ({
  type: 'deal/getSingleDealStatistic',
  args
})

export const setSingleDealStatistic = (payload) => ({
  type: 'deal/setSingleDealStatistic',
  payload
})

export const markReloadDealManager = (payload) => ({
  type: 'deal/markReloadDealManager',
  payload
})

export const getTransactionNumber = (...args) => ({
  type: 'deal/getTransactionNumber',
  args
})

export const setTransactionNumber = (payload) => ({
  type: 'deal/setTransactionNumber',
  payload
})