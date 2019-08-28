import React, { Component } from 'react'
import { Router, Route, Link, hashHistory,IndexRedirect } from 'react-router'
import IndexSmart from './containers'
import TodoListSmart from './containers/todoList'
import Example1 from './components/demoComponent/example1'
import Example2 from './components/demoComponent/example2'

const Routes = () => (
	<Router history={hashHistory}>
		<Route path="/" component={IndexSmart}>
			<IndexRedirect to='todo_list' />
			<Route path="todo_list" component={TodoListSmart} />
			<Route path="example1" component={Example1} />
			<Route path="example2" component={Example2} />
		</Route>
	</Router>
)

export default Routes
