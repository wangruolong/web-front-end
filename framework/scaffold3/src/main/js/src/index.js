import 'babel-polyfill'
import React, { Component } from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootSaga from './sagas/rootSaga'
import rootReducer from './reducers'
import Routes from './routes'
import DevTools from './devTools'

const sagaMiddleware = createSagaMiddleware()

let finalCreateStore
let App
if (process.env.APP_ENV === 'development') {
	finalCreateStore = compose(
		applyMiddleware(logger, sagaMiddleware),
		DevTools.instrument()
	)(createStore)
	class DevApp extends Component{
		render(){
			return(<div>
				<Routes/>
				<DevTools/>
			</div>)
		}
	}
	App = DevApp
	
} else {
	finalCreateStore = compose(
		applyMiddleware(logger, sagaMiddleware),
	)(createStore)
	class ProdApp extends Component{
		render(){
			return(<div>
				<Routes/>
			</div>)
		}
	}
	App = ProdApp
}
// import {baymaxReducer} from 'baymax'
const store = finalCreateStore(rootReducer)

sagaMiddleware.run(rootSaga)

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
