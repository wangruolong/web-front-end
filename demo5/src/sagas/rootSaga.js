import {takeEvery} from 'redux-saga'
import {addTodo, toggleTodo} from './todoSaga'

export function* watchSaga() {
    yield takeEvery('ADD_TODO', addTodo)
    yield takeEvery('TOGGLE_TODO', toggleTodo)
}

export default function* rootSaga() {
    yield watchSaga()
}
