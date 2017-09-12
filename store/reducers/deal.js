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
    default:
      return state
  }
}
