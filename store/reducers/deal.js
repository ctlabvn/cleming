export const initialState = {
  category: []
}
export const deal = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'deal/setDealCategory':
      return {...state, category: payload}
    case 'deal/setListDeal':
      return {...state, listDeal: payload}
    default:
      return state
  }
}
