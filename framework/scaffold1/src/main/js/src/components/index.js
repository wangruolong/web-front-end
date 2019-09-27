import React,{Component} from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

class Index extends Component {
	render() {
    	return (
    		<div style={{border:'1px solid red'}}>
    			{/* <h1>Index</h1>
    			<ul>
    				<li> <Link to="/todo_list">todo_list</Link> </li>
    				<li> <Link to="/example1">example1</Link> </li>
					<li> <Link to="/example2">example2</Link> </li>
					<li> <Link to="/example3">example3</Link> </li>
    			</ul> */}
				<div style={{border:'1px solid blue'}}>
					{this.props.children}
				</div>
    		</div>
    	)
	}
}
Index.propTypes={
	children: PropTypes.object
}
export default Index