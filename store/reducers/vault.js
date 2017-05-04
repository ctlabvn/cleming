
export const vault = (state = {}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceVaultInformation':      
      return payload    
    default:
      return state
  }
}

