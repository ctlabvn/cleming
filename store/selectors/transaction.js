import { initialState } from '~/store/reducers/transaction'

export const getListTransactionDirect = state => 
  state.transaction.payDirect || initialState.payDirect

export const getListTransactionCLM = state => 
  state.transaction.payWithClingme || initialState.payWithClingme

export const getListTransaction = state => state.transaction.listTransaction

