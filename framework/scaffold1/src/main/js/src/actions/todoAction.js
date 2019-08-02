import {ADD_TODO,TOGGLE_TODO} from './actionTypes'

export const addTodo = (args) => {
	return {
		type: ADD_TODO,
		payload: args
	}
}

export const toggleTodo = (args) => {
	return {
		type: TOGGLE_TODO,
		payload:args
	}
}
