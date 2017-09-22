export const setCheckingData = (data) => ({
    type: 'app/setCheckingData',
    payload: data,
})

export const getCheckingDetail= (...args) => ({
    type: 'checking/detail',
    args
})

export const setCheckingDateFilterCurrentSelectValue = (item) => ({
    type: 'app/setCheckingDateFilterCurrentSelectValue',
    payload: item,
})

export const setCheckingPeriod = (item) => ({
  type: 'app/setCheckingPeriod',
  payload: item
})
