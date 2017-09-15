const initialState = {
    data: {
        revenue: '',
        mcTotalMoney: 0,
        clmTotalMoney: 0,
        charge: 0,
    }
}

export const checking = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'app/setCheckingData':
            return {
                ...state,
                ...payload,
                listCompareCheckDt: (payload.pageNumber == 1) ? payload.listCompareCheckDt : [...state.listCompareCheckDt, ...payload.listCompareCheckDt],
            }
        case  'app/setCheckingDateFilterCurrentSelectValue':
            return {
                ...state,
                dateFilterCurrentSelectValue: payload
            }
        case 'app/setCheckingPeriod':
            return {
              ...state,
              checkingPeriod: payload
            }
        case 'app/clearData':
          return {...state, ...initialState}
        case 'app/logout':
          return {...state, ...initialState}
        default:
            return state;
    }
}
