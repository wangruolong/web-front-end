import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'
class TodoList extends Component{
	constructor(){
		super()
	}
	handleTodoClick(args){
		this.props.onTodoClick(args)
	}
	render(){
		let {todoList=[]} = this.props
		return<ul>
			{ todoList.map((todo, index) => (
				<Todo key={index} {...todo} onClick={(args)=>{this.handleTodoClick(args)}} />
			))}
		</ul>
	}
}

TodoList.propTypes = {
	todoList: PropTypes.array,
	onTodoClick: PropTypes.func
}

export default TodoList
