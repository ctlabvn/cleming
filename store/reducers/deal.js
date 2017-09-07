export const initialState = {
  category: []
}
export const deal = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'deal/setDealCategory':
      return {...state, category: payload}

    default:
      return state
  }
}
