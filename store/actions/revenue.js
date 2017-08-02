export const setSelectedRevenueItem = (item) => ({
    type: 'app/setSelectedRevenueItem',
    payload: item,
})

// setListRevenueProcessing, setListRevenueDone, setDetailRevenue


export const setRevenueData = (data) => ({
    type: 'app/setRevenueData',
    payload: data,
})

export const setDetailRevenue = (detail) => ({
    type: 'app/setDetailRevenue',
    payload: detail,
})

export const getRevenueList= (...args) => ({
    type: 'revenue/list',
    args
})

export const getRevenueDetail= (...args) => ({
    type: 'revenue/detail',
    args
})