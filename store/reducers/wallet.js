const initialWallet = {
    bank: []
}
const initBank = []
export const wallet = (state = initialWallet, { type, payload }) => {
  switch (type) {
    case 'app/setBalance':
        console.log('Set balance Paylaoad: ', payload)
        return {...state, ...payload.data}
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