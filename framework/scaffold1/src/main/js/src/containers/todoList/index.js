import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import {addTodo, toggleTodo} from 'actions/todoAction'
import TodoListDump from 'components/todoList'


const mapStateToProps = state => {
	return {
		// 不要直接在container里面toJS()，这样会导致不断的render。
		// 这是因为每次toJS()都是一个新的对象，即便是值一样，也是新的对象，这样就会导致redux认为值有变化从而导致重新render。
		// 这样包个高阶组件先把props转成普通对象，然后再传递给dump，这样redux就会认为两次的值一样就不会重复渲染了。
		// todoList: state.todos.get('todoList').toJS()
		todoList: state.todos.get('todoList')
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
)(WithImmutablePropsToJs(TodoListDump))

export default TodoListSmart