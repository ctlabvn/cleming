import { fork } from 'redux-saga/effects'
import auth from './auth'
import account from './account'
import notification from './notification'
import transaction from './transaction'
import place from './place'
import booking from './booking'
import order from './order'
import report from './report'
import wallet from './wallet'
import revenue from './revenue'
import checking from './checking'
import deal from './deal'
// saga must be a function like generator of other functions
export default function* () {
  yield [
    ...auth.map(watcher => fork(watcher)),
    ...account.map(watcher => fork(watcher)),
    ...notification.map(watcher => fork(watcher)),
    ...transaction.map(watcher => fork(watcher)),
    ...place.map(watcher => fork(watcher)),
    ...booking.map(watcher => fork(watcher)),
    ...order.map(watcher => fork(watcher)),
    ...report.map(watcher => fork(watcher)),
    ...wallet.map(watcher => fork(watcher)),
    ...revenue.map(watcher => fork(watcher)),
    ...checking.map(watcher => fork(watcher)),
    ...deal.map(watcher => fork(watcher))
  ]
}
