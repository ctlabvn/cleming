export const setCheckingData = (data) => ({
    type: 'app/setCheckingData',
    payload: data,
})

export const getCheckingDetail= (...args) => ({
    type: 'checking/detail',
    args
})