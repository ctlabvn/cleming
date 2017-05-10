/**
 * Created by vjtc0n on 5/9/17.
 */
const initialState = {
  listDeal: []
}
export const deal = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'app/setListDeal':
      return {...state, listPlace: payload}
    default:
      return state
  }
}