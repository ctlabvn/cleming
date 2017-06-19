const initialState = {
  payDirect: {
    totalPage: 1,
    pageNumber: 1,
    listTransaction: [],
    totalRecord: 0
  },
  payWithClingme: {
    totalPage: 1,
    pageNumber: 1,
    listTransaction: [],
    totalRecord: 0
  }

}
export const transaction = (state = initialState, { type, payload }) => {
  switch (type) {
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
    case 'app/logout':
      return {...state, ...initialState}
    default:
      return state
  }
}
