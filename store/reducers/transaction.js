const initialState = {  
    totalPage: 1,
    pageNumber: 2,
    listTransaction: []
}
export const transaction = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setListTransaction':
      return {
        pageNumber: payload.pageNumber,
        totalPage: payload.totalPage,
        listTransaction: payload.pageNumber > 1 ? [...state.listTransaction, ...payload.listDealTransactionDirect] : payload.listDealTransactionDirect 
      }
    default:
      return state
  }
}