export const getSettingHour = (...args)=>({
  type: 'app/getSettingHour',
  args
})

export const setSettingHour = (hour)=>({
  type: 'app/setSettingHour',
  payload: hour
})

export const updateSettingHour = (...args) => ({
	type: 'app/updateSettingHour',
  	args
})

export const saveSettingHourOffline = (hour)=>({
  type: 'app/saveSettingHourOffline',
  payload: hour
})