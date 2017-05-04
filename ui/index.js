import React, { Component } from 'react'
import App from './app'
import { Provider } from 'react-redux'
import configureStore from '~/store/config'

import Preload from './containers/Preload'

export default class Regit extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store: null,
    }        
  }

  componentDidMount(){
    configureStore(store=> this.setState({store}))
  }

  render() {    
    const {store} = this.state
    // should have a pre-load page
    if(!store)
      return ( <Preload message="Initializing..."/> )

    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
} 

// hotfix in case babel remove console does not work
if(!__DEV__) {
    const noop = () => {}
    console = {
      info: noop,
      log: noop,
      error: noop,
      warn: noop,
    }
}