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
    case 'notification/updateReadOffline':
      console.log('Go to update read ofline', payload)
      let data = state.data.slice()
      let index = data.findIndex(item=>item.notifyId == payload)
      if (index != -1){
        console.log('Noti block', data[index])
        data[index]['isRead'] = 1
        return {...state, data: data}
      }
      return initialState
    default:
      return state
  }
}

