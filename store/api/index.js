import auth from './auth'
import account from './account'
import notification from './notification'
import transaction from './transaction'
import place from './place'
import booking from './booking'
import order from './order'
import report from './report'
import revenue from './revenue'
// we compose all api for each category here as single entry point
// api will be an single entry point for all frame methods
// this is where common functions are put
export default {
  auth,  
  account,
  notification,  
  transaction,
  place,
  booking,
  order,
  report,
  revenue
}
