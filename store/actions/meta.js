export const markWillLoad = (key)=>({
  type: 'app/markWillLoad',
  payload: key
})

export const clearMarkLoad = (key) => ({
  type: 'app/clearMarkLoad',
  payload: key
})