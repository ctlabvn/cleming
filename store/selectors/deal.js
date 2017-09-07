const emptyArr = []
export const dealCategorySelector = (state) => {
  if(!state || !state.deal || !state.deal.category) return emptyArr
  return state.deal.category
}
