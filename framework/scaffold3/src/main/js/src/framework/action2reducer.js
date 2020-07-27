// 全局的action
const actions={}
let dispatch={}
// 把map转换成数组
function map2array(modelName, reducers = {}) {
	return Object.keys(reducers).reduce((acc, cur) => {
		acc[`${modelName}/${cur}`] = reducers[cur]
		return acc
	}, {})
}
// 把数组解析成reducer
function ResolveReducers(modelName, reducers={}, initState){
	ResolveActions(modelName, reducers)
	const reducerArray = map2array(modelName, reducers)
	return (state=initState,action)=>{
		if (typeof reducerArray[action.type] === 'function') {
			const result = reducerArray[action.type](state, action.payload)
			return result
		}
		return state
	}
}
// 解析成Action
function ResolveActions(modelName, reducers={}){
	actions[modelName]={}
	Object.keys(reducers).forEach(actionName => {
		actions[modelName][actionName] = actionCreator(modelName, actionName)
	})
	return actions
}

function actionCreator(modelName, actionName) {
	return data => (
		dispatch({
			type: `${modelName}/${actionName}`,
			payload: data
		})
	)
}

const dispatchAction = (storeDispatch) => {
	dispatch = storeDispatch
	return actions
}

export {ResolveReducers, ResolveActions, dispatchAction}
