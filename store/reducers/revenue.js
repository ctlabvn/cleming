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
                selectedItem: {
                    code: payload.code,
                    time: payload.time,
                    itemType: payload.itemType,
                    username: payload.username,
                    money: payload.money,
                },
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
        case 'app/setDetailRevenue':
            return {
                ...state,
                detail: payload,
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