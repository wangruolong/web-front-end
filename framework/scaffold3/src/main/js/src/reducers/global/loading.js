import {fromJS} from 'immutable'
import {REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX} from 'actions/actionTypes'
import { SET_UC_INFO } from 'actions/actionTypes'
import {message as fishMessage} from 'fish'

let initState = fromJS({
	isLoading: false,// 是否加载中
	requestCount:0// 当前请求的数量
})

// 不需要loading的actionType
const noLoadingList = [
	SET_UC_INFO + REQUEST_SUFFIX,
	SET_UC_INFO + SUCCESS_SUFFIX,
	SET_UC_INFO + FAILURE_SUFFIX,
]

const loading = (state = initState, action) => {
	let actionType = action.type
    
	if(noLoadingList.indexOf(actionType)>-1){
		return state
	}else{
		let requestCount = state.getIn(['requestCount'])
		if(actionType.indexOf(REQUEST_SUFFIX)>-1){
			requestCount = requestCount + 1
		}else if(actionType.indexOf(SUCCESS_SUFFIX)>-1 || actionType.indexOf(FAILURE_SUFFIX)>-1 ){
			requestCount = requestCount - 1
			// 处理全局错误信息
			if(actionType.indexOf(FAILURE_SUFFIX)>-1){
				let { payload } = action
				fishMessage.error(payload.message||'未知错误！')
			}
		}
		return state.setIn(['isLoading'], requestCount > 0)
			.setIn(['requestCount'], requestCount)
	}
	
}

export default loading
