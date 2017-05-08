const initialState = {  
  listTransaction: []
}
export const transaction = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setListTransaction':
      return {...state, listTransaction: payload}
    default:
      return state
  }
}