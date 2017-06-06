const initialState = {  
  listPlace: [],
  news: {},
  selectedOption: {},
  location: {}
}
export const place = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setListPlace':
      return {...state, listPlace: payload}
    case 'place/setStatisticState':
      return {...state, statistic: payload}
    case 'place/setNews':
      return {...state, news: payload}
    case 'app/saveCurrentLocation':
      return {...state, location: payload}
    case 'place/setSelectedOption': 
      return {...state, selectedOption: payload}
    case 'app/logout':
      console.log('App logout clear place')
      return {...state, ...initialState}
    default:
      return state
  }
}