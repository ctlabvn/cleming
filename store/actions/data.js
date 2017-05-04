// action requestors

export const getCountries = (...args) => ({
  type: 'app/getCountries',
  args
})

export const getCities = (...args) => ({
  type: 'app/getCities',
  args
})




// action creators
export const replaceCountries = (data) => ({
  type: 'app/replaceCountries',
  payload: data,
})

export const replaceCities = (data) => ({
  type: 'app/replaceCities',
  payload: data,
})