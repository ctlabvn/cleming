
export const isLogged = state =>
  state.auth.loggedIn

export const getToken = state => 
  state.auth.token ? state.auth.token.access_token : null

export const getUser = state => 
  state.auth.user || {}
  
