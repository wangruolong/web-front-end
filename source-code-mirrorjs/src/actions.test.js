const m = {
  name: 'todos',
  initialState: {
    data:'',
    list: [],
    visibility: 'all'
  },
  reducers: {
    test:'test',
    test2:(state,data)=>{ },
    add(state, text) {
      return { }
    },
    setVisibility(state, filter) {
      return { }
    }
  },
  effects: {
    funInEffects:'funInEffects',
    funInEffects2:()=>{},
  }
}
const SEP = '/'
const actions = {}
const effects = {}
const addEffect = effects => (name, handler) => {
  effects[name] = handler
}

const options = {
  historyMode: 'browser',
  middlewares: [],
  reducers: {},
  addEffect: addEffect(effects)
}

function addActions(modelName, reducers = {}, effects = {}) {
  console.log('0.接收到的参数')
  console.log('modelName','>>>>>>>>>>',modelName)
  console.log('reducers','>>>>>>>>>>',reducers)
  console.log('effects','>>>>>>>>>>',effects)
  console.log('1.验证并初始化对象，防止出现 undefined')
  if (Object.keys(reducers).length || Object.keys(effects).length) {
    actions[modelName] = actions[modelName] || {}
  }
  console.log('actions = ',actions)
  console.log('2.循环reducers')
  each(reducers, actionName => {
    actions[modelName][actionName] = actionCreator(modelName, actionName)
  })
  console.log('actions = ',actions)
  console.log('3.循环effects')
  each(effects, effectName => {
    if (actions[modelName][effectName]) {
      throw new Error(`Action name "${effectName}" has been used! Please select another name as effect name!`)
    }
    options.addEffect(`${modelName}${SEP}${effectName}`, effects[effectName])
    actions[modelName][effectName] = actionCreator(modelName, effectName)
    actions[modelName][effectName].isEffect = true
  })
  console.log('actions = ',actions)
  
}
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
addActions(m.name,m.reducers,m.effects)
console.log('全局范围内的effects',effects)
