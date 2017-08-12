const initialState = {
  hasMore:true, 
  page:1, 
  orderList:[], 
  denyReason: [], 
  willReload: false,
  currentDateFilter: 'day',
}

export const order = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'order/updateDateFilter':
      return {...state, currentDateFilter: payload}      
    case 'app/replaceOrderList':          
      const list = payload.updated.orderList  
      // console.log(payload)               
      return {
        page: payload.updated.page || 1,         
        orderList: payload.updated.page > 1 ? [...state.orderList, ...list] : list, 
        hasMore: list.length >0,
        denyReason: state.denyReason,
        willReload: state.willReload,
        currentDateFilter: state.currentDateFilter
      } 
    case 'app/clearOrderList':
      return {
        page: 1,
        hasMore: false,
        orderList: [],
        denyReason: state.denyReason,
        willReload: state.willReload,
        currentDateFilter: state.currentDateFilter,
      }
    case 'app/setOrderDenyReason':
      return {...state, denyReason: payload}
    case 'order/markReloadFlag':
      return {...state, willReload: payload, markReloadTime: new Date().getTime()}
    default:
      return state
  }
}

