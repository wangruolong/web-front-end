
const SEP = '/'

const actions = {}
const pureFunctions = {}
const effects = {}

// 把reducers解析成action和pureFunctions
function resolveReducers(modelName, reducers = {}, effects = {}) {
    // 先初始化modelName
    actions[modelName] = {}

    // 解析reducers里面的key => action 
    Object.keys(reducers).forEach(actionName => {
        actions[modelName][actionName] = (data)=>(
            dispatch({
                type: `${modelName}${SEP}${actionName}`,
                data
            })
        )
    })
    // 解析reducers里面的value => pure functions
    pureFunctions[modelName] =  Object.keys(reducers).reduce((acc, cur) => {
        acc[`${modelName}${SEP}${cur}`] = reducers[cur]
        return acc
    }, {})

}
let data = {
    name: 'todos',
    initialState: {
      list: [],
      visibility: 'all'
    },
    reducers: {
      add(state, text) {
        return {
          ...state,
          list: [
            ...state.list,
            {id: nextId++, text}
          ]
        }
      },
      toggle(state, id) {
        return {
          ...state,
          list: state.list.map(d => {
            if (d.id === id) {
              d.completed = !d.completed
            }
            return d
          })
        }
      },
      setVisibility(state, filter) {
        return {
          ...state,
          visibility: filter
        }
      }
    },
    effects:{
      addTodo(){
        
      }
    }
  }

resolveReducers(data.name,data.reducers)

var _redux = require("redux");
const rootReducer = _redux.combineReducers({
  pureFunctions
})

console.log('actions',actions)
console.log('pureFunctions',pureFunctions)
console.log('rootReducer',rootReducer)