import { put, call, select } from 'redux-saga/effects'
import authUtil from 'utils/authUtil'
import {REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX} from 'actions/actionTypes'

export function* setGlobalData(action) {
	try {
		yield put({ type: action.type + REQUEST_SUFFIX, action })
		let {field,value} = action.payload
		authUtil.setLocalStorage(field,value)
		yield put({ type: action.type + SUCCESS_SUFFIX, payload: {field,value} })
	} catch (e) {
		yield put({ type: action.type + FAILURE_SUFFIX, data: e, payload: e })
	}
}