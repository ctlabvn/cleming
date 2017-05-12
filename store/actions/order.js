// action requestors

export const getOrderList = (...args) => ({
  type: 'app/getOrderList',
  args,
})

export const getOrderDetail = (...args) => ({
  type: 'app/getOrderDetail',
  args,
})

// action creators, no need to update order detail
export const replaceOrderList = (data) => ({
  type: 'app/replaceOrderList',
  payload: data,
})
