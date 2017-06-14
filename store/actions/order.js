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

export const clearOrderList = (...args)=>({
  type: 'app/clearOrderList',
  args
})

export const getOrderDenyReason = (...args)=>({
  type: 'app/getOrderDenyReason',
  args,
})

export const setOrderDenyReason = (data) => ({
  type: 'app/setOrderDenyReason',
  payload: data,
})

export const updateOrderStatus = (...args)=>({
  type: 'app/updateOrderStatus',
  args
})