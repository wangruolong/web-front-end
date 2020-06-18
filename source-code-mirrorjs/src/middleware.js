import { effects } from './effects'
import { hooks } from './hook'

function warning() {
  throw new Error(
    'You are calling "dispatch" or "getState" without applying mirrorMiddleware! ' +
    'Please create your store with mirrorMiddleware first!'
  )
}

export let dispatch = warning

export let getState = warning

export default function createMiddleware() {
  return middlewareAPI => {
    dispatch = middlewareAPI.dispatch
    getState = middlewareAPI.getState//getState可以获取redux里面的所有状态

    return next => action => {
      //1.next就是dispatch
      let result = next(action)//2.默认执行其他中间件传递过来的action

      if (typeof effects[action.type] === 'function') {//3.如果effects里面有对应的action type，则effects里面的action优先级更高
        result = effects[action.type](action.data, getState)
      }
      //执行钩子里面的函数，并把action和getState传递给他们
      hooks.forEach(hookFun => hookFun(action, getState))

      return result
    }
  }
}
