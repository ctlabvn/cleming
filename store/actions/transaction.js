// use best comment like this
export const getListTransaction= (...args) => ({
  type: 'transaction/list',
  args
})

export const setListTransaction = (listTransaction) => ({
  type: 'app/setListTransaction',
  payload: listTransaction, 
})