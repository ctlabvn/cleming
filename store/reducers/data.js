
export const data = (state = {cities:[], countries:[]}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceCountries':      
      return {...state, countries: payload.Countries } 
    case 'app/replaceCities':      
      return {...state, cities: payload.Cities }  
    default:
      return state
  }
}

