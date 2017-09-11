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
