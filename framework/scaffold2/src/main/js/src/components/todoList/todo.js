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
	componentWillMount(){
		console.log('2222222222 componentWillMount')
	}
	componentDidMount(){
		console.log('2222222222 componentDidMount')
	}
	render(){
		console.log('2222222222 render ')
		let {completed,text}=this.props
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