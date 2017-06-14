
export const order = (state = {hasMore:true, page:1, orderList:[], denyReason: []}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceOrderList':          
      const list = payload.updated.orderList  
      // console.log(payload)               
      return {
        page: payload.updated.page || 1,         
        orderList: payload.updated.page > 1 ? [...state.orderList, ...list] : list, 
        hasMore: list.length >0,
        denyReason: state.denyReason
      } 
    case 'app/clearOrderList':
      return {
        page: 1,
        hasMore: false,
        orderList: [],
        denyReason: state.denyReason
      }
    case 'app/setOrderDenyReason':
      return {...state, denyReason: payload}
    default:
      return state
  }
}

