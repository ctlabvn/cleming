const initialState = {}

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
          return initialState
        case 'app/logout':
          return initialState
        default:
            return state;
    }
}
