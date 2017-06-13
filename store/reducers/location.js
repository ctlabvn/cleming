const initialState = {}
export const location = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/saveCurrentLocation':
      return {...state, ...payload}
    case 'app/alreadyGotLocation':
      return {...state, alreadyGotLocation: true}
    default:
      return state
  }
}