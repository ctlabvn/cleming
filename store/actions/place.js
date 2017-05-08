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