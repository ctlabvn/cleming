// use best comment like this
export const getListTransaction= (...args) => ({
  type: 'transaction/list',
  args
})

export const setListTransaction = (listTransaction) => ({
  type: 'app/setListTransaction',
  payload: listTransaction, 
})

export const setListTransactionPayWithClingme = (listTransaction) => ({
  type: 'app/setListTransactionPayWithClingme',
  payload: listTransaction, 
})

export const getListTransactionPayWithClingme= (...args) => ({
  type: 'transaction/listPayWithClingme',
  args
})

export const getTransactionDetail = (...args) => ({
  type: 'transaction/detail',
  args
})
export const getTransactionDetailPayWithClingme = (...args) => ({
  type: 'transaction/detailPayWithClingme',
  args
})

export const getListDenyReason = (...args) => ({
  type: 'transaction/denyReason',
  args
})

export const setDenyReason = (reason) => ({
  type: 'transaction/setDenyReason',
  payload: reason
})

export const sendDenyReason = (...args) => ({
  type: 'transaction/sendDenyReason',
  args
})

export const confirmTransaction = (...args) => ({
  type: 'transaction/confirm',
  args
})