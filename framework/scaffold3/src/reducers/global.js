import {fromJS} from 'immutable'
import {REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX} from 'actions/actionTypes'
import {SWITCH_TAB, SET_UC_INFO} from 'actions/actionTypes'
import {message} from 'fish'

let initState = fromJS({
	loading:{
		isLoading: false,// 是否加载中
		requestCount:0// 当前请求的数量
	}
})

// 不需要loading的actionType
const noLoadingList=[
	SET_UC_INFO + REQUEST_SUFFIX,
	SET_UC_INFO + SUCCESS_SUFFIX,
	SET_UC_INFO + FAILURE_SUFFIX,
]

const global = (state = initState, action) => {
	
	let actionType = action.type
	// 处理全局错误提示
	if(actionType.indexOf(FAILURE_SUFFIX)>-1){
		let{payload} = action
		message.error(payload.message)
	}

	switch(actionType){
		case 'ActionType':{// 其他需要放入global的数据
			let {data} = action.payload
			return state.setIn(['data'], data)
		}
		default:{// 处理全局loading
			if(noLoadingList.indexOf(actionType)>-1){
				return state
			}else{
				let requestCount = state.getIn(['loading','requestCount'])
				if(actionType.indexOf(REQUEST_SUFFIX)>-1){
					requestCount = requestCount + 1
				}else if(actionType.indexOf(SUCCESS_SUFFIX)>-1 || actionType.indexOf(FAILURE_SUFFIX)>-1 ){
					requestCount = requestCount - 1
				}
				return state.setIn(['loading','isLoading'], requestCount > 0)
					.setIn(['loading','requestCount'], requestCount)
			}
		}
	}

	
	
}

export default global