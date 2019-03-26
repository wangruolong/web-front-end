import React,{Component} from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

class Index extends Component {
	render() {
    	return (
    		<div>
    			<h1>Index</h1>
    			<ul>
    				<li>
    					<Link to="/todo_list">todo_list</Link>
    				</li>
    				<li>
    					<Link to="/example1">example1</Link>
    				</li>
    			</ul>
    			{this.props.children}
    		</div>
    	)
	}
}
Index.propTypes={
	children: PropTypes.object
}
export default Index