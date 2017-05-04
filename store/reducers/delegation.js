
export const delegation = (state = {}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceListDelegation':      
      return {...state, [payload.Direction]: payload }     
    default:
      return state
  }
}

