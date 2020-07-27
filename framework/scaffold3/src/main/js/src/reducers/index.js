import { combineReducers } from 'redux'
import ucInfo from './ucInfo'
import global from './global'
import test1 from './test1'
import test2 from './test2'

const rootReducer = combineReducers({
	ucInfo,
	global,
	test1,
	test2
})

export default rootReducer