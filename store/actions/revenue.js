export const setSelectedRevenueItem = (item) => ({
    type: 'app/setSelectedRevenueItem',
    payload: item,
})

// setListRevenueProcessing, setListRevenueDone, setDetailRevenue

export const setListRevenueProcessing = (list) => ({
    type: 'app/setListRevenueProcessing',
    payload: list,
})

export const setListRevenueDone = (list) => ({
    type: 'app/setListRevenueDone',
    payload: list,
})

export const setListRevenue = (list) => ({
    type: 'app/setListRevenue',
    payload: list,
})

export const setDetailRevenue = (detail) => ({
    type: 'app/setDetailRevenue',
    payload: detail,
})

export const getRevenueList= (...args) => ({
    type: 'revenue/list',
    args
})

export const getRevenueListProcessing= (...args) => ({
    type: 'revenue/listProcessing',
    args
})

export const getRevenueListDone= (...args) => ({
    type: 'revenue/listDone',
    args
})

export const getRevenueDetail= (...args) => ({
    type: 'revenue/detail',
    args
})