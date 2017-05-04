import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { requests, toast, drawer, router, search } from './common'
import { auth } from './auth'
import { account } from './account'
import { data } from './data'
import { notification } from './notification'
import { campaign } from './campaign'
import { network } from './network'
import { delegation } from './delegation'
import { vault } from './vault'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({    
  form,
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
    drawer,
    search,
  }),  
  requests, 
  router,
  auth,
  account,
  data,
  notification,
  campaign,
  network,
  delegation,
  vault,
})

export default rootReducer

