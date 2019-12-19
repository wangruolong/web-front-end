import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {hashHistory} from 'react-router'
import { encoder,decoder } from 'nd-base64'
import authUtil from 'utils/authUtil'
import dateUtil from 'utils/dateUtil'
import  { Smart, PubSub, hooks, baskets, goHook, backHook } from 'framework'

export default class Home extends Component{
	static propTypes = {
		location: PropTypes.object,
		loginByUCKey: PropTypes.func,
		setUcInfo: PropTypes.func,
		children: PropTypes.node,
		context: PropTypes.object,
	}
	componentDidMount(){
		let { query = {} } = this.props.location
		let { type, key } = query
		if(type){
			if(type=='uckey'){
				console.log('login by uckey, key is ', key)
			}else if(type=='auth'){// key未加密。
				console.log('login by auth, auth is ', key)
				const prefix = 'QXV0aG9yaXphdGlvbjog'
				key = prefix + encoder(key)
			}else if(type=='mac'){// key已加密。
				console.log('login by mac, mac is ', key)
				const prefix = 'QXV0aG9yaXphdGlvbjog'
				key = prefix + key
			}
			this.props.loginByUCKey({key,location:this.props.location})
		}else{// 如果没有type则读取浏览器的登录用户信息
			let authInfo = authUtil.getAuth()
			let isExpires = dateUtil.returnDifferenceState(authInfo.expiresAt)
			if (isExpires) {//刷新页面重新设置用户认证信息
				this.props.setUcInfo()
			}else {
				let { query = {}, pathname } = this.props.location
				delete query['sdp-app-id']
				delete query['sdp-node-id']// 删除sdp-node-id否则uc登录的时候会报错
				let paramArray=[]
				for(let k in query){
					paramArray.push(`${k}=${query[k]}`)
				}
				let url = window.location.href.split('/#')[0] + '/#' + pathname
				if(paramArray.length>0){// 重新拼接参数
					url = url + '?' + paramArray.join('&')
				}
				hashHistory.push(`/login?redirect=${url}`)
			}
		}
	}

	render(){
		let {context = {}} = this.props
		let {initFlag = false} = context
		if(initFlag){
			return <div>{this.props.children}</div>
		}else{
			return <div></div>
		}
	}
}