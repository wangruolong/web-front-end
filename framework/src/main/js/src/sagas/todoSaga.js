import uuid from 'uuid'
import {delay} from 'redux-saga'
import * as effects from 'redux-saga/effects'
let {put, select} = effects

import {REQUEST_SUFFIX,SUCCESS_SUFFIX,FAILURE_SUFFIX} from 'actions/actionTypes'

function getState(state) {
	return state
}

export function* addTodo(action) {
	try {
		yield put({type: action.type+REQUEST_SUFFIX, data: action.payload})
		let {text} = action.payload
		let response = {
			id: uuid.v4,
			text: text ,
			completed: false
		}
		yield put({type: action.type+SUCCESS_SUFFIX, data: response})
	} catch (e) {
		yield put({type: action.type+FAILURE_SUFFIX, data: e})
	}
}

export function* toggleTodo(action) {

	try {
		yield put({type: action.type+REQUEST_SUFFIX, data: action.payload})
		// for (let i = 0; i < 2; i++) {
		// 	yield delay(1000)
		// 	/*eslint-disable*/
		// 	let globalState = select(getState)
		// 	/*eslint-enable*/
		// }
		let response = action.payload
		yield put({type: action.type+SUCCESS_SUFFIX, data: response})
	} catch (e) {
		yield put({type: action+FAILURE_SUFFIX, data: e})
	}
}