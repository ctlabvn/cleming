export const getBookingList = (...args)=>({
    type: 'booking/list',
    args
})
export const setBookingList = (listBooking)=>({
    type: 'booking/setBookingList',
    payload: listBooking
})