import {UC_LOGIN, UC_LOGOUT, SET_UC_INFO, GET_IDENTIFY_CODE, REFRESH_TOKEN} from './actionTypes'
export const login = (args) => {
	return{
		type:UC_LOGIN,
		payload:args
	}
}
export const logout = (args) => {
	return {
		type: UC_LOGOUT,
		payload:args
	}
}
export const setUcInfo = (args) => {
	return {
		type: SET_UC_INFO,
		payload:args
	}
}
export const getIdentifyCode = (args) => {
	return {
		type: GET_IDENTIFY_CODE,
		payload:args
	}
}
export const refreshToken = (args) => {
	return {
		type: REFRESH_TOKEN,
		payload:args
	}
}