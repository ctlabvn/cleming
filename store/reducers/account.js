/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state, 
export const account = (state = {
  generatedPassword: ''
}, {type, payload}) => {
  switch (type) {
    case 'app/setListEmployee':
      return {...state, listEmployee: payload.updated.data}
    case 'app/setGeneratedPassword':
      return {...state, generatedPassword: payload.updated.data.password}
    default:
      return state
  }
}

