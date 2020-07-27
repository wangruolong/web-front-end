import {fromJS, List} from 'immutable'
import {ResolveReducers} from 'framework'

const initState = fromJS({
	dataList1: []
})

const reducerMap = {
	getDataList1:(state, data)=>{
		data = data.map((v,i)=>(v+i))
		return state.set('dataList1',data)
	}
}

export default ResolveReducers('test1', reducerMap, initState)
