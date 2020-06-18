import { dispatch } from './middleware'
import { options } from './defaults'

const SEP = '/'

export const actions = {}

export function addActions(modelName, reducers = {}, effects = {}) {
  // 1.验证并初始化对象，防止出现 undefined
  if (Object.keys(reducers).length || Object.keys(effects).length) {
    actions[modelName] = actions[modelName] || {}
  }
  // 2.把reducer放到actions里面
  each(reducers, actionName => {
    // A single-argument function, whose argument is the payload data of a normal redux action,
    // and also the `data` param of corresponding method defined in model.reducers.
    actions[modelName][actionName] = actionCreator(modelName, actionName)
  })
  // 3.把effects放到actions里面
  each(effects, effectName => {
    if (actions[modelName][effectName]) {
      throw new Error(`Action name "${effectName}" has been used! Please select another name as effect name!`)
    }

    options.addEffect(`${modelName}${SEP}${effectName}`, effects[effectName])

    // Effect is like normal action, except it is handled by mirror middleware
    // Effect 像普通的action一样，区别是它会被Mirror的Middleware接收，即createMiddleware方法
    actions[modelName][effectName] = actionCreator(modelName, effectName)
    // Allow packages to differentiate effects from actions
    actions[modelName][effectName].isEffect = true
  })
}

export function resolveReducers(modelName, reducers = {}) {
  return Object.keys(reducers).reduce((acc, cur) => {
    acc[`${modelName}${SEP}${cur}`] = reducers[cur]
    return acc
  }, {})
}
// 简单封装了遍历对象方法
function each(obj, callback) {
  Object.keys(obj).forEach(callback)
}

function actionCreator(modelName, actionName) {
  return data => (
    dispatch({
      type: `${modelName}${SEP}${actionName}`,
      data
    })
  )
}
