import { combineReducers } from 'redux'
import ucInfo from './ucInfo'
import global from './global'

const rootReducer = combineReducers({
	ucInfo,
	global
})

export default rootReducer