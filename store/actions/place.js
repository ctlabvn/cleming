export const getListPlace= (...args) => ({
  type: 'place/list',
  args
})

export const setListPlace = (listPlace) => ({
  type: 'app/setListPlace',
  payload: listPlace, 
})

export const getPlaceStatistic = (...args) => ({
    type: 'place/statistic',
    args
})

export const setPlaceStatistic = (statistic) => ({
    type: 'place/setStatisticState',
    payload: statistic
})

export const getMerchantNews = (...args) => ({
  type: 'place/getNews',
  args
})

export const setMerchantNews = (news) => ({
  type: 'place/setNews',
  payload: news
})

export const saveCurrentLocation = (location)=>({
  type: 'app/saveCurrentLocation',
  payload: location
})