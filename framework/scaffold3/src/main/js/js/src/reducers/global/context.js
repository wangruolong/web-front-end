import {fromJS} from 'immutable'
import {REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX, SET_INIT_FLAG} from 'actions/actionTypes'
import {SET_GLOBAL_DATA} from 'actions/actionTypes'

let initState = fromJS({
	model:'',// 可以有多种显示样式，app是完整的包括登录退出功能，cmpt是组件模式只显除菜单之外的数据，未来可能还有什么自定义显示样式。
	sdpAppId:'',
	sdpNodeId:'',
	initFlag: false// 初始化是否已完成，把子组件里面需要在这里初始化的数据先处理好，保证子组件接收到的数据肯定有值。
})

const context = (state = initState, action) => {
	let actionType = action.type

	switch(actionType){
		case SET_GLOBAL_DATA + SUCCESS_SUFFIX: {// 其他需要放入global的数据
			let  {field,value}  = action.payload
			return state.setIn([field], value)
		}
		case SET_INIT_FLAG:{
			return state.set('initFlag', action.payload)
		}
		default: {
			return state
		}
	}
}

export default context
