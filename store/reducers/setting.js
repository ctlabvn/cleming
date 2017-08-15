const initialState = {}
export const setting = (state = initialState, {type, payload}) => {
  let data = {}
  switch (type) {   
    case 'app/setSettingHour':
    	return {...state, hourData: payload}
    case 'app/saveSettingHourOffline':
    	return {...state, setHour: payload}
    default:
      return state
  }
}