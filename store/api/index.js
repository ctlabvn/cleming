import auth from './auth'
import account from './account'
// import data from './data'
import notification from './notification'
// import campaign from './campaign'
// import network from './network'
// import delegation from './delegation'
// import vault from './vault'
import transaction from './transaction'
import place from './place'
import booking from './booking'
import order from './order'
import report from './report'
// we compose all api for each category here as single entry point
// api will be an single entry point for all frame methods
// this is where common functions are put
export default {
  auth,  
  account,
  // data,
  notification,
  // campaign,
  // network,
  // delegation,
  // vault,
  transaction,
  place,
  booking,
  order,
  report
}
