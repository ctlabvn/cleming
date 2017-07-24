import {REVENUE_CLINGME_PAY} from '~/store/constants/app'

const initialState = {
    selectedItem: {
        code: 'CL000000',
        time: 0,
        itemType: REVENUE_CLINGME_PAY,
        username: 'anonymous',
        money: 0
    },
}
export const revenue = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'app/setSelectedRevenueItem':
            return {
                ...state,
                selectedItem: {
                    code: 'CLpanda',
                    time: 0,
                    itemType: REVENUE_CLINGME_PAY,
                    username: 'anonymous',
                    money: 0
                },
            }
        default:
            return state;
    }
}