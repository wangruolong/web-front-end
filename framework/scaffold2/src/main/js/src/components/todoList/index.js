import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'
class TodoList extends Component{
	constructor(){
		super()
		this.state={
			value:''
		}
	}
	handleTodoClick(args){
		this.props.onTodoClick(args)
	}
	handleBtnClick = ()=>{
		this.setState({
			value:`1`
		})
	}
	componentWillMount(){
		console.log('1111111111 componentWillMount')
	}
	componentDidMount(){
		console.log('1111111111 componentDidMount')
	}
	render(){
		console.log('1111111111 render ',this.state)
		let {todoList=[]} = this.props
		return(<div><ul>
			{ todoList.map((todo, index) => (
				<Todo key={index} {...todo} onClick={(args)=>{this.handleTodoClick(args)}} />
			))}
		</ul>
		<button onClick={this.handleBtnClick}>改变state</button>
		</div>)
	}
}

TodoList.propTypes = {
	todoList: PropTypes.array,
	onTodoClick: PropTypes.func
}

export default TodoList
