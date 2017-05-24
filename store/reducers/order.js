
export const order = (state = {hasMore:true, page:1, orderList:[]}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceOrderList':          
      const list = payload.updated.orderList  
      // console.log(payload)               
      return {
        page: payload.updated.page || 1,         
        orderList: payload.updated.page > 1 ? [...state.orderList, ...list] : list, 
        hasMore: list.length >0 
      }                
    default:
      return state
  }
}

