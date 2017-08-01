import {REVENUE_CLINGME_PAY} from '~/store/constants/app'

const initialState = {
    selectedItem: {},
    listRevenueProcessing: {},
    listRevenueDone: {},
    detail: {}
}
export const revenue = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'app/setSelectedRevenueItem':
            return {
                ...state,
                selectedItem: payload,
            }
        case 'app/setListRevenueProcessing':
            return {
                ...state,
                listProcessing: payload,
            }
        case 'app/setListRevenueDone':
            return {
                ...state,
                listDone: payload,
            }
        case 'app/setListRevenue':
            return {
                ...state,
                list: payload,
            }
        case 'app/setDetailRevenue':
            return {
                ...state,
                detail: payload,
            }
        case 'app/setRevenueData':
            return {
                ...state,
                revenueData: payload,
            }
        case 'app/logout':
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}