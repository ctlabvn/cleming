const initialState = {}
export const meta = (state = initialState, {type, payload}) => {
  let data = {}
  switch (type) {   
    case 'app/markWillLoad':
      data[payload] = true
      return {...state, ...data}
    case 'app/clearMarkLoad':
      data[payload] = false
      return {...state, ...data}
    default:
      return state
  }
}