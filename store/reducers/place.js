const initialState = {  
  listPlace: []
}
export const place = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setListPlace':
      return {...state, listPlace: payload}
    case 'place/setStatisticState':
      return {...state, statistic: payload}
    default:
      return state
  }
}