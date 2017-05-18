// use best comment like this
export const getCustomerReport = (...args) => ({
  type: 'customer/statistic',
  args
})
export const setCustomerReport = (report) => ({
  type: 'customer/setCustomerReport',
  payload: report
})

export const getMapReport = (...args) => ({
  type: 'map/statistic',
  args
})

export const setMapReport = (report)=>({
  type: 'map/setMapReport',
  payload: report
})