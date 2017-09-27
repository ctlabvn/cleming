const emptyArr = []
const emptyObj = {}
export const dealCategorySelector = (state) => {
  if(!state || !state.deal || !state.deal.category) return emptyArr
  return state.deal.category
}

export const listDealSelector = (state) => {
  if (!state || !state.deal || !state.deal.listDeal) return emptyArr
  return state.deal.listDeal
}

export const dateFilterSelector = (state) => {
  if (!state || !state.deal || !state.deal.currentDateFilter) return 'day'
  return state.deal.currentDateFilter
}

export const dealStatisticSelector = (state) => {
  if (!state || !state.deal || !state.deal.statistic) return emptyObj
  return state.deal.statistic
}

export const viewOverviewSelector = (state) => {
  if (!state || !state.deal || !state.deal.viewOverview) return emptyObj
  return state.deal.viewOverview
}