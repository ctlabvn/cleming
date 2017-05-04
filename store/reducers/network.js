// may have many reducer

export const network = (state = {}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceNetworks':         
      const networks = {}
      payload.forEach(item=>networks[item.Name] = {Id: item.Id})
      return {...state, ...networks}
    case 'app/replaceNetwork':
      return {...state, [payload.Name]: payload.data}
    case 'app/replaceBusinessNetwork':
      return {...state, 'Business Network': payload}      
    default:
      return state
  }
}

