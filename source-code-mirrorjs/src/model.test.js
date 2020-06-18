const models = []

function model(m) {
  console.log('0.接收到的参数\n',m,'\n')
  m = validateModel(m)
  console.log('1.检查数据格式，过滤掉非函数的键值对\n',m,'\n')// 这里的检查包括reducers和effects
  let action2reducer = resolveReducers(m.name, m.reducers)
  console.log('2.给reducer加上模块名，保证reducer全局唯一，返回一个map对象\n', action2reducer,'\n')// 这里只有reducers没有effects
  action2reducer = getReducer(action2reducer, m.initialState)
  console.log('3.把initialState带上，拼接成一个完整的action2reducer\n', action2reducer,'\n')
  console.log('4.dispatch type 为 todos/test2 的 action')
  action2reducer({data:'111'},{type:'todos/test2',data:'dataaaaaa'})
  console.log()
  const _model = {
    name: m.name,
    reducer: action2reducer
  }
  models.push(_model)
  console.log('5.combineReducers',createReducer(models))
  
}

model({
  name: 'todos',
  initialState: {
    data:'',
    list: [],
    visibility: 'all'
  },
  reducers: {
    test:'123',
    test2(state,data){
      return {...state,data}
    },
    add(state, text) {
      return { }
    },
    setVisibility(state, filter) {
      return { }
    }
  },
  effects: {
    funInEffects:'123',
    funInEffects2(){},
  }
})


function getReducer(reducers, initialState = null) {
  return (state = initialState, action) => {
    if (typeof reducers[action.type] === 'function') {
      console.log('before',state)
      let result = reducers[action.type](state, action.data)
      console.log('after',result)
      return result
    }
    return state
  }
}

function resolveReducers(modelName, reducers = {}) {
  return Object.keys(reducers).reduce((acc, cur) => {
    acc[`${modelName}/${cur}`] = reducers[cur]
    return acc
  }, {})
}

function validateModel(m = {}) {
	const {
		name,
		reducers,
		effects
	} = m

	const isObject = target => Object.prototype.toString.call(target) === '[object Object]'

	if (!name || typeof name !== 'string') {
		throw new Error(`Model name must be a valid string!`)
	}

	if (name === 'routing') {
		throw new Error(`Model name can not be "routing", it is used by react-router-redux!`)
	}

	if (models.find(item => item.name === name)) {
		throw new Error(`Model "${name}" has been created, please select another name!`)
	}

	if (reducers !== undefined && !isObject(reducers)) {
		throw new Error(`Model reducers must be a valid object!`)
	}

	if (effects !== undefined && !isObject(effects)) {
		throw new Error(`Model effects must be a valid object!`)
	}

  m.reducers = filterReducers(reducers)
	m.effects = filterReducers(effects)
  
	return m
}


function filterReducers(actionReducer) {
  if (!actionReducer) {
    return actionReducer
  }

  return Object.keys(actionReducer)
    .reduce((result, actionName) => {
      // Filter out non-function entries
      if (typeof actionReducer[actionName] === 'function') {
        result[actionName] = actionReducer[actionName]
      }
      return result
    }, {})
}

function createReducer(models, reducers) {
  console.log('----------',models)
  const modelReducers = models.reduce((acc, cur) => {
    console.log('==========',cur.name,cur.reducer)
    acc[cur.name] = cur.reducer
    return acc
  }, {})
  return modelReducers
}