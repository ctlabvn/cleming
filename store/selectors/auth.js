
export const isLogged = state =>
  state.auth.loggedIn

export const getToken = state => 
  state.auth.token ? state.auth.token.access_token : null

export const getSession = state => 
  state.auth.user ? state.auth.user.xsession : null

export const getUser = state => 
  state.auth.user || {}
  
export const gePushToken = state => 
  state.auth.push_token || ''