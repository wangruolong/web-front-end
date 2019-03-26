let initState = [
	{id: 0, text: 'aaaaaaa', completed: false},
	{id: 1, text: 'bbbbbbb', completed: false},
	{id: 2, text: 'ccccccc', completed: false}
]

const todos = (state = initState, action) => {
	let {data} = action
	switch (action.type) {
	case 'ADD_TODO_SUCCESS':
		return [
			...state,
			{
				id: data.id,
				text: data.text,
				completed: data.completed
			}
		]
	case 'TOGGLE_TODO_SUCCESS':
		return state.map(todo => (todo.id === data.id) ? {...todo, completed: !todo.completed} : todo)
	default:
		return state
	}
}

export default todos