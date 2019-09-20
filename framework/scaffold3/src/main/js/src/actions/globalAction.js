import {SET_GLOBAL_DATA} from './actionTypes'
export const setGlobalData = (args) => {
	return {
		type: SET_GLOBAL_DATA,
		payload: args
	}
}