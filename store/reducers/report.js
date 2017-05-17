const initialState = {}
export const report = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'customer/setCustomerReport':
      return {...state, customer: payload}
    default:
      return state
  }
}