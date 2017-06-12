export const saveCurrentLocation = (location)=>({
  type: 'app/saveCurrentLocation',
  payload: location
})

export const alreadyGotLocation = ()=>({
  type: 'app/alreadyGotLocation'
})