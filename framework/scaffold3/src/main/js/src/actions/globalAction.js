import {SET_GLOBAL_DATA, SET_INIT_FLAG} from './actionTypes'
export const setGlobalData = (args) => {
	return {
		type: SET_GLOBAL_DATA,
		payload: args
	}
}

export const setInitFlag = (args) => {
	return {
		type: SET_INIT_FLAG,
		payload: args
	}
}