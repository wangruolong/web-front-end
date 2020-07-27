import {fromJS, List} from 'immutable'
import {ResolveReducers} from 'framework'

const initState = fromJS({
	dataList2: [],
})

const reducerMap = {
	getDataList2:(state, data)=>{
		data = data.map((v,i)=>(v-i))
		return state.set('dataList2',data)
	}
}

export default ResolveReducers('test2', reducerMap, initState)
