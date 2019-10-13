import { combineReducers } from 'redux'
import loading from './loading'
import context from './context'

const globalReducer = combineReducers({
	loading,
	context,
})

export default globalReducer