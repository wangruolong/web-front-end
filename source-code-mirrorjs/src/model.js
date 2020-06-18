import { resolveReducers, addActions } from './actions'

export const models = []

export default function model(m) {
  // 1.检查数据格式，过滤掉非函数的键值对。
  m = validateModel(m)
  // 2.1给reducer加上模块名，保证reducer全局唯一，返回一个map对象。
  // 2.2把这个map对象放到getReducer这个闭包中，让map持续有效。
  // 2.3这样形成的闭包，就相当于我们原来reducer里面写的那些switch case。而且这个闭包拿到哪里都能用。
  const reducer = getReducer(resolveReducers(m.name, m.reducers), m.initialState)

  const _model = {
    name: m.name,
    reducer
  }
  // 3.最终的结果就是model里面放的元素都是包含action2reducer的方法，可以直接调用改变reducer。
  models.push(_model)
  // 4.把model名称，reducers和effects放到全局action里面。
  addActions(m.name, m.reducers, m.effects)

  return _model
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


// If initialState is not specified, then set it to null
function getReducer(reducers, initialState = null) {

  return (state = initialState, action) => {
    if (typeof reducers[action.type] === 'function') {
      return reducers[action.type](state, action.data)
    }
    return state
  }
}

function filterReducers(reducers) {
  if (!reducers) {
    return reducers
  }

  return Object.keys(reducers)
    .reduce((acc, action) => {
      // Filter out non-function entries
      if (typeof reducers[action] === 'function') {
        acc[action] = reducers[action]
      }
      return acc
    }, {})
}
