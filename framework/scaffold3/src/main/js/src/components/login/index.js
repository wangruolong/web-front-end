import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Row, Col, Input, Icon, Button, Tag } from 'fish'
import styles from './style.scss'

export default class Login extends Component {
	static propTypes = {
		login: PropTypes.func,
		identifyCodePath: PropTypes.string,
		getIdentifyCode: PropTypes.func,
		location: PropTypes.object
	}
	constructor(){
		super()
		this.state={
			userName:''
		}
	}
	componentDidMount(){
		
	}
	emitEmptyUserName = () => {
		this.userNameInput.focus()
		this.setState({ userName: '' })
	}

	emitEmptyPassword = () => {
		this.passwordInput.focus()
		this.setState({ password: '' })
	}

	onChangeUserName = (e) => {
		this.setState({ userName: e.target.value })
	}

	onChangePassword = (e) => {
		this.setState({ password: e.target.value })
	}

	onLogin = () => {
		let userName = this.userNameInput.input.value
		let password = this.passwordInput.input.value
		let identifyCode = this.identifyCodeInput && this.identifyCodeInput.input.value
		this.props.login({userName, password, identifyCode})
	}

	buildICDiv() {
		let { identifyCodePath = '' } = this.props
		if (identifyCodePath !== '') {
			return (
				<div className={styles['ic-group']}>
					<Input ref={node => this.identifyCodeInput = node} type="text" placeholder="验证码" />
					<img src={identifyCodePath} onClick={this.getIdentifyCode}></img>
				</div>
			)
		}
	}

	getIdentifyCode = () => {
		this.props.getIdentifyCode()
	}

	render(){
		let { query = {} } = this.props.location
		let { type, key, model} = query
		const { userName, password } = this.state
		const userNameSuffix = userName ? <Icon type="close-circle" onClick={this.emitEmptyUserName} /> : null
		const passwordSuffix = password ? <Icon type="close-circle" onClick={this.emitEmptyPassword} /> : null
		return<div className={styles['login-wrap']}>
			<div className={styles['login-form']}>
				<h1>{document.title}</h1>
				<Input placeholder="用户名"
					prefix={<Icon type="user" />}
					suffix={userNameSuffix}
					value={userName}
					onChange={this.onChangeUserName}
					ref={node => this.userNameInput = node}
				/>
				<Input placeholder="密码"
					type={'password'}
					prefix={<Icon type="lock" />}
					suffix={passwordSuffix}
					value={password}
					onChange={this.onChangePassword}
					ref={node => this.passwordInput = node}
				/>
				{this.buildICDiv()}
				<Button type="primary" style={{width:'100%'}} onClick={this.onLogin}>登录</Button>
			</div>
		</div>
	}
}