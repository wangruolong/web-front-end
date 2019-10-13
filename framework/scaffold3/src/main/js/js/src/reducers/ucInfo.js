import {fromJS} from 'immutable'
import {SUCCESS_SUFFIX, FAILURE_SUFFIX} from '../actions/actionTypes'
import {GET_IDENTIFY_CODE, UC_LOGIN, UC_LOGIN_BY_UCKEY, UC_LOGOUT, SET_UC_INFO, REFRESH_TOKEN} from '../actions/actionTypes'

const initState = fromJS({
	userInfo:{},//用户信息
	authInfo:{},//授权信息
	isRefreshed:false//是否已经刷新过token
})
const ucInfo = (state = initState, action) => {
	let {payload} = action
	switch (action.type) {
		// 登录
		case UC_LOGIN + SUCCESS_SUFFIX:
		case UC_LOGIN_BY_UCKEY + SUCCESS_SUFFIX:{
			return state.set('userInfo',fromJS(payload.userInfo))
				.set('authInfo',fromJS(payload.authInfo))
				.set('isRefreshed',true)// 4.token已经刷新
		}
		// 刷新
		case SET_UC_INFO + SUCCESS_SUFFIX:{
			return state.set('userInfo',fromJS(payload.userInfo))
				.set('authInfo',fromJS(payload.authInfo))
		}
		// 验证码
		case GET_IDENTIFY_CODE + SUCCESS_SUFFIX:{
			return state.set('identifyCodePath', fromJS(payload.identifyCodePath))
		}
		// 续约
		case REFRESH_TOKEN + SUCCESS_SUFFIX:
			return state.set('authInfo', fromJS(payload.authInfo))
				.set('isRefreshed',true)
		case REFRESH_TOKEN + FAILURE_SUFFIX:{
			return state.set('isRefreshed',true)
		}
		// 退出
		case UC_LOGOUT + SUCCESS_SUFFIX:
			return initState
		default:
			return state
	}
}

export default ucInfo
