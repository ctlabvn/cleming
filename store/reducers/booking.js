
const initialState = {
  page: 1, //page hiện tại muốn lấy,
  pageNumber: 1, //số page tối đa có thể lấy,
  resultNumber: 1, //số lượng kết quả,
  isLast: false, //có phải là trang cuối cùng hay không
  bookingList: []
}
export const booking = (state=initialState, { type, payload }) => {
  switch (type) {
    case 'booking/setBookingList':
      // if (!payload.page) return state
      return {
        page: payload.page,
        pageNumber: payload.pageNumber,
        resultNumber: payload.resultNumber,
        isLast: payload.isLast,
        bookingList: payload.page > 1 ? [...state.bookingList, ...payload.bookingList] : payload.bookingList
      }
    case 'booking/clear':
      return {...state, ...initialState}
    default:
      return state
  }
}