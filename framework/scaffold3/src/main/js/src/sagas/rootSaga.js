import {takeEvery} from 'redux-saga'
import {UC_LOGIN, UC_LOGOUT, GET_IDENTIFY_CODE, SET_UC_INFO} from 'actions/actionTypes'
import {login, logout, getIdentifyCode, setUcInfo} from './ucSaga'
import { SET_GLOBAL_DATA } from '../actions/actionTypes'
import { setGlobalData } from './globalSaga'

export function* watchSaga() {
	yield takeEvery(UC_LOGIN, login)
	yield takeEvery(UC_LOGOUT, logout)
	yield takeEvery(GET_IDENTIFY_CODE, getIdentifyCode)
	yield takeEvery(SET_UC_INFO, setUcInfo)
	yield takeEvery(SET_GLOBAL_DATA, setGlobalData)
}

export default function* rootSaga() {
	yield watchSaga()
}

