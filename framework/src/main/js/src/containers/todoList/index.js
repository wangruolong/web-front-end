import {connect} from 'react-redux'

import {addTodo, toggleTodo} from 'actions/todoAction'
import TodoListDump from 'components/todoList'


const mapStateToProps = state => {
	return {
		todoList: state.todos.get('todoList').toJS()
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTodoClick: (args) => {
			dispatch(toggleTodo(args))
		},
		onAddTodo: (id, text, completed) =>{
			dispatch(addTodo(id, text, completed))
		}
	}
}

const TodoListSmart = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoListDump)

export default TodoListSmart