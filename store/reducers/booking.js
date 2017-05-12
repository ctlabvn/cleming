const initialState = {  
  bookingList: []
}
export const transaction = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'booking/setBookingList':
      return {...state, bookingList: payload}
    default:
      return state
  }
}