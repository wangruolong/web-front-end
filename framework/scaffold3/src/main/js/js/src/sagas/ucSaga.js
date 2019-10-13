import { put, call, select } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { camelizeKeys } from 'humps'
import { SUCCESS_SUFFIX, FAILURE_SUFFIX, REQUEST_SUFFIX } from 'actions/actionTypes'
import { getIdentifyCode as getIdentifyCodeAction } from '../actions/ucAction'
import { setInitFlag as setInitFlagAction } from 'actions/globalAction'
import OneSDK from '@sdp.nd/one'
import authUtils from 'utils/authUtil'

function getOneInst(initData){
	if (window.One === undefined) {
		//初始化one
		window.One = new OneSDK({
			env: process.env.APP_ENV,
			data: initData,
			// data可以接收的参数有以下这些。
			// Orgname: 'nd',
			// vOrgID:'',// 有登录虚拟组织建议可以和appPortalService.getAppInfo结合使用
			// vOrgName:'',
		})
	}
	console.log(window.One)
	return window.One
}

//构造ucInfo对象
function buildUcInfo(authInfo) {
	return {
		userInfo: authInfo['user'],
		authInfo:{
			accessToken: authInfo['accessToken'],
			expiresAt: authInfo['expiresAt'],
			macAlgorithm: authInfo['macAlgorithm'],
			macKey: authInfo['macKey'],
			refreshToken: authInfo['refreshToken'],
			serverTime: authInfo['serverTime']
		}
	}
}

export function* login(action) {

	try {
		yield put({type: action.type + REQUEST_SUFFIX, action})
		let{userName,password,identifyCode} = action.payload
		let orgname=''
		if(userName && userName.indexOf('@')>-1){
			let userNameArray = userName.split('@')
			orgname = userNameArray.pop()// 取最后一个@的组织才是真正的登录组织
			userName = userNameArray.join('')// 去掉最后的组织后，才是真正的账号
		}else{// 默认登录到nd组织
			orgname = 'nd'
		}
		// 初始化one
		let One = yield getOneInst({Orgname: orgname})
		let res = yield call([One, One.login], userName, password, identifyCode)
		// 构造ucInfo
		res = camelizeKeys(res)
		let ucInfo = buildUcInfo(res)
		// 保存到store
		yield put({ type: action.type + SUCCESS_SUFFIX, payload: ucInfo })
		yield put(setInitFlagAction(true))// 完成初始化数据后，才渲染子节点。
		// 保存到localstorage
		authUtils.saveAuth(
			ucInfo.authInfo.accessToken,
			ucInfo.authInfo.expiresAt,
			ucInfo.authInfo.macAlgorithm,
			ucInfo.authInfo.macKey,
			ucInfo.authInfo.refreshToken,
			ucInfo.authInfo.erverTime,
			ucInfo.userInfo
		)

		let urlArray = window.location.href.split('/login?redirect=') || []
		console.log('the url is',window.location.href)
		// 回调地址应该是这种格式的 http://192.168.85.68:8080/#/login?redirect=http://192.168.85.68:8080/#/welcome?key1=abc&key2=222
		console.log(`split('login?redirect=')`,urlArray)
		if(urlArray.length>1){// 如果有带回调地址，则跳转到对应的对调地址。
			console.log(`we will arriving`,urlArray[1])
			window.location.href = urlArray[1]
		}else{// 如果没有回调地址则默认跳转到首页。
			console.log(`we will arriving`,'/')
			hashHistory.push('/')
		}
	} catch (e) {
		if (e.code === 'UC/IDENTIFY_CODE_REQUIRED') {
			yield put(getIdentifyCodeAction())
		}
		yield put({ type: action.type + FAILURE_SUFFIX, data: e, payload: e })
	}
}

export function* logout(action) {
	try {
		yield put({type: action.type + REQUEST_SUFFIX, action})
		authUtils.cleanAuth()// 清空认证信息
		const One = getOneInst()
		yield call([One, One.loginOut])// 把token置为无效
		yield put({type: action.type + SUCCESS_SUFFIX})
		localStorage.clear()
		hashHistory.push('/login')
		yield put(setInitFlagAction(false))// 完成初始化数据后，才渲染子节点。
	} catch (e) {
		yield put({type: action.type + FAILURE_SUFFIX, data: e, payload: e})
	}
}

export function* setUcInfo(action) {
	try {
		yield put({ type: action.type + REQUEST_SUFFIX, action })
		let auth = authUtils.getAuth()
		auth['user'] = auth.userInfo
		let ucInfo = buildUcInfo(auth)
		yield put({ type: action.type + SUCCESS_SUFFIX, payload: ucInfo })
		yield put(setInitFlagAction(true))// 完成初始化数据后，才渲染子节点。
	} catch (e) {
		yield put({ type: action.type + FAILURE_SUFFIX, data: e, payload: e })
	}
}

// 续约token
export function* refreshToken(action) {
	try {
		yield put({ type: action.type + REQUEST_SUFFIX, action })
		let auth = authUtils.getAuth()
		let newAuth = yield call([ucService, ucService.refreshToken],auth)
		newAuth = camelizeKeys(newAuth)
		localStorage.setItem('access_token',newAuth.accessToken)
		localStorage.setItem('expires_at',newAuth.expiresAt)
		localStorage.setItem('mac_algorithm',newAuth.macAlgorithm)
		localStorage.setItem('mac_key',newAuth.macKey)
		localStorage.setItem('refresh_token',newAuth.refreshToken)
		localStorage.setItem('server_time',newAuth.serverTime)
		console.log('Refresh token success! The new auth info is ',newAuth)
		yield put({ type: action.type + SUCCESS_SUFFIX, payload:{authInfo:newAuth} })
	} catch (e) {
		yield put({ type: action.type + FAILURE_SUFFIX, data: e, payload: e })
	}
}

// 获取验证码
export function* getIdentifyCode(action) {
	try {
		yield put({ type: action.type + REQUEST_SUFFIX, action })
		const One = yield getOneInst()
		let identifyCodePath = yield call([One, One.getIdentifyCodePath])
		yield put({ type: action.type + SUCCESS_SUFFIX, payload: { identifyCodePath } })
	} catch (error) {
		yield put({ type: action.type + FAILURE_SUFFIX, payload: { error } })
	}
}