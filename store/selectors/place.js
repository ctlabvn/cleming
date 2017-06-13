
export const getListPlace = state => 
  state.place.listPlace || []

export const getSelectedPlace = state => 
  state.place.selectedOption || {}

export const getNews = state =>
  state.place.news || {}