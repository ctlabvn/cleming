/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state, 
export const account = (state = {}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceProfile':
      // payload is access token
      return {...state, profile: payload }  
    default:
      return state
  }
}

