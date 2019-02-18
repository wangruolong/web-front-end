import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link, hashHistory,IndexRedirect } from 'react-router'
import TodoList from './containers/TodoListSmart'
import Example1 from './components/demoComponent/example1'

class Index extends Component {
  static propTypes = {
  	children: PropTypes.object
  };
  render() {
  	return (
  		<div>
  			<h1>Index</h1>
  			<ul>
  				<li>
  					<Link to="/about">About</Link>
  				</li>
  				<li>
  					<Link to="/inbox">Inbox</Link>
  				</li>
  				<li>
  					<Link to="/app">App</Link>
  				</li>
  				<li>
  					<Link to="/example1">Example1</Link>
  				</li>
  			</ul>
  			{this.props.children}
  		</div>
  	)
  }
}

class About extends Component {
	render() {
		return <h3>About</h3>
	}
}

class Inbox extends Component {
  static propTypes = {
  	children: PropTypes.object
  };
  render() {
  	return (
  		<div>
  			<h2>Inbox</h2>
  			{this.props.children || 'Welcome to your Inbox'}
  		</div>
  	)
  }
}

class Message extends Component {
  static propTypes = {
  	params: {
  		id: PropTypes.string
  	}
  };
  render() {
  	return <h3>Message {this.props.params.id}</h3>
  }
}

const Routes = () => (
	<Router history={hashHistory}>
		<Route path="/" component={Index}>
			<Route path="about" component={About} />
			<Route path="inbox" component={Inbox}>
				<Route path="messages/:id" component={Message} />
			</Route>
			<Route path="app" component={TodoList} />
			<Route path="example1" component={Example1} />
		</Route>
	</Router>
)

export default Routes
