
export const notification = (state={hasMore:true, start:0, take: 10, data:[]}, {type, payload}) => {
  switch (type) {   
    // we can store current page? for paging...
    case 'app/replaceNotification':             
      return {
        start: payload.start || 0, 
        take: payload.take || 10, 
        data: payload.start ? [...state.data, ...payload.data] : payload.data, 
        hasMore: payload.data.length >0 
      }  
    default:
      return state
  }
}

