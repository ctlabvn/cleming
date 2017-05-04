import { fork } from 'redux-saga/effects'
import auth from './auth'
import account from './account'
import data from './data'
import notification from './notification'
import campaign from './campaign'
import network from './network'
import delegation from './delegation'
import vault from './vault'

// saga must be a function like generator of other functions
export default function* () {
  yield [       
    ...auth.map(watcher => fork(watcher)),
    ...account.map(watcher => fork(watcher)),
    ...data.map(watcher => fork(watcher)),
    ...notification.map(watcher => fork(watcher)),
    ...campaign.map(watcher => fork(watcher)),
    ...network.map(watcher => fork(watcher)),
    ...delegation.map(watcher => fork(watcher)),
    ...vault.map(watcher => fork(watcher)),
  ]
}
