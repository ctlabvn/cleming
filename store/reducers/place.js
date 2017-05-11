const initialState = {  
  listPlace: [],
  news: {}
}
export const place = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setListPlace':
      return {...state, listPlace: payload}
    case 'place/setStatisticState':
      return {...state, statistic: payload}
    case 'place/setNews':
      return {...state, news: payload}
    default:
      return state
  }
}