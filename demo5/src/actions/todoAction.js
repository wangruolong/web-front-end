export const addTodo = (id, text, completed) => {
	let payload = {
		id,
		text,
		completed
	}
	return {
		type: 'ADD_TODO',
		payload
	}
}

export const toggleTodo = (id) => {
	let payload = {
		id
	}
	return {
		type: 'TOGGLE_TODO',
		payload
	}
}
