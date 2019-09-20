import {fromJS} from 'immutable'
import {SUCCESS_SUFFIX, FAILURE_SUFFIX} from '../actions/actionTypes'
import {GET_IDENTIFY_CODE, UC_LOGIN, UC_LOGIN_BY_UCKEY, UC_LOGOUT, SET_UC_INFO, REFRESH_TOKEN} from '../actions/actionTypes'

const initState = fromJS({
	checkAuth:{
		isExpires:false// 是否有效,true表示有效可以使用，false表示无效不能使用。
	},
	userInfo:{},//用户信息
	authInfo:{},//授权信息
	isRefreshed:false//是否已经刷新过token
})
const ucInfo = (state = initState, action) => {
	let {payload} = action
	switch (action.type) {
		case SET_UC_INFO + SUCCESS_SUFFIX:{
			return state.set('userInfo',fromJS(payload.userInfo))
				.set('authInfo',fromJS(payload.authInfo))
				.set('checkAuth',fromJS(payload.checkAuth))
		}
		case UC_LOGIN_BY_UCKEY + SUCCESS_SUFFIX:
		case UC_LOGIN + SUCCESS_SUFFIX:{// 登录成功后不用再次续约，否则会造成token没有有效利用。
			return state.set('userInfo',fromJS(payload.userInfo))// 1.设置用户信息
				.set('authInfo',fromJS(payload.authInfo))// 2.设置认证信息
				.set('checkAuth',fromJS(payload.checkAuth))// 3.token有效
				.set('isRefreshed',true)// 4.token已经刷新
		}
		case UC_LOGOUT+SUCCESS_SUFFIX:
			return initState
		case GET_IDENTIFY_CODE + SUCCESS_SUFFIX:
			return state.set('identifyCodePath', fromJS(action.payload.identifyCodePath))
		case REFRESH_TOKEN + SUCCESS_SUFFIX:
			return state.set('authInfo', fromJS(payload.authInfo)).set('isRefreshed',true)
		case REFRESH_TOKEN + FAILURE_SUFFIX:{
			return state.set('isRefreshed',true)
		}
		default:
			return state
	}
}

export default ucInfo
