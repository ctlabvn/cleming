
export const notification = (state={hasMore:true, page:1, data:[]}, {type, payload}) => {  
  switch (type) {   
    // we can store current page? for paging...    
    case 'app/replaceNotification':            
      const list = payload.data.updated.notifyResponse.lstNotification 
      console.log(list)
      return {
        page: payload.page || 1,         
        data: payload.page > 1 ? [...state.data, ...list] : list, 
        hasMore: list.length >0 
      }  
    default:
      return state
  }
}

