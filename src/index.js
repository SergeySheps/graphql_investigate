import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import Root from './components'
import rootReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

render(<Root store={store} />, document.getElementById('root'))
