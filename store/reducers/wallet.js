const initialState = {

}
export const wallet = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'app/setBalance':
        console.log('Set balance Paylaoad: ', payload)
        return {...state, ...payload.data}
    case 'app/logout':
        return {...state, ...initialState}
    case 'app/clearData':
        return {...state, ...initialState}
    default:
      return state
  }
}
