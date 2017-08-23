const initialWallet = {
    bank: []
}
const initBankList = []
const initialWalletDetail = {}
const initBank = []
export const wallet = (state = initialWallet, { type, payload }) => {
  switch (type) {
    case 'app/setBalance':
        console.log('Set balance Paylaoad: ', payload)
        return {
          ...state,
          moneyAmount: payload.moneyAmount,
          pageNumber: payload.pageNumber,
          totalPage: payload.totalPage,
          totalRecord: payload.totalRecord,
          listRevenueItem: payload.pageNumber == 1 ? payload.listRevenueItem : [...state.listRevenueItem, ...payload.listRevenueItem]
        }
    case 'app/setBanks':
        return {...state, bank: payload}
    case 'app/logout':
        return {...state, ...initialWallet}
    case 'app/clearData':
        return {...state, ...initialWallet}
    default:
      return state
  }
}

export const wallet_detail = (state = initialWalletDetail, { type, payload }) => {
  switch (type) {
    case 'app/setBalanceDetail':
        console.log('Set balance Detail Paylaoad: ', payload)
        return {
          ...state,
          moneyAmount: payload.moneyAmount,
          pageNumber: payload.pageNumber,
          totalPage: payload.totalPage,
          totalRecord: payload.totalRecord,
          listRevenueItem: payload.pageNumber == 1 ? payload.listRevenueItem : [...state.listRevenueItem, ...payload.listRevenueItem]
        }

    case 'app/logout':
        return {...state, ...initialWallet}
    case 'app/clearData':
        return {...state, ...initialWallet}
    default:
      return state
  }
}

  export const banks = (state=initBankList, {type, payload}) => {
    switch (type) {
    case 'app/setListBank':
        return payload
    case 'app/logout':
        return {...state, ...initBankList}
    case 'app/clearData':
        return {...state, ...initBankList}
    default:
      return state
  }
}

  export const cashoutHistory = (state=initialWalletDetail, {type, payload}) => {
    switch (type) {
      case 'app/setCashoutHistory':
        return {
          ...state, ...payload
        }
        break;
      default:
        return state
    }
  }
