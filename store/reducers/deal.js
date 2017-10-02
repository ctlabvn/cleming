export const initialState = {
  category: [],
  currentDateFilter: 'day',
}
export const deal = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'deal/updateDateFilter':
      return {...state, currentDateFilter: payload}
    case 'deal/setDealCategory':
      return {...state, category: payload}
    case 'deal/setListDeal':
      return {...state, listDeal: payload}
    case 'deal/setUserStatistic':
      return {...state, statistic: payload}
    case 'deal/setDealViewOverview':
      return {...state, viewOverview: payload}
    case 'deal/setSingleDealStatistic':
      return {...state, viewDetail: payload}
    case 'deal/markReloadDealManager':
      return {...state, reload: payload}
    case 'deal/setTransactionNumber':
      return {...state, transactionNumber: payload}
    case 'app/logout':
    case 'app/clearData':
      return initialState
    default:
      return state
  }
}
