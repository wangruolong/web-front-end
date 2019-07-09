import {fromJS, List} from 'immutable'
import {SUCCESS_SUFFIX,ADD_TODO,TOGGLE_TODO} from 'actions/actionTypes'

let initState = fromJS({
	todoList:[
		{id: 0, text: 'aaaaaaa', completed: false},
		{id: 1, text: 'bbbbbbb', completed: false},
		{id: 2, text: 'ccccccc', completed: false}
	],
	currentTodo:{}
})

const todos = (state = initState, action) => {
	let {data} = action
	switch (action.type) {
		case ADD_TODO + SUCCESS_SUFFIX:{
			return state.push({// 添加待办
				id: data.id,
				text: data.text,
				complete: data.completed,
			})
		}
		case TOGGLE_TODO + SUCCESS_SUFFIX:{// 完成/取消完成代办
			let oldTodoList = state.get('todoList')
			let item
			//先找到数组中对应的下标
			let index = oldTodoList.findIndex((value,index,array)=>{
				if(value.get('id') == data.id){
					item = value
					return true
				}
			})
			//构造新的项
			item = item.set('completed',!item.get('completed'))
			//更新下标对应数组中的项
			let newTodoList = oldTodoList.set(index,item)
			return state.set('todoList',newTodoList)
		}
		// 注意：这种写法是错误的。
		// state是reference，不能直接操作state，否则会出现state更新了但是页面却没有刷新的情况。
		// case TOGGLE_TODO + SUCCESS_SUFFIX:{// 完成/取消完成代办
		// 	let item
		// 	//先找到对应的下标。
		// 	let index = state.findIndex(
		// 		(value,index,array)=>{
		// 			if(value.id == data.id){
		// 				item = value
		// 				return true
		// 			}
		// 		}
		// 	)
		// 	//更新对应元素的值
		// 	item.completed=!item.completed
		// 	return state.set(index,item)
		// }
		default:
			return state
	}
}

export default todos