import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {AsyncStorage} from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from './reducers'
import rootSaga from './sagas'

const initialState = {}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

// only use logger when there is not devTools
if (__DEV__ && !window.devToolsExtension) {
  // we use require for dynamic import  
  const loggerMiddleware = require('./logger').default
  // add logger for development
  middleware.push(loggerMiddleware)  
}

// Enable persistence
const configureStore = callback =>   {  
  // mount it on the Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // if you use getStoredState then no need to use auto hydrate to get state back
      autoRehydrate(),
      applyMiddleware(...middleware),      
      window.devToolsExtension ? window.devToolsExtension() : x => x
    )
  )

  // then run the saga
  sagaMiddleware.run(rootSaga)
  // callback(store)
  persistStore(store, {storage: AsyncStorage}, ()=> callback(store))
  
}

export default configureStore



