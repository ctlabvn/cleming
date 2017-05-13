const initialState = {  
    totalPage: 1,
    pageNumber: 2,
    listTransaction: [],
    totalRecord: 10
}
export const transaction = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setListTransaction':
      return {
        pageNumber: payload.pageNumber,
        totalPage: payload.totalPage,
        totalRecord: payload.totalRecord,
        listTransaction: payload.pageNumber > 1 ? [...state.listTransaction, ...payload.listDealTransactionDirect] : payload.listDealTransactionDirect 
      }
    default:
      return state
  }
}