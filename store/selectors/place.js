import { initialState } from '~/store/reducers/place'
export const getListPlace = state => 
  state.place.listPlace || initialState.listPlace

export const getSelectedPlace = state => 
  state.place.selectedOption || initialState.selectedOption

export const getNews = state =>
  state.place.news || initialState.news