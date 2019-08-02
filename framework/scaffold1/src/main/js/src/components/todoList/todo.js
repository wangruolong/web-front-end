import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Todo extends Component{
	constructor(){
		super()
	}
	handleClick(){
		let args = {
			id:this.props.id
		}
		this.props.onClick(args)
	}
	render(){
		let {completed,text}=this.props
		console.log('1111111111',completed,text)
		return <li onClick={()=>{this.handleClick()}} style={{textDecoration: completed ? 'line-through' : 'none'}}>
			{text}
		</li>
	}
}

Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	id: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
}

export default Todo