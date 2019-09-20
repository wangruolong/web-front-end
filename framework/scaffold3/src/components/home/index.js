import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {hashHistory} from 'react-router'
import { encoder,decoder } from 'nd-base64'
import authUtil from 'utils/authUtil'
import dateUtil from 'utils/dateUtil'

export default class Home extends Component{
	static propTypes = {
		location: PropTypes.object,
		loginByUCKey: PropTypes.func,
		setUcInfo: PropTypes.func,
		children: PropTypes.node,
		checkAuth: PropTypes.object
	}
	componentDidMount(){
		let result = {}
		let { query = {}, pathname = '' } = this.props.location
		let { type, key, model} = query
		//1.处理sdp-app-id
		let sdpAppId = query['sdp-app-id'] || ''
		if(sdpAppId !==''){
			authUtil.setLocalStorage('sdp-app-id',sdpAppId)
		}
		//2.处理model
		if(model && model!==''){ // 可以有多种显示样式，app是完整的包括登录退出功能，cmpt是组件模式只显除菜单之外的数据，未来可能还有什么自定义显示样式。
			authUtil.setLocalStorage('model', model)
		}else{
			let modelType = authUtil.getLocalStorage('model')
			if(modelType && modelType!=='') {
				model = modelType
			}else{
				model = 'app'
				authUtil.setLocalStorage('model', model)
			}
		} 
		result['model'] = model
		//3.处理用户认证信息
		if(type){// 如果有type可以进行登录
			if(type=='uckey'){
				console.log('login by uckey, key is ', key)
			}else if(type=='auth'){// auth和uckey登录方式只差一个Authornation: 
				console.log('login by auth, auth is ', key)
				const prefix = 'QXV0aG9yaXphdGlvbjog'
				key = prefix + encoder(key)
			}
			this.props.loginByUCKey({key,location:this.props.location})
		}else{// 如果没有type则读取浏览器的登录用户信息
			let authInfo = authUtil.getAuth()
			let isExpires = dateUtil.returnDifferenceState(authInfo.expiresAt)
			if (isExpires) {//刷新页面重新设置用户认证信息
				this.props.setUcInfo()
			}else {
				hashHistory.push(`/login?redirect=${window.location.href}`)
			}
		}
	}

	render(){
		let {checkAuth = {}} = this.props
		let {isExpires = false} = checkAuth
		console.log('xxxxxxxxxx',isExpires)
		if(isExpires){
			return <div>{this.props.children}</div>
		}else{
			return <div></div>
		}
	}
}