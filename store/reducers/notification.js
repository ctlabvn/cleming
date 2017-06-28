const initialState = {
  hasMore:true, 
  page:1, 
  data:[],
}

export const notification = (state=initialState, {type, payload}) => {  
  switch (type) {   
    // we can store current page? for paging...    
    case 'app/replaceNotification':            
      const list = payload.data.updated.notifyResponse.lstNotification 
      // console.log(list)
      return {
        page: payload.page || 1,         
        data: payload.page > 1 ? [...state.data, ...list] : list, 
        hasMore: list.length >0 
      }  
    case 'app/logout':      
    case 'app/clearData':
      return initialState
    default:
      return state
  }
}

