// use best comment like this
export const getListAllTransaction= (...args) => ({
  type: 'transaction/listAll',
  args
})

export const setListAllTransaction = (listTransaction) => ({
  type: 'app/setListAllTransaction',
  payload: listTransaction, 
})

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

export const sendDenyReasonClm = (...args) => ({
  type: 'transaction/sendDenyReasonClm',
  args
})

export const confirmTransaction = (...args) => ({
  type: 'transaction/confirm',
  args
})


export const getDenyReasonClm = (...args) => ({
  type: 'transaction/denyReasonClm',
  args
})

export const setDenyReasonClm = (reason) => ({
  type: 'transaction/setDenyReasonClm',
  payload: reason
})

export const updateDateFilter = (payload) => ({
  type: 'transaction/updateDateFilter',
  payload,
}) 

export const markAsReadOffline = (payload) => ({
  type: 'transaction/markAsReadOffline',
  payload,
})


export const getTransactionHistoryList  = (...args) => ({
    type: 'transaction/historyList',
    args
})
export const setTransactionHistoryList = (payload) => ({
    type: 'app/setTransactionHistoryList',
    payload,
})