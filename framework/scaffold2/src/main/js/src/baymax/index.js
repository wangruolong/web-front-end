import { getReducer, addActions } from './actions'

model({
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
      }
    }
})

// 全局models
export const models = []


export default function model(m) {
  const reducer = getReducer(resolveReducers(m.name, m.reducers), m.initialState)
  const _model = {
    name: m.name,
    reducer
  }
  models.push(_model)
  addActions(m.name, m.reducers, m.effects)
  return _model
}

export const baymaxReducer={}

function createReducer(models, reducers) {

    const modelReducers = models.reduce((acc, cur) => {
      acc[cur.name] = cur.reducer
      return acc
    }, {})
  
    return combineReducers({
      ...modelReducers
    })
  
  }
  