import {delay} from 'redux-saga'
import * as effects from 'redux-saga/effects'

let {put, call, select} = effects

function getState(state) {
    return state
}

export function* addTodo(action) {
    try {
        yield put({type: 'ADD_TODO_REQUEST', data: action.payload})
        let response = {
            id: new Date().getTime(),
            text: 'saga create',
            completed: true
        }
        yield put({type: 'ADD_TODO_SUCCESS', data: response})
    } catch (e) {
        yield put({type: 'ADD_TODO_FAILURE', data: e})
    }
}

export function* toggleTodo(action) {

    try {
        yield put({type: 'TOGGLE_TODO_REQUEST', data: action.payload})
        for (let i = 0; i < 2; i++) {
            yield delay(1000)
            console.log('pending...', i)
        }
        let response = action.payload
        yield put({type: 'TOGGLE_TODO_SUCCESS', data: response})
    } catch (e) {
        yield put({type: 'TOGGLE_TODO_FAILURE', data: e})
    }
}