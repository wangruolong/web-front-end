import React, { Component } from 'react'
import { Router, Route, Link, hashHistory,IndexRedirect } from 'react-router'
import IndexSmart from './containers'
import GuestSmart from './containers/guest'
import LoginSmart from './containers/login'
import HomeSmart from './containers/home'
import WelcomeSmart from './containers/home/welcome'
const Routes = () => (
	<Router history={hashHistory}>
		<Route path="/" component={IndexSmart}>
			<Route path="login" component={LoginSmart} />
			<IndexRedirect to='home/welcome'/>
			<Route path='home' component={HomeSmart}>
				<Route path='welcome' component={WelcomeSmart} />
			</Route>
			<Route path='guest' component={GuestSmart} />
		</Route>
	</Router>
)

export default Routes
