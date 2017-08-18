export const initialState = {
  totalPage: 1,
  pageNumber: 1,
  readItems: {},
  listTransaction: [],
  totalRecord: 0,
  currentDateFilter: 'day',
}
export const transaction = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'transaction/updateDateFilter':
      return {...state, currentDateFilter: payload}    

    case 'app/setListTransaction':
      return {
        ...state,
        payDirect: {
          pageNumber: payload.pageNumber,
          totalPage: payload.totalPage,
          totalRecord: payload.totalRecord,
          listTransaction: payload.pageNumber > 1 ? [...state.payDirect.listTransaction, ...payload.listDealTransactionDirect] : payload.listDealTransactionDirect
        }
      }
    case 'app/setListAllTransaction':
      return {
        ...state,
        pageNumber: payload.pageNumber,
        totalPage: payload.totalPage,
        totalRecord: payload.totalRecord,
        listTransaction: payload.pageNumber > 1 ? [...state.listTransaction, ...payload.listTransaction] : payload.listTransaction
      }
    case 'app/setListTransactionPayWithClingme':
      return {
        ...state,
        payWithClingme: {
          pageNumber: payload.pageNumber,
          totalPage: payload.totalPage,
          totalRecord: payload.totalRecord,
          listTransaction: payload.pageNumber > 1 ? [...state.payWithClingme.listTransaction, ...payload.listPayThroughClm] : payload.listPayThroughClm
        }
      }
    case 'transaction/setDenyReason':
      return { ...state, denyReason: payload }
    case 'transaction/setDenyReasonClm':
      return {...state, denyReasonClm: payload}
    case 'transaction/markAsReadOffline':
      if (state.readItems[payload] != -1){
        let readItems = Object.assign({}, state.readItems)
        readItems[payload] = 1
        return {...state, readItems: readItems}
      }
      return state
    case 'app/logout':
      return {...state, ...initialState}
    default:
      return state
  }
}
